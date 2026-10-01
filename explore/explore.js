const tabs = ["Untuk Kamu", "Trending", "Olahraga", "Teknologi", "Hiburan"];

const trends = [
    { id: 1, category: "Olahraga", topic: "Derby Akhir Pekan", posts: 48200 },
    { id: 2, category: "Teknologi", topic: "Update Keamanan 2FA", posts: 21500 },
    { id: 3, category: "Hiburan", topic: "Comeback K-Pop Minggu Depan", posts: 96400 },
    { id: 4, category: "Olahraga", topic: "Final Ganda Campuran", posts: 33100 },
    { id: 5, category: "Teknologi", topic: "Agen AI untuk Email", posts: 18700 },
    { id: 6, category: "Hiburan", topic: "Plot Twist Drakor", posts: 27800 },
    { id: 7, category: "Teknologi", topic: "HP Mid-range vs Flagship", posts: 12900 },
    { id: 8, category: "Olahraga", topic: "Lari Pagi di GBK", posts: 9400 },
    { id: 9, category: "Hiburan", topic: "Open Mic Stand-up", posts: 7600 }
];

const accounts = [
    { id: 1, name: "Sari Developer", handle: "@sari_dev", category: "Teknologi", bio: "Berbagi tips rapi-rapi kode dan struktur project." },
    { id: 2, name: "Bagus Bola", handle: "@bagus_bola", category: "Olahraga", bio: "Analisis Liga 1 setiap akhir pekan." },
    { id: 3, name: "Ayu Kpop", handle: "@ayu_bts", category: "Hiburan", bio: "Update comeback dan rekomendasi lagu B-side." },
    { id: 4, name: "Kevin AI", handle: "@kevin_ai", category: "Teknologi", bio: "Eksperimen kecil dengan agen dan prompt." }
];

const posts = [
    { id: 1, category: "Olahraga", author: "Wulan", handle: "@wulan_bwf", time: "1j", text: "Ganda campuran kita makin solid, nonton final semalam seru banget." },
    { id: 2, category: "Teknologi", author: "Hendra", handle: "@hendra_sec", time: "2j", text: "Reminder: aktifkan 2FA di semua akun penting kalian, sekarang juga." },
    { id: 3, category: "Hiburan", author: "Sinta", handle: "@sinta_drakor", time: "50m", text: "Episode kemarin plot twist-nya bikin nggak bisa tidur." },
    { id: 4, category: "Teknologi", author: "Vina", handle: "@vina_be", time: "3j", text: "Baru sadar query N+1 bikin API lambat banget. Pelajaran mahal." },
    { id: 5, category: "Olahraga", author: "Dimas", handle: "@dimasruns", time: "1h", text: "Ada yang mau lari bareng di GBK Minggu pagi?" },
    { id: 6, category: "Hiburan", author: "Reza", handle: "@reza_mic", time: "3j", text: "Materi baru semalam di open mic, penonton ketawa di tempat yang nggak kuduga." }
];

const FOLLOW_KEY = "followedAccounts";
const POST_KEY = "explorePostActions";

let currentTab = tabs[0];
let query = "";
let followed = new Set(readJSON(FOLLOW_KEY, []));

const tabsEl = document.getElementById("tabs");
const resultsEl = document.getElementById("results");
const searchEl = document.getElementById("search");

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
    const pattern = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
    if (n >= 1000) return Math.round(n / 1000) + " rb";
    return String(n);
}

function matchesQuery(...fields) {
    if (!query) return true;
    const q = query.toLowerCase();
    return fields.some(f => f.toLowerCase().includes(q));
}

function matchesTab(category) {
    return currentTab === "Untuk Kamu" || currentTab === "Trending" || category === currentTab;
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

function renderTabs() {
    tabsEl.innerHTML = tabs.map(tab => `
        <button class="explore-tab${tab === currentTab ? " active" : ""}" data-tab="${tab}">${tab}</button>
    `).join("");
}

function renderTrends() {
    let list = trends.filter(t => matchesTab(t.category) && matchesQuery(t.topic, t.category));

    if (currentTab === "Trending") {
        list = [...list].sort((a, b) => b.posts - a.posts);
    }

    if (list.length === 0) return "";

    return `
        <h2 class="section-title">Sedang trending di Indonesia</h2>
        ${list.map((t, i) => `
            <div class="trend" data-trend="${escapeHtml(t.topic)}" tabindex="0" role="button">
                <span class="trend-rank">${i + 1}</span>
                <div class="trend-info">
                    <p class="trend-meta">${escapeHtml(t.category)} &middot; Trending</p>
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
        <h2 class="section-title">Akun untuk diikuti</h2>
        ${list.map(a => {
            const isFollowing = followed.has(a.id);
            return `
            <div class="account-row">
                <div class="account-avatar">${initials(a.name)}</div>
                <div class="account-info">
                    <p class="account-name">${highlight(a.name)}</p>
                    <p class="account-handle">${highlight(a.handle)}</p>
                    <p class="account-bio">${highlight(a.bio)}</p>
                </div>
                <button class="follow-button${isFollowing ? " following" : ""}" data-follow="${a.id}">
                    ${isFollowing ? "Mengikuti" : "Ikuti"}
                </button>
            </div>`;
        }).join("")}`;
}

function renderPosts() {
    if (currentTab === "Trending") return "";

    const list = posts.filter(p =>
        matchesTab(p.category) && matchesQuery(p.text, p.author, p.handle)
    );

    if (list.length === 0) return "";

    return `
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
    const html = renderTrends() + renderAccounts() + renderPosts();

    if (!html) {
        resultsEl.innerHTML = `
            <div class="empty-state">
                <h2>Tidak ada hasil</h2>
                <p>Coba kata kunci lain atau pilih kategori yang berbeda.</p>
            </div>`;
        return;
    }

    resultsEl.innerHTML = html;
}

function render() {
    renderTabs();
    renderResults();
}

searchEl.addEventListener("input", () => {
    query = searchEl.value.trim();
    renderResults();
});

tabsEl.addEventListener("click", event => {
    const button = event.target.closest("[data-tab]");
    if (!button) return;
    currentTab = button.dataset.tab;
    render();
});

resultsEl.addEventListener("click", event => {
    const followBtn = event.target.closest("[data-follow]");
    if (followBtn) {
        const id = Number(followBtn.dataset.follow);
        if (followed.has(id)) {
            followed.delete(id);
        } else {
            followed.add(id);
        }
        writeJSON(FOLLOW_KEY, [...followed]);
        renderResults();
        return;
    }

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
    }
});

resultsEl.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const trend = event.target.closest("[data-trend]");
    if (trend) trend.click();
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