const DEFAULT_AVATAR = "../image/Default_pfp.jpeg";
const ME = { name: "user", handle: "@user" };
const ICON = "☷";

const COLORS = {
    purple: "#8747d4",
    lightblue: "#65c8ec",
    pink: "#e91e63",
    teal: "#00d4b4",
    navy: "#0b4f9e",
    blue: "#1d9bf0"
};

const PEOPLE = [
    {
        id: "u1",
        name: "BWF Update",
        handle: "@bwf_update",
        time: "1m",
        text: "Dutch Open babak 32 besar: laga tunggal putra berlangsung 3 gim, selesai dalam 63 menit."
    },
    {
        id: "u2",
        name: "Liga Harian",
        handle: "@liga_harian",
        time: "12m",
        text: "Klasemen sementara berubah, tim tuan rumah naik ke posisi tiga setelah menang tipis."
    },
    {
        id: "u3",
        name: "Berita Harian ID",
        handle: "@beritaharianid",
        time: "20m",
        text: "Pemerintah umumkan jadwal baru perbaikan jalan tol di wilayah Jabodetabek."
    },
    {
        id: "u4",
        name: "Info Jakarta",
        handle: "@infojakarta",
        time: "35m",
        text: "Hujan deras diperkirakan turun sore ini di sebagian besar Jakarta Selatan dan Timur."
    },
    {
        id: "u5",
        name: "Kabar Ekonomi",
        handle: "@kabarekonomi",
        time: "1j",
        text: "Rupiah menguat tipis terhadap dolar AS di awal perdagangan hari ini."
    },
    {
        id: "u6",
        name: "Tech Radar ID",
        handle: "@techradar_id",
        time: "2j",
        text: "Peluncuran ponsel lipat terbaru dijadwalkan bulan depan, ini bocoran spesifikasinya."
    },
    {
        id: "u7",
        name: "Dev Daily",
        handle: "@devdaily",
        time: "3j",
        text: "Tips hari ini: gunakan event delegation supaya listener tidak menumpuk."
    },
    {
        id: "u8",
        name: "Atlet Muda",
        handle: "@atletmuda",
        time: "4j",
        text: "Latihan pagi selesai. Konsistensi lebih penting daripada intensitas sesaat."
    },
    {
        id: "u9",
        name: "Kuliner Kita",
        handle: "@kulinerkita",
        time: "5j",
        text: "Rekomendasi sarapan murah di sekitar kampus, semuanya di bawah 20 ribu."
    },
    {
        id: "u10",
        name: "Media Nusantara",
        handle: "@medianusantara",
        time: "6j",
        text: "Rangkuman berita pagi: politik, ekonomi, dan olahraga dalam satu thread."
    }
];

const OWNERS = [
    { name: "Edy Prayogo", handle: "@edyprayogo_" },
    { name: "Rina Putri", handle: "@rinaputri" },
    { name: "Budi Santoso", handle: "@budi_s" },
    { name: "Maya Lestari", handle: "@maya_l" }
];

const SUGGESTED = [
    ["olahraga", "Olahraga", 37, "8.3K", "@LinceUk47306", "pink", ["u1", "u2", "u8"]],
    ["news-info-id", "News & Info (Indonesia)", 72, "151.2K", "@Indomaret", "purple", ["u3", "u4", "u5"]],
    ["news-info", "News and Info", 48, "40.3K", "@Versan_Aliarrah", "lightblue", ["u3", "u10", "u6"]],
    ["media", "media", 62, "4.3K", "@VIVAcoid", "purple", ["u10", "u3", "u9"]],
    ["baca", "BACA", 49, "240", "@omnivoral", "teal", ["u7", "u6"]],
    ["aec2015", "aec2015", 62, "881", "@news1005fm", "purple", ["u5", "u10"]],
    ["news", "news", 46, "331", "@BhutanT", "purple", ["u3", "u4"]],
    ["leading-edge", "Leading Edge Sources", 67, "491", "@AskAaronLee", "navy", ["u6", "u7"]],
    ["consultants", "CONSULTANTS", 45, "1.4K", "@DugarGanbold", "pink", ["u5", "u7"]],
    ["press", "Press", 165, "602", "@teduaveqty", "blue", ["u10", "u3", "u4"]],
    ["indo-news", "Indo News", 38, "921", "@Andi_NurpatiB", "blue", ["u3", "u4", "u5"]]
].map((r, i) => ({
    id: r[0],
    name: r[1],
    members: r[2],
    followers: r[3],
    including: r[4],
    color: r[5],
    memberIds: r[6],
    description: "",
    private: false,
    own: false,
    owner: OWNERS[i % OWNERS.length]
}));

