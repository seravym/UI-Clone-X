fetch("../sidebar.html")
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
var STORE_COMMENTS = "xclone.articles.comments";
var BOOKMARK_KEY = "bookmarks"; // sama dengan halaman Bookmarks
var BOOKMARK_PREFIX = "article-"; // supaya id tidak bentrok dengan bookmark dari halaman lain
var DAY = 24 * 60 * 60 * 1000;
var MIN_BODY = 80;
var MAX_COMMENT = 500;
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

// Komentar contoh untuk tiap artikel
var SEED_COMMENTS = {
    a1: [
        { author: "larasw", text: "Setuju soal placeholder. Hal sekecil itu ternyata besar pengaruhnya.", hoursAgo: 20 },
        { author: "dimasarya", text: "Poin soal keyboard sering dilupakan, padahal paling terasa untuk pengguna harian.", hoursAgo: 9 },
        { author: "kopikiri", text: "Riwayat pencarian terbaru itu fitur kecil yang bikin nyaman.", hoursAgo: 3 }
    ],
    a2: [
        { author: "jsjakarta", text: "Strategi dual-write plus verifikasi checksum setiap malam itu rapi sekali.", hoursAgo: 50 },
        { author: "ranipratama", text: "Jalur mundur dua minggu itu keputusan yang sering dilewatkan tim lain.", hoursAgo: 30 }
    ],
    a3: [
        { author: "dimasarya", text: "Aturan nomor tiga paling sering saya langgar. Terima kasih pengingatnya.", hoursAgo: 70 },
        { author: "salsanirmala", text: "Sumbu dari nol itu wajib, apalagi untuk grafik batang.", hoursAgo: 40 }
    ],
    a4: [
        { author: "kopikiri", text: "Catatan soal tas kecil itu benar banget. Saya juga kelebihan bawaan waktu ke sana.", hoursAgo: 100 },
        { author: "larasw", text: "Boleh minta rekomendasi penyedia perahunya?", hoursAgo: 60 },
        { author: "ranipratama", text: "Fotonya pasti bagus waktu senja. Ditunggu cerita berikutnya.", hoursAgo: 25 }
    ],
    a5: [
        { author: "salsanirmala", text: "Pilih biji berdasarkan menu yang paling sering dipesan, masuk akal sekali.", hoursAgo: 150 }
    ],
    a6: [
        { author: "dimasarya", text: "Mulai dari komponen kecil itu saran terbaik untuk tim yang baru mencoba.", hoursAgo: 200 },
        { author: "ranipratama", text: "Shadow DOM memang menolong banget untuk menjaga gaya tetap terisolasi.", hoursAgo: 180 }
    ]
};
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
    return a && typeof a.id === "string" && typeof a.title === "string" && Array.isArray(a.body) && typeof a.created === "number";
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
var commentStore = loadJSON(STORE_COMMENTS, {});
if (!commentStore || typeof commentStore !== "object" || Array.isArray(commentStore)) commentStore = {};
var view = { cat: "all", query: "" };
var pendingComments = false;
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
    if (i === -1) {
        list.push(id);
    } else {
        list.splice(i, 1);
    }
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
        .map(function (w) {
            return w.charAt(0);
        })
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
function formatK(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
}
function viewsOf(a) {
    return Math.round((a.likes + 1) * 14 + 80);
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

/* ---------- Bookmark (terhubung ke halaman Bookmarks) ---------- */

function bookmarkIdOf(id) {
    return BOOKMARK_PREFIX + id;
}
function getBookmarks() {
    var list = loadJSON(BOOKMARK_KEY, []);
    return Array.isArray(list) ? list : [];
}
function isSaved(id) {
    var key = bookmarkIdOf(id);
    return getBookmarks().some(function (b) {
        return b && b.id === key;
    });
}
function setSaved(a, on) {
    var key = bookmarkIdOf(a.id);
    var list = getBookmarks().filter(function (b) {
        return !b || b.id !== key;
    });
    if (on) {
        list.unshift({
            id: key,
            name: authorOf(a).name,
            handle: "@" + handleOf(a),
            time: formatDate(a.created),
            text: a.title + " \u2014 " + truncate(a.body[0] || "", 140),
            community: "Artikel \u00b7 " + catLabel(a.cat)
        });
    }
    saveJSON(BOOKMARK_KEY, list);
}

/* ---------- Komentar ---------- */

function commentsOf(articleId) {
    var seed = (SEED_COMMENTS[articleId] || []).map(function (c, i) {
        return {
            id: "s-" + articleId + "-" + i,
            author: c.author,
            text: c.text,
            created: Date.now() - c.hoursAgo * 60 * 60 * 1000,
            seed: true
        };
    });
    var own = Array.isArray(commentStore[articleId]) ? commentStore[articleId] : [];
    return seed.concat(own).sort(function (a, b) {
        return b.created - a.created;
    });
}
function countOf(a) {
    return commentsOf(a.id).length;
}

/* ---------- Ikon SVG ---------- */

function svg(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + "</svg>";
}
var ICON = {
    like: svg('<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>'),
    comment: svg('<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>'),
    save: svg('<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>'),
    share: svg('<path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 14v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5"/>'),
    trash: svg('<path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13"/>'),
    views: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="4" width="4" height="16" rx="1"/><rect x="16" y="9" width="4" height="11" rx="1"/></svg>'
};
function avatarFor(au) {
    return '<span class="avatar avatar--sm" style="--h:' + au.hue + '" aria-hidden="true">' + esc(initials(au.name)) + "</span>";
}
function avatar(a) {
    return avatarFor(authorOf(a));
}
function authorLine(a) {
    return avatar(a) +
        '<span class="byline__name" data-action="author" data-author="' + esc(handleOf(a)) + '" role="link" tabindex="0">' + esc(authorOf(a).name) + "</span>" +
        '<span class="byline__dim">@' + esc(handleOf(a)) + " &middot; " + formatDate(a.created) + " &middot; " + readingMinutes(a) + " mnt baca</span>";
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
    var on = isSaved(a.id);
    return '<button class="act act--save act--right' + (on ? " is-on" : "") + '" type="button" data-action="save" data-id="' + esc(a.id) + '" aria-pressed="' + on + '" aria-label="' + (on ? "Hapus dari Bookmarks" : "Simpan ke Bookmarks") + '">' +
        ICON.save + "</button>";
}
function commentButton(a) {
    return '<button class="act act--comment" type="button" data-action="comment" data-id="' + esc(a.id) + '" aria-label="Lihat komentar">' +
        ICON.comment + "<span>" + countOf(a) + "</span></button>";
}
function viewsStatic(a) {
    return '<span class="act act--static" title="Tayangan" aria-label="Tayangan">' +
        ICON.views + "<span>" + formatK(viewsOf(a)) + "</span></span>";
}
function deleteButton(a) {
    if (!isMine(a.id)) return "";
    return '<button class="act act--danger" type="button" data-action="delete" data-id="' + esc(a.id) + '" aria-label="Hapus artikel">' +
        ICON.trash + "<span>Hapus</span></button>";
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
        '<div class="article-actions">' +
        likeButton(a) +
        commentButton(a) +
        viewsStatic(a) +
        deleteButton(a) +
        saveButton(a) +
        "</div>" +
        "</article>";
}
function commentItem(c, articleId) {
    var au = AUTHORS[c.author] || AUTHORS.anda;
    var own = c.author === "anda";
    return '<div class="comment" data-cid="' + esc(c.id) + '">' +
        avatarFor(au) +
        '<div class="comment__body">' +
        '<p class="comment__head"><strong>' + esc(au.name) + "</strong> <span>@" + esc(AUTHORS[c.author] ? c.author : "anda") + " &middot; " + formatDate(c.created) + "</span></p>" +
        '<p class="comment__text">' + esc(c.text) + "</p>" +
        (own ? '<button class="comment__delete" type="button" data-action="comment-delete" data-id="' + esc(articleId) + '" data-cid="' + esc(c.id) + '">Hapus</button>' : "") +
        "</div></div>";
}
function commentsHtml(a) {
    var list = commentsOf(a.id);
    var items = list.length
        ? list.map(function (c) { return commentItem(c, a.id); }).join("")
        : '<p class="comments__empty">Belum ada komentar. Jadilah yang pertama.</p>';
    return '<section class="comments" id="comments" aria-label="Komentar">' +
        '<h3 class="comments__title">Komentar (' + list.length + ")</h3>" +
        '<div class="comment-form">' +
        avatarFor(AUTHORS.anda) +
        '<div class="comment-form__main">' +
        '<textarea id="commentInput" maxlength="' + MAX_COMMENT + '" rows="2" placeholder="Tulis komentar Anda" aria-label="Tulis komentar"></textarea>' +
        '<div class="comment-form__row">' +
        '<span class="comment-form__hint" id="commentCount">0/' + MAX_COMMENT + "</span>" +
        '<button class="write-btn" type="button" data-action="comment-send" data-id="' + esc(a.id) + '">Kirim</button>' +
        "</div></div></div>" +
        '<div class="comment-list">' + items + "</div></section>";
}
function readerHtml(a) {
    var paragraphs = a.body.map(function (p) {
        return "<p>" + esc(p) + "</p>";
    }).join("");
    return '<article class="reader">' +
        cover(a, true) +
        '<div class="reader__inner">' +
        '<h2 class="reader__title">' + esc(a.title) + "</h2>" +
        '<div class="byline">' + authorLine(a) + "</div>" +
        '<div class="reader__body">' + paragraphs + "</div>" +
        '<div class="article-actions article-actions--reader">' +
        likeButton(a) +
        commentButton(a) +
        viewsStatic(a) +
        '<button class="act" type="button" data-action="share" aria-label="Salin tautan">' + ICON.share + "<span>Bagikan</span></button>" +
        deleteButton(a) +
        saveButton(a) +
        "</div></div>" +
        commentsHtml(a) +
        "</article>";
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
        if (view.cat === "saved" && !isSaved(a.id)) return false;
        if (view.cat !== "all" && view.cat !== "saved" && a.cat !== view.cat) return false;
        var hay = (a.title + " " + a.body.join(" ") + " " + authorOf(a).name + " " + (a.cat || "") + " " + catLabel(a.cat)).toLowerCase();
        return terms.every(function (t) {
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
    var popular = allArticles().sort(function (a, b) {
        return score(b) - score(a);
    }).slice(0, 5);
    $("sidePopular").innerHTML = popular.map(sideItem).join("");
    var saved = allArticles().filter(function (a) {
        return isSaved(a.id);
    }).slice(0, 5);
    $("sideSaved").innerHTML = saved.length
        ? saved.map(sideItem).join("")
        : '<p class="widget-hint">Belum ada artikel yang disimpan.</p>';
}
function show(which) {
    $("listView").hidden = which !== "list";
    $("readerView").hidden = which !== "reader";
    $("writeView").hidden = which !== "write";
    $("listSearch").hidden = which !== "list";
    $("backBtn").hidden = which === "list";
    $("openWrite").hidden = which === "write";
    $("pageTitle").textContent = which === "write" ? "New Articles" : "Articles";
    window.scrollTo(0, 0);
}
function currentArticleId() {
    var hash = location.hash;
    if (hash.indexOf("#/artikel/") !== 0) return "";
    try {
        return decodeURIComponent(hash.slice(10));
    } catch (e) {
        return "";
    }
}
function renderReader() {
    var a = getArticle(currentArticleId());
    if (a) {
        $("readerContent").innerHTML = readerHtml(a);
        document.title = a.title + " - Articles";
    } else {
        $("readerContent").innerHTML = '<div class="empty"><h3>Artikel tidak ditemukan</h3><p>Artikel ini mungkin sudah dihapus.</p></div>';
        document.title = "Articles - X Clone";
    }
}
function goToComments() {
    var box = $("comments");
    if (!box) return;
    box.scrollIntoView({ behavior: "smooth", block: "start" });
    var input = $("commentInput");
    if (input) input.focus({ preventScroll: true });
}
function route(moveFocus) {
    var hash = location.hash;
    if (hash.indexOf("#/artikel/") === 0) {
        show("reader");
        renderReader();
        if (moveFocus) $("pageTitle").focus({ preventScroll: true });
        if (pendingComments) {
            pendingComments = false;
            goToComments();
        }
    } else if (hash === "#/tulis") {
        show("write");
        document.title = "New Articles - X Clone";
        if (moveFocus) $("wTitle").focus({ preventScroll: true });
    } else {
        renderList();
        renderSide();
        show("list");
        document.title = "Articles - X Clone";
        if (moveFocus) $("pageTitle").focus({ preventScroll: true });
    }
}
// Perbarui tampilan tanpa pindah halaman / scroll
function refreshCurrent() {
    if (!$("readerView").hidden) {
        renderReader();
    } else if (!$("listView").hidden) {
        renderList();
    }
    renderSide();
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
        var count = buttons[i].querySelector("span");
        if (count) count.textContent = formatCount(a.likes + (on ? 1 : 0));
    }
    renderSide();
    toast(on ? "Artikel disukai" : "Like dibatalkan");
}
function toggleSave(id) {
    var a = getArticle(id);
    if (!a) return;
    var on = !isSaved(id);
    setSaved(a, on);
    var buttons = document.querySelectorAll('[data-action="save"]');
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("data-id") !== id) continue;
        buttons[i].classList.toggle("is-on", on);
        buttons[i].setAttribute("aria-pressed", String(on));
        buttons[i].setAttribute("aria-label", on ? "Hapus dari Bookmarks" : "Simpan ke Bookmarks");
    }
    renderSide();
    if (view.cat === "saved" && !$("listView").hidden) {
        renderList();
    }
    toast(on ? "Disimpan ke Bookmarks" : "Dihapus dari Bookmarks");
}
function copyLink() {
    var url = location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
            function () {
                toast("Tautan disalin");
            },
            function () {
                toast("Gagal menyalin tautan");
            }
        );
    } else {
        toast("Salin tautan dari bilah alamat");
    }
}
function deleteArticle(id) {
    if (!isMine(id)) {
        toast("Kamu hanya bisa menghapus artikel milik sendiri");
        return;
    }
    if (!window.confirm("Hapus artikel ini?")) return;
    mine = mine.filter(function (a) {
        return a.id !== id;
    });
    prefs.liked = prefs.liked.filter(function (x) {
        return x !== id;
    });
    delete commentStore[id];
    var key = bookmarkIdOf(id);
    saveJSON(BOOKMARK_KEY, getBookmarks().filter(function (b) {
        return !b || b.id !== key;
    }));
    saveJSON(STORE_MINE, mine);
    saveJSON(STORE_PREFS, prefs);
    saveJSON(STORE_COMMENTS, commentStore);
    renderList();
    renderSide();
    toast("Artikel dihapus");
    location.hash = "#/";
}

