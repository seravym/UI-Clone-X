(function () {
  var KEY = "notifications";
  var P = "notif.";

  var ICON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>';

  var DEFAULTS = {
    likes: true,
    replies: true,
    follows: true,
    mentions: true,
    messages: true,
    email: false,
    push: true,
  };

  var STRINGS = {
    id: {
      "notif.title": "Notifikasi",
      "notif.desc": "Atur notifikasi apa saja yang ingin kamu terima",
      "notif.intro":
        "Pilih notifikasi yang ingin kamu terima. Perubahan tersimpan otomatis.",
      "notif.group.activity": "Aktivitas",
      "notif.group.channels": "Saluran",
      "notif.likes.t": "Suka",
      "notif.likes.d": "Saat seseorang menyukai postinganmu.",
      "notif.replies.t": "Balasan",
      "notif.replies.d": "Saat seseorang membalas postinganmu.",
      "notif.follows.t": "Pengikut baru",
      "notif.follows.d": "Saat seseorang mulai mengikutimu.",
      "notif.mentions.t": "Sebutan",
      "notif.mentions.d": "Saat seseorang menyebut namamu.",
      "notif.messages.t": "Pesan",
      "notif.messages.d": "Saat kamu menerima pesan langsung.",
      "notif.email.t": "Email",
      "notif.email.d": "Terima ringkasan lewat email.",
      "notif.push.t": "Push",
      "notif.push.d": "Notifikasi push di browser.",
    },
    en: {
      "notif.title": "Notifications",
      "notif.desc": "Choose which notifications you want to receive",
      "notif.intro":
        "Pick what you want to be notified about. Changes save automatically.",
      "notif.group.activity": "Activity",
      "notif.group.channels": "Channels",
      "notif.likes.t": "Likes",
      "notif.likes.d": "When someone likes your post.",
      "notif.replies.t": "Replies",
      "notif.replies.d": "When someone replies to your post.",
      "notif.follows.t": "New followers",
      "notif.follows.d": "When someone follows you.",
      "notif.mentions.t": "Mentions",
      "notif.mentions.d": "When someone mentions you.",
      "notif.messages.t": "Messages",
      "notif.messages.d": "When you receive a direct message.",
      "notif.email.t": "Email",
      "notif.email.d": "Receive email summaries.",
      "notif.push.t": "Push",
      "notif.push.d": "Browser push notifications.",
    },
  };

  var ACTIVITY = ["likes", "replies", "follows", "mentions", "messages"];
  var CHANNELS = ["email", "push"];

  function render(el) {
    var S = SettingsApp;
    var t = S.t;
    var data = Object.assign({}, DEFAULTS, S.store.get(KEY, {}));

    function switchRow(key) {
      var title = t(P + key + ".t");
      return (
        '<div class="s-row">' +
        '<div class="s-row__text">' +
        '<span class="s-row__title">' +
        S.esc(title) +
        "</span>" +
        '<span class="s-row__desc">' +
        S.esc(t(P + key + ".d")) +
        "</span>" +
        "</div>" +
        '<label class="s-switch">' +
        '<input type="checkbox" data-switch="' +
        key +
        '"' +
        (data[key] ? " checked" : "") +
        ' aria-label="' +
        S.esc(title) +
        '">' +
        '<span class="s-slider"></span>' +
        "</label>" +
        "</div>"
      );
    }

    var html = '<p class="s-intro">' + S.esc(t(P + "intro")) + "</p>";
    html +=
      '<div class="s-card"><h2 class="s-card__title">' +
      S.esc(t(P + "group.activity")) +
      "</h2>";
    ACTIVITY.forEach(function (k) {
      html += switchRow(k);
    });
    html += "</div>";
    html +=
      '<div class="s-card"><h2 class="s-card__title">' +
      S.esc(t(P + "group.channels")) +
      "</h2>";
    CHANNELS.forEach(function (k) {
      html += switchRow(k);
    });
    html += "</div>";

    el.innerHTML = html;

    el.addEventListener("change", function (e) {
      var key = e.target.dataset.switch;
      if (!key) return;
      data[key] = e.target.checked;
      S.store.set(KEY, data);
      S.toast(t("common.saved"));
    });
  }

  SettingsApp.register({
    id: "notifications",
    title: "Notifikasi",
    description: "Atur notifikasi apa saja yang ingin kamu terima",
    order: 5,
    icon: ICON,
    strings: STRINGS,
    render: render,
  });
})();