const MY_KEY = "myLists";
const FOLLOW_KEY = "followedLists";
const PIN_KEY = "pinnedLists";

const LIKE_KEY = "listLikes";
const BOOKMARK_KEY = "bookmarks";

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

function getLikes() {
    return readJSON(LIKE_KEY, {});
}

function saveLikes(likes) {
    writeJSON(LIKE_KEY, likes);
}

function getBookmarks() {
    return readJSON(BOOKMARK_KEY, []);
}

function saveBookmarks(bookmarks) {
    writeJSON(BOOKMARK_KEY, bookmarks);
}

let myLists = readJSON(MY_KEY, []);
let followed = new Set(readJSON(FOLLOW_KEY, ["olahraga"]));
let pinned = new Set(readJSON(PIN_KEY, []));

function persist() {
    writeJSON(MY_KEY, myLists);
    writeJSON(FOLLOW_KEY, [...followed]);
    writeJSON(PIN_KEY, [...pinned]);
}

let view = "main";
let prevView = "main";
let currentId = null;
let query = "";
let modal = null;

const app = document.getElementById("listApp");
const modalEl = document.getElementById("modal");

function esc(text) {
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const allLists = () => [...SUGGESTED, ...myLists];

const getList = id => allLists().find(l => l.id === id);

const memberCount = l => l.members ?? l.memberIds.length;

const colorOf = l => COLORS[l.color] || COLORS.pink;

function rowHTML(l, mode) {
    const count = memberCount(l);

    const meta =
        l.own && count === 0
            ? ""
            : `<span>· ${count} members</span>`;

    const sub = l.own
        ? `
            <div class="list-followers">
                <img 
                    class="mini-avatar" 
                    src="${DEFAULT_AVATAR}" 
                    alt=""
                >
                <strong>${esc(ME.name)}</strong>
                ${l.private ? "<span>🔒</span>" : ""}
                <span>${esc(ME.handle)}</span>
            </div>
        `
        : `
            <div class="list-followers">
                <div class="avatars">
                    <span>👤</span>
                    <span>👤</span>
                    <span>👤</span>
                </div>

                <span>
                    ${esc(l.followers)} followers including ${esc(l.including)}
                </span>
            </div>
        `;

    const action = mode === "discover"
        ? `
            <button class="add-button" data-action="follow" data-id="${esc(l.id)}" aria-label="Ikuti list">
                +
            </button>
        `
        : `
        `;

    return `

        <div 
            class="list-item" 
            data-action="open" 
            data-id="${esc(l.id)}" 
            tabindex="0"
        >
            <div 
                class="list-icon" 
                style="background:${colorOf(l)}"
            >
                ${ICON}
            </div>

            <div class="list-info">
                <div class="list-title">
                    <strong>${esc(l.name)}</strong>
                    ${meta}
                </div>

                ${sub}
            </div>

            ${action}
        </div>
    `;
}

function headerHTML(title, subtitle) {
    const showBack = view !== "main";

    return `
        <header class="list-header">

            ${
                showBack
                    ? `
                        <button 
                            class="back-button" 
                            data-action="back" 
                            aria-label="Kembali"
                        >
                            ←
                        </button>
                    `
                    : `
                        <button 
                            class="mobile-menu-button" 
                            aria-label="Open navigation" 
                            aria-haspopup="dialog"
                        >
                            <img src="../login/logo.jpg" alt="">
                        </button>
                    `
            }

            <div class="header-text">
                <h1>${esc(title)}</h1>

                ${
                    subtitle
                        ? `<span class="muted">${esc(subtitle)}</span>`
                        : ""
                }
            </div>

        </header>
    `;
}

function renderMain() {
    app.innerHTML = `
        ${headerHTML("Lists")}

        <div class="list-search">
            <span class="search-icon">⌕</span>

            <input 
                type="text" 
                id="listSearch" 
                placeholder="Search for Lists" 
                value="${esc(query)}" 
                autocomplete="off"
            >
        </div>

        <div id="mainBody"></div>

        <button 
            class="create-list-button" 
            data-action="create" 
            aria-label="Buat list baru"
        >
            +
        </button>
    `;

    renderMainBody();
}

function renderMainBody() {
    const body = document.getElementById("mainBody");

    if (!body) return;

    const keyword = query.trim().toLowerCase();

    const discoverAll = SUGGESTED.filter(list =>
        !followed.has(list.id) &&
        (
            !keyword ||
            (
                list.name +
                " " +
                list.owner.name +
                " " +
                list.owner.handle
            )
                .toLowerCase()
                .includes(keyword)
        )
    );

    const discover = keyword
        ? discoverAll
        : discoverAll.slice(0, 3);

    const mine = [
        ...SUGGESTED.filter(list => followed.has(list.id)),
        ...myLists
    ].filter(list =>
        !keyword ||
        (
            list.name +
            " " +
            (list.description || "")
        )
            .toLowerCase()
            .includes(keyword)
    );

    body.innerHTML = `
        <section class="discover-section">
            <h2>Discover new Lists</h2>

            ${
                discover.length
                    ? discover
                        .map(l => rowHTML(l, "discover"))
                        .join("")
                    : `
                        <p class="muted">
                            Tidak ada List yang ditemukan.
                        </p>
                    `
            }

            ${
                !keyword && discoverAll.length > 3
                    ? `
                        <button 
                            class="show-more" 
                            data-action="suggested"
                        >
                            Show more
                        </button>
                    `
                    : ""
            }
        </section>

        <section class="your-section">
            <h2>Your Lists</h2>

            ${
                mine.length
                    ? mine
                        .map(l => rowHTML(l, "your"))
                        .join("")
                    : `
                        <p class="muted empty-list-message">
                            You haven't created any Lists yet.
                        </p>
                    `
            }
        </section>
    `;
}

function renderSuggested() {
    app.innerHTML = `
        ${headerHTML("Discover new Lists")}

            <div>
                <h2 class="empty-list-message">Discover Lists</h2>
                <p class="muted empty-list-message">
                    Find Lists based on your interests.
                </p>
            </div>
        </div>

        <section class="discover-section">
            ${SUGGESTED.map(l => rowHTML(l, "discover")).join("")}
        </section>
    `;
}

function renderDetail() {
    const l = getList(currentId);

    if (!l) {
        view = "main";
        render();
        return;
    }

    const posts = l.memberIds
        .map(id => PEOPLE.find(p => p.id === id))
        .filter(Boolean);

    const owner = l.own ? ME : l.owner;

    const button = l.own
        ? `
            <button 
                class="outline-button" 
                data-action="edit" 
                data-id="${esc(l.id)}"
            >
                Edit List
            </button>
        `
        : `
            <button 
                class="outline-button${
                    followed.has(l.id) ? "" : " is-primary"
                }" 
                data-action="follow" 
                data-id="${esc(l.id)}"
            >
                ${followed.has(l.id) ? "Following" : "Follow"}
            </button>
        `;

    const likes = getLikes();
    const bookmarks = getBookmarks();

    app.innerHTML = `
        ${headerHTML(l.name, owner.handle)}

        <div 
            class="banner" 
            style="background:${colorOf(l)}"
        >
            ${ICON}
        </div>

        <section class="detail-info">
            <h2>
                ${esc(l.name)}
                ${l.private ? "🔒" : ""}
            </h2>

            ${
                l.description
                    ? `<p>${esc(l.description)}</p>`
                    : ""
            }

            <div class="owner-line">
                <img 
                    class="mini-avatar" 
                    src="${DEFAULT_AVATAR}" 
                    alt=""
                >

                <strong>${esc(owner.name)}</strong>

                <span class="muted">
                    ${esc(owner.handle)}
                </span>
            </div>

            <div class="stats">
                <span>
                    <strong>${memberCount(l)}</strong>
                    Members
                </span>

                <span>
                    <strong>${l.own ? 0 : esc(l.followers)}</strong>
                    Followers
                </span>
            </div>

            ${button}
        </section>

        <section>
            ${
                posts.length
                    ? posts.map(p => {
                        const liked = !!likes[p.id];

                        const bookmarked = bookmarks.some(
                            bookmark => bookmark.id === p.id
                        );

                        return `
                            <article 
                                class="post" 
                                data-post-id="${esc(p.id)}"
                            >
                                <img 
                                    class="post-avatar" 
                                    src="${DEFAULT_AVATAR}" 
                                    alt="Foto profil ${esc(p.name)}"
                                >

                                <div class="post-body">

                                    <p class="post-author">
                                        <strong>
                                            ${esc(p.name)}
                                        </strong>

                                        <span>
                                            ${esc(p.handle)} · ${esc(p.time)}
                                        </span>
                                    </p>

                                    <p class="post-text">
                                        ${esc(p.text)}
                                    </p>

                                    <div class="post-actions">

                                        <button 
                                            class="action-btn"
                                            aria-label="Reply"
                                        >
                                            <img 
                                                src="../image/icons/chat.svg"
                                                class="action-icon"
                                                alt="Reply"
                                            >

                                            <span class="count">
                                                0
                                            </span>
                                        </button>

                                        <button 
                                            class="action-btn like-btn${
                                                liked ? " active" : ""
                                            }"
                                            data-post-action="like"
                                            aria-label="Like"
                                        >
                                            <img 
                                                src="../image/icons/${
                                                    liked
                                                        ? "like-full.svg"
                                                        : "like.svg"
                                                }"
                                                class="action-icon"
                                                alt="Like"
                                            >

                                            <span class="count">
                                                ${liked ? 1 : 0}
                                            </span>
                                        </button>

                                        <button 
                                            class="action-btn"
                                            aria-label="View"
                                        >
                                            <img 
                                                src="../image/icons/view.svg"
                                                class="action-icon"
                                                alt="View"
                                            >

                                            <span class="count">
                                                0
                                            </span>
                                        </button>

                                        <button 
                                            class="action-btn bookmark-btn${
                                                bookmarked
                                                    ? " active"
                                                    : ""
                                            }"
                                            data-post-action="bookmark"
                                            aria-label="${
                                                bookmarked
                                                    ? "Hapus dari bookmark"
                                                    : "Bookmark"
                                            }"
                                        >
                                            <img 
                                                src="../image/icons/${
                                                    bookmarked
                                                        ? "bookmark-full.svg"
                                                        : "bookmark.svg"
                                                }"
                                                class="action-icon"
                                                alt="Bookmark"
                                            >
                                        </button>

                                    </div>
                                </div>
                            </article>
                        `;
                    }).join("")
                    : `
                        <div class="empty-posts">
                            <h2>Waiting for posts</h2>

                            <p class="muted">
                                Postingan dari orang-orang di List ini
                                akan muncul di sini.
                            </p>
                        </div>
                    `
            }
        </section>
    `;
}

