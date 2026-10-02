const tabs = ["Explore", "Trending", "News", "Sports", "Entertainment"];

const newsList = [
    {
        id: 1, category: "Entertainment",
        title: "Jaemin NCT DREAM Hadir di Pop-up Anniversary Lee 101 di Seoul",
        time: "12 jam lalu", posts: 61000,
        body: [
            "Jaemin NCT DREAM dikabarkan hadir di acara pop-up anniversary Lee 101 di Seoul. Kehadirannya langsung ramai dibicarakan penggemar di media sosial.",
            "Banyak pengunjung membagikan foto dan cerita dari lokasi acara, sehingga topik ini cepat naik ke daftar pembicaraan."
        ]
    },
    {
        id: 2, category: "Sports",
        title: "Indonesia Libas Bangladesh 6-1 di Babak Pertama Laga Piala ASEAN",
        time: "Sedang trending", posts: 573,
        body: [
            "Timnas Indonesia tampil dominan pada babak pertama dan unggul 6-1 atas Bangladesh dalam laga Piala ASEAN.",
            "Serangan yang cepat dan penyelesaian akhir yang tajam membuat lini belakang lawan kewalahan. Suporter ramai membahasnya sepanjang laga."
        ]
    },
    {
        id: 3, category: "Entertainment",
        title: "EVAN Buka Heetober dengan Kemenangan Musik dan Ulang Tahun",
        time: "22 jam lalu", posts: 22000,
        body: [
            "EVAN membuka bulan Oktober dengan dua kabar bahagia sekaligus: kemenangan di acara musik dan perayaan ulang tahun.",
            "Penggemar memakai tagar Heetober untuk merayakannya dan membanjiri kolom komentar dengan ucapan selamat."
        ]
    },
    {
        id: 4, category: "News",
        title: "Presiden Umumkan Reshuffle Kabinet dan Kapolri Baru",
        time: "7 jam lalu", posts: 27500,
        body: [
            "Pengumuman reshuffle kabinet disampaikan bersamaan dengan pergantian pucuk pimpinan kepolisian.",
            "Warganet langsung membahas susunan baru tersebut dan dampaknya terhadap arah kebijakan ke depan."
        ]
    },
    {
        id: 5, category: "News",
        title: "BMKG Prediksi Hujan Lebat di Sebagian Wilayah Jabodetabek",
        time: "4 jam lalu", posts: 14200,
        body: [
            "BMKG memprakirakan hujan dengan intensitas sedang hingga lebat berpotensi terjadi di sebagian wilayah Jabodetabek.",
            "Masyarakat diimbau waspada terhadap genangan dan angin kencang, serta memantau pembaruan cuaca dari kanal resmi."
        ]
    },
    {
        id: 6, category: "Sports",
        title: "Final Ganda Campuran Tutup Turnamen dengan Skor Dramatis",
        time: "9 jam lalu", posts: 33100,
        body: [
            "Final ganda campuran menutup turnamen lewat pertandingan tiga gim yang berlangsung ketat hingga poin-poin akhir.",
            "Penonton di arena dan di media sosial menilai laga ini sebagai salah satu final paling seru musim ini."
        ]
    },
    {
        id: 7, category: "News",
        title: "Pemerintah Siapkan Aturan Baru Keamanan Data Pribadi",
        time: "11 jam lalu", posts: 9800,
        body: [
            "Pemerintah menyiapkan aturan baru untuk memperkuat perlindungan data pribadi pengguna layanan digital.",
            "Aturan ini diharapkan memperjelas kewajiban penyelenggara layanan dalam menyimpan dan mengamankan data."
        ]
    },
    {
        id: 8, category: "Entertainment",
        title: "Drakor Terbaru Pecahkan Rekor Rating Episode Perdana",
        time: "15 jam lalu", posts: 18300,
        body: [
            "Sebuah drama Korea terbaru mencetak rating tertinggi untuk episode perdana di jam tayangnya.",
            "Alur cerita dan chemistry para pemeran jadi bahan obrolan penonton setelah episode pertama selesai tayang."
        ]
    }
];

const trends = [
    { id: 1, category: "Sports", topic: "#TimnasDay", posts: 48200 },
    { id: 2, category: "Sports", topic: "Rizky Ridho", posts: 21500 },
    { id: 3, category: "News", topic: "Iseng", posts: 96400 },
    { id: 4, category: "News", topic: "Lubang Buaya", posts: 33100 },
    { id: 5, category: "Sports", topic: "Justin Hubner", posts: 18700 },
    { id: 6, category: "Entertainment", topic: "Heetober", posts: 27800 },
    { id: 7, category: "Entertainment", topic: "Comeback K-Pop Minggu Depan", posts: 52300 },
    { id: 8, category: "News", topic: "Reshuffle Kabinet", posts: 41700 },
    { id: 9, category: "Sports", topic: "Derby Akhir Pekan", posts: 12900 },
    { id: 10, category: "Entertainment", topic: "Plot Twist Drakor", posts: 9400 },
    { id: 11, category: "Teknologi", topic: "Update Keamanan 2FA", posts: 7600 },
    { id: 12, category: "Teknologi", topic: "Agen AI untuk Email", posts: 6800 }
];

