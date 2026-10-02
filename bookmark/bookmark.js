const BOOKMARK_KEY = "bookmarks";
const DEFAULT_AVATAR = "../image/Default_pfp.jpeg";
const LIKE_KEY = "bookmarkLikes";

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

function getLikes() {
    try {
        return JSON.parse(localStorage.getItem(LIKE_KEY)) || {};
    } catch (e) {
        return {};
    }
}

function saveLikes(likes) {
    try {
        localStorage.setItem(LIKE_KEY, JSON.stringify(likes));
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
    const likes = getLikes();

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

    listEl.innerHTML = list.map(post => {
        const liked = !!likes[post.id];

        return `
        <article class="post" data-id="${escapeHtml(post.id)}">
            <img 
                class="post-avatar" 
                src="${DEFAULT_AVATAR}" 
                alt="Foto profil ${escapeHtml(post.name)}"
            >

            <div class="post-body">
                <div class="post-community">
                    ${escapeHtml(post.community)}
                </div>

                <p class="post-author">
                    <strong>${escapeHtml(post.name)}</strong>
                    <span>${escapeHtml(post.handle)} · ${escapeHtml(post.time)}</span>
                </p>

                <p class="post-text">
                    ${escapeHtml(post.text)}
                </p>

                <div class="post-actions">

                    <button class="action-btn" aria-label="Reply">
                        <img 
                            src="../image/icons/chat.svg" 
                            class="action-icon" 
                            alt="Reply"
                        >
                        <span class="count">0</span>
                    </button>

                    <button 
                        class="action-btn like-btn ${liked ? "active" : ""}" 
                        data-action="like" 
                        aria-label="Like"
                    >
                        <img 
                            src="../image/icons/${liked ? "like-full.svg" : "like.svg"}" 
                            class="action-icon" 
                            alt="Like"
                        >
                        <span class="count">${liked ? 1 : 0}</span>
                    </button>

                    <button class="action-btn" aria-label="View">
                        <img 
                            src="../image/icons/view.svg" 
                            class="action-icon" 
                            alt="View"
                        >
                        <span class="count">0</span>
                    </button>

                    <button 
                        class="action-btn bookmark-btn active" 
                        data-action="remove" 
                        aria-label="Hapus dari bookmark"
                    >
                        <img 
                            src="../image/icons/bookmark-full.svg" 
                            class="action-icon" 
                            alt="Bookmark"
                        >
                    </button>

                </div>
            </div>
        </article>
        `;
    }).join("");
}


// LIKE + REMOVE BOOKMARK
listEl.addEventListener("click", event => {

    // LIKE
    const likeBtn = event.target.closest('[data-action="like"]');

    if (likeBtn) {
        const post = likeBtn.closest(".post");
        const id = post.dataset.id;

        const likes = getLikes();

        likes[id] = !likes[id];

        saveLikes(likes);
        renderBookmarks();

        return;
    }


    // REMOVE BOOKMARK
    const removeBtn = event.target.closest('[data-action="remove"]');

    if (removeBtn) {
        const post = removeBtn.closest(".post");
        const id = post.dataset.id;

        saveBookmarks(
            getBookmarks().filter(p => p.id !== id)
        );

        renderBookmarks();
    }
});


searchEl.addEventListener("input", renderBookmarks);

renderBookmarks();


// SIDEBAR
fetch("../sidebar.html")
    .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;
    })
    .catch(err => console.error("Sidebar gagal dimuat:", err));


// TRENDING
const bookmarkTrends = [
    { tag: "#SepakBola", cat: "Olahraga", count: 26300 },
    { tag: "#KonserAkhirTahun", cat: "Hiburan", count: 21500 },
    { tag: "#Jakarta", cat: "Berita", count: 18400 },
    { tag: "#KecerdasanBuatan", cat: "Teknologi", count: 15400 },
    { tag: "#gaming", cat: "Hiburan", count: 12800 }
];

function renderBookmarkTrending() {
    const container = document.getElementById("bookmarkTrending");

    if (!container) return;

    container.innerHTML = bookmarkTrends.map(trend => `
        <a 
            class="bookmark-trend-item" 
            href="../trending/trending.html"
        >
            <span class="bookmark-trend-category">
                ${trend.cat} · Sedang tren
            </span>

            <span class="bookmark-trend-tag">
                ${trend.tag}
            </span>

            <span class="bookmark-trend-count">
                ${formatTrendCount(trend.count)} postingan
            </span>
        </a>
    `).join("");
}

function formatTrendCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(".0", "") + " rb";
    }

    return count;
}

renderBookmarkTrending();