function render() {
    if (view === "main") {
        renderMain();
    } else if (view === "suggested") {
        renderSuggested();
    } else if (view === "detail") {
        renderDetail();
    }
}

function setView(nextView) {
    prevView = view;
    view = nextView;
    render();
}

function openList(id) {
    currentId = id;
    prevView = view;
    view = "detail";
    render();
}

function goBack() {
    if (view === "detail" && prevView !== "detail") {
        view = prevView;
    } else {
        view = "main";
    }

    render();
}

function toggleFollow(id) {
    if (followed.has(id)) {
        followed.delete(id);
    } else {
        followed.add(id);
    }

    persist();
    render();
}

function togglePin(id) {
    if (pinned.has(id)) {
        pinned.delete(id);
    } else {
        pinned.add(id);
    }

    persist();
    render();
}

function showModal(type, list = null) {
    modal = {
        type,
        list
    };

    const isEdit = type === "edit";

    modalEl.hidden = false;

    modalEl.innerHTML = `
        <div class="modal-card">

            <div class="modal-header">
                <h2>
                    ${isEdit ? "Edit List" : "Create a new List"}
                </h2>

                <button 
                    class="modal-close" 
                    data-modal-action="close"
                    aria-label="Close"
                >
                    ×
                </button>
            </div>

            <form id="listForm">

                <label>
                    List name

                    <input 
                        type="text" 
                        id="listName"
                        maxlength="50"
                        value="${
                            isEdit
                                ? esc(list.name)
                                : ""
                        }"
                        required
                    >
                </label>

                <label>
                    Description

                    <textarea 
                        id="listDescription"
                        maxlength="160"
                    >${
                        isEdit
                            ? esc(list.description || "")
                            : ""
                    }</textarea>
                </label>

                <label class="checkbox-row">
                    <input 
                        type="checkbox" 
                        id="listPrivate"
                        ${
                            isEdit && list.private
                                ? "checked"
                                : ""
                        }
                    >

                    Make List private
                </label>

                <div class="modal-actions">

                    <button 
                        type="button" 
                        class="outline-button"
                        data-modal-action="close"
                    >
                        Cancel
                    </button>

                    <button 
                        type="submit" 
                        class="outline-button is-primary"
                    >
                        ${isEdit ? "Save" : "Create"}
                    </button>

                </div>

            </form>

            ${
                isEdit
                    ? `
                        <div class="modal-danger">
                            <button 
                                type="button"
                                class="delete-list-button"
                                data-modal-action="delete"
                            >
                                Delete List
                            </button>
                        </div>
                    `
                    : ""
            }

        </div>
    `;
}

