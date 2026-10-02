/*
 * apply-display.js
 * Menerapkan pengaturan tampilan (tema, ukuran huruf, bahasa) dari localStorage.
 *
 * Pasang di <head> SETIAP halaman supaya mode gelap ikut berlaku di mana-mana:
 *   <script src="../settings/apply-display.js"></script>
 *
 * Mode gelap memakai teknik filter pada <html>, jadi tidak perlu mengubah CSS
 * halaman lain. Gambar/video dibalik lagi supaya warnanya tetap normal.
 */
(function () {
    var KEY = "settings.display";
    var DEFAULTS = { theme: "light", fontSize: "medium", language: "id" };

    var DARK_CSS =
        'html[data-theme="dark"] {' +
        "  background: #ffffff;" +
        "  filter: invert(0.92) hue-rotate(180deg);" +
        "}" +
        'html[data-theme="dark"] img,' +
        'html[data-theme="dark"] video,' +
        'html[data-theme="dark"] picture,' +
        'html[data-theme="dark"] canvas,' +
        'html[data-theme="dark"] iframe,' +
        'html[data-theme="dark"] [style*="background-image"] {' +
        "  filter: invert(1) hue-rotate(180deg);" +
        "}";

    function injectStyle() {
        if (document.getElementById("dark-theme-style")) return;
        var style = document.createElement("style");
        style.id = "dark-theme-style";
        style.textContent = DARK_CSS;
        (document.head || document.documentElement).appendChild(style);
    }

    function read() {
        var saved = {};
        try {
            saved = JSON.parse(localStorage.getItem(KEY)) || {};
        } catch (e) {}
        return Object.assign({}, DEFAULTS, saved);
    }

    function apply(prefs) {
        var p = prefs || read();
        var root = document.documentElement;
        root.setAttribute("data-theme", p.theme);
        root.setAttribute("data-font", p.fontSize);
        root.setAttribute("lang", p.language);
        // Beri tahu kode lain (mis. kerangka Settings) bahwa tampilan/bahasa berubah
        window.dispatchEvent(new CustomEvent("displaychange", { detail: p }));
    }

    // Ikut berubah jika tema diganti dari tab lain
    window.addEventListener("storage", function (event) {
        if (event.key === KEY) apply();
    });

    window.DISPLAY_DEFAULTS = DEFAULTS;
    window.applyDisplaySettings = apply;
    injectStyle();
    apply();
})();