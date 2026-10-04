(function () {
    var PREFIX = "settings.";
    var sections = [];
    var dict = {};

    var LANGUAGES = [
        { code: "id", name: "Bahasa Indonesia" },
        { code: "en", name: "English" },
        { code: "es", name: "Español" },
        { code: "ja", name: "日本語" },
        { code: "ko", name: "한국어" }
    ];

    var menuEl, panelEl, titleEl, backEl;

    function esc(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

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


    function addStrings(code, strings) {
        dict[code] = Object.assign(dict[code] || {}, strings);
    }

    function getLang() {
        var code = document.documentElement.getAttribute("lang") || "id";
        return dict[code] ? code : "id";
    }

    function hasString(code, key) {
        return !!dict[code] && dict[code][key] !== undefined;
    }

    function t(key, vars) {
        var text = (dict[getLang()] || {})[key];
        if (text === undefined) text = (dict.id || {})[key];
        if (text === undefined) text = key;
        if (vars) {
            text = text.replace(/\{(\w+)\}/g, function (match, name) {
                return vars[name] !== undefined ? vars[name] : match;
            });
        }
        return text;
    }

    addStrings("id", {
        "settings.title": "Pengaturan",
        "shell.back": "Kembali",
        "shell.menuLabel": "Menu pengaturan",
        "shell.empty": "Belum ada menu pengaturan yang dimuat.",
        "shell.error": "Bagian ini gagal dimuat. Cek Console untuk detailnya.",
        "common.saved": "Tersimpan"
    });
    addStrings("en", {
        "settings.title": "Settings",
        "shell.back": "Back",
        "shell.menuLabel": "Settings menu",
        "shell.empty": "No settings menus loaded yet.",
        "shell.error": "This section failed to load. Check the Console for details.",
        "common.saved": "Saved"
    });
    addStrings("es", {
        "settings.title": "Configuración",
        "shell.back": "Atrás",
        "shell.menuLabel": "Menú de configuración",
        "shell.empty": "Aún no se ha cargado ningún menú de configuración.",
        "shell.error": "No se pudo cargar esta sección. Revisa la consola para ver los detalles.",
        "common.saved": "Guardado"
    });
    addStrings("ja", {
        "settings.title": "設定",
        "shell.back": "戻る",
        "shell.menuLabel": "設定メニュー",
        "shell.empty": "読み込まれた設定メニューはまだありません。",
        "shell.error": "このセクションを読み込めませんでした。詳細はコンソールを確認してください。",
        "common.saved": "保存しました"
    });
    addStrings("ko", {
        "settings.title": "설정",
        "shell.back": "뒤로",
        "shell.menuLabel": "설정 메뉴",
        "shell.empty": "불러온 설정 메뉴가 아직 없습니다.",
        "shell.error": "이 섹션을 불러오지 못했습니다. 자세한 내용은 콘솔을 확인하세요.",
        "common.saved": "저장됨"
    });

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
        if (section.strings) {
            Object.keys(section.strings).forEach(function (code) {
                addStrings(code, section.strings[code]);
            });
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

    function sectionText(section, part, fallback) {
        var key = section.id + "." + part;
        var value = t(key);
        return value === key ? (fallback || "") : value;
    }

    var CHEVRON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>';

    function renderMenu() {
        if (!sections.length) {
            menuEl.innerHTML = '<p class="s-empty">' + esc(t("shell.empty")) + "</p>";
            return;
        }
        menuEl.innerHTML = sections.map(function (s) {
            return '<a class="s-menu-item" href="#' + esc(s.id) + '">' +
                '<span class="s-menu-icon">' + (s.icon || "") + "</span>" +
                '<span class="s-menu-text">' +
                '<span class="s-menu-title">' + esc(sectionText(s, "title", s.title)) + "</span>" +
                '<span class="s-menu-desc">' + esc(sectionText(s, "desc", s.description)) + "</span>" +
                "</span>" +
                '<span class="s-menu-chevron">' + CHEVRON + "</span>" +
                "</a>";
        }).join("");
    }

    function currentSection() {
        return findSection(decodeURIComponent(location.hash.replace(/^#/, "")));
    }

    function updateChrome() {
        if (!titleEl) return;
        var section = currentSection();
        var heading = section ? sectionText(section, "title", section.title) : t("settings.title");
        titleEl.textContent = heading;
        document.title = heading + " - X Clone";
        backEl.setAttribute("aria-label", t("shell.back"));
        menuEl.setAttribute("aria-label", t("shell.menuLabel"));
        if (!menuEl.hidden) renderMenu();
    }

    function openSection(section) {
        menuEl.hidden = true;
        panelEl.hidden = false;
        panelEl.innerHTML = "";

        var holder = document.createElement("div");
        holder.className = "s-panel";
        panelEl.appendChild(holder);
        try {
            section.render(holder);
        } catch (err) {
            console.error("Settings: gagal menampilkan bagian '" + section.id + "':", err);
            holder.innerHTML = '<p class="s-empty">' + esc(t("shell.error")) + "</p>";
        }
        window.scrollTo(0, 0);
    }

    function route() {
        var section = currentSection();
        if (section) {
            openSection(section);
        } else {
            panelEl.hidden = true;
            panelEl.innerHTML = "";
            menuEl.hidden = false;
        }
        updateChrome();
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
        window.addEventListener("displaychange", updateChrome);
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
        toast: toast,
        t: t,
        hasString: hasString,
        languages: LANGUAGES
    };

    document.addEventListener("DOMContentLoaded", init);
})();