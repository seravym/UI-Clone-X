const tabs = ["Explore", "Trending", "News", "Sports", "Entertainment"];

const newsList = [
    { id: 1, category: "Entertainment", title: "Jaemin NCT DREAM Hadir di Pop-up Anniversary Lee 101 di Seoul", time: "12 jam lalu", posts: 61000 },
    { id: 2, category: "Sports", title: "Indonesia Libas Bangladesh 6-1 di Babak Pertama Laga Piala ASEAN", time: "Sedang trending", posts: 573 },
    { id: 3, category: "Entertainment", title: "EVAN Buka Heetober dengan Kemenangan Musik dan Ulang Tahun", time: "22 jam lalu", posts: 22000 },
    { id: 4, category: "News", title: "Presiden Umumkan Reshuffle Kabinet dan Kapolri Baru", time: "7 jam lalu", posts: 27500 },
    { id: 5, category: "News", title: "BMKG Prediksi Hujan Lebat di Sebagian Wilayah Jabodetabek", time: "4 jam lalu", posts: 14200 },
    { id: 6, category: "Sports", title: "Final Ganda Campuran Tutup Turnamen dengan Skor Dramatis", time: "9 jam lalu", posts: 33100 },
    { id: 7, category: "News", title: "Pemerintah Siapkan Aturan Baru Keamanan Data Pribadi", time: "11 jam lalu", posts: 9800 },
    { id: 8, category: "Entertainment", title: "Drakor Terbaru Pecahkan Rekor Rating Episode Perdana", time: "15 jam lalu", posts: 18300 }
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
    { id: 1, name: "detikcom", handle: "@detikcom", category: "News", bio: "Berita terkini, terpercaya, dan terlengkap dari Indonesia." },
    { id: 2, name: "haduhaduh", handle: "@bintangemon", category: "Entertainment", bio: "Meme, hiburan, dan kabar receh setiap hari." },
    { id: 3, name: "Joko Widodo", handle: "@jokowi", category: "News", bio: "Akun resmi Presiden ke-7 Republik Indonesia." },
    { id: 4, name: "Bagus Bola", handle: "@bagus_bola", category: "Sports", bio: "Analisis Liga 1 dan Timnas setiap akhir pekan." },
    { id: 5, name: "Ayu Kpop", handle: "@ayu_bts", category: "Entertainment", bio: "Update comeback dan rekomendasi lagu B-side." },
    { id: 6, name: "Sari Developer", handle: "@sari_dev", category: "Teknologi", bio: "Berbagi tips rapi-rapi kode dan struktur project." }
];

const posts = [
    { id: 1, category: "Sports", author: "Wulan", handle: "@wulan_bwf", time: "1j", text: "Ganda campuran kita makin solid, nonton final semalam seru banget." },
    { id: 2, category: "News", author: "Hendra", handle: "@hendra_sec", time: "2j", text: "Reminder: aktifkan 2FA di semua akun penting kalian, sekarang juga." },
    { id: 3, category: "Entertainment", author: "Sinta", handle: "@sinta_drakor", time: "50m", text: "Episode kemarin plot twist-nya bikin nggak bisa tidur." },
    { id: 4, category: "Sports", author: "Dimas", handle: "@dimasruns", time: "1h", text: "Timnas main bagus banget malam ini, 6-1 di babak pertama!" },
    { id: 5, category: "News", author: "Rina", handle: "@rina_news", time: "3j", text: "Cuaca Jakarta lagi nggak bersahabat, jangan lupa bawa payung." },
    { id: 6, category: "Entertainment", author: "Reza", handle: "@reza_mic", time: "3j", text: "Materi baru semalam di open mic, penonton ketawa di tempat yang nggak kuduga." }
];

const FOLLOW_KEY = "followedAccounts";
const POST_KEY = "explorePostActions";

let currentTab = tabs[0];
let query = "";
let followed = new Set(readJSON(FOLLOW_KEY, []));

const tabsEl = document.getElementById("tabs");
const resultsEl = document.getElementById("results");
const searchEl = document.getElementById("search");
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
    if (!query) return safe;
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
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".", ",") + " jt";
    if (n >= 1000) return (n / 1000).toFixed(1).replace(".", ",").replace(",0", "") + " rb";
    return String(n);
}

function matchesQuery(...fields) {
    if (!query) return true;
    const q = query.toLowerCase();
    return fields.some(f => f.toLowerCase().includes(q));
}

function matchesTab(category) {
    return currentTab === "Explore" || currentTab === "Trending" || category === currentTab;
}

function getPostState(id) {
    const all = readJSON(POST_KEY, {});
    return all[id] || { liked: false, saved: false };
}

function togglePost(id, type) {
    const all = readJSON(POST_KEY, {});
    const current = all[id] || { liked: false, saved: false };
    current[type] = !current[type];
    all[id] = current;
    writeJSON(POST_KEY, all);
}

function toggleFollow(id) {
    if (followed.has(id)) {
        followed.delete(id);
    } else {
        followed.add(id);
    }
    writeJSON(FOLLOW_KEY, [...followed]);
}

function followButton(id) {
    const isFollowing = followed.has(id);
    return `
        <button class="follow-button${isFollowing ? " following" : ""}" data-follow="${id}">
            ${isFollowing ? "Mengikuti" : "Ikuti"}
        </button>`;
}

/* ---------- Render: tabs ---------- */

function renderTabs() {
    tabsEl.innerHTML = tabs.map(tab => `
        <button class="explore-tab${tab === currentTab ? " active" : ""}" data-tab="${tab}">${tab}</button>
    `).join("");
}

/* ---------- Render: konten utama ---------- */