/* ---------- Aksi komentar & penulis ---------- */

function openComments(id) {
    if (currentArticleId() === id && !$("readerView").hidden) {
        goToComments();
        return;
    }
    pendingComments = true;
    var target = articleHref(id);
    if (location.hash === target) {
        route(false);
    } else {
        location.hash = target;
    }
}
function sendComment(id) {
    var input = $("commentInput");
    if (!input) return;
    var text = input.value.trim();
    if (!text) {
        toast("Komentar tidak boleh kosong");
        input.focus();
        return;
    }
    if (!Array.isArray(commentStore[id])) commentStore[id] = [];
    commentStore[id].push({
        id: "c" + Date.now(),
        author: "anda",
        text: text.slice(0, MAX_COMMENT),
        created: Date.now()
    });
    saveJSON(STORE_COMMENTS, commentStore);
    renderReader();
    toast("Komentar terkirim");
}
function deleteComment(articleId, commentId) {
    if (!window.confirm("Hapus komentar ini?")) return;
    commentStore[articleId] = (commentStore[articleId] || []).filter(function (c) {
        return c.id !== commentId;
    });
    saveJSON(STORE_COMMENTS, commentStore);
    renderReader();
    toast("Komentar dihapus");
}
function setActiveTab(cat) {
    var tabs = document.querySelectorAll("#articleTabs .articles-tab");
    for (var i = 0; i < tabs.length; i++) {
        var on = tabs[i].getAttribute("data-cat") === cat;
        tabs[i].classList.toggle("is-active", on);
        tabs[i].setAttribute("aria-selected", String(on));
    }
}
function filterByAuthor(handle) {
    var au = AUTHORS[handle];
    if (!au) return;
    view.cat = "all";
    view.query = au.name;
    $("articleSearch").value = au.name;
    setActiveTab("all");
    if (location.hash && location.hash !== "#/" && location.hash !== "#") {
        location.hash = "#/";
    } else {
        renderList();
        window.scrollTo(0, 0);
    }
}