const accounts = [
    { id: 1, name: "detikcom", handle: "@detikcom", category: "News", followers: 5200000, following: 120, bio: "Berita terkini, terpercaya, dan terlengkap dari Indonesia." },
    { id: 2, name: "haduhaduh", handle: "@bintangemon", category: "Entertainment", followers: 870000, following: 340, bio: "Meme, hiburan, dan kabar receh setiap hari." },
    { id: 3, name: "Joko Widodo", handle: "@jokowi", category: "News", followers: 7800000, following: 95, bio: "Akun resmi Presiden ke-7 Republik Indonesia." },
    { id: 4, name: "Bagus Bola", handle: "@bagus_bola", category: "Sports", followers: 154000, following: 410, bio: "Analisis Liga 1 dan Timnas setiap akhir pekan." },
    { id: 5, name: "Ayu Kpop", handle: "@ayu_bts", category: "Entertainment", followers: 98000, following: 520, bio: "Update comeback dan rekomendasi lagu B-side." },
    { id: 6, name: "Sari Developer", handle: "@sari_dev", category: "Teknologi", followers: 42000, following: 230, bio: "Berbagi tips rapi-rapi kode dan struktur project." }
];

const posts = [
    { id: 1, category: "Sports", author: "Wulan", handle: "@wulan_bwf", time: "1j", text: "Ganda campuran kita makin solid, nonton final semalam seru banget." },
    { id: 2, category: "News", author: "Hendra", handle: "@hendra_sec", time: "2j", text: "Reminder: aktifkan 2FA di semua akun penting kalian, sekarang juga." },
    { id: 3, category: "Entertainment", author: "Sinta", handle: "@sinta_drakor", time: "50m", text: "Episode kemarin plot twist-nya bikin nggak bisa tidur." },
    { id: 4, category: "Sports", author: "Dimas", handle: "@dimasruns", time: "1h", text: "Timnas main bagus banget malam ini, 6-1 di babak pertama!" },
    { id: 5, category: "News", author: "Rina", handle: "@rina_news", time: "3j", text: "Cuaca Jakarta lagi nggak bersahabat, jangan lupa bawa payung." },
    { id: 6, category: "Entertainment", author: "Reza", handle: "@reza_mic", time: "3j", text: "Materi baru semalam di open mic, penonton ketawa di tempat yang nggak kuduga." }
];

// Postingan milik akun di "Akun untuk diikuti".
// Akun tokoh publik sengaja dikosongkan supaya tidak ada kutipan karangan.
const accountPostTexts = {
    1: ["Pembaruan: situasi terkini terus kami pantau, simak laporan lengkapnya di situs kami.", "Cuaca ekstrem berpotensi terjadi di sejumlah wilayah, tetap waspada."],
    2: ["Senin lagi, semangat ya. Kopi dulu baru hidup.", "Meme hari ini sudah naik, tinggal kalian kirim ke grup keluarga."],
    3: [],
    4: ["Timnas tampil agresif sejak menit awal, transisi bertahan ke menyerangnya makin rapi.", "Preview Liga 1 akhir pekan ini: tiga laga yang patut ditunggu."],
    5: ["Jadwal comeback minggu depan sudah keluar, siapkan playlist kalian.", "Rekomendasi B-side hari ini: lagu pelan buat nemenin hujan."],
    6: ["Tips: pisahkan data, render, dan event handler supaya file JS tetap rapi.", "Refactor kecil tiap hari lebih aman daripada rombak besar sekali jalan."]
};

const accountPostTimes = ["5j", "1 hari"];

const accountPostList = accounts.flatMap(a =>
    (accountPostTexts[a.id] || []).map((text, i) => ({
        id: "a" + a.id + "-" + i,
        category: a.category,
        author: a.name,
        handle: a.handle,
        time: accountPostTimes[i % accountPostTimes.length],
        text
    }))
);

