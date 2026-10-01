fetch("sidebar.html")
    .then(function (response) {
        if (!response.ok) {
            throw new Error(response.status + " " + response.url);
        }
        return response.text();
    })
    .then(function (data) {
        document.getElementById("sidebar").innerHTML = data;
    })
    .catch(function (error) {
        console.error("Sidebar gagal dimuat:", error);
    });

var STORE_MINE = "xclone.articles.mine";
var STORE_PREFS = "xclone.articles.prefs";
var DAY = 24 * 60 * 60 * 1000;
var MIN_BODY = 80;

var CATEGORY_LABEL = {
    Teknologi: "Technology",
    Desain: "Design",
    Data: "Data",
    Kuliner: "Food",
    Perjalanan: "Travel"
};

function catLabel(c) {
    return CATEGORY_LABEL[c] || c || "General";
}

var AUTHORS = {
    ranipratama: { name: "Rani Pratama", hue: 330 },
    dimasarya: { name: "Dimas Arya", hue: 200 },
    larasw: { name: "Laras Wulandari", hue: 45 },
    salsanirmala: { name: "Salsa Nirmala", hue: 160 },
    kopikiri: { name: "Kopi Kiri", hue: 25 },
    jsjakarta: { name: "Komunitas JS Jakarta", hue: 55 },
    anda: { name: "Anda", hue: 300 }
};

