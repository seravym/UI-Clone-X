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
    { id: "u1", name: "BWF Update", handle: "@bwf_update", time: "1m", text: "Dutch Open babak 32 besar: laga tunggal putra berlangsung 3 gim, selesai dalam 63 menit." },
    { id: "u2", name: "Liga Harian", handle: "@liga_harian", time: "12m", text: "Klasemen sementara berubah, tim tuan rumah naik ke posisi tiga setelah menang tipis." },
    { id: "u3", name: "Berita Harian ID", handle: "@beritaharianid", time: "20m", text: "Pemerintah umumkan jadwal baru perbaikan jalan tol di wilayah Jabodetabek." },
    { id: "u4", name: "Info Jakarta", handle: "@infojakarta", time: "35m", text: "Hujan deras diperkirakan turun sore ini di sebagian besar Jakarta Selatan dan Timur." },
    { id: "u5", name: "Kabar Ekonomi", handle: "@kabarekonomi", time: "1j", text: "Rupiah menguat tipis terhadap dolar AS di awal perdagangan hari ini." },
    { id: "u6", name: "Tech Radar ID", handle: "@techradar_id", time: "2j", text: "Peluncuran ponsel lipat terbaru dijadwalkan bulan depan, ini bocoran spesifikasinya." },
    { id: "u7", name: "Dev Daily", handle: "@devdaily", time: "3j", text: "Tips hari ini: gunakan event delegation supaya listener tidak menumpuk." },
    { id: "u8", name: "Atlet Muda", handle: "@atletmuda", time: "4j", text: "Latihan pagi selesai. Konsistensi lebih penting daripada intensitas sesaat." },
    { id: "u9", name: "Kuliner Kita", handle: "@kulinerkita", time: "5j", text: "Rekomendasi sarapan murah di sekitar kampus, semuanya di bawah 20 ribu." },
    { id: "u10", name: "Media Nusantara", handle: "@medianusantara", time: "6j", text: "Rangkuman berita pagi: politik, ekonomi, dan olahraga dalam satu thread." }
];

const OWNERS = [
    { name: "Edy Prayogo", handle: "@edyprayogo_" },
    { name: "Rina Putri", handle: "@rinaputri" },
    { name: "Budi Santoso", handle: "@budi_s" },
    { name: "Maya Lestari", handle: "@maya_l" }
];

// [id, nama, member, followers, including, warna, memberIds]
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
    id: r[0], name: r[1], members: r[2], followers: r[3], including: r[4],
    color: r[5], memberIds: r[6], description: "", private: false, own: false,
    owner: OWNERS[i % OWNERS.length]
}));

const MY_KEY = "myLists";
const FOLLOW_KEY = "followedLists";
const PIN_KEY = "pinnedLists";

function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
}

function writeJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
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
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

const allLists = () => [...SUGGESTED, ...myLists];
const getList = id => allLists().find(l => l.id === id);
const memberCount = l => l.members ?? l.memberIds.length;
const colorOf = l => COLORS[l.color] || COLORS.pink;

function rowHTML(l, mode) {
    const count = memberCount(l);
    const meta = l.own && count === 0 ? "" : `<span>· ${count} members</span>`;

    const sub = l.own
        ? `<div class="list-followers">
               <img class="mini-avatar" src="${DEFAULT_AVATAR}" alt="">
               <strong>${esc(ME.name)}</strong>
               ${l.private ? "<span>🔒</span>" : ""}
               <span>${esc(ME.handle)}</span>
           </div>`
        : `<div class="list-followers">
               <div class="avatars"><span>👤</span><span>👤</span><span>👤</span></div>
               <span>${esc(l.followers)} followers including ${esc(l.including)}</span>
           </div>`;

    const action = mode === "discover"
        ? `<button class="add-button" data-action="follow" data-id="${esc(l.id)}" aria-label="Ikuti list">+</button>`
        : `<button class="pin-button${pinned.has(l.id) ? " is-pinned" : ""}" data-action="pin" data-id="${esc(l.id)}" aria-label="Pin list">📌</button>`;

    return `
    <div class="list-item" data-action="open" data-id="${esc(l.id)}" tabindex="0">
        <div class="list-icon" style="background:${colorOf(l)}">${ICON}</div>
        <div class="list-info">
            <div class="list-title"><strong>${esc(l.name)}</strong>${meta}</div>
            ${sub}
        </div>
        ${action}
    </div>`;
}

