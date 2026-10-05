 const KEY = "feedbackList";
    const nameEl = document.getElementById("fb-name");
    const emailEl = document.getElementById("fb-email");
    const msgEl = document.getElementById("fb-msg");
    const countEl = document.getElementById("fb-count");
    const stars = document.querySelectorAll("#fb-stars button");
    const successEl = document.getElementById("fb-success");
    const listEl = document.getElementById("fb-list");
    const emptyEl = document.getElementById("fb-empty");
    const clearBtn = document.getElementById("fb-clear");
    let rating = 0;

    nameEl.value = localStorage.getItem("profileName") || "";

    msgEl.addEventListener("input", function () {
        countEl.textContent = msgEl.value.length + "/200";
    });

    function paintStars(n) {
        stars.forEach(function (s) {
            s.classList.toggle("on", Number(s.dataset.v) <= n);
        });
    }
    stars.forEach(function (s) {
        s.addEventListener("click", function () {
            rating = Number(s.dataset.v);
            paintStars(rating);
        });
        s.addEventListener("mouseenter", function () { paintStars(Number(s.dataset.v)); });
        s.addEventListener("mouseleave", function () { paintStars(rating); });
    });
    function setError(id, text) {
        document.getElementById(id).textContent = text;
        return text === "";
    }

    function validate() {
        let ok = true;
        ok = setError("err-name", nameEl.value.trim() ? "" : "Nama wajib diisi.") && ok;
        ok = setError("err-email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim()) ? "" : "Format email belum benar.") && ok;
        ok = setError("err-rating", rating ? "" : "Pilih jumlah bintang.") && ok;
        ok = setError("err-msg", msgEl.value.trim().length >= 10 ? "" : "Pesan minimal 10 karakter.") && ok;
        return ok;
    }

    function getList() {
        try { return JSON.parse(localStorage.getItem(KEY)) || []; }
        catch (e) { return []; }
    }

    function renderList() {
        const data = getList();
        listEl.innerHTML = "";
        data.slice().reverse().forEach(function (f) {
            const card = document.createElement("div");
            card.className = "fb-card";

            const top = document.createElement("div");
            top.className = "fb-card-top";
            top.textContent = f.name + "  " + "★".repeat(f.rating) + "☆".repeat(5 - f.rating);

            const text = document.createElement("p");
            text.textContent = f.msg;

            const time = document.createElement("small");
            time.textContent = f.time;

            card.append(top, text, time);
            listEl.appendChild(card);
        });
        emptyEl.hidden = data.length > 0;
        clearBtn.hidden = data.length === 0;
    }

    document.getElementById("fb-send").addEventListener("click", function () {
        if (!validate()) return;

        const data = getList();
        data.push({
            name: nameEl.value.trim(),
            email: emailEl.value.trim(),
            rating: rating,
            msg: msgEl.value.trim(),
            time: new Date().toLocaleString("id-ID")
        });
        localStorage.setItem(KEY, JSON.stringify(data));

        emailEl.value = "";
        msgEl.value = "";
        countEl.textContent = "0/200";
        rating = 0;
        paintStars(0);

        successEl.hidden = false;
        setTimeout(function () { successEl.hidden = true; }, 3000);
        renderList();
    });

    clearBtn.addEventListener("click", function () {
        if (confirm("Hapus semua pesan?")) {
            localStorage.removeItem(KEY);
            renderList();
        }
    });

    renderList();

    