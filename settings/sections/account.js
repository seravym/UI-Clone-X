(function () {
    var KEY = "account";
    var BIO_MAX = 160;
    var DEFAULTS = { name: "user", username: "user", email: "", phone: "", birthdate: "", bio: "" };

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';

    var STRINGS = {
        id: {
            "account.title": "Informasi akun",
            "account.desc": "Nama, username, email, dan nomor telepon",
            "account.intro": "Kelola informasi dasar akun Anda. Perubahan disimpan di perangkat ini.",
            "account.name": "Nama",
            "account.username": "Username",
            "account.email": "Email",
            "account.phone": "Nomor telepon",
            "account.birthdate": "Tanggal lahir",
            "account.bio": "Bio",
            "account.cancel": "Batalkan",
            "account.save": "Simpan",
            "account.err.nameEmpty": "Nama tidak boleh kosong.",
            "account.err.nameMax": "Nama maksimal 50 karakter.",
            "account.err.username": "Username 3-15 karakter: huruf, angka, atau garis bawah.",
            "account.err.email": "Format email tidak valid.",
            "account.err.phone": "Nomor telepon harus 8-15 digit.",
            "account.err.birth": "Tanggal lahir tidak boleh di masa depan.",
            "account.err.bio": "Bio maksimal {max} karakter.",
            "account.toast.saved": "Informasi akun disimpan",
            "account.toast.cancelled": "Perubahan dibatalkan"
        },
        en: {
            "account.title": "Account information",
            "account.desc": "Name, username, email, and phone number",
            "account.intro": "Manage your basic account information. Changes are saved on this device.",
            "account.name": "Name",
            "account.username": "Username",
            "account.email": "Email",
            "account.phone": "Phone number",
            "account.birthdate": "Date of birth",
            "account.bio": "Bio",
            "account.cancel": "Cancel",
            "account.save": "Save",
            "account.err.nameEmpty": "Name can't be empty.",
            "account.err.nameMax": "Name must be 50 characters or fewer.",
            "account.err.username": "Username must be 3-15 characters: letters, numbers, or underscores.",
            "account.err.email": "Invalid email format.",
            "account.err.phone": "Phone number must be 8-15 digits.",
            "account.err.birth": "Date of birth can't be in the future.",
            "account.err.bio": "Bio must be {max} characters or fewer.",
            "account.toast.saved": "Account information saved",
            "account.toast.cancelled": "Changes discarded"
        },
        es: {
            "account.title": "Información de la cuenta",
            "account.desc": "Nombre, usuario, correo y número de teléfono",
            "account.intro": "Gestiona la información básica de tu cuenta. Los cambios se guardan en este dispositivo.",
            "account.name": "Nombre",
            "account.username": "Nombre de usuario",
            "account.email": "Correo electrónico",
            "account.phone": "Número de teléfono",
            "account.birthdate": "Fecha de nacimiento",
            "account.bio": "Biografía",
            "account.cancel": "Cancelar",
            "account.save": "Guardar",
            "account.err.nameEmpty": "El nombre no puede estar vacío.",
            "account.err.nameMax": "El nombre debe tener 50 caracteres como máximo.",
            "account.err.username": "El usuario debe tener de 3 a 15 caracteres: letras, números o guion bajo.",
            "account.err.email": "Formato de correo no válido.",
            "account.err.phone": "El teléfono debe tener entre 8 y 15 dígitos.",
            "account.err.birth": "La fecha de nacimiento no puede ser futura.",
            "account.err.bio": "La biografía debe tener {max} caracteres como máximo.",
            "account.toast.saved": "Información de la cuenta guardada",
            "account.toast.cancelled": "Cambios descartados"
        },
        ja: {
            "account.title": "アカウント情報",
            "account.desc": "名前、ユーザー名、メール、電話番号",
            "account.intro": "アカウントの基本情報を管理します。変更はこのデバイスに保存されます。",
            "account.name": "名前",
            "account.username": "ユーザー名",
            "account.email": "メールアドレス",
            "account.phone": "電話番号",
            "account.birthdate": "生年月日",
            "account.bio": "自己紹介",
            "account.cancel": "キャンセル",
            "account.save": "保存",
            "account.err.nameEmpty": "名前を入力してください。",
            "account.err.nameMax": "名前は50文字以内で入力してください。",
            "account.err.username": "ユーザー名は3〜15文字の英数字またはアンダースコアにしてください。",
            "account.err.email": "メールアドレスの形式が正しくありません。",
            "account.err.phone": "電話番号は8〜15桁で入力してください。",
            "account.err.birth": "生年月日に未来の日付は指定できません。",
            "account.err.bio": "自己紹介は{max}文字以内で入力してください。",
            "account.toast.saved": "アカウント情報を保存しました",
            "account.toast.cancelled": "変更を破棄しました"
        },
        ko: {
            "account.title": "계정 정보",
            "account.desc": "이름, 사용자 이름, 이메일, 전화번호",
            "account.intro": "계정의 기본 정보를 관리합니다. 변경 사항은 이 기기에 저장됩니다.",
            "account.name": "이름",
            "account.username": "사용자 이름",
            "account.email": "이메일",
            "account.phone": "전화번호",
            "account.birthdate": "생년월일",
            "account.bio": "소개",
            "account.cancel": "취소",
            "account.save": "저장",
            "account.err.nameEmpty": "이름을 입력해 주세요.",
            "account.err.nameMax": "이름은 50자 이하여야 합니다.",
            "account.err.username": "사용자 이름은 영문, 숫자, 밑줄로 3~15자여야 합니다.",
            "account.err.email": "이메일 형식이 올바르지 않습니다.",
            "account.err.phone": "전화번호는 8~15자리여야 합니다.",
            "account.err.birth": "생년월일은 미래일 수 없습니다.",
            "account.err.bio": "소개는 {max}자 이하여야 합니다.",
            "account.toast.saved": "계정 정보를 저장했습니다",
            "account.toast.cancelled": "변경 사항을 취소했습니다"
        }
    };

    function validate(v, t) {
        var errors = {};
        if (!v.name) {
            errors.name = t("account.err.nameEmpty");
        } else if (v.name.length > 50) {
            errors.name = t("account.err.nameMax");
        }
        if (!/^[A-Za-z0-9_]{3,15}$/.test(v.username)) {
            errors.username = t("account.err.username");
        }
        if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
            errors.email = t("account.err.email");
        }
        var phone = v.phone.replace(/[\s-]/g, "");
        if (phone && !/^\+?[0-9]{8,15}$/.test(phone)) {
            errors.phone = t("account.err.phone");
        }
        if (v.birthdate && new Date(v.birthdate) > new Date()) {
            errors.birthdate = t("account.err.birth");
        }
        if (v.bio.length > BIO_MAX) {
            errors.bio = t("account.err.bio", { max: BIO_MAX });
        }
        return errors;
    }

    function render(el) {
        var S = SettingsApp;
        var t = S.t;

        function field(name, type, attrs) {
            return '<div class="s-field">' +
                '<label for="acc-' + name + '">' + S.esc(t("account." + name)) + "</label>" +
                '<input id="acc-' + name + '" type="' + type + '" ' + attrs + ">" +
                '<span class="s-error" id="acc-err-' + name + '"></span>' +
                "</div>";
        }

        el.innerHTML =
            '<p class="s-intro">' + S.esc(t("account.intro")) + "</p>" +
            '<form class="acc-form" novalidate>' +
            field("name", "text", 'maxlength="60" autocomplete="off"') +
            field("username", "text", 'maxlength="15" autocomplete="off"') +
            field("email", "email", 'autocomplete="off"') +
            field("phone", "tel", 'autocomplete="off" placeholder="+62..."') +
            field("birthdate", "date", "") +
            '<div class="s-field">' +
            '<label for="acc-bio">' + S.esc(t("account.bio")) + "</label>" +
            '<textarea id="acc-bio" maxlength="' + (BIO_MAX + 40) + '"></textarea>' +
            '<div class="s-field__hint"><span></span><span id="acc-bio-count"></span></div>' +
            '<span class="s-error" id="acc-err-bio"></span>' +
            "</div>" +
            '<div class="s-actions">' +
            '<button class="s-btn s-btn--ghost" type="button" id="acc-reset">' + S.esc(t("account.cancel")) + "</button>" +
            '<button class="s-btn" type="submit">' + S.esc(t("account.save")) + "</button>" +
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
            S.toast(t("account.toast.cancelled"));
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            var values = read();
            var errors = validate(values, t);
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
            S.toast(t("account.toast.saved"));
        });
    }

    SettingsApp.register({
        id: "account",
        title: "Informasi akun",
        description: "Nama, username, email, dan nomor telepon",
        order: 1,
        icon: ICON,
        strings: STRINGS,
        render: render
    });
})();