const replyPool = {
    Sports: [
        { author: "Fajar", handle: "@fajar_fc", text: "Setuju, permainannya enak ditonton." },
        { author: "Nadia", handle: "@nadia_pitch", text: "Semoga konsisten sampai akhir turnamen." },
        { author: "Yoga", handle: "@yoga_sport", text: "Suasana nobar semalam luar biasa." }
    ],
    News: [
        { author: "Bima", handle: "@bima_baca", text: "Semoga informasinya makin jelas dalam beberapa hari ke depan." },
        { author: "Laras", handle: "@laras_t", text: "Makasih sudah diingatkan, langsung aku cek." },
        { author: "Eko", handle: "@eko_warga", text: "Penting banget buat dibagikan ke keluarga." }
    ],
    Entertainment: [
        { author: "Mita", handle: "@mita_fan", text: "Aku juga mikir hal yang sama!" },
        { author: "Dewi", handle: "@dewi_tonton", text: "Jangan spoiler dong, aku belum nonton." },
        { author: "Raka", handle: "@raka_hibur", text: "Ini sih wajib masuk daftar tontonan." }
    ],
    Teknologi: [
        { author: "Tia", handle: "@tia_tech", text: "Informatif, thanks sudah berbagi." }
    ]
};

const FOLLOW_KEY = "followedAccounts";
const POST_KEY = "explorePostActions";
const HISTORY_KEY = "exploreSearchHistory";
const MAX_HISTORY = 8;
const BOOKMARK_KEY = "bookmarks"; // sama dengan halaman Bookmarks
const BOOKMARK_PREFIX = "explore-"; // supaya id tidak bentrok dengan bookmark dari halaman lain

let currentTab = tabs[0];
let query = "";
let followed = new Set(readJSON(FOLLOW_KEY, []).map(String));
let searchHistory = readJSON(HISTORY_KEY, []);
let dropdownItems = [];
let view = parseHash();
let navDepth = 0;

const tabsEl = document.getElementById("tabs");
const resultsEl = document.getElementById("results");
const searchEl = document.getElementById("search");
const searchWrapEl = document.getElementById("search-wrap");
const dropdownEl = document.getElementById("search-dropdown");
const sideNewsEl = document.getElementById("side-news");
const sideFollowEl = document.getElementById("side-follow");


/* ---------- Helpers ---------- */

function readJSON(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (e) {
        return fallback;
    }
}

function writeJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function highlight(text) {
    const safe = escapeHtml(text);
    if (!query || view) return safe;
    const pattern = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp("(" + pattern + ")", "gi"), "<mark>$1</mark>");
}

function initials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function formatCount(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".", ",").replace(",0", "") + " jt";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",").replace(",0", "") + " rb";
    return String(n);
}

function hashString(s) {
    let h = 0;
    for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h;
}

function matchesQuery(...fields) {
    if (!query) return true;
    const q = query.toLowerCase();
    return fields.some(f => f.toLowerCase().includes(q));
}

function matchesTab(category) {
    return currentTab === "Explore" || currentTab === "Trending" || category === currentTab;
}

function allPosts() {
    return posts.concat(accountPostList);
}

function userPath(handle) {
    return "user/" + encodeURIComponent(handle.replace(/^@/, ""));
}

function getProfile(id) {
    const handle = "@" + id;
    const account = accounts.find(a => a.handle === handle);
    if (account) return account;

    const post = allPosts().find(p => p.handle === handle);
    if (!post) return null;

    const h = hashString(handle);
    return {
        name: post.author,
        handle,
        category: post.category,
        followers: 100 + (h % 900),
        following: 50 + (h % 300),
        bio: "Aktif membahas topik " + post.category + " di X Clone."
    };
}

function bookmarkId(id) {
    return BOOKMARK_PREFIX + id;
}

function getBookmarks() {
    return readJSON(BOOKMARK_KEY, []);
}

function isBookmarked(id) {
    const key = bookmarkId(id);
    return getBookmarks().some(b => String(b.id) === key);
}

function setBookmark(id, saved) {
    const key = bookmarkId(id);
    const list = getBookmarks().filter(b => String(b.id) !== key);

    if (saved) {
        const p = allPosts().find(x => String(x.id) === String(id));
        if (p) {
            list.unshift({
                id: key,
                name: p.author,
                handle: p.handle,
                time: p.time,
                text: p.text,
                community: p.category
            });
        }
    }

    writeJSON(BOOKMARK_KEY, list);
}

function getPostState(id) {
    const all = readJSON(POST_KEY, {});
    const s = all[id] || {};
    return { liked: !!s.liked, saved: isBookmarked(id) };
}

function togglePost(id, type) {
    if (type === "saved") {
        setBookmark(id, !isBookmarked(id));
        return;
    }
    const all = readJSON(POST_KEY, {});
    const current = all[id] || { liked: false };
    current.liked = !current.liked;
    all[id] = current;
    writeJSON(POST_KEY, all);
}