function headerHTML(title, subtitle) {
    return `
    <header class="list-header">
        <button class="back-button" data-action="back" aria-label="Kembali">←</button>
        <div class="header-text">
            <h1>${esc(title)}</h1>
            ${subtitle ? `<span class="muted">${esc(subtitle)}</span>` : ""}
        </div>
    </header>`;
}

function renderMain() {
    app.innerHTML = `
    ${headerHTML("Lists")}
    <div class="list-search">
        <span class="search-icon">⌕</span>
        <input type="text" id="listSearch" placeholder="Search for Lists" value="${esc(query)}" autocomplete="off">
    </div>
    <div id="mainBody"></div>
    <button class="create-list-button" data-action="create" aria-label="Buat list baru">+</button>`;
    renderMainBody();
}

function renderMainBody() {
    const body = document.getElementById("mainBody");
    const q = query.trim().toLowerCase();
    const match = l => !q || l.name.toLowerCase().includes(q);

    const discoverAll = allLists().filter(l => !l.own && !followed.has(l.id)).filter(match);
    const discover = q ? discoverAll : discoverAll.slice(0, 3);

    const mine = allLists()
        .filter(l => l.own || followed.has(l.id))
        .filter(match)
        .sort((a, b) => pinned.has(b.id) - pinned.has(a.id));

    body.innerHTML = `
    <section class="discover-section">
        <h2>Discover new Lists</h2>
        ${discover.length ? discover.map(l => rowHTML(l, "discover")).join("") : `<p class="empty-note">Tidak ada list untuk ditampilkan.</p>`}
        ${!q && discoverAll.length > 3 ? `<button class="show-more" data-action="suggested">Show more</button>` : ""}
    </section>

    <section class="your-section">
        <h2>Your Lists</h2>
        ${mine.length ? mine.map(l => rowHTML(l, "mine")).join("") : `<p class="empty-note">Kamu belum punya list. Tekan tombol + untuk membuatnya.</p>`}
    </section>`;
}

function renderSuggested() {
    const rest = allLists().filter(l => !l.own && !followed.has(l.id));

    app.innerHTML = `
    ${headerHTML("Suggested Lists")}
    <div class="hero">
        <svg viewBox="0 0 320 130" aria-hidden="true">
            <rect x="10" y="40" width="46" height="46" rx="8" fill="none" stroke="#8fdcff" stroke-width="4"/>
            <rect x="70" y="20" width="50" height="50" rx="8" fill="#8fdcff"/>
            <rect x="70" y="82" width="50" height="40" rx="8" fill="none" stroke="#8fdcff" stroke-width="4"/>
            <rect x="134" y="8" width="52" height="46" rx="8" fill="none" stroke="#1d9bf0" stroke-width="4"/>
            <rect x="134" y="62" width="52" height="56" rx="8" fill="#0b4f9e"/>
            <rect x="200" y="24" width="56" height="52" rx="8" fill="#1d9bf0"/>
            <rect x="200" y="84" width="56" height="38" rx="8" fill="none" stroke="#8fdcff" stroke-width="4"/>
            <rect x="268" y="14" width="46" height="56" rx="8" fill="#0b4f9e"/>
            <rect x="268" y="78" width="46" height="40" rx="8" fill="#1d9bf0"/>
        </svg>
        <h2>Choose your Lists</h2>
        <p class="muted">Kalau kamu mengikuti sebuah List, kamu bisa dengan cepat mengikuti para ahli tentang hal yang paling kamu minati.</p>
    </div>
    <section class="discover-section">
        <h2>Discover new Lists</h2>
        ${rest.length ? rest.map(l => rowHTML(l, "discover")).join("") : `<p class="empty-note">Kamu sudah mengikuti semua list yang disarankan.</p>`}
    </section>`;
}

