(function () {
    var KEY = "display";
    var P = "display.";

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>';

    var STRINGS = {
        id: {
            "display.title": "Tampilan dan bahasa",
            "display.desc": "Tema, ukuran huruf, dan bahasa",
            "display.intro": "Sesuaikan tampilan dan bahasa. Perubahan langsung diterapkan.",
            "display.theme.t": "Tema",
            "display.theme.h": "Mode gelap berlaku di semua halaman yang memuat apply-display.js.",
            "display.theme.light": "Terang",
            "display.theme.dark": "Gelap",
            "display.font.t": "Ukuran huruf",
            "display.font.h": "Mengubah ukuran teks di halaman Pengaturan.",
            "display.font.small": "Kecil",
            "display.font.medium": "Sedang",
            "display.font.large": "Besar",
            "display.lang.t": "Bahasa",
            "display.lang.h": "Mengubah bahasa halaman Pengaturan dan disimpan di perangkat ini.",
            "display.preview.t": "Pratinjau",
            "display.preview.text": "Beginilah tampilan teks Anda dengan pengaturan saat ini. Ukuran huruf berlaku di halaman Pengaturan.",
            "display.reset": "Kembalikan ke bawaan",
            "display.toast.reset": "Dikembalikan ke bawaan"
        },
        en: {
            "display.title": "Display and language",
            "display.desc": "Theme, font size, and language",
            "display.intro": "Customize how the app looks and which language it uses. Changes apply immediately.",
            "display.theme.t": "Theme",
            "display.theme.h": "Dark mode applies to every page that loads apply-display.js.",
            "display.theme.light": "Light",
            "display.theme.dark": "Dark",
            "display.font.t": "Font size",
            "display.font.h": "Changes the text size on the Settings page.",
            "display.font.small": "Small",
            "display.font.medium": "Medium",
            "display.font.large": "Large",
            "display.lang.t": "Language",
            "display.lang.h": "Changes the language of the Settings page and is saved on this device.",
            "display.preview.t": "Preview",
            "display.preview.text": "This is how your text looks with the current settings. Font size applies to the Settings page.",
            "display.reset": "Reset to default",
            "display.toast.reset": "Reset to default"
        },
        es: {
            "display.title": "Pantalla e idioma",
            "display.desc": "Tema, tamaño de letra e idioma",
            "display.intro": "Personaliza el aspecto y el idioma. Los cambios se aplican al instante.",
            "display.theme.t": "Tema",
            "display.theme.h": "El modo oscuro se aplica a todas las páginas que cargan apply-display.js.",
            "display.theme.light": "Claro",
            "display.theme.dark": "Oscuro",
            "display.font.t": "Tamaño de letra",
            "display.font.h": "Cambia el tamaño del texto en la página de configuración.",
            "display.font.small": "Pequeño",
            "display.font.medium": "Mediano",
            "display.font.large": "Grande",
            "display.lang.t": "Idioma",
            "display.lang.h": "Cambia el idioma de la página de configuración y se guarda en este dispositivo.",
            "display.preview.t": "Vista previa",
            "display.preview.text": "Así se ve tu texto con la configuración actual. El tamaño de letra se aplica a la página de configuración.",
            "display.reset": "Restablecer valores",
            "display.toast.reset": "Valores restablecidos"
        },
        ja: {
            "display.title": "表示と言語",
            "display.desc": "テーマ、文字サイズ、言語",
            "display.intro": "表示と言語をカスタマイズします。変更はすぐに反映されます。",
            "display.theme.t": "テーマ",
            "display.theme.h": "ダークモードは apply-display.js を読み込むすべてのページに適用されます。",
            "display.theme.light": "ライト",
            "display.theme.dark": "ダーク",
            "display.font.t": "文字サイズ",
            "display.font.h": "設定ページの文字サイズを変更します。",
            "display.font.small": "小",
            "display.font.medium": "中",
            "display.font.large": "大",
            "display.lang.t": "言語",
            "display.lang.h": "設定ページの言語を変更し、このデバイスに保存します。",
            "display.preview.t": "プレビュー",
            "display.preview.text": "現在の設定でのテキストの見え方です。文字サイズは設定ページに適用されます。",
            "display.reset": "初期設定に戻す",
            "display.toast.reset": "初期設定に戻しました"
        },
        ko: {
            "display.title": "화면 및 언어",
            "display.desc": "테마, 글자 크기, 언어",
            "display.intro": "화면과 언어를 맞춤 설정합니다. 변경 사항은 즉시 적용됩니다.",
            "display.theme.t": "테마",
            "display.theme.h": "다크 모드는 apply-display.js를 불러오는 모든 페이지에 적용됩니다.",
            "display.theme.light": "라이트",
            "display.theme.dark": "다크",
            "display.font.t": "글자 크기",
            "display.font.h": "설정 페이지의 글자 크기를 변경합니다.",
            "display.font.small": "작게",
            "display.font.medium": "보통",
            "display.font.large": "크게",
            "display.lang.t": "언어",
            "display.lang.h": "설정 페이지의 언어를 변경하며 이 기기에 저장됩니다.",
            "display.preview.t": "미리보기",
            "display.preview.text": "현재 설정에서 텍스트가 이렇게 보입니다. 글자 크기는 설정 페이지에 적용됩니다.",
            "display.reset": "기본값으로 재설정",
            "display.toast.reset": "기본값으로 재설정했습니다"
        }
    };

    function defaults() {
        return Object.assign({ theme: "light", fontSize: "medium", language: "id" }, window.DISPLAY_DEFAULTS || {});
    }

    function render(el) {
        var S = SettingsApp;
        var t = S.t;
        var data = Object.assign(defaults(), S.store.get(KEY, {}));

        function groups() {
            return [
                {
                    key: "theme", title: t(P + "theme.t"), hint: t(P + "theme.h"),
                    options: [["light", t(P + "theme.light")], ["dark", t(P + "theme.dark")]]
                },
                {
                    key: "fontSize", title: t(P + "font.t"), hint: t(P + "font.h"),
                    options: [["small", t(P + "font.small")], ["medium", t(P + "font.medium")], ["large", t(P + "font.large")]]
                },
                {
                    key: "language", title: t(P + "lang.t"), hint: t(P + "lang.h"),
                    options: S.languages.map(function (l) {
                        return [l.code, l.name];
                    })
                }
            ];
        }

        function draw() {
            var html = '<p class="s-intro">' + S.esc(t(P + "intro")) + "</p>";

            groups().forEach(function (group) {
                html += '<div class="s-card"><h2 class="s-card__title">' + S.esc(group.title) + "</h2>" +
                    '<p class="s-card__hint">' + S.esc(group.hint) + "</p>";
                group.options.forEach(function (opt) {
                    html += '<label class="s-choice">' +
                        '<input type="radio" name="dsp-' + group.key + '" data-key="' + group.key + '" value="' + opt[0] + '"' + (data[group.key] === opt[0] ? " checked" : "") + ">" +
                        "<span>" + S.esc(opt[1]) + "</span>" +
                        "</label>";
                });
                html += "</div>";
            });
            html += '<div class="s-card dsp-preview">' +
                '<h2 class="s-card__title">' + S.esc(t(P + "preview.t")) + "</h2>" +
                '<p class="dsp-preview__text">' + S.esc(t(P + "preview.text")) + "</p>" +
                "</div>";
            html += '<div class="s-actions"><button class="s-btn s-btn--ghost" type="button" id="dsp-reset">' + S.esc(t(P + "reset")) + "</button></div>";
            el.innerHTML = html;
        }

        function applyAndSave() {
            S.store.set(KEY, data);
            if (typeof window.applyDisplaySettings === "function") {
                window.applyDisplaySettings(data);
            }
        }

        el.addEventListener("change", function (event) {
            var key = event.target.dataset.key;
            if (!key) return;
            data[key] = event.target.value;
            applyAndSave();
            if (key === "language") draw();
            S.toast(t("common.saved"));
        });

        el.addEventListener("click", function (event) {
            if (!event.target.closest("#dsp-reset")) return;
            data = defaults();
            applyAndSave();
            draw();
            S.toast(t(P + "toast.reset"));
        });

        draw();
    }

    SettingsApp.register({
        id: "display",
        title: "Tampilan dan bahasa",
        description: "Tema, ukuran huruf, dan bahasa",
        order: 4,
        icon: ICON,
        strings: STRINGS,
        render: render
    });
})();