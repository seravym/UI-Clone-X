// ===== LIKE SYSTEM =====
(function () {
    const IDS_KEY = "likedPosts";
    const DATA_KEY = "likedData";
    const ICON_DIR = "../image/icons/";
    const ICON_OFF = ICON_DIR + "like.svg";
    const ICON_ON = ICON_DIR + "like-full.svg";

    function read(key) {
        try { return JSON.parse(localStorage.getItem(key)) || []; }
        catch (e) { return []; }
    }
    function write(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); }
        catch (e) { console.error("Gagal menyimpan like:", e); }
    }
    function esc(text) {
        const d = document.createElement("div");
        d.textContent = text == null ? "" : text;
        return d.innerHTML;
    }

    function paint(btn, liked, count) {
        const icon = btn.querySelector("img");
        const countEl = btn.querySelector(".like-count");
        if (icon) icon.src = liked ? ICON_ON : ICON_OFF;
        btn.classList.toggle("liked", liked);
        if (countEl && count !== undefined) countEl.textContent = count;
    }

    function getPostData(postEl, count) {
        const textEl = postEl.querySelector(".post-text") || postEl.querySelector("p");
        const avatarEl = postEl.querySelector(".post-profile");
        const nameEl = postEl.querySelector(".post-name");
        const handleEl = postEl.querySelector(".post-username");
        return {
            id: postEl.dataset.id,
            name: nameEl ? nameEl.textContent.trim() : "",
            handle: handleEl ? handleEl.textContent.trim() : "",
            time: postEl.dataset.time || "",
            text: textEl ? textEl.textContent.trim() : "",
            avatar: avatarEl ? avatarEl.getAttribute("src") : "",
            count: count
        };
    }

    function initButtons() {
        const ids = read(IDS_KEY);
        let data = read(DATA_KEY);
        let changed = false;

        document.querySelectorAll(".like-button").forEach(btn => {
            if (btn.closest("#likes-list")) return;
            const post = btn.closest("[data-id]");
            const countEl = btn.querySelector(".like-count");
            if (!post || !countEl) return;

            if (btn.dataset.base === undefined) {
                btn.dataset.base = parseInt(countEl.textContent) || 0;
            }
            const base = parseInt(btn.dataset.base);
            const liked = ids.includes(post.dataset.id);
            paint(btn, liked, base + (liked ? 1 : 0));

            if (liked && !data.some(p => p.id === post.dataset.id)) {
                data.push(getPostData(post, base + 1));
                changed = true;
            }
        });

        if (changed) write(DATA_KEY, data);
    }

    function toggle(postEl) {
        const id = postEl.dataset.id;
        const btn = postEl.querySelector(".like-button");
        const countEl = btn ? btn.querySelector(".like-count") : null;
        const base = btn && btn.dataset.base !== undefined
            ? parseInt(btn.dataset.base)
            : (countEl ? parseInt(countEl.textContent) || 0 : 0);

        let ids = read(IDS_KEY);
        let data = read(DATA_KEY);
        const wasLiked = ids.includes(id);

        if (wasLiked) {
            ids = ids.filter(x => x !== id);
            data = data.filter(p => p.id !== id);
        } else {
            ids.push(id);
            data = data.filter(p => p.id !== id);
            data.push(getPostData(postEl, base + 1));
        }

        write(IDS_KEY, ids);
        write(DATA_KEY, data);
        return !wasLiked;
    }

    document.addEventListener("click", e => {
        const btn = e.target.closest(".like-button");
        if (!btn) return;

        const inList = !!btn.closest("#likes-list");
        const postEl = btn.closest("[data-id]");
        if (!postEl) return;
        const id = postEl.dataset.id;

        if (inList) {
            write(IDS_KEY, read(IDS_KEY).filter(x => x !== id));
            write(DATA_KEY, read(DATA_KEY).filter(p => p.id !== id));
            initButtons();
            renderList();
            return;
        }

        const liked = toggle(postEl);
        const base = parseInt(btn.dataset.base) || 0;
        paint(btn, liked, base + (liked ? 1 : 0));

        btn.classList.remove("pop");
        void btn.offsetWidth;
        if (liked) btn.classList.add("pop");
    });

    function renderList() {
        const box = document.getElementById("likes-list");
        if (!box) return;
        const data = read(DATA_KEY);

        if (!data.length) {
            box.innerHTML = '<p style="padding:20px">Belum ada yang di-like.</p>';
            return;
        }

        box.innerHTML = data.map(p => `
            <div class="dummy-post" data-id="${esc(p.id)}">
                <div class="post-header">
                    <img class="post-profile" src="${esc(p.avatar || "default.jpg")}" alt="">
                    <div>
                        <strong class="post-name">${esc(p.name)}</strong>
                        <span class="post-username">${esc(p.handle)}${p.time ? " · " + esc(p.time) : ""}</span>
                    </div>
                </div>
                <p class="post-text">${esc(p.text)}</p>
                <div class="post-actions">
                    <button class="action-item like-button liked" type="button">
                        <img src="${ICON_ON}" class="action-icon-like" alt="Unlike">
                        <span class="like-count">${esc(p.count)}</span>
                    </button>
                </div>
            </div>`).join("");
    }

    function initLikesTab() {
        const box = document.getElementById("likes-list");
        if (!box) return;

        document.querySelectorAll(".tab-button").forEach(tab => {
            tab.addEventListener("click", () => {
                if (tab.dataset.tab === "likes") {
                    document.querySelectorAll(".dummy-post").forEach(p => {
                        if (!p.closest("#likes-list")) p.style.display = "none";
                    });
                    renderList();
                    box.hidden = false;
                } else {
                    box.hidden = true;
                }
            });
        });
    }

    initButtons();
    initLikesTab();

    window.Likes = {
        toggle: toggle,
        isLiked: id => read(IDS_KEY).includes(id),
        getData: () => read(DATA_KEY),
        refresh: initButtons
    };
})();

// ===== POSTS & TAB SYSTEM =====
const posts = document.querySelectorAll(".dummy-post");
const tabs = document.querySelectorAll(".tab-button");

tabs.forEach(tab => {
    tab.addEventListener("click", function () {
        const selectedTab = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        if (selectedTab === "posts") {
            posts.forEach(post => post.style.display = "block");
        } else if (selectedTab === "replies") {
            posts.forEach(post => post.style.display = "none");
        }
        // tab "likes" diurus oleh blok LIKE SYSTEM di atas
    });
});