var SEED = [
    {
        id: "a1",
        title: "Mengapa Kolom Pencarian Sering Gagal Dipahami Pengguna",
        cat: "Desain",
        author: "ranipratama",
        daysAgo: 1,
        likes: 240,
        comments: 18,
        body: [
            "Kolom pencarian tampak sederhana: sebuah kotak, sebuah ikon kaca pembesar, selesai. Namun dalam pengujian dengan pengguna, kotak kecil ini sering menjadi sumber frustrasi.",
            "Masalah pertama adalah label. Placeholder seperti \"Cari\" terlalu umum, sehingga pengguna tidak tahu apakah mereka mencari orang, topik, atau seluruh isi situs. Placeholder yang menyebut isi yang bisa dicari, misalnya \"Cari artikel atau penulis\", mengurangi keraguan itu.",
            "Masalah kedua adalah umpan balik. Hasil kosong tanpa penjelasan membuat orang mengira aplikasinya rusak. Pesan yang menyarankan kata kunci lain, ditambah riwayat pencarian terbaru, membantu pengguna pulih dari salah ketik.",
            "Terakhir, jangan lupakan keyboard. Enter harus mengirim pencarian, Escape harus menghapusnya, dan fokus harus selalu terlihat jelas."
        ]
    },
    {
        id: "a2",
        title: "Memindahkan 40 Juta Baris Data Tanpa Downtime: Catatan Lapangan",
        cat: "Teknologi",
        author: "dimasarya",
        daysAgo: 3,
        likes: 530,
        comments: 41,
        body: [
            "Memindahkan 40 juta baris ke database baru terdengar menakutkan, terutama kalau aplikasinya tidak boleh berhenti satu menit pun. Kuncinya bukan kecepatan, melainkan urutan langkah yang bisa dibatalkan di setiap tahap.",
            "Kami mulai dengan menulis ke dua database sekaligus. Data lama tetap menjadi sumber kebenaran, sementara data baru diisi di belakang layar. Setelah itu, skrip verifikasi membandingkan jumlah baris dan checksum per tabel setiap malam sampai selisihnya nol.",
            "Saat hari peralihan tiba, kami hanya mengganti satu konfigurasi untuk mulai membaca dari database baru. Database lama kami biarkan hidup selama dua minggu sebagai jalur mundur. Hasilnya membosankan, dan itulah tujuannya."
        ]
    },
    {
        id: "a3",
        title: "Grafik Batang yang Jujur: Lima Aturan untuk Analis Pemula",
        cat: "Data",
        author: "larasw",
        daysAgo: 4,
        likes: 380,
        comments: 27,
        body: [
            "Grafik yang baik membuat perbandingan terasa mudah. Grafik yang buruk membuat pembaca bekerja keras untuk memahami maksudnya. Berikut lima aturan yang saya pegang sebagai analis.",
            "Pertama, mulai sumbu vertikal grafik batang dari nol, karena panjang batang mewakili nilai. Kedua, urutkan batang dari terbesar ke terkecil kecuali kategorinya punya urutan alami seperti bulan. Ketiga, beri judul yang menyatakan temuan, bukan sekadar nama data.",
            "Keempat, batasi warna: satu warna untuk semua batang, satu warna lain untuk yang ingin ditonjolkan. Kelima, hapus garis dan label yang tidak membantu. Kalau setelah dihapus grafiknya tetap terbaca, hapusan itu memang benar."
        ]
    },
    {
        id: "a4",
        title: "Tiga Hari di Labuan Bajo: Rute, Biaya, dan Hal yang Saya Sesali",
        cat: "Perjalanan",
        author: "salsanirmala",
        daysAgo: 6,
        likes: 710,
        comments: 56,
        body: [
            "Tiga hari di Labuan Bajo terasa singkat, tetapi cukup untuk merasakan intinya: pelabuhan yang ramai sejak pagi, laut yang jernih, dan senja dari atas bukit yang layak ditunggu.",
            "Hari pertama saya habiskan di sekitar pelabuhan dan kota. Hari kedua untuk berlayar dan snorkeling. Hari ketiga untuk mengejar matahari terbenam. Saran saya: pesan perahu jauh-jauh hari dan bandingkan beberapa penyedia sebelum memutuskan.",
            "Yang saya sesali: membawa terlalu banyak barang dan lupa tabir surya. Tas kecil, pakaian cepat kering, dan baterai cadangan kamera jauh lebih berguna daripada lensa tambahan yang akhirnya tak terpakai."
        ]
    },
    {
        id: "a5",
        title: "Dari V60 ke Espresso: Cara Memilih Biji Kopi untuk Kedai Kecil",
        cat: "Kuliner",
        author: "kopikiri",
        daysAgo: 8,
        likes: 160,
        comments: 12,
        body: [
            "Kedai kecil tidak punya ruang untuk banyak jenis biji. Setiap pilihan harus punya alasan, dan setiap karung yang tidak laku adalah modal yang menganggur.",
            "Kami mulai dari pertanyaan sederhana: siapa pelanggan kami dan apa yang mereka pesan paling sering? Ternyata sebagian besar memesan kopi susu, jadi kami butuh biji yang tetap terasa di tengah susu, dengan badan tebal dan sisa rasa cokelat.",
            "Untuk seduh manual seperti V60, kami menyisakan satu biji berkarakter cerah dan menggantinya tiap bulan. Dengan begitu pelanggan setia punya alasan mencoba hal baru, sementara stok tetap terkendali."
        ]
    },
    {
        id: "a6",
        title: "Web Components Tanpa Framework: Kapan Masuk Akal?",
        cat: "Teknologi",
        author: "jsjakarta",
        daysAgo: 10,
        likes: 120,
        comments: 9,
        body: [
            "Web Components kini didukung hampir semua peramban modern. Pertanyaannya bukan lagi \"bisakah\", melainkan \"kapan masuk akal\".",
            "Mereka cocok untuk elemen antarmuka yang dipakai lintas proyek atau lintas framework, seperti tombol, kartu, dan dialog. Enkapsulasi lewat Shadow DOM menjaga gaya tetap rapi tanpa perlu konvensi penamaan yang rumit.",
            "Namun untuk aplikasi besar dengan banyak state dan routing, framework tetap memberi struktur dan ekosistem yang sulit ditandingi. Mulailah dari komponen kecil, ukur hasilnya, lalu putuskan."
        ]
    }
];

SEED.forEach(function (a) {
    a.created = Date.now() - a.daysAgo * DAY;
});

function loadJSON(key, fallback) {
    try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
        return fallback;
    }
}

function saveJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
    }
}

var mine = loadJSON(STORE_MINE, []);
if (!Array.isArray(mine)) mine = [];
mine = mine.filter(function (a) {
    return a && typeof a.id === "string" && typeof a.title === "string" &&
        Array.isArray(a.body) && typeof a.created === "number";
});
mine.forEach(function (a) {
    a.author = "anda";
    a.likes = a.likes || 0;
    a.comments = a.comments || 0;
    a.body = a.body.map(String);
});

var prefs = loadJSON(STORE_PREFS, {});
if (!prefs || typeof prefs !== "object") prefs = {};
if (!Array.isArray(prefs.liked)) prefs.liked = [];
if (!Array.isArray(prefs.saved)) prefs.saved = [];

var view = { cat: "all", query: "" };

function $(id) {
    return document.getElementById(id);
}

