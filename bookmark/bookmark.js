const BOOKMARK_KEY = "bookmarks";
const DEFAULT_AVATAR = "../image/Default_pfp.jpeg";

const listEl = document.getElementById("bookmark-list");
const emptyEl = document.querySelector(".bookmark-empty");
const searchEl = document.getElementById("bookmark-search");

function getBookmarks() {
    try {
        return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || [];
    } catch (e) {
        return [];
    }
}

function saveBookmarks(list) {
    try {
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list));
    } catch (e) {}
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function renderBookmarks() {
    const all = getBookmarks();
    const keyword = searchEl.value.trim().toLowerCase();

    const list = all.filter(p =>
        !keyword ||
        (p.text + " " + p.name + " " + p.handle + " " + p.community)
            .toLowerCase()
            .includes(keyword)
    );

    emptyEl.hidden = all.length > 0;

    if (all.length > 0 && list.length === 0) {
        listEl.innerHTML = `<p class="no-result">Tidak ada hasil untuk "${escapeHtml(keyword)}"</p>`;
        return;
    }

    listEl.innerHTML = list.map(post => `
        <article class="post" data-id="${escapeHtml(post.id)}">
            <img class="post-avatar" src="${DEFAULT_AVATAR}" alt="Foto profil ${escapeHtml(post.name)}">

            <div class="post-body">
                <div class="post-community">${escapeHtml(post.community)}</div>
                <p class="post-author">
                    <strong>${escapeHtml(post.name)}</strong>
                    <span>${escapeHtml(post.handle)} · ${escapeHtml(post.time)}</span>
                </p>
                <p class="post-text">${escapeHtml(post.text)}</p>
                <div class="post-actions">
                    <button class="action-btn bookmark-btn active" data-action="remove" aria-label="Hapus dari bookmark">
                        <span class="icon">🔖</span>
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

listEl.addEventListener("click", event => {
    const btn = event.target.closest('[data-action="remove"]');
    if (!btn) return;

    const id = btn.closest(".post").dataset.id;
    saveBookmarks(getBookmarks().filter(p => p.id !== id));
    renderBookmarks();
});

searchEl.addEventListener("input", renderBookmarks);

renderBookmarks();

fetch("../sidebar.html")
    .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;
    })
    .catch(err => console.error("Sidebar gagal dimuat:", err));

fetch("../trending.html")
    .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("trending").innerHTML = html;
    })
    .catch(err => console.error("Trending gagal dimuat:", err));