function renderDetail() {
    const l = getList(currentId);
    if (!l) { view = "main"; render(); return; }

    const posts = l.memberIds.map(id => PEOPLE.find(p => p.id === id)).filter(Boolean);
    const owner = l.own ? ME : l.owner;

    const button = l.own
        ? `<button class="outline-button" data-action="edit" data-id="${esc(l.id)}">Edit List</button>`
        : `<button class="outline-button${followed.has(l.id) ? "" : " is-primary"}" data-action="follow" data-id="${esc(l.id)}">${followed.has(l.id) ? "Following" : "Follow"}</button>`;

    app.innerHTML = `
    ${headerHTML(l.name, owner.handle)}
    <div class="banner" style="background:${colorOf(l)}">${ICON}</div>

    <section class="detail-info">
        <h2>${esc(l.name)} ${l.private ? "🔒" : ""}</h2>
        ${l.description ? `<p>${esc(l.description)}</p>` : ""}
        <div class="owner-line">
            <img class="mini-avatar" src="${DEFAULT_AVATAR}" alt="">
            <strong>${esc(owner.name)}</strong>
            <span class="muted">${esc(owner.handle)}</span>
        </div>
        <div class="stats">
            <span><strong>${memberCount(l)}</strong> Members</span>
            <span><strong>${l.own ? 0 : esc(l.followers)}</strong> Followers</span>
        </div>
        ${button}
    </section>

    <section>
        ${posts.length ? posts.map(p => `
        <article class="post">
            <img class="post-avatar" src="${DEFAULT_AVATAR}" alt="Foto profil ${esc(p.name)}">
            <div class="post-body">
                <p class="post-author"><strong>${esc(p.name)}</strong> <span>${esc(p.handle)} · ${esc(p.time)}</span></p>
                <p class="post-text">${esc(p.text)}</p>
            </div>
        </article>`).join("") : `
        <div class="empty-posts">
            <h2>Waiting for posts</h2>
            <p class="muted">Postingan dari orang-orang di List ini akan muncul di sini.</p>
        </div>`}
    </section>`;
}

function render() {
    if (view === "main") renderMain();
    else if (view === "suggested") renderSuggested();
    else renderDetail();
}

function setView(next) {
    view = next;
    render();
    window.scrollTo(0, 0);
}

function openList(id) {
    prevView = view;
    currentId = id;
    setView("detail");
}

function goBack() {
    if (view === "detail") setView(prevView === "detail" ? "main" : prevView);
    else if (view === "suggested") setView("main");
    else window.location.href = "../home/home.html";
}

function toggleFollow(id) {
    if (followed.has(id)) followed.delete(id);
    else followed.add(id);
    persist();
    if (view === "main") renderMainBody();
    else render();
}

function togglePin(id) {
    if (pinned.has(id)) pinned.delete(id);
    else pinned.add(id);
    persist();
    renderMainBody();
}

app.addEventListener("click", event => {
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const id = el.dataset.id;

    switch (el.dataset.action) {
        case "back": goBack(); break;
        case "open": openList(id); break;
        case "follow": toggleFollow(id); break;
        case "pin": togglePin(id); break;
        case "suggested": setView("suggested"); break;
        case "create": openModal("create"); break;
        case "edit": openModal("edit", id); break;
    }
});

app.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    const row = event.target.closest(".list-item");
    if (row && event.target === row) openList(row.dataset.id);
});

app.addEventListener("input", event => {
    if (event.target.id !== "listSearch") return;
    query = event.target.value;
    renderMainBody();
});

function openModal(mode, id) {
    const base = mode === "edit" ? getList(id) : null;

    modal = {
        mode,
        id: id || null,
        showMembers: false,
        draft: {
            name: base ? base.name : "",
            description: base ? base.description : "",
            private: base ? base.private : false,
            memberIds: base ? [...base.memberIds] : []
        }
    };

    renderModal();
    modalEl.hidden = false;
    document.body.style.overflow = "hidden";
    const nameInput = document.getElementById("fName");
    if (nameInput) nameInput.focus();
}

function closeModal() {
    modal = null;
    modalEl.hidden = true;
    modalEl.innerHTML = "";
    document.body.style.overflow = "";
}