document.addEventListener("click", function (event) {
    var btn = event.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    var id = btn.getAttribute("data-id");
    if (action === "like") {
        event.preventDefault();
        event.stopPropagation();
        toggleLike(id);
    } else if (action === "save") {
        event.preventDefault();
        event.stopPropagation();
        toggleSave(id);
    } else if (action === "share") {
        event.preventDefault();
        event.stopPropagation();
        copyLink();
    } else if (action === "delete") {
        event.preventDefault();
        event.stopPropagation();
        deleteArticle(id);
    } else if (action === "comment") {
        event.preventDefault();
        event.stopPropagation();
        openComments(id);
    } else if (action === "comment-send") {
        event.preventDefault();
        event.stopPropagation();
        sendComment(id);
    } else if (action === "comment-delete") {
        event.preventDefault();
        event.stopPropagation();
        deleteComment(id, btn.getAttribute("data-cid"));
    } else if (action === "author") {
        event.preventDefault();
        event.stopPropagation();
        filterByAuthor(btn.getAttribute("data-author"));
    }
});
document.addEventListener("keydown", function (event) {
    if (event.key !== "Enter") return;
    var el = event.target;
    if (el && el.getAttribute && el.getAttribute("data-action") === "author") {
        event.preventDefault();
        el.click();
    }
});
document.addEventListener("input", function (event) {
    if (event.target && event.target.id === "commentInput") {
        var counter = $("commentCount");
        if (counter) counter.textContent = event.target.value.length + "/" + MAX_COMMENT;
    }
});
$("articleTabs").addEventListener("click", function (event) {
    var tab = event.target.closest(".articles-tab");
    if (!tab) return;
    view.cat = tab.getAttribute("data-cat");
    setActiveTab(view.cat);
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
        .map(function (p) {
            return p.trim();
        })
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
// Sinkron kalau Bookmarks diubah dari halaman/tab lain
window.addEventListener("storage", function (event) {
    if (event.key === BOOKMARK_KEY || event.key === STORE_COMMENTS) refreshCurrent();
});
window.addEventListener("pageshow", function (event) {
    if (event.persisted) refreshCurrent();
});
route(false);