function esc(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function has(list, id) {
    return list.indexOf(id) !== -1;
}

function toggleIn(list, id) {
    var i = list.indexOf(id);
    if (i === -1) list.push(id);
    else list.splice(i, 1);
}

function allArticles() {
    return mine.concat(SEED).sort(function (a, b) {
        return b.created - a.created;
    });
}

function getArticle(id) {
    var list = allArticles();
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) return list[i];
    }
    return null;
}

function isMine(id) {
    return mine.some(function (a) {
        return a.id === id;
    });
}

function authorOf(a) {
    return AUTHORS[a.author] || AUTHORS.anda;
}

function handleOf(a) {
    return AUTHORS[a.author] ? a.author : "anda";
}

function initials(name) {
    return name
        .split(" ")
        .slice(0, 2)
        .map(function (w) { return w.charAt(0); })
        .join("")
        .toUpperCase();
}

function hueOf(a) {
    return 330;
}

function readingMinutes(a) {
    var words = a.body.join(" ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

function formatDate(ms) {
    return new Date(ms).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function formatCount(n) {
    if (n >= 1000) {
        return (n / 1000).toFixed(1).replace(".", ",").replace(",0", "") + " rb";
    }
    return String(n);
}

function truncate(text, max) {
    if (text.length <= max) return text;
    return text.slice(0, max).replace(/\s+\S*$/, "") + "\u2026";
}

var toastTimer;
function toast(message) {
    var el = $("toast");
    el.textContent = message;
    el.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
        el.classList.remove("is-show");
    }, 2200);
}

function svg(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
}

var ICON = {
    like: svg('<path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z"/>'),
    comment: svg('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    save: svg('<path d="M6 3h12v18l-6-4-6 4z"/>'),
    share: svg('<path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>'),
    trash: svg('<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>')
};

function avatar(a) {
    var au = authorOf(a);
    return '<span class="avatar avatar--sm" style="--h:' + au.hue + '" aria-hidden="true">' +
        esc(initials(au.name)) + "</span>";
}

function authorLine(a) {
    return avatar(a) +
        '<span class="byline__name">' + esc(authorOf(a).name) + "</span>" +
        '<span class="byline__dim">@' + esc(handleOf(a)) + " &middot; " +
        formatDate(a.created) + " &middot; " + readingMinutes(a) + " mnt baca</span>";
}

function cover(a, large) {
    return '<div class="cover' + (large ? " cover--lg" : "") + '" style="--h:' + hueOf(a) + '">' +
        '<span class="cover__cat">' + esc(catLabel(a.cat)) + "</span></div>";
}

function likeButton(a) {
    var on = has(prefs.liked, a.id);
    return '<button class="act act--like' + (on ? " is-on" : "") + '" type="button" data-action="like" data-id="' + esc(a.id) + '" aria-pressed="' + on + '" aria-label="Suka">' +
        ICON.like + "<span>" + formatCount(a.likes + (on ? 1 : 0)) + "</span></button>";
}

function saveButton(a) {
    var on = has(prefs.saved, a.id);
    return '<button class="act act--save act--right' + (on ? " is-on" : "") + '" type="button" data-action="save" data-id="' + esc(a.id) + '" aria-pressed="' + on + '" aria-label="Simpan artikel">' +
        ICON.save + "</button>";
}

function commentCount(a) {
    return '<span class="act act--static" title="Komentar">' + ICON.comment + "<span>" + a.comments + "</span></span>";
}

function articleHref(id) {
    return "#/artikel/" + encodeURIComponent(id);
}

function articleCard(a) {
    return '<article class="article-card">' +
        '<a class="article-card__link" href="' + articleHref(a.id) + '">' +
        cover(a, false) +
        '<div class="byline">' + authorLine(a) + "</div>" +
        '<h2 class="article-card__title">' + esc(a.title) + "</h2>" +
        '<p class="article-card__excerpt">' + esc(truncate(a.body[0] || "", 150)) + "</p>" +
        "</a>" +
        '<div class="article-actions">' + likeButton(a) + commentCount(a) + saveButton(a) + "</div>" +
        "</article>";
}

function readerHtml(a) {
    var paragraphs = a.body
        .map(function (p) { return "<p>" + esc(p) + "</p>"; })
        .join("");

    var deleteBtn = isMine(a.id)
        ? '<button class="act act--danger" type="button" data-action="delete" data-id="' + esc(a.id) + '" aria-label="Hapus artikel">' + ICON.trash + "<span>Hapus</span></button>"
        : "";

    return '<article class="reader">' +
        cover(a, true) +
        '<div class="reader__inner">' +
        '<h2 class="reader__title">' + esc(a.title) + "</h2>" +
        '<div class="byline">' + authorLine(a) + "</div>" +
        '<div class="reader__body">' + paragraphs + "</div>" +
        '<div class="article-actions article-actions--reader">' +
        likeButton(a) + commentCount(a) +
        '<button class="act" type="button" data-action="share" aria-label="Salin tautan">' + ICON.share + "<span>Bagikan</span></button>" +
        deleteBtn + saveButton(a) +
        "</div></div></article>";
}

function sideItem(a) {
    return '<a class="widget-row" href="' + articleHref(a.id) + '">' +
        '<span class="widget-row__cat">' + esc(catLabel(a.cat)) + " &middot; " + esc(authorOf(a).name) + "</span>" +
        '<span class="widget-row__topic">' + esc(a.title) + "</span>" +
        '<span class="widget-row__count">' + readingMinutes(a) + " mnt baca</span></a>";
}

function getVisible() {
    var terms = view.query.toLowerCase().split(/\s+/).filter(Boolean);

    return allArticles().filter(function (a) {
        if (view.cat === "saved" && !has(prefs.saved, a.id)) return false;
        if (view.cat !== "all" && view.cat !== "saved" && a.cat !== view.cat) return false;

            var hay = (a.title + " " + a.body.join(" ") + " " + authorOf(a).name + " " + (a.cat || "") + " " + catLabel(a.cat)).toLowerCase();        return terms.every(function (t) {
            return hay.indexOf(t) !== -1;
        });
    });
}

function renderList() {
    var items = getVisible();
    var box = $("articleList");

    if (!items.length) {
        var title = "Tidak ada artikel";
        var text = "Coba kata kunci atau kategori lain.";
        if (view.cat === "saved" && !view.query) {
            title = "Belum ada artikel tersimpan";
            text = "Ketuk ikon penanda pada artikel untuk menyimpannya di sini.";
        }
        box.innerHTML = '<div class="empty"><h3>' + title + "</h3><p>" + text + "</p></div>";
        return;
    }

    box.innerHTML = items.map(articleCard).join("");
}

function renderSide() {
    function score(a) {
        return a.likes + (has(prefs.liked, a.id) ? 1 : 0);
    }

    var popular = allArticles()
        .sort(function (a, b) { return score(b) - score(a); })
        .slice(0, 3);
    $("sidePopular").innerHTML = popular.map(sideItem).join("");

    var saved = allArticles()
        .filter(function (a) { return has(prefs.saved, a.id); })
        .slice(0, 3);
    $("sideSaved").innerHTML = saved.length
        ? saved.map(sideItem).join("")
        : '<p class="widget-hint">Ketuk ikon penanda di artikel untuk menyimpannya.</p>';
}

function show(which) {
    $("listView").hidden = which !== "list";
    $("readerView").hidden = which !== "reader";
    $("writeView").hidden = which !== "write";
    $("listSearch").hidden = which !== "list";
    $("backBtn").hidden = which === "list";
    $("openWrite").hidden = which === "write";
    $("pageTitle").textContent = which === "write" ? "Tulis artikel" : "Artikel";
    window.scrollTo(0, 0);
}

function route(moveFocus) {
    var hash = location.hash;

    if (hash.indexOf("#/artikel/") === 0) {
        var id = "";
        try {
            id = decodeURIComponent(hash.slice(10));
        } catch (e) {
            id = "";
        }
        var a = getArticle(id);
        show("reader");
        if (a) {
            $("readerContent").innerHTML = readerHtml(a);
            document.title = a.title + " / Artikel";
        } else {
            $("readerContent").innerHTML =
                '<div class="empty"><h3>Artikel tidak ditemukan</h3><p>Artikel ini mungkin sudah dihapus.</p></div>';
            document.title = "Artikel / X Clone";
        }
        if (moveFocus) $("pageTitle").focus({ preventScroll: true });
    } else if (hash === "#/tulis") {
        show("write");
        document.title = "Tulis artikel / X Clone";
        if (moveFocus) $("wTitle").focus({ preventScroll: true });
    } else {
        renderList();
        renderSide();
        show("list");
        document.title = "Artikel / X Clone — Kelompok 9";
        if (moveFocus) $("pageTitle").focus({ preventScroll: true });
    }
}

function toggleLike(id) {
    var a = getArticle(id);
    if (!a) return;

    toggleIn(prefs.liked, id);
    saveJSON(STORE_PREFS, prefs);
    var on = has(prefs.liked, id);

    var buttons = document.querySelectorAll('[data-action="like"]');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("data-id") !== id) continue;
        buttons[i].classList.toggle("is-on", on);
        buttons[i].setAttribute("aria-pressed", String(on));
        buttons[i].querySelector("span").textContent = formatCount(a.likes + (on ? 1 : 0));
    }
    renderSide();
}

