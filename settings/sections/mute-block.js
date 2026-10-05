(function () {
    var KEY = "mute";
    var P = "mute-block.";

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m5.6 5.6 12.8 12.8"/></svg>';

    var DUMMY = {
        words: ["spoiler", "giveaway", "clickbait", "prank", "judi online", "bocoran"],
        muted: ["@akun_gosip", "@bot_jualan", "@drama_daily", "@spam_promo"],
        blocked: ["@troll_malam", "@fake_giveaway", "@penipu_online"]
    };

    function cloneDummy() {
        return JSON.parse(JSON.stringify(DUMMY));
    }

    var STRINGS = {
        id: {
            "mute-block.title": "Mute dan blokir",
            "mute-block.desc": "Kata, akun yang di-mute, dan akun yang diblokir",
            "mute-block.intro": "Atur kata dan akun yang tidak ingin Anda lihat atau yang tidak boleh berinteraksi dengan Anda.",
            "mute-block.tab.words": "Kata",
            "mute-block.tab.muted": "Akun di-mute",
            "mute-block.tab.blocked": "Akun diblokir",
            "mute-block.ph.words": "Kata atau frasa yang ingin di-mute",
            "mute-block.ph.muted": "@username yang ingin di-mute",
            "mute-block.ph.blocked": "@username yang ingin diblokir",
            "mute-block.empty.words": "Belum ada kata yang di-mute.",
            "mute-block.empty.muted": "Belum ada akun yang di-mute.",
            "mute-block.empty.blocked": "Belum ada akun yang diblokir.",
            "mute-block.rm.words": "Hapus",
            "mute-block.rm.muted": "Unmute",
            "mute-block.rm.blocked": "Buka blokir",
            "mute-block.add": "Tambah",
            "mute-block.err.handle": "Username hanya boleh huruf, angka, atau garis bawah (maks. 15).",
            "mute-block.err.word": "Tulis kata atau frasa terlebih dahulu.",
            "mute-block.err.dup": "Sudah ada di daftar ini.",
            "mute-block.toast.add.words": "Kata di-mute",
            "mute-block.toast.add.muted": "Akun di-mute",
            "mute-block.toast.add.blocked": "Akun diblokir",
            "mute-block.toast.rm.words": "Kata dihapus",
            "mute-block.toast.rm.muted": "Mute dibuka",
            "mute-block.toast.rm.blocked": "Blokir dibuka",
        },
        en: {
            "mute-block.title": "Mute and block",
            "mute-block.desc": "Words, muted accounts, and blocked accounts",
            "mute-block.intro": "Choose the words and accounts you don't want to see, or who can't interact with you.",
            "mute-block.tab.words": "Words",
            "mute-block.tab.muted": "Muted accounts",
            "mute-block.tab.blocked": "Blocked accounts",
            "mute-block.ph.words": "Word or phrase to mute",
            "mute-block.ph.muted": "@username to mute",
            "mute-block.ph.blocked": "@username to block",
            "mute-block.empty.words": "No muted words yet.",
            "mute-block.empty.muted": "No muted accounts yet.",
            "mute-block.empty.blocked": "No blocked accounts yet.",
            "mute-block.rm.words": "Remove",
            "mute-block.rm.muted": "Unmute",
            "mute-block.rm.blocked": "Unblock",
            "mute-block.add": "Add",
            "mute-block.err.handle": "Username may only contain letters, numbers, or underscores (max 15).",
            "mute-block.err.word": "Enter a word or phrase first.",
            "mute-block.err.dup": "Already in this list.",
            "mute-block.toast.add.words": "Word muted",
            "mute-block.toast.add.muted": "Account muted",
            "mute-block.toast.add.blocked": "Account blocked",
            "mute-block.toast.rm.words": "Word removed",
            "mute-block.toast.rm.muted": "Account unmuted",
            "mute-block.toast.rm.blocked": "Account unblocked",
        },
        es: {
            "mute-block.title": "Silenciar y bloquear",
            "mute-block.desc": "Palabras, cuentas silenciadas y cuentas bloqueadas",
            "mute-block.intro": "Elige las palabras y cuentas que no quieres ver o que no pueden interactuar contigo.",
            "mute-block.tab.words": "Palabras",
            "mute-block.tab.muted": "Cuentas silenciadas",
            "mute-block.tab.blocked": "Cuentas bloqueadas",
            "mute-block.ph.words": "Palabra o frase que silenciar",
            "mute-block.ph.muted": "@usuario que silenciar",
            "mute-block.ph.blocked": "@usuario que bloquear",
            "mute-block.empty.words": "Aún no hay palabras silenciadas.",
            "mute-block.empty.muted": "Aún no hay cuentas silenciadas.",
            "mute-block.empty.blocked": "Aún no hay cuentas bloqueadas.",
            "mute-block.rm.words": "Eliminar",
            "mute-block.rm.muted": "Dejar de silenciar",
            "mute-block.rm.blocked": "Desbloquear",
            "mute-block.add": "Añadir",
            "mute-block.err.handle": "El usuario solo puede contener letras, números o guion bajo (máx. 15).",
            "mute-block.err.word": "Escribe primero una palabra o frase.",
            "mute-block.err.dup": "Ya está en esta lista.",
            "mute-block.toast.add.words": "Palabra silenciada",
            "mute-block.toast.add.muted": "Cuenta silenciada",
            "mute-block.toast.add.blocked": "Cuenta bloqueada",
            "mute-block.toast.rm.words": "Palabra eliminada",
            "mute-block.toast.rm.muted": "Cuenta ya no silenciada",
            "mute-block.toast.rm.blocked": "Cuenta desbloqueada",
        },
        ja: {
            "mute-block.title": "ミュートとブロック",
            "mute-block.desc": "ワード、ミュートしたアカウント、ブロックしたアカウント",
            "mute-block.intro": "見たくないワードやアカウント、交流を禁止するアカウントを設定します。",
            "mute-block.tab.words": "ワード",
            "mute-block.tab.muted": "ミュート中のアカウント",
            "mute-block.tab.blocked": "ブロック中のアカウント",
            "mute-block.ph.words": "ミュートするワードまたはフレーズ",
            "mute-block.ph.muted": "ミュートする@ユーザー名",
            "mute-block.ph.blocked": "ブロックする@ユーザー名",
            "mute-block.empty.words": "ミュート中のワードはありません。",
            "mute-block.empty.muted": "ミュート中のアカウントはありません。",
            "mute-block.empty.blocked": "ブロック中のアカウントはありません。",
            "mute-block.rm.words": "削除",
            "mute-block.rm.muted": "ミュート解除",
            "mute-block.rm.blocked": "ブロック解除",
            "mute-block.add": "追加",
            "mute-block.err.handle": "ユーザー名には英数字とアンダースコアのみ使用できます(最大15文字)。",
            "mute-block.err.word": "先にワードまたはフレーズを入力してください。",
            "mute-block.err.dup": "すでにこのリストにあります。",
            "mute-block.toast.add.words": "ワードをミュートしました",
            "mute-block.toast.add.muted": "アカウントをミュートしました",
            "mute-block.toast.add.blocked": "アカウントをブロックしました",
            "mute-block.toast.rm.words": "ワードを削除しました",
            "mute-block.toast.rm.muted": "ミュートを解除しました",
            "mute-block.toast.rm.blocked": "ブロックを解除しました",

        },
        ko: {
            "mute-block.title": "뮤트 및 차단",
            "mute-block.desc": "단어, 뮤트한 계정, 차단한 계정",
            "mute-block.intro": "보고 싶지 않은 단어와 계정, 나와 상호작용할 수 없는 계정을 설정합니다.",
            "mute-block.tab.words": "단어",
            "mute-block.tab.muted": "뮤트한 계정",
            "mute-block.tab.blocked": "차단한 계정",
            "mute-block.ph.words": "뮤트할 단어 또는 문구",
            "mute-block.ph.muted": "뮤트할 @사용자 이름",
            "mute-block.ph.blocked": "차단할 @사용자 이름",
            "mute-block.empty.words": "뮤트한 단어가 아직 없습니다.",
            "mute-block.empty.muted": "뮤트한 계정이 아직 없습니다.",
            "mute-block.empty.blocked": "차단한 계정이 아직 없습니다.",
            "mute-block.rm.words": "삭제",
            "mute-block.rm.muted": "뮤트 해제",
            "mute-block.rm.blocked": "차단 해제",
            "mute-block.add": "추가",
            "mute-block.err.handle": "사용자 이름에는 영문, 숫자, 밑줄만 사용할 수 있습니다(최대 15자).",
            "mute-block.err.word": "먼저 단어 또는 문구를 입력해 주세요.",
            "mute-block.err.dup": "이미 이 목록에 있습니다.",
            "mute-block.toast.add.words": "단어를 뮤트했습니다",
            "mute-block.toast.add.muted": "계정을 뮤트했습니다",
            "mute-block.toast.add.blocked": "계정을 차단했습니다",
            "mute-block.toast.rm.words": "단어를 삭제했습니다",
            "mute-block.toast.rm.muted": "뮤트를 해제했습니다",
            "mute-block.toast.rm.blocked": "차단을 해제했습니다",
        }
    };

    var TABS = [
        { id: "words", type: "word" },
        { id: "muted", type: "handle" },
        { id: "blocked", type: "handle" }
    ];

    function render(el) {
        var S = SettingsApp;
        var t = S.t;
        var saved = S.store.get(KEY, null);
        var firstTime = saved === null;
        if (firstTime) saved = cloneDummy();
        var data = {
            words: Array.isArray(saved.words) ? saved.words : [],
            muted: Array.isArray(saved.muted) ? saved.muted : [],
            blocked: Array.isArray(saved.blocked) ? saved.blocked : []
        };
        if (firstTime) persist();
        var activeId = "words";
        var errorKey = "";
        function persist() {
            S.store.set(KEY, data);
        }
        function tabOf(id) {
            return TABS.filter(function (x) {
                return x.id === id;
            })[0];
        }
        function initials(handle) {
            return handle.replace("@", "").slice(0, 2).toUpperCase();
        }
        function draw() {
            var tab = tabOf(activeId);
            var list = data[activeId];
            var placeholder = t(P + "ph." + activeId);
            var html = '<p class="s-intro">' + S.esc(t(P + "intro")) + "</p>";
            html += '<div class="mb-tabs" role="tablist">' + TABS.map(function (x) {
                return '<button class="mb-tab' + (x.id === activeId ? " is-active" : "") + '" type="button" role="tab" aria-selected="' + (x.id === activeId) + '" data-tab="' + x.id + '">' +
                    S.esc(t(P + "tab." + x.id)) + ' <span class="mb-count">' + data[x.id].length + "</span></button>";
            }).join("") + "</div>";
            html += '<form class="mb-form" novalidate>' +
                '<input class="s-input" type="text" id="mb-input" maxlength="60" autocomplete="off" placeholder="' + S.esc(placeholder) + '" aria-label="' + S.esc(placeholder) + '">' +
                '<button class="s-btn" type="submit">' + S.esc(t(P + "add")) + "</button>" +
                "</form>" +
                '<span class="s-error" id="mb-error">' + (errorKey ? S.esc(t(errorKey)) : "") + "</span>";
            html += '<div class="s-card">';
            if (!list.length) {
                html += '<p class="s-empty">' + S.esc(t(P + "empty." + activeId)) + "</p>";
            } else {
                html += list.map(function (item, i) {
                    var lead = tab.type === "handle"
                        ? '<span class="mb-avatar" aria-hidden="true">' + S.esc(initials(item)) + "</span>"
                        : "";
                    return '<div class="s-list-row">' + lead +
                        '<span class="s-list-row__text">' + S.esc(item) + "</span>" +
                        '<button class="s-btn s-btn--ghost s-btn--small" type="button" data-remove="' + i + '">' + S.esc(t(P + "rm." + activeId)) + "</button>" +
                        "</div>";
                }).join("");
            }
            html += "</div>";
            html += '<div class="s-actions">' +
                '<button class="s-btn s-btn--ghost s-btn--small" type="button" data-seed>' + S.esc(t(P + "seed")) + "</button>" +
                "</div>";
            el.innerHTML = html;
        }
        function normalize(raw, type) {
            var value = raw.trim();
            if (type === "handle") {
                value = value.replace(/^@/, "");
                if (!/^\w{1,15}$/.test(value)) return { error: P + "err.handle" };
                return { value: "@" + value.toLowerCase() };
            }
            if (!value) return { error: P + "err.word" };
            return { value: value };
        }
        function has(list, value) {
            return list.some(function (x) {
                return x.toLowerCase() === value.toLowerCase();
            });
        }
        el.addEventListener("click", function (event) {
            if (event.target.closest("[data-seed]")) {
                data = cloneDummy();
                persist();
                errorKey = "";
                draw();
                S.toast(t(P + "toast.seed"));
                return;
            }
            var tabBtn = event.target.closest("[data-tab]");
            if (tabBtn) {
                activeId = tabBtn.dataset.tab;
                errorKey = "";
                draw();
                return;
            }
            var removeBtn = event.target.closest("[data-remove]");
            if (removeBtn) {
                data[activeId].splice(Number(removeBtn.dataset.remove), 1);
                persist();
                errorKey = "";
                draw();
                S.toast(t(P + "toast.rm." + activeId));
            }
        });
        el.addEventListener("submit", function (event) {
            event.preventDefault();
            var tab = tabOf(activeId);
            var input = el.querySelector("#mb-input");
            var result = normalize(input.value, tab.type);
            if (result.error) {
                errorKey = result.error;
                draw();
                el.querySelector("#mb-input").focus();
                return;
            }
            if (has(data[activeId], result.value)) {
                errorKey = P + "err.dup";
                draw();
                el.querySelector("#mb-input").focus();
                return;
            }
            data[activeId].unshift(result.value);
            if (activeId === "blocked") {
                data.muted = data.muted.filter(function (x) {
                    return x.toLowerCase() !== result.value.toLowerCase();
                });
            }
            persist();
            errorKey = "";
            draw();
            el.querySelector("#mb-input").focus();
            S.toast(t(P + "toast.add." + activeId));
        });

        draw();
    }

    SettingsApp.register({
        id: "mute-block",
        title: "Mute dan blokir",
        description: "Kata, akun yang di-mute, dan akun yang diblokir",
        order: 3,
        icon: ICON,
        strings: STRINGS,
        render: render
    });
})();