(function () {
    var KEY = "audience";

    var DEFAULTS = {
        protect: false,
        photoTag: true,
        suggest: true,
        reply: "everyone",
        tag: "everyone",
        dm: "following"
    };

    var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0"/><circle cx="17.5" cy="9" r="2.5"/><path d="M17 14.5a5.5 5.5 0 0 1 5 5.5"/></svg>';

    var STRINGS = {
        id: {
            "audience.title": "Audiens dan penandaan",
            "audience.desc": "Siapa yang bisa melihat, membalas, dan menandai Anda",
            "audience.intro": "Atur siapa yang bisa berinteraksi dengan Anda. Perubahan tersimpan otomatis.",
            "audience.privacy": "Privasi",
            "audience.protect.t": "Lindungi postingan saya",
            "audience.protect.d": "Hanya pengikut yang Anda setujui yang bisa melihat postingan Anda.",
            "audience.photoTag.t": "Izinkan penandaan foto",
            "audience.photoTag.d": "Orang lain bisa menandai Anda di foto yang mereka unggah.",
            "audience.suggest.t": "Tampilkan akun saya di rekomendasi",
            "audience.suggest.d": "Akun Anda bisa muncul di bagian \"Akun untuk diikuti\".",
            "audience.reply.t": "Siapa yang bisa membalas",
            "audience.reply.h": "Berlaku untuk postingan baru yang Anda buat.",
            "audience.tag.t": "Siapa yang bisa menandai Anda",
            "audience.tag.h": "Mengatur siapa yang boleh menyebut atau menandai Anda.",
            "audience.dm.t": "Siapa yang bisa mengirim pesan",
            "audience.dm.h": "Mengatur siapa yang boleh memulai percakapan dengan Anda.",
            "audience.opt.everyone": "Semua orang",
            "audience.opt.following": "Orang yang Anda ikuti",
            "audience.opt.mentioned": "Hanya akun yang Anda sebut",
            "audience.opt.none": "Tidak ada"
        },
        en: {
            "audience.title": "Audience and tagging",
            "audience.desc": "Who can see, reply to, and tag you",
            "audience.intro": "Control who can interact with you. Changes are saved automatically.",
            "audience.privacy": "Privacy",
            "audience.protect.t": "Protect my posts",
            "audience.protect.d": "Only followers you approve can see your posts.",
            "audience.photoTag.t": "Allow photo tagging",
            "audience.photoTag.d": "Others can tag you in photos they upload.",
            "audience.suggest.t": "Show my account in suggestions",
            "audience.suggest.d": "Your account may appear in \"Who to follow\".",
            "audience.reply.t": "Who can reply",
            "audience.reply.h": "Applies to new posts you create.",
            "audience.tag.t": "Who can tag you",
            "audience.tag.h": "Controls who can mention or tag you.",
            "audience.dm.t": "Who can message you",
            "audience.dm.h": "Controls who can start a conversation with you.",
            "audience.opt.everyone": "Everyone",
            "audience.opt.following": "People you follow",
            "audience.opt.mentioned": "Only accounts you mention",
            "audience.opt.none": "No one"
        },
        es: {
            "audience.title": "Audiencia y etiquetado",
            "audience.desc": "Quién puede verte, responderte y etiquetarte",
            "audience.intro": "Controla quién puede interactuar contigo. Los cambios se guardan automáticamente.",
            "audience.privacy": "Privacidad",
            "audience.protect.t": "Proteger mis publicaciones",
            "audience.protect.d": "Solo los seguidores que apruebes pueden ver tus publicaciones.",
            "audience.photoTag.t": "Permitir etiquetado en fotos",
            "audience.photoTag.d": "Otras personas pueden etiquetarte en las fotos que suban.",
            "audience.suggest.t": "Mostrar mi cuenta en sugerencias",
            "audience.suggest.d": "Tu cuenta puede aparecer en \"A quién seguir\".",
            "audience.reply.t": "Quién puede responder",
            "audience.reply.h": "Se aplica a las publicaciones nuevas que crees.",
            "audience.tag.t": "Quién puede etiquetarte",
            "audience.tag.h": "Controla quién puede mencionarte o etiquetarte.",
            "audience.dm.t": "Quién puede enviarte mensajes",
            "audience.dm.h": "Controla quién puede iniciar una conversación contigo.",
            "audience.opt.everyone": "Todos",
            "audience.opt.following": "Personas a las que sigues",
            "audience.opt.mentioned": "Solo las cuentas que menciones",
            "audience.opt.none": "Nadie"
        },
        ja: {
            "audience.title": "オーディエンスとタグ付け",
            "audience.desc": "あなたを見たり、返信したり、タグ付けできる人",
            "audience.intro": "あなたと交流できる人を設定します。変更は自動的に保存されます。",
            "audience.privacy": "プライバシー",
            "audience.protect.t": "投稿を非公開にする",
            "audience.protect.d": "承認したフォロワーだけが投稿を見られます。",
            "audience.photoTag.t": "写真へのタグ付けを許可",
            "audience.photoTag.d": "他のユーザーがアップロードした写真であなたをタグ付けできます。",
            "audience.suggest.t": "おすすめにアカウントを表示",
            "audience.suggest.d": "あなたのアカウントが「おすすめユーザー」に表示されることがあります。",
            "audience.reply.t": "返信できる人",
            "audience.reply.h": "新しく作成する投稿に適用されます。",
            "audience.tag.t": "タグ付けできる人",
            "audience.tag.h": "あなたをメンションまたはタグ付けできる人を設定します。",
            "audience.dm.t": "メッセージを送れる人",
            "audience.dm.h": "あなたと会話を始められる人を設定します。",
            "audience.opt.everyone": "全員",
            "audience.opt.following": "フォローしている人",
            "audience.opt.mentioned": "あなたがメンションしたアカウントのみ",
            "audience.opt.none": "なし"
        },
        ko: {
            "audience.title": "공개 범위 및 태그",
            "audience.desc": "나를 보고, 답글을 달고, 태그할 수 있는 사람",
            "audience.intro": "나와 상호작용할 수 있는 사람을 설정합니다. 변경 사항은 자동으로 저장됩니다.",
            "audience.privacy": "개인정보 보호",
            "audience.protect.t": "내 게시물 보호",
            "audience.protect.d": "내가 승인한 팔로워만 내 게시물을 볼 수 있습니다.",
            "audience.photoTag.t": "사진 태그 허용",
            "audience.photoTag.d": "다른 사람이 올린 사진에 나를 태그할 수 있습니다.",
            "audience.suggest.t": "추천에 내 계정 표시",
            "audience.suggest.d": "내 계정이 \"팔로우 추천\"에 표시될 수 있습니다.",
            "audience.reply.t": "답글을 달 수 있는 사람",
            "audience.reply.h": "앞으로 작성하는 새 게시물에 적용됩니다.",
            "audience.tag.t": "나를 태그할 수 있는 사람",
            "audience.tag.h": "나를 언급하거나 태그할 수 있는 사람을 설정합니다.",
            "audience.dm.t": "메시지를 보낼 수 있는 사람",
            "audience.dm.h": "나와 대화를 시작할 수 있는 사람을 설정합니다.",
            "audience.opt.everyone": "모든 사람",
            "audience.opt.following": "내가 팔로우하는 사람",
            "audience.opt.mentioned": "내가 언급한 계정만",
            "audience.opt.none": "없음"
        }
    };

    var SWITCHES = ["protect", "photoTag", "suggest"];

    var CHOICES = [
        { key: "reply", options: ["everyone", "following", "mentioned"] },
        { key: "tag", options: ["everyone", "following", "none"] },
        { key: "dm", options: ["everyone", "following", "none"] }
    ];

    function render(el) {
        var S = SettingsApp;
        var t = S.t;
        var data = Object.assign({}, DEFAULTS, S.store.get(KEY, {}));
        localStorage.setItem("profileProtected", data.protect);

        var html = '<p class="s-intro">' + S.esc(t("audience.intro")) + "</p>";

        html += '<div class="s-card"><h2 class="s-card__title">' + S.esc(t("audience.privacy")) + "</h2>";
        SWITCHES.forEach(function (key) {
            var title = t("audience." + key + ".t");
            html += '<div class="s-row">' +
                '<div class="s-row__text">' +
                '<span class="s-row__title">' + S.esc(title) + "</span>" +
                '<span class="s-row__desc">' + S.esc(t("audience." + key + ".d")) + "</span>" +
                "</div>" +
                '<label class="s-switch">' +
                '<input type="checkbox" data-switch="' + key + '"' + (data[key] ? " checked" : "") + ' aria-label="' + S.esc(title) + '">' +
                '<span class="s-slider"></span>' +
                "</label>" +
                "</div>";
        });
        html += "</div>";

        CHOICES.forEach(function (group) {
            html += '<div class="s-card"><h2 class="s-card__title">' + S.esc(t("audience." + group.key + ".t")) + "</h2>" +
                '<p class="s-card__hint">' + S.esc(t("audience." + group.key + ".h")) + "</p>";
            group.options.forEach(function (value) {
                html += '<label class="s-choice">' +
                    '<input type="radio" name="aud-' + group.key + '" data-choice="' + group.key + '" value="' + value + '"' + (data[group.key] === value ? " checked" : "") + ">" +
                    "<span>" + S.esc(t("audience.opt." + value)) + "</span>" +
                    "</label>";
            });
            html += "</div>";
        });

        el.innerHTML = html;

        el.addEventListener("change", function (event) {
            var target = event.target;
            if (target.dataset.switch) {
                data[target.dataset.switch] = target.checked;
                    if (target.dataset.switch === "protect") {
                        localStorage.setItem("profileProtected", target.checked);
                    }
                        } else if (target.dataset.choice) {
                    data[target.dataset.choice] = target.value;
                } else {
                    return;
                }
            S.store.set(KEY, data);
            S.toast(t("common.saved"));
        });
    }

    SettingsApp.register({
        id: "audience",
        title: "Audiens dan penandaan",
        description: "Siapa yang bisa melihat, membalas, dan menandai Anda",
        order: 2,
        icon: ICON,
        strings: STRINGS,
        render: render
    });
})();

