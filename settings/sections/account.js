/*
 * account.js - Informasi akun
 * Data tersimpan di localStorage key: "settings.account"
 * Format: { name, username, email, phone, birthdate, bio }
 */
(function () {
    var KEY = "account";
    var BIO_MAX = 160;
    var DEFAULTS = { name: "user", username: "user", email: "", phone: "", birthdate: "", bio: "" };

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

    function validate(v) {
        var errors = {};
        if (!v.name) {
            errors.name = "Nama tidak boleh kosong.";
        } else if (v.name.length > 50) {
            errors.name = "Nama maksimal 50 karakter.";
        }
        if (!/^[A-Za-z0-9_]{3,15}$/.test(v.username)) {
            errors.username = "Username 3-15 karakter: huruf, angka, atau garis bawah.";
        }
        if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
            errors.email = "Format email tidak valid.";
        }
        var phone = v.phone.replace(/[\s-]/g, "");
        if (phone && !/^\+?[0-9]{8,15}$/.test(phone)) {
            errors.phone = "Nomor telepon harus 8-15 digit.";
        }
        if (v.birthdate && new Date(v.birthdate) > new Date()) {
            errors.birthdate = "Tanggal lahir tidak boleh di masa depan.";
        }
        if (v.bio.length > BIO_MAX) {
            errors.bio = "Bio maksimal " + BIO_MAX + " karakter.";
        }
        return errors;
    }

    function render(el) {
        var S = SettingsApp;

        el.innerHTML =
            '<p class="s-intro">Kelola informasi dasar akun Anda. Perubahan disimpan di perangkat ini.</p>' +
            '<form class="acc-form" novalidate>' +
            field("name", "Nama", "text", 'maxlength="60" autocomplete="off"') +
            field("username", "Username", "text", 'maxlength="15" autocomplete="off"') +
            field("email", "Email", "email", 'autocomplete="off"') +
            field("phone", "Nomor telepon", "tel", 'autocomplete="off" placeholder="+62..."') +
            field("birthdate", "Tanggal lahir", "date", "") +
            '<div class="s-field">' +
            '<label for="acc-bio">Bio</label>' +
            '<textarea id="acc-bio" maxlength="' + (BIO_MAX + 40) + '"></textarea>' +
            '<div class="s-field__hint"><span></span><span id="acc-bio-count"></span></div>' +
            '<span class="s-error" id="acc-err-bio"></span>' +
            "</div>" +
            '<div class="s-actions">' +
            '<button class="s-btn s-btn--ghost" type="button" id="acc-reset">Batalkan</button>' +
            '<button class="s-btn" type="submit">Simpan</button>' +
            "</div>" +
            "</form>";

        var form = el.querySelector(".acc-form");
        var names = ["name", "username", "email", "phone", "birthdate", "bio"];

        function input(n) {
            return el.querySelector("#acc-" + n);
        }

        function fill(data) {
            names.forEach(function (n) {
                input(n).value = data[n] || "";
                el.querySelector("#acc-err-" + n).textContent = "";
            });
            updateCount();
        }

        function updateCount() {
            el.querySelector("#acc-bio-count").textContent = input("bio").value.length + "/" + BIO_MAX;
        }

        function read() {
            var v = {};
            names.forEach(function (n) {
                v[n] = input(n).value.trim();
            });
            return v;
        }

        fill(Object.assign({}, DEFAULTS, S.store.get(KEY, {})));

        input("bio").addEventListener("input", updateCount);

        el.querySelector("#acc-reset").addEventListener("click", function () {
            fill(Object.assign({}, DEFAULTS, S.store.get(KEY, {})));
            S.toast("Perubahan dibatalkan");
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var values = read();
            var errors = validate(values);
            names.forEach(function (n) {
                el.querySelector("#acc-err-" + n).textContent = errors[n] || "";
            });
            var firstError = names.filter(function (n) {
                return errors[n];
            })[0];
            if (firstError) {
                input(firstError).focus();
                return;
            }
            S.store.set(KEY, values);
            S.toast("Informasi akun disimpan");
        });
    }

    function field(name, label, type, attrs) {
        return '<div class="s-field">' +
            '<label for="acc-' + name + '">' + label + "</label>" +
            '<input id="acc-' + name + '" type="' + type + '" ' + attrs + ">" +
            '<span class="s-error" id="acc-err-' + name + '"></span>' +
            "</div>";
    }

    SettingsApp.register({
        id: "account",
        title: "Informasi akun",
        description: "Nama, username, email, dan nomor telepon",
        order: 1,
        icon: ICON,
        render: render
    });
})();