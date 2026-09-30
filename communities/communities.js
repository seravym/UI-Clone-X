const categories = ["Sports", "Technology", "Art", "Entertainment", "Gaming"];
const communities = [
    { id: 1, category: "Sports", name: "Liga 1 Fans", members: "12K", post: { author: "Bagus", handle: "@bagus_bola", time: "2j", text: "Derby akhir pekan ini bakal panas. Prediksi skor kalian?" } },
    { id: 2, category: "Sports", name: "Badminton Indonesia", members: "8,4K", post: { author: "Rina", handle: "@rina_smash", time: "5j", text: "Latihan footwork 20 menit tiap pagi bantu banget buat stamina." } },
    { id: 3, category: "Sports", name: "Runners Jakarta", members: "5,1K", post: { author: "Dimas", handle: "@dimasruns", time: "1h", text: "Ada yang mau lari bareng di GBK Minggu pagi?" } },
    { id: 4, category: "Technology", name: "Dev Indonesia", members: "21K", post: { author: "Sari", handle: "@sari_dev", time: "3j", text: "Tips rapiin struktur folder project biar gampang dirawat." } },
    { id: 5, category: "Technology", name: "AI Builders", members: "15K", post: { author: "Kevin", handle: "@kevin_ai", time: "4j", text: "Hari ini nyoba bikin agen kecil buat rangkum email. Hasilnya lumayan." } },
    { id: 6, category: "Art", name: "Digital Art ID", members: "9K", post: { author: "Maya", handle: "@maya_draws", time: "6j", text: "Progress ilustrasi karakter baru, feedback dong." } },
    { id: 7, category: "Art", name: "Sketch Daily", members: "4K", post: { author: "Fajar", handle: "@fajarsketch", time: "1h", text: "Tantangan sketsa hari iniii" } },
    { id: 8, category: "Entertainment", name: "Film dan Serial", members: "18K", post: { author: "Nadia", handle: "@nadiaurrr", time: "2j", text: "Serial yang baru rilis ini bagus banget!!!." } },
    { id: 9, category: "Entertainment", name: "K-Pop Corner", members: "30K", post: { author: "Ayu", handle: "@ayu_bts", time: "30m", text: "Comeback minggu depan, siapa yang udah siap begadang?" } },
    { id: 10, category: "Gaming", name: "Mobile Legends ID", members: "40K", post: { author: "Rafi", handle: "@rafi_ml", time: "1j", text: "Season baru gacorrr parah." } },
    { id: 11, category: "Gaming", name: "GTA Talk", members: "11K", post: { author: "Cinna", handle: "@cinna", time: "1h", text: "Jujurrr GTA nagih bgt sih." } }
];

let currentView = "home";
let currentCategory = categories[0];
let joinedIds = loadJoined();

const homeEl = document.getElementById("home");
const exploreEl = document.getElementById("explore");
const chipsEl = document.querySelector(".category-chips");
const titleEl = document.querySelector(".explore-title");
const listEl = document.querySelector(".community-list");
const tabs = document.querySelectorAll(".nav-tab");

function loadJoined() {
    try {
        return new Set(JSON.parse(localStorage.getItem("joinedCommunities")) || []);
    } catch (e) {
        return new Set();
    }
}

function saveJoined() {
    try {
        localStorage.setItem("joinedCommunities", JSON.stringify([...joinedIds]));
    } catch (e) {}
}

function initials(name) {
    return name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function renderTabs() {
    tabs.forEach(tab => {
        const view = tab.getAttribute("href").replace("#", "");
        tab.classList.toggle("active", view === currentView);
    });

    homeEl.hidden = currentView !== "home";
    exploreEl.hidden = currentView !== "explore";
}

function renderHome() {
    const joined = communities.filter(c => joinedIds.has(c.id));

    if (joined.length === 0) {
        homeEl.innerHTML = `
            <div class="empty-community">
                <h2>You haven't joined any Communities yet</h2>
                <p>Join komunitas di Explore, postingannya akan muncul di sini.</p>
                <button class="join-button" data-action="go-explore">Jelajahi komunitas</button>
            </div>`;
        return;
    }

    homeEl.innerHTML = joined.map(c => `
        <article class="post">
            <div class="post-community">${escapeHtml(c.name)}</div>
            <p class="post-author">
                <strong>${escapeHtml(c.post.author)}</strong>
                <span>${escapeHtml(c.post.handle)} · ${escapeHtml(c.post.time)}</span>
            </p>
            <p class="post-text">${escapeHtml(c.post.text)}</p>
        </article>
    `).join("");
}

function renderExplore() {
    chipsEl.innerHTML = categories.map(cat => `
        <button class="chip${cat === currentCategory ? " active" : ""}" data-category="${cat}">${cat}</button>
    `).join("");

    titleEl.textContent = "Komunitas rekomendasi di " + currentCategory;

    listEl.innerHTML = communities
        .filter(c => c.category === currentCategory)
        .map(c => {
            const isJoined = joinedIds.has(c.id);
            return `
                <div class="community-row">
                    <div class="community-avatar">${initials(c.name)}</div>
                    <div class="community-info">
                        <p class="community-name">${escapeHtml(c.name)}</p>
                        <p class="community-members">${c.members} anggota</p>
                    </div>
                    <button class="join-button${isJoined ? " joined" : ""}" data-id="${c.id}">
                        ${isJoined ? "Joined" : "Join"}
                    </button>
                </div>`;
        })
        .join("");
}

function render() {
    renderTabs();
    renderHome();
    renderExplore();
}

tabs.forEach(tab => {
    tab.addEventListener("click", event => {
        event.preventDefault();
        currentView = tab.getAttribute("href").replace("#", "");
        render();
    });
});

document.querySelector(".communities").addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.action === "go-explore") {
        currentView = "explore";
    } else if (button.dataset.category) {
        currentCategory = button.dataset.category;
    } else if (button.dataset.id) {
        const id = Number(button.dataset.id);
        if (joinedIds.has(id)) {
            joinedIds.delete(id);
        } else {
            joinedIds.add(id);
        }
        saveJoined();
    } else {
        return;
    }

    render();
});

render();