function toggleSave(id) {
    toggleIn(prefs.saved, id);
    saveJSON(STORE_PREFS, prefs);
    var on = has(prefs.saved, id);

    var buttons = document.querySelectorAll('[data-action="save"]');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("data-id") !== id) continue;
        buttons[i].classList.toggle("is-on", on);
        buttons[i].setAttribute("aria-pressed", String(on));
    }

    renderSide();
    if (view.cat === "saved" && !$("listView").hidden) renderList();
    toast(on ? "Artikel disimpan" : "Dihapus dari tersimpan");
}

function copyLink() {
    var url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
            function () { toast("Tautan disalin"); },
            function () { toast("Gagal menyalin tautan"); }
        );
    } else {
        toast("Salin tautan dari bilah alamat");
    }
}

function deleteArticle(id) {
    if (!isMine(id)) return;
    if (!window.confirm("Hapus artikel ini?")) return;

    mine = mine.filter(function (a) { return a.id !== id; });
    prefs.liked = prefs.liked.filter(function (x) { return x !== id; });
    prefs.saved = prefs.saved.filter(function (x) { return x !== id; });
    saveJSON(STORE_MINE, mine);
    saveJSON(STORE_PREFS, prefs);

    toast("Artikel dihapus");
    location.hash = "#/";
}