function closeModal() {
    modal = null;
    modalEl.hidden = true;
    modalEl.innerHTML = "";
}

function createList(form) {
    const name = form.querySelector("#listName").value.trim();

    const description = form
        .querySelector("#listDescription")
        .value.trim();

    const isPrivate =
        form.querySelector("#listPrivate").checked;

    if (!name) return;

    const newList = {
        id: "list-" + Date.now(),
        name,
        members: 0,
        followers: "0",
        including: ME.handle,
        color: "blue",
        memberIds: [],
        description,
        private: isPrivate,
        own: true,
        owner: {
            name: ME.name,
            handle: ME.handle
        }
    };

    myLists.push(newList);

    persist();
    closeModal();

    currentId = newList.id;
    view = "detail";

    render();
}

function editList(form) {
    if (!modal || !modal.list) return;

    const list = myLists.find(
        item => item.id === modal.list.id
    );

    if (!list) return;

    list.name =
        form.querySelector("#listName").value.trim();

    list.description =
        form.querySelector("#listDescription").value.trim();

    list.private =
        form.querySelector("#listPrivate").checked;

    persist();
    closeModal();
    render();
}

function deleteCurrentList() {
    if (!modal || !modal.list) return;

    const id = modal.list.id;

    myLists = myLists.filter(
        list => list.id !== id
    );

    followed.delete(id);
    pinned.delete(id);

    persist();
    closeModal();

    currentId = null;
    view = "main";

    render();
}

