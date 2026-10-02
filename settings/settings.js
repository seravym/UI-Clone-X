/*
 * settings.js  (SHELL / kerangka)
 *
 * Tugasnya hanya mengatur daftar menu, perpindahan halaman, dan fungsi bantu.
 * Isi tiap menu ada di file masing-masing di folder sections/.
 *
 * Cara membuat bagian baru (di file sections/xxx.js):
 *
 *   SettingsApp.register({
 *       id: "nama-unik",          // dipakai di URL: settings.html#nama-unik
 *       title: "Judul menu",
 *       description: "Keterangan singkat",
 *       order: 5,                 // urutan di daftar
 *       icon: "<svg ...></svg>",  // opsional
 *       render: function (el) { el.innerHTML = "..."; }
 *   });
 */
(function () {
    var PREFIX = "settings.";
    var sections = [];

    var menuEl, panelEl, titleEl, backEl;

    function esc(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // Penyimpanan: semua key diawali "settings."
    var store = {
        get: function (key, fallback) {
            try {
                var raw = localStorage.getItem(PREFIX + key);
                return raw === null ? fallback : JSON.parse(raw);
            } catch (e) {
                return fallback;
            }
        },
        set: function (key, value) {
            try {
                localStorage.setItem(PREFIX + key, JSON.stringify(value));
                return true;
            } catch (e) {
                return false;
            }
        }
    };

    var toastTimer;
    function toast(message) {
        var el = document.getElementById("toast");
        if (!el) return;
        el.textContent = message;
        el.classList.add("is-show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            el.classList.remove("is-show");
        }, 2000);
    }

    function register(section) {
        if (!section || !section.id || typeof section.render !== "function") {
            console.error("Settings: bagian tidak valid (butuh id dan render):", section);
            return;
        }
        sections = sections.filter(function (s) {
            return s.id !== section.id;
        });
        sections.push(section);
        sections.sort(function (a, b) {
            return (a.order || 99) - (b.order || 99);
        });
    }

    function findSection(id) {
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].id === id) return sections[i];
        }
        return null;
    }

    var CHEVRON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

    function renderMenu() {
        if (!sections.length) {
            menuEl.innerHTML = '<p class="s-empty">Belum ada menu pengaturan yang dimuat.</p>';
            return;
        }
        menuEl.innerHTML = sections.map(function (s) {
            return '<a class="s-menu-item" href="#' + esc(s.id) + '">' +
                '<span class="s-menu-icon">' + (s.icon || "") + "</span>" +
                '<span class="s-menu-text">' +
                '<span class="s-menu-title">' + esc(s.title) + "</span>" +
                '<span class="s-menu-desc">' + esc(s.description || "") + "</span>" +
                "</span>" +
                '<span class="s-menu-chevron">' + CHEVRON + "</span>" +
                "</a>";
        }).join("");
    }

    function openSection(section) {
        titleEl.textContent = section.title;
        document.title = section.title + " - Settings";
        menuEl.hidden = true;
        panelEl.hidden = false;
        panelEl.innerHTML = "";

        // Wadah baru tiap dibuka, dan error di satu bagian tidak merusak bagian lain
        var holder = document.createElement("div");
        holder.className = "s-panel";
        panelEl.appendChild(holder);
        try {
            section.render(holder);
        } catch (err) {
            console.error("Settings: gagal menampilkan bagian '" + section.id + "':", err);
            holder.innerHTML = '<p class="s-empty">Bagian ini gagal dimuat. Cek Console untuk detailnya.</p>';
        }
        window.scrollTo(0, 0);
    }

    function route() {
        var id = decodeURIComponent(location.hash.replace(/^#/, ""));
        var section = findSection(id);
        if (section) {
            openSection(section);
        } else {
            titleEl.textContent = "Settings";
            document.title = "Settings - X Clone";
            panelEl.hidden = true;
            panelEl.innerHTML = "";
            menuEl.hidden = false;
            renderMenu();
        }
    }

    function init() {
        menuEl = document.getElementById("settingsMenu");
        panelEl = document.getElementById("settingsPanel");
        titleEl = document.getElementById("settingsTitle");
        backEl = document.getElementById("settingsBack");

        backEl.addEventListener("click", function () {
            if (!panelEl.hidden) {
                location.hash = "";
            } else {
                location.href = "../home/home.html";
            }
        });

        window.addEventListener("hashchange", route);
        route();

        fetch("../sidebar.html")
            .then(function (res) {
                if (!res.ok) throw new Error("Status " + res.status);
                return res.text();
            })
            .then(function (html) {
                document.getElementById("sidebar").innerHTML = html;
            })
            .catch(function (err) {
                console.error("Sidebar gagal dimuat:", err);
            });
    }

    window.SettingsApp = {
        register: register,
        store: store,
        esc: esc,
        toast: toast
    };

    document.addEventListener("DOMContentLoaded", init);
})();