function renderModal() {
    const d = modal.draft;
    const isEdit = modal.mode === "edit";
    const bannerColor = isEdit ? colorOf(getList(modal.id)) : COLORS.pink;

    modalEl.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="${isEdit ? "Edit List" : "Create a new List"}">
        <div class="modal-head">
            <button class="icon-button" data-m="close" aria-label="Tutup">✕</button>
            <h2>${isEdit ? "Edit List" : "Create a new List"}</h2>
            <button class="done-button" id="doneBtn" data-m="done" ${d.name.trim() ? "" : "disabled"}>Done</button>
        </div>

        <div class="modal-banner" style="background:${bannerColor}">${ICON}</div>

        <div class="modal-body">
            <label class="field">
                <span>Name</span>
                <input id="fName" type="text" maxlength="25" value="${esc(d.name)}" autocomplete="off">
            </label>

            <label class="field">
                <span>Description</span>
                <textarea id="fDesc" rows="3" maxlength="100">${esc(d.description)}</textarea>
            </label>

            <label class="private-row">
                <div>
                    <strong>Make private</strong>
                    <p class="muted">Kalau List dibuat private, hanya kamu yang bisa melihatnya.</p>
                </div>
                <input type="checkbox" id="fPrivate" ${d.private ? "checked" : ""}>
            </label>

            <button class="manage-row" data-m="members" type="button">
                <span>Manage members (<b id="memberCount">${d.memberIds.length}</b>)</span>
                <span id="memberArrow">${modal.showMembers ? "⌄" : "›"}</span>
            </button>

            <div class="members-panel" id="membersPanel" ${modal.showMembers ? "" : "hidden"}>
                ${PEOPLE.map(p => {
                    const on = d.memberIds.includes(p.id);
                    return `
                    <div class="member-row">
                        <img class="mini-avatar" src="${DEFAULT_AVATAR}" alt="">
                        <div class="member-info">
                            <strong>${esc(p.name)}</strong>
                            <span class="muted">${esc(p.handle)}</span>
                        </div>
                        <button class="member-btn${on ? " on" : ""}" data-m="member" data-id="${p.id}" type="button">${on ? "Remove" : "Add"}</button>
                    </div>`;
                }).join("")}
            </div>

            ${isEdit ? `<button class="delete-row" data-m="delete" type="button">Delete List</button>` : ""}
        </div>
    </div>`;
}

modalEl.addEventListener("input", event => {
    if (!modal) return;
    if (event.target.id === "fName") {
        modal.draft.name = event.target.value;
        document.getElementById("doneBtn").disabled = !modal.draft.name.trim();
    }
    if (event.target.id === "fDesc") modal.draft.description = event.target.value;
});

modalEl.addEventListener("change", event => {
    if (modal && event.target.id === "fPrivate") modal.draft.private = event.target.checked;
});

modalEl.addEventListener("click", event => {
    if (!modal) return;
    if (event.target === modalEl) { closeModal(); return; }

    const el = event.target.closest("[data-m]");
    if (!el) return;

    switch (el.dataset.m) {
        case "close": closeModal(); break;
        case "done": saveModal(); break;

        case "members":
            modal.showMembers = !modal.showMembers;
            document.getElementById("membersPanel").hidden = !modal.showMembers;
            document.getElementById("memberArrow").textContent = modal.showMembers ? "⌄" : "›";
            break;

        case "member": {
            const ids = modal.draft.memberIds;
            const id = el.dataset.id;
            const i = ids.indexOf(id);
            if (i >= 0) ids.splice(i, 1);
            else ids.push(id);

            const on = ids.includes(id);
            el.classList.toggle("on", on);
            el.textContent = on ? "Remove" : "Add";
            document.getElementById("memberCount").textContent = ids.length;
            break;
        }

        case "delete": deleteList(modal.id); break;
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal) closeModal();
});

function saveModal() {
    const d = modal.draft;
    const name = d.name.trim();
    if (!name) return;

    if (modal.mode === "create") {
        const list = {
            id: "my-" + Date.now(),
            name,
            description: d.description.trim(),
            private: d.private,
            color: "pink",
            memberIds: [...d.memberIds],
            followers: "0",
            own: true
        };
        myLists.push(list);
        persist();
        closeModal();
        openList(list.id);
    } else {
        const list = myLists.find(l => l.id === modal.id);
        if (list) {
            list.name = name;
            list.description = d.description.trim();
            list.private = d.private;
            list.memberIds = [...d.memberIds];
            persist();
        }
        closeModal();
        render();
    }
}

function deleteList(id) {
    if (!confirm("Hapus List ini?")) return;
    myLists = myLists.filter(l => l.id !== id);
    pinned.delete(id);
    persist();
    closeModal();
    setView("main");
}

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