app.addEventListener("click", event => {

    const postAction = event.target.closest(
        "[data-post-action]"
    );

    if (postAction) {
        const post = postAction.closest(".post");

        if (!post) return;

        const postId = post.dataset.postId;
        const action = postAction.dataset.postAction;

        if (action === "like") {
            const likes = getLikes();

            likes[postId] = !likes[postId];

            saveLikes(likes);

            renderDetail();

            return;
        }

        if (action === "bookmark") {
            const bookmarks = getBookmarks();

            const existingIndex = bookmarks.findIndex(
                bookmark => bookmark.id === postId
            );

            if (existingIndex !== -1) {
                bookmarks.splice(existingIndex, 1);
            } else {
                const list = getList(currentId);

                const person = PEOPLE.find(
                    p => p.id === postId
                );

                if (person && list) {
                    bookmarks.push({
                        id: person.id,
                        text: person.text,
                        name: person.name,
                        handle: person.handle,
                        time: person.time,
                        community: list.name
                    });
                }
            }

            saveBookmarks(bookmarks);

            renderDetail();

            return;
        }
    }

    const actionButton = event.target.closest(
        "[data-action]"
    );

    if (!actionButton) return;

    const action = actionButton.dataset.action;
    const id = actionButton.dataset.id;

    if (action === "back") {
        goBack();
        return;
    }

    if (action === "open") {
        openList(id);
        return;
    }

    if (action === "follow") {
        toggleFollow(id);
        return;
    }

    if (action === "pin") {
        togglePin(id);
        return;
    }

    if (action === "suggested") {
        setView("suggested");
        return;
    }

    if (action === "create") {
        showModal("create");
        return;
    }

    if (action === "edit") {
        const list = getList(id);

        if (list) {
            showModal("edit", list);
        }

        return;
    }
});