function renderNews() {
    if (currentTab === "Trending") return "";

    const list = newsList.filter(n => matchesTab(n.category) && matchesQuery(n.title, n.category));
    if (list.length === 0) return "";

    const title = currentTab === "Explore" ? "Berita Hari Ini" : "Berita " + currentTab;

    return `
        <h2 class="section-title">${escapeHtml(title)}</h2>
        ${list.map(n => `
            <div class="news-item" data-news="${escapeHtml(n.title)}" tabindex="0" role="button">
                <p class="news-title">${highlight(n.title)}</p>
                <p class="news-meta">
                    <span class="news-avatars" aria-hidden="true"><span></span><span></span><span></span></span>
                    <span>${escapeHtml(n.time)} &middot; ${escapeHtml(n.category)} &middot; ${formatCount(n.posts)} postingan</span>
                </p>
            </div>
        `).join("")}
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
        ${list.map((t, i) => `
            <div class="trend" data-trend="${escapeHtml(t.topic)}" tabindex="0" role="button">
                <span class="trend-rank">${i + 1}</span>
                <div class="trend-info">
                    <p class="trend-meta">${escapeHtml(t.category)} &middot; Trending di Indonesia</p>
                    <p class="trend-topic">${highlight(t.topic)}</p>
                    <p class="trend-count">${formatCount(t.posts)} postingan</p>
                </div>
            </div>
        `).join("")}`;
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
        ${list.map(a => `
            <div class="account-row">
                <div class="account-avatar">${initials(a.name)}</div>
                <div class="account-info">
                    <p class="account-name">${highlight(a.name)}</p>
                    <p class="account-handle">${highlight(a.handle)}</p>
                    <p class="account-bio">${highlight(a.bio)}</p>
                </div>
                ${followButton(a.id)}
            </div>
        `).join("")}`;
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
        ${list.map(p => {
            const state = getPostState(p.id);
            return `
            <article class="post">
                <div class="post-avatar">${initials(p.author)}</div>
                <div class="post-body">
                    <div class="post-category">${escapeHtml(p.category)}</div>
                    <p class="post-author">
                        <strong>${highlight(p.author)}</strong>
                        <span>${highlight(p.handle)} &middot; ${escapeHtml(p.time)}</span>
                    </p>
                    <p class="post-text">${highlight(p.text)}</p>
                    <div class="post-actions">
                        <button class="action-btn${state.liked ? " active" : ""}" data-post="${p.id}" data-type="liked" aria-label="Suka">
                            <span>${state.liked ? "♥" : "♡"}</span>
                            <span>${state.liked ? "Disukai" : "Suka"}</span>
                        </button>
                        <button class="action-btn${state.saved ? " active" : ""}" data-post="${p.id}" data-type="saved" aria-label="Simpan">
                            <span>${state.saved ? "🔖" : "🏷️"}</span>
                            <span>${state.saved ? "Tersimpan" : "Simpan"}</span>
                        </button>
                    </div>
                </div>
            </article>`;
        }).join("")}`;
}

function renderResults() {
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

/* ---------- Render: sidebar kanan ---------- */

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
            <a class="widget-row" data-goto="${escapeHtml(n.category)}">
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
            <div class="widget-user">
                <div class="account-avatar">${initials(a.name)}</div>
                <div class="account-info">
                    <p class="account-name">${escapeHtml(a.name)}</p>
                    <p class="account-handle">${escapeHtml(a.handle)}</p>
                </div>
                ${followButton(a.id)}
            </div>
        `).join("")}
        <a class="widget-more" href="#" data-more-follow>Tampilkan lebih banyak</a>`;
}

function renderSide() {
    renderSideNews();
    renderSideFollow();
}

function render() {
    renderTabs();
    renderResults();
    renderSide();
}

/* ---------- Event ---------- */

searchEl.addEventListener("input", () => {
    query = searchEl.value.trim();
    renderResults();
});

tabsEl.addEventListener("click", event => {
    const button = event.target.closest("[data-tab]");
    if (!button) return;
    currentTab = button.dataset.tab;
    renderTabs();
    renderResults();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

function handleFollowClick(event) {
    const followBtn = event.target.closest("[data-follow]");
    if (!followBtn) return false;
    toggleFollow(Number(followBtn.dataset.follow));
    renderResults();
    renderSideFollow();
    return true;
}

resultsEl.addEventListener("click", event => {
    if (handleFollowClick(event)) return;

    const postBtn = event.target.closest("[data-post]");
    if (postBtn) {
        togglePost(postBtn.dataset.post, postBtn.dataset.type);
        renderResults();
        return;
    }

    const trend = event.target.closest("[data-trend]");
    if (trend) {
        searchEl.value = trend.dataset.trend;
        query = trend.dataset.trend;
        renderResults();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    const news = event.target.closest("[data-news]");
    if (news) {
        searchEl.value = "";
        query = "";
        searchEl.value = news.dataset.news.split(" ").slice(0, 2).join(" ");
        query = searchEl.value;
        renderResults();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

resultsEl.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const item = event.target.closest("[data-trend], [data-news]");
    if (item) item.click();
});

sideFollowEl.addEventListener("click", event => {
    if (handleFollowClick(event)) return;

    if (event.target.closest("[data-more-follow]")) {
        event.preventDefault();
        currentTab = "Explore";
        render();
        const target = resultsEl.querySelector(".account-row");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
});

sideNewsEl.addEventListener("click", event => {
    if (event.target.closest("#close-news")) {
        sideNewsEl.dataset.closed = "true";
        sideNewsEl.hidden = true;
        return;
    }

    const row = event.target.closest("[data-goto]");
    if (row) {
        currentTab = row.dataset.goto;
        searchEl.value = "";
        query = "";
        render();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

/* ---------- Init ---------- */

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