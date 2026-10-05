(function () {
    var shareBtn = document.getElementById("share-btn");
    var modal = document.getElementById("share-modal");
    var frame = document.getElementById("share-frame");

    if (shareBtn && modal && frame) {
        shareBtn.addEventListener("click", function () {
            frame.src = "share.html";
            modal.hidden = false;
        });

        var tutup = function () { modal.hidden = true; };

        modal.addEventListener("click", function (e) {
            if (e.target === modal) tutup();
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") tutup();
        });

        window.addEventListener("message", function (e) {
            if (e.data === "close-share") tutup();
        });
    }

    var closeBtn = document.getElementById("sh-close");

    if (closeBtn) {
        var username = localStorage.getItem("profileUsername") || "username";
        var url = new URL("profile.html", location.href).href;
        var text = "Lihat profil @" + username;

        var tutupPopup = function () {
            if (window.parent !== window) window.parent.postMessage("close-share", "*");
        };

        closeBtn.addEventListener("click", tutupPopup);

        document.querySelectorAll("[data-share]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var type = btn.dataset.share;

                if (type === "copy") {
                    navigator.clipboard.writeText(url)
                        .then(function () { alert("Tautan disalin!"); })
                        .catch(function () { prompt("Salin tautan ini:", url); });
                } else if (type === "chat") {
                    localStorage.setItem("shareToChat", JSON.stringify({ text: text, url: url }));
                    alert("Profil siap dikirim ke Chat.");
                } else if (type === "whatsapp") {
                    window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank");
                } else if (type === "telegram") {
                    window.open("https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text), "_blank");
                } else if (type === "native") {
                    if (navigator.share) navigator.share({ title: text, text: text, url: url }).catch(function () {});
                    else alert("Browser ini belum mendukung fitur ini.");
                }

                tutupPopup();
            });
        });
    }

})();