document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-action]");
    if (!btn) return;

    var action = btn.getAttribute("data-action");
    var id = btn.getAttribute("data-id");

    if (action === "like") toggleLike(id);
    else if (action === "save") toggleSave(id);
    else if (action === "share") copyLink();
    else if (action === "delete") deleteArticle(id);
});

$("articleTabs").addEventListener("click", function (event) {
    var tab = event.target.closest(".articles-tab");
    if (!tab) return;

    view.cat = tab.getAttribute("data-cat");
    var tabs = document.querySelectorAll("#articleTabs .articles-tab");
    for (var i = 0; i < tabs.length; i++) {
        var on = tabs[i] === tab;
        tabs[i].classList.toggle("is-active", on);
        tabs[i].setAttribute("aria-selected", String(on));
    }
    renderList();
});

$("articleSearch").addEventListener("input", function () {
    view.query = this.value.trim();
    renderList();
});

$("articleSearch").addEventListener("keydown", function (event) {
    if (event.key === "Escape" && this.value) {
        this.value = "";
        view.query = "";
        renderList();
    }
});

$("backBtn").addEventListener("click", function () {
    location.hash = "#/";
});

$("openWrite").addEventListener("click", function () {
    location.hash = "#/tulis";
});

$("wCancel").addEventListener("click", function () {
    location.hash = "#/";
});

function updateCount() {
    var n = $("wBody").value.trim().length;
    $("wCount").textContent = n + " karakter (minimal " + MIN_BODY + ")";
}

$("wBody").addEventListener("input", updateCount);

$("writeForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var title = $("wTitle").value.trim();
    var cat = $("wCat").value;
    var body = $("wBody").value
        .split(/\n\s*\n/)
        .map(function (p) { return p.trim(); })
        .filter(Boolean);
    var total = body.join("").length;

    var error = "";
    if (title.length < 5) {
        error = "Judul minimal 5 karakter.";
    } else if (total < MIN_BODY) {
        error = "Isi artikel minimal " + MIN_BODY + " karakter.";
    }
    $("wError").textContent = error;
    if (error) return;

    var article = {
        id: "u" + Date.now(),
        title: title,
        cat: cat,
        author: "anda",
        created: Date.now(),
        likes: 0,
        comments: 0,
        body: body
    };

    mine.unshift(article);
    saveJSON(STORE_MINE, mine);

    this.reset();
    updateCount();
    toast("Artikel diterbitkan");
    location.hash = articleHref(article.id);
});

$("wCat").innerHTML = Object.keys(CATEGORY_LABEL)
    .map(function (c) {
        return '<option value="' + esc(c) + '">' + esc(catLabel(c)) + "</option>";
    })
    .join("");

updateCount();

window.addEventListener("hashchange", function () {
    route(true);
});

route(false);