const SVG_BASE = 'viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
const ICONS = {
    reply: `<svg ${SVG_BASE} fill="none"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    like: `<svg ${SVG_BASE} fill="none" class="icon-fill"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    views: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="4" width="4" height="16" rx="1"/><rect x="16" y="9" width="4" height="11" rx="1"/></svg>`,
    bookmark: `<svg ${SVG_BASE} fill="none" class="icon-fill"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`
};

function formatK(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
}

function postStats(p) {
    const h = hashString("s" + p.id);
    const likes = 10 + (h % 400);
    return { replies: 2 + (h % 40), likes, views: likes * (8 + (h % 20)) };
}

function actionsHtml(p, state, extra) {
    const st = postStats(p);
    const likes = st.likes + (state.liked ? 1 : 0);
    return `
        <div class="xa-actions ${extra || ""}">
            <button class="xa-btn" data-reply="${p.id}" aria-label="Balasan">
                ${ICONS.reply}<span>${formatK(st.replies)}</span>
            </button>
            <button class="xa-btn${state.liked ? " active" : ""}" data-post="${p.id}" data-type="liked" aria-label="Suka" aria-pressed="${state.liked}">
                ${ICONS.like}<span>${formatK(likes)}</span>
            </button>
            <span class="xa-static" aria-label="Tayangan">
                ${ICONS.views}<span>${formatK(st.views)}</span>
            </span>
            <button class="xa-btn${state.saved ? " active" : ""}" data-post="${p.id}" data-type="saved" aria-label="${state.saved ? "Hapus dari Bookmarks" : "Simpan ke Bookmarks"}" aria-pressed="${state.saved}">
                ${ICONS.bookmark}
            </button>
        </div>`;
}

// key = handle akun (mis. "@bagus_bola")
function toggleFollow(key) {
    if (followed.has(key)) {
        followed.delete(key);
    } else {
        followed.add(key);
    }
    writeJSON(FOLLOW_KEY, [...followed]);
}

function followButton(handle) {
    const isFollowing = followed.has(handle);
    return `
        <button class="follow-button${isFollowing ? " following" : ""}" data-follow="${escapeHtml(handle)}">
            ${isFollowing ? "Mengikuti" : "Ikuti"}
        </button>`;
}


/* ---------- Routing (hash) ---------- */

function parseHash() {
    const parts = location.hash.slice(1).split("/");
    if (parts.length < 2 || !parts[0]) return null;
    return { type: parts[0], id: decodeURIComponent(parts.slice(1).join("/")) };
}

function navigate(path) {
    navDepth++;
    location.hash = path;
}

function leaveDetail() {
    view = null;
    if (location.hash) {
        history.replaceState(null, "", location.pathname + location.search);
    }
}

function goBack() {
    if (navDepth > 0) {
        navDepth--;
        history.back();
    } else {
        leaveDetail();
        renderResults();
        window.scrollTo({ top: 0 });
    }
}

window.addEventListener("hashchange", () => {
    view = parseHash();
    closeDropdown();
    renderResults();
    window.scrollTo({ top: 0 });
});


/* ---------- Reusable HTML blocks ---------- */

function renderTabs() {
    tabsEl.hidden = !!view;
    tabsEl.innerHTML = tabs.map(tab => `
        <button class="explore-tab${tab === currentTab ? " active" : ""}" data-tab="${tab}">${tab}</button>
    `).join("");
}

function newsRowHtml(n) {
    return `
        <div class="news-item" data-go="news/${n.id}" tabindex="0" role="button">
            <p class="news-title">${highlight(n.title)}</p>
            <p class="news-meta">
                <span class="news-avatars" aria-hidden="true"><span></span><span></span><span></span></span>
                <span>${escapeHtml(n.time)} &middot; ${escapeHtml(n.category)} &middot; ${formatCount(n.posts)} postingan</span>
            </p>
        </div>`;
}

function trendRowHtml(t, i) {
    return `
        <div class="trend" data-go="trend/${t.id}" tabindex="0" role="button">
            <span class="trend-rank">${i + 1}</span>
            <div class="trend-info">
                <p class="trend-meta">${escapeHtml(t.category)} &middot; Trending di Indonesia</p>
                <p class="trend-topic">${highlight(t.topic)}</p>
                <p class="trend-count">${formatCount(t.posts)} postingan</p>
            </div>
        </div>`;
}

function accountRowHtml(a) {
    return `
        <div class="account-row" data-go="${userPath(a.handle)}" tabindex="0" role="button">
            <div class="account-avatar">${initials(a.name)}</div>
            <div class="account-info">
                <p class="account-name">${highlight(a.name)}</p>
                <p class="account-handle">${highlight(a.handle)}</p>
                <p class="account-bio">${highlight(a.bio)}</p>
            </div>
            ${followButton(a.handle)}
        </div>`;
}

function postHtml(p) {
    const state = getPostState(p.id);
    return `
        <article class="post" data-go="post/${p.id}" tabindex="0">
            <div class="post-avatar" data-go="${userPath(p.handle)}">${initials(p.author)}</div>
            <div class="post-body">
                <div class="post-category">${escapeHtml(p.category)}</div>
                <p class="post-author">
                    <strong class="link-user" data-go="${userPath(p.handle)}">${highlight(p.author)}</strong>
                    <span>${highlight(p.handle)} &middot; ${escapeHtml(p.time)}</span>
                </p>
                <p class="post-text">${highlight(p.text)}</p>
                ${actionsHtml(p, state)}
            </div>
        </article>`;
}


/* ---------- List view ---------- */

function renderNews() {
    if (currentTab === "Trending") return "";

    const list = newsList.filter(n => matchesTab(n.category) && matchesQuery(n.title, n.category));
    if (list.length === 0) return "";

    const title = currentTab === "Explore" ? "Berita Hari Ini" : "Berita " + currentTab;

    return `
        <h2 class="section-title">${escapeHtml(title)}</h2>
        ${list.map(newsRowHtml).join("")}
        <div class="section-divider"></div>`;
}

function renderTrends() {
    let list = trends.filter(t => matchesTab(t.category) && matchesQuery(t.topic, t.category));

    if (currentTab === "Trending") {
        list = [...list].sort((a, b) => b.posts - a.posts);
    }

    if (list.length === 0) return "";

    const title = currentTab === "Trending" ? "Sedang trending di Indonesia" : "Trending";

    return `
        <h2 class="section-title">${escapeHtml(title)}</h2>
        ${list.map(trendRowHtml).join("")}`;
}

function renderAccounts() {
    if (currentTab === "Trending") return "";

    const list = accounts.filter(a =>
        matchesTab(a.category) && matchesQuery(a.name, a.handle, a.bio)
    );
    if (list.length === 0) return "";

    return `
        <div class="section-divider"></div>
        <h2 class="section-title">Akun untuk diikuti</h2>
        ${list.map(accountRowHtml).join("")}`;
}

function renderPosts() {
    if (currentTab === "Trending") return "";

    const list = posts.filter(p =>
        matchesTab(p.category) && matchesQuery(p.text, p.author, p.handle)
    );
    if (list.length === 0) return "";

    return `
        <div class="section-divider"></div>
        <h2 class="section-title">Postingan populer</h2>
        ${list.map(postHtml).join("")}`;
}


/* ---------- Detail views ---------- */

function detailBar(title, sub) {
    return `
        <div class="detail-bar">
            <button class="detail-back" data-back aria-label="Kembali">&larr;</button>
            <div>
                <p class="detail-bar-title">${escapeHtml(title)}</p>
                ${sub ? `<p class="detail-bar-sub">${escapeHtml(sub)}</p>` : ""}
            </div>
        </div>`;
}

function chip(category) {
    return `<button class="chip" data-cat="${escapeHtml(category)}">${escapeHtml(category)}</button>`;
}

function sectionHtml(title, body) {
    if (!body) return "";
    return `
        <div class="section-divider"></div>
        <h2 class="section-title">${escapeHtml(title)}</h2>
        ${body}`;
}

function notFoundHtml() {
    return `
        ${detailBar("Tidak ditemukan")}
        <div class="empty-state">
            <h2>Halaman tidak ditemukan</h2>
            <p>Konten yang kamu cari tidak tersedia atau sudah dihapus.</p>
        </div>`;
}

function renderNewsDetail(id) {
    const n = newsList.find(x => String(x.id) === id);
    if (!n) return notFoundHtml();

    const relPosts = allPosts().filter(p => p.category === n.category).slice(0, 3);
    const others = newsList.filter(x => x.id !== n.id && x.category === n.category).slice(0, 3);
    const relTrends = trends.filter(t => t.category === n.category).slice(0, 3);

    return `
        ${detailBar("Berita", n.category)}
        <article class="detail-article">
            ${chip(n.category)}
            <h1 class="detail-title">${escapeHtml(n.title)}</h1>
            <p class="detail-meta">${escapeHtml(n.time)} &middot; ${formatCount(n.posts)} postingan</p>
            ${n.body.map(par => `<p class="detail-text">${escapeHtml(par)}</p>`).join("")}
            <button class="detail-action" data-search="${escapeHtml(n.title.split(" ").slice(0, 2).join(" "))}">Cari postingan terkait</button>
        </article>
        ${sectionHtml("Postingan terkait", relPosts.map(postHtml).join(""))}
        ${sectionHtml("Topik terkait", relTrends.map(trendRowHtml).join(""))}
        ${sectionHtml("Berita lainnya", others.map(newsRowHtml).join(""))}`;
}

function renderTrendDetail(id) {
    const t = trends.find(x => String(x.id) === id);
    if (!t) return notFoundHtml();

    const tokens = t.topic
        .replace("#", "")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .split(/\s+/)
        .filter(w => w.length > 3);

    const hit = text => tokens.some(w => text.toLowerCase().includes(w));

    let relPosts = allPosts().filter(p => hit(p.text) || hit(p.author));
    let postTitle = "Postingan tentang " + t.topic;
    if (relPosts.length === 0) {
        relPosts = allPosts().filter(p => p.category === t.category).slice(0, 4);
        postTitle = "Postingan " + t.category;
    }

    let relNews = newsList.filter(n => hit(n.title));
    if (relNews.length === 0) {
        relNews = newsList.filter(n => n.category === t.category).slice(0, 2);
    }

    const otherTrends = trends.filter(x => x.id !== t.id && x.category === t.category);

    return `
        ${detailBar(t.topic, formatCount(t.posts) + " postingan")}
        <article class="detail-article">
            ${chip(t.category)}
            <p class="detail-meta">Trending di Indonesia</p>
            <h1 class="detail-title">${escapeHtml(t.topic)}</h1>
            <p class="detail-meta">${formatCount(t.posts)} postingan</p>
            <button class="detail-action" data-search="${escapeHtml(t.topic)}">Cari topik ini</button>
        </article>
        ${sectionHtml(postTitle, relPosts.map(postHtml).join(""))}
        ${sectionHtml("Berita terkait", relNews.map(newsRowHtml).join(""))}
        ${sectionHtml("Trending lainnya di " + t.category, otherTrends.map((x, i) => trendRowHtml(x, i)).join(""))}`;
}

function renderUserDetail(id) {
    const a = getProfile(id);
    if (!a) return notFoundHtml();

    const userPosts = allPosts().filter(p => p.handle === a.handle);
    const followers = a.followers + (followed.has(a.handle) ? 1 : 0);

    return `
        ${detailBar(a.name, userPosts.length + " postingan")}
        <div class="profile-cover"></div>
        <section class="profile">
            <div class="profile-top">
                <div class="account-avatar profile-avatar">${initials(a.name)}</div>
                ${followButton(a.handle)}
            </div>
            <h1 class="profile-name">${escapeHtml(a.name)}</h1>
            <p class="account-handle">${escapeHtml(a.handle)}</p>
            <p class="profile-bio">${escapeHtml(a.bio)}</p>
            <p class="profile-stats">
                <span><strong>${formatCount(a.following)}</strong> Mengikuti</span>
                <span><strong>${formatCount(followers)}</strong> Pengikut</span>
            </p>
            ${chip(a.category)}
        </section>
        <div class="section-divider"></div>
        <h2 class="section-title">Postingan</h2>
        ${userPosts.length
            ? userPosts.map(postHtml).join("")
            : `<div class="empty-state"><p>Belum ada postingan.</p></div>`}`;
}

function renderPostDetail(id) {
    const p = allPosts().find(x => String(x.id) === id);
    if (!p) return notFoundHtml();

    const state = getPostState(p.id);
    const likes = postStats(p).likes + (state.liked ? 1 : 0);
    const replies = replyPool[p.category] || replyPool.News;

    return `
        ${detailBar("Postingan")}
        <article class="detail-post">
            <div class="detail-post-head">
                <div class="post-avatar" data-go="${userPath(p.handle)}">${initials(p.author)}</div>
                <div>
                    <p class="detail-post-author link-user" data-go="${userPath(p.handle)}">${escapeHtml(p.author)}</p>
                    <p class="account-handle">${escapeHtml(p.handle)}</p>
                </div>
            </div>
            <p class="detail-post-text">${escapeHtml(p.text)}</p>
            <p class="detail-meta">${escapeHtml(p.time)} yang lalu &middot; ${chip(p.category)}</p>
            <p class="profile-stats"><span><strong>${formatCount(likes)}</strong> Suka</span></p>
            ${actionsHtml(p, state, "detail-post-actions")}
        </article>
        ${sectionHtml("Balasan", replies.map(r => `
            <div class="post reply">
                <div class="post-avatar">${initials(r.author)}</div>
                <div class="post-body">
                    <p class="post-author"><strong>${escapeHtml(r.author)}</strong> <span>${escapeHtml(r.handle)}</span></p>
                    <p class="post-text">${escapeHtml(r.text)}</p>
                </div>
            </div>`).join(""))}`;
}

function renderDetail() {
    switch (view.type) {
        case "news": return renderNewsDetail(view.id);
        case "trend": return renderTrendDetail(view.id);
        case "user": return renderUserDetail(view.id);
        case "post": return renderPostDetail(view.id);
        default: return notFoundHtml();
    }
}


/* ---------- Render ---------- */

function renderResults() {
    renderTabs();

    if (view) {
        resultsEl.innerHTML = renderDetail();
        return;
    }

    const html = renderNews() + renderTrends() + renderAccounts() + renderPosts();

    if (!html.trim()) {
        resultsEl.innerHTML = `
            <div class="empty-state">
                <h2>Tidak ada hasil</h2>
                <p>Coba kata kunci lain atau pilih kategori yang berbeda.</p>
            </div>`;
        return;
    }

    resultsEl.innerHTML = html;
}

function renderSideNews() {
    if (sideNewsEl.dataset.closed === "true") {
        sideNewsEl.hidden = true;
        return;
    }

    const top = newsList.slice(0, 3);

    sideNewsEl.innerHTML = `
        <div class="widget-head">
            <h2>Berita Hari Ini</h2>
            <button class="widget-close" id="close-news" aria-label="Tutup">&times;</button>
        </div>
        ${top.map(n => `
            <a class="widget-row" data-go="news/${n.id}" tabindex="0">
                <span class="widget-row__topic">${escapeHtml(n.title)}</span>
                <span class="widget-row__count">${escapeHtml(n.time)} &middot; ${escapeHtml(n.category)} &middot; ${formatCount(n.posts)} postingan</span>
            </a>
        `).join("")}`;
}

function renderSideFollow() {
    const top = accounts.slice(0, 3);

    sideFollowEl.innerHTML = `
        <h2>Siapa yang diikuti</h2>
        ${top.map(a => `
            <div class="widget-user" data-go="${userPath(a.handle)}" tabindex="0" role="button">
                <div class="account-avatar">${initials(a.name)}</div>
                <div class="account-info">
                    <p class="account-name">${escapeHtml(a.name)}</p>
                    <p class="account-handle">${escapeHtml(a.handle)}</p>
                </div>
                ${followButton(a.handle)}
            </div>
        `).join("")}
        <a class="widget-more" href="#" data-more-follow>Tampilkan lebih banyak</a>`;
}

function renderSide() {
    renderSideNews();
    renderSideFollow();
}

function render() {
    renderResults();
    renderSide();
}


/* ---------- Search ---------- */

function saveHistory(term) {
    term = term.trim();
    if (!term) return;

    searchHistory = [
        term,
        ...searchHistory.filter(h => h.toLowerCase() !== term.toLowerCase())
    ].slice(0, MAX_HISTORY);

    writeJSON(HISTORY_KEY, searchHistory);
}

function dropdownRow(icon, text, removable, subtitle) {
    const idx = dropdownItems.length - 1;
    return `
        <div class="dropdown-row" data-idx="${idx}" tabindex="0" role="button">
            <span class="dropdown-icon" aria-hidden="true">${icon}</span>
            <span class="dropdown-text">
                ${escapeHtml(text)}
                ${subtitle ? `<small>${escapeHtml(subtitle)}</small>` : ""}
            </span>
            ${removable ? `<button class="dropdown-remove" data-remove="${idx}" aria-label="Hapus dari riwayat">&times;</button>` : ""}
        </div>`;
}

function renderDropdown() {
    const typed = searchEl.value.trim();
    const q = typed.toLowerCase();
    let html = "";
    dropdownItems = [];

    if (!typed) {
        if (searchHistory.length === 0) {
            html = `<div class="dropdown-empty">Coba cari orang, topik, atau kata kunci</div>`;
        } else {
            html = `
                <div class="dropdown-head">
                    <span>Pencarian terbaru</span>
                    <button class="dropdown-clear" data-clear-all>Hapus semua</button>
                </div>`;
            searchHistory.forEach(term => {
                dropdownItems.push(term);
                html += dropdownRow("&#128339;", term, true);
            });
        }
    } else {
        dropdownItems.push(typed);
        html += dropdownRow("&#128269;", "Cari \"" + typed + "\"", false);

        const historyMatches = searchHistory.filter(h => h.toLowerCase().includes(q));
        historyMatches.forEach(term => {
            dropdownItems.push(term);
            html += dropdownRow("&#128339;", term, true);
        });

        const trendMatches = trends
            .filter(t => t.topic.toLowerCase().includes(q))
            .filter(t => !historyMatches.some(h => h.toLowerCase() === t.topic.toLowerCase()))
            .slice(0, 5);

        trendMatches.forEach(t => {
            dropdownItems.push(t.topic);
            html += dropdownRow("&#128200;", t.topic, false, "Trending di Indonesia");
        });
    }

    dropdownEl.innerHTML = html;
}

function openDropdown() {
    renderDropdown();
    dropdownEl.hidden = false;
}

function closeDropdown() {
    dropdownEl.hidden = true;
}

function runSearch(term) {
    leaveDetail();
    searchEl.value = term;
    query = term.trim();
    saveHistory(term);
    renderResults();
    closeDropdown();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

searchEl.addEventListener("focus", openDropdown);

searchEl.addEventListener("click", () => {
    if (dropdownEl.hidden) openDropdown();
});

searchEl.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        const term = searchEl.value.trim();
        if (term) saveHistory(term);
        closeDropdown();
        searchEl.blur();
    } else if (event.key === "Escape") {
        closeDropdown();
        searchEl.blur();
    }
});

dropdownEl.addEventListener("click", event => {
    const removeBtn = event.target.closest("[data-remove]");
    if (removeBtn) {
        event.stopPropagation();
        const term = dropdownItems[Number(removeBtn.dataset.remove)];
        searchHistory = searchHistory.filter(h => h !== term);
        writeJSON(HISTORY_KEY, searchHistory);
        renderDropdown();
        return;
    }

    if (event.target.closest("[data-clear-all]")) {
        searchHistory = [];
        writeJSON(HISTORY_KEY, searchHistory);
        renderDropdown();
        return;
    }

    const row = event.target.closest("[data-idx]");
    if (row) {
        runSearch(dropdownItems[Number(row.dataset.idx)]);
    }
});

dropdownEl.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const row = event.target.closest("[data-idx]");
    if (row) runSearch(dropdownItems[Number(row.dataset.idx)]);
});

document.addEventListener("mousedown", event => {
    if (!searchWrapEl.contains(event.target)) closeDropdown();
});

searchEl.addEventListener("input", () => {
    if (view) leaveDetail();
    query = searchEl.value.trim();
    renderResults();
    renderDropdown();
    dropdownEl.hidden = false;
});


/* ---------- Click handling ---------- */

tabsEl.addEventListener("click", event => {
    const button = event.target.closest("[data-tab]");
    if (!button) return;
    currentTab = button.dataset.tab;
    renderResults();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function handleFollowClick(event) {
    const followBtn = event.target.closest("[data-follow]");
    if (!followBtn) return false;
    event.stopPropagation();
    toggleFollow(followBtn.dataset.follow);
    renderResults();
    renderSideFollow();
    return true;
}

// Menangani semua elemen yang bisa dibuka: data-go, data-back, data-cat, data-search
function handleGo(event) {
    const back = event.target.closest("[data-back]");
    if (back) {
        goBack();
        return true;
    }

    const cat = event.target.closest("[data-cat]");
    if (cat) {
        leaveDetail();
        const c = cat.dataset.cat;
        currentTab = tabs.includes(c) ? c : "Explore";
        searchEl.value = "";
        query = "";
        renderResults();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return true;
    }

    const search = event.target.closest("[data-search]");
    if (search) {
        runSearch(search.dataset.search);
        return true;
    }

    const go = event.target.closest("[data-go]");
    if (go) {
        navigate(go.dataset.go);
        return true;
    }

    return false;
}

resultsEl.addEventListener("click", event => {
    if (handleFollowClick(event)) return;

    const replyBtn = event.target.closest("[data-reply]");
    if (replyBtn) {
        event.stopPropagation();
        navigate("post/" + replyBtn.dataset.reply);
        return;
    }

    const postBtn = event.target.closest("[data-post]");
    if (postBtn) {
        event.stopPropagation();
        togglePost(postBtn.dataset.post, postBtn.dataset.type);
        renderResults();
        return;
    }

    handleGo(event);
});

resultsEl.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    // Hanya jika elemen itu sendiri yang fokus (bukan tombol di dalamnya)
    const item = event.target.closest("[data-go]");
    if (item && event.target === item) item.click();
});

sideFollowEl.addEventListener("click", event => {
    if (handleFollowClick(event)) return;

    if (event.target.closest("[data-more-follow]")) {
        event.preventDefault();
        leaveDetail();
        currentTab = "Explore";
        searchEl.value = "";
        query = "";
        render();
        const target = resultsEl.querySelector(".account-row");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    handleGo(event);
});

sideFollowEl.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const item = event.target.closest("[data-go]");
    if (item && event.target === item) item.click();
});

sideNewsEl.addEventListener("click", event => {
    if (event.target.closest("#close-news")) {
        sideNewsEl.dataset.closed = "true";
        sideNewsEl.hidden = true;
        return;
    }

    handleGo(event);
});

sideNewsEl.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const item = event.target.closest("[data-go]");
    if (item && event.target === item) item.click();
});


window.addEventListener("storage", event => {
    if (event.key === BOOKMARK_KEY || event.key === POST_KEY) renderResults();
});

render();

fetch("../sidebar.html")
    .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;
    })
    .catch(err => console.error("Sidebar gagal dimuat:", err));