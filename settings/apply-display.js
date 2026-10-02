/*
 * apply-display.js
 * Menerapkan pengaturan tampilan (tema, ukuran huruf, bahasa) dari localStorage.
 * Dimuat di <head> halaman Settings. Halaman lain boleh memuatnya juga:
 *   <script src="../settings/apply-display.js"></script>
 */
(function () {
    var KEY = "settings.display";
    var DEFAULTS = { theme: "light", fontSize: "medium", language: "id" };

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
    }

    window.DISPLAY_DEFAULTS = DEFAULTS;
    window.applyDisplaySettings = apply;
    apply();
})();