app.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;

    const item = event.target.closest(
        ".list-item[data-action='open']"
    );

    if (!item) return;

    openList(item.dataset.id);
});

app.addEventListener("input", event => {
    if (event.target.id !== "listSearch") return;

    query = event.target.value;

    renderMainBody();
});

modalEl.addEventListener("click", event => {
    const action = event.target.closest(
        "[data-modal-action]"
    );

    if (!action) return;

    const modalAction =
        action.dataset.modalAction;

    if (modalAction === "close") {
        closeModal();
        return;
    }

    if (modalAction === "delete") {
        deleteCurrentList();
        return;
    }
});

modalEl.addEventListener("submit", event => {
    if (event.target.id !== "listForm") return;

    event.preventDefault();

    if (modal?.type === "edit") {
        editList(event.target);
    } else {
        createList(event.target);
    }
});

modalEl.addEventListener("click", event => {
    if (event.target === modalEl) {
        closeModal();
    }
});

render();

fetch("../sidebar.html")
    .then(res => {
        if (!res.ok) {
            throw new Error("Status " + res.status);
        }

        return res.text();
    })
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;
    })
    .catch(err => {
        console.error(
            "Sidebar gagal dimuat:",
            err
        );
    });

const listTrends = [
    {
        tag: "#SepakBola",
        cat: "Olahraga",
        count: 26300
    },
    {
        tag: "#KonserAkhirTahun",
        cat: "Hiburan",
        count: 21500
    },
    {
        tag: "#Jakarta",
        cat: "Berita",
        count: 18400
    },
    {
        tag: "#KecerdasanBuatan",
        cat: "Teknologi",
        count: 15400
    },
    {
        tag: "#gaming",
        cat: "Hiburan",
        count: 12800
    }
];

function formatTrendCount(count) {
    if (count >= 1000) {
        return (
            count / 1000
        ).toFixed(1).replace(".0", "") + " rb";
    }

    return count;
}

function renderListTrending() {
    const container =
        document.getElementById("listTrending");

    if (!container) return;

    container.innerHTML = listTrends.map(trend => `
        <a 
            class="list-trend-item"
            href="../trending/trending.html"
        >
            <span class="list-trend-category">
                ${trend.cat} · Sedang tren
            </span>

            <span class="list-trend-tag">
                ${trend.tag}
            </span>

            <span class="list-trend-count">
                ${formatTrendCount(trend.count)} postingan
            </span>
        </a>
    `).join("");
}

renderListTrending();