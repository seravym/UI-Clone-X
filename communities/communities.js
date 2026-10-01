const categories = ["Sports", "Technology", "Art", "Entertainment", "Gaming"];
const communities = [
    { id: 1, category: "Sports", name: "Liga 1 Fans", members: "12K", posts: [
        { id: 1, author: "Bagus", handle: "@bagus_bola", time: "2j", text: "Derby akhir pekan ini bakal panas. Prediksi skor kalian?" },
        { id: 2, author: "Tono", handle: "@tono_ultras", time: "4j", text: "Tiket tandang udah ludes dalam 10 menit, gila sih antusiasnya." },
        { id: 3, author: "Rama", handle: "@rama_fcn", time: "1h", text: "Lini belakang minggu ini rapi banget, kiper juga tampil solid." }
    ]},
    { id: 2, category: "Sports", name: "Badminton Indonesia", members: "8,4K", posts: [
        { id: 1, author: "Rina", handle: "@rina_smash", time: "5j", text: "Latihan footwork 20 menit tiap pagi bantu banget buat stamina." },
        { id: 2, author: "Doni", handle: "@doni_net", time: "9j", text: "Ada rekomendasi raket ringan buat pemula yang tangannya gampang pegal?" },
        { id: 3, author: "Wulan", handle: "@wulan_bwf", time: "1h", text: "Ganda campuran kita makin solid, nonton final semalam seru banget." }
    ]},
    { id: 3, category: "Sports", name: "Runners Jakarta", members: "5,1K", posts: [
        { id: 1, author: "Dimas", handle: "@dimasruns", time: "1h", text: "Ada yang mau lari bareng di GBK Minggu pagi?" },
        { id: 2, author: "Citra", handle: "@citra_pace", time: "6j", text: "Pace 6:00 per km buat 10K, ada yang segitu juga?" },
        { id: 3, author: "Arif", handle: "@arif_run", time: "2h", text: "Sepatu lari lama udah jebol, rekomendasi yang awet dong." }
    ]},
    { id: 12, category: "Sports", name: "Futsal Nusantara", members: "6,7K", posts: [
        { id: 1, author: "Eko", handle: "@eko_futsal", time: "3j", text: "Cari 2 pemain buat sparring Jumat malam, level santai aja." },
        { id: 2, author: "Fikri", handle: "@fikri_gk", time: "7j", text: "Tips jadi kiper futsal biar nggak gampang kena lob?" },
        { id: 3, author: "Lutfi", handle: "@lutfi_pivot", time: "1h", text: "Lapangan sintetis baru di Tebet enak banget buat main." }
    ]},
    { id: 13, category: "Sports", name: "Basket Kampus", members: "3,2K", posts: [
        { id: 1, author: "Tara", handle: "@tara_hoops", time: "8j", text: "Turnamen antar fakultas dibuka bulan depan, ayo daftar tim!" },
        { id: 2, author: "Kenji", handle: "@kenji_3pt", time: "2j", text: "Latihan three-point 100 kali sehari, persentase mulai naik." },
        { id: 3, author: "Salsa", handle: "@salsa_pg", time: "5j", text: "Cari anggota tim putri buat turnamen, yang baru belajar juga boleh." }
    ]},

    { id: 4, category: "Technology", name: "Dev Indonesia", members: "21K", posts: [
        { id: 1, author: "Sari", handle: "@sari_dev", time: "3j", text: "Tips rapiin struktur folder project biar gampang dirawat." },
        { id: 2, author: "Andi", handle: "@andi_code", time: "5j", text: "Kalian lebih suka commit kecil-kecil atau satu commit besar per fitur?" },
        { id: 3, author: "Vina", handle: "@vina_be", time: "1h", text: "Baru sadar query N+1 bikin API lambat banget. Pelajaran mahal." }
    ]},
    { id: 5, category: "Technology", name: "AI Builders", members: "15K", posts: [
        { id: 1, author: "Kevin", handle: "@kevin_ai", time: "4j", text: "Hari ini nyoba bikin agen kecil buat rangkum email. Hasilnya lumayan." },
        { id: 2, author: "Dewi", handle: "@dewi_ml", time: "8j", text: "Dataset kecil tapi bersih ternyata lebih berguna daripada yang besar tapi berantakan." },
        { id: 3, author: "Rizal", handle: "@rizal_prompt", time: "2h", text: "Prompt yang spesifik hasilnya jauh lebih konsisten, serius." }
    ]},
    { id: 14, category: "Technology", name: "Frontend Squad", members: "13K", posts: [
        { id: 1, author: "Lisa", handle: "@lisa_css", time: "2j", text: "Akhirnya paham kapan pakai grid dan kapan pakai flexbox. Mind blown." },
        { id: 2, author: "Bayu", handle: "@bayu_dom", time: "6j", text: "Event delegation bikin kode lebih ringkas, nyesel baru tau sekarang." },
        { id: 3, author: "Tiara", handle: "@tiara_ui", time: "1h", text: "Kontras warna kecil itu masalah aksesibilitas, bukan cuma soal selera." }
    ]},
    { id: 15, category: "Technology", name: "Cyber Security ID", members: "7,9K", posts: [
        { id: 1, author: "Hendra", handle: "@hendra_sec", time: "7j", text: "Reminder: aktifkan 2FA di semua akun penting kalian, sekarang juga." },
        { id: 2, author: "Gita", handle: "@gita_infosec", time: "3j", text: "Hati-hati link undangan palsu di grup chat, banyak yang kena phishing." },
        { id: 3, author: "Oscar", handle: "@oscar_ctf", time: "4h", text: "Ada yang mau ikut tim CTF bulan depan? Pemula juga boleh." }
    ]},
    { id: 16, category: "Technology", name: "Gadget Lovers", members: "17K", posts: [
        { id: 1, author: "Yoga", handle: "@yoga_gadget", time: "5j", text: "HP flagship tahun ini sebenernya worth it atau cukup yang mid-range?" },
        { id: 2, author: "Mira", handle: "@mira_tech", time: "2j", text: "Earbuds murah sekarang kualitasnya udah bagus banget buat harian." },
        { id: 3, author: "Joko", handle: "@joko_watch", time: "1h", text: "Daya tahan baterai smartwatch ini bikin gue jarang ngecas." }
    ]},

    { id: 6, category: "Art", name: "Digital Art ID", members: "9K", posts: [
        { id: 1, author: "Maya", handle: "@maya_draws", time: "6j", text: "Progress ilustrasi karakter baru, feedback dong." },
        { id: 2, author: "Zaki", handle: "@zaki_pixel", time: "3j", text: "Belajar shading pakai satu layer aja ternyata lebih terarah." },
        { id: 3, author: "Lena", handle: "@lena_brush", time: "1h", text: "Brush pack gratis yang kupakai buat tekstur cat air, link di komentar." }
    ]},
    { id: 7, category: "Art", name: "Sketch Daily", members: "4K", posts: [
        { id: 1, author: "Fajar", handle: "@fajarsketch", time: "1h", text: "Tantangan sketsa hari iniii" },
        { id: 2, author: "Nova", handle: "@nova_ink", time: "4j", text: "Sketsa 5 menit tiap hari lebih ngebantu daripada nunggu mood bagus." },
        { id: 3, author: "Prita", handle: "@prita_line", time: "2j", text: "Tema hari ini: secangkir kopi di pagi hari. Siapa ikut?" }
    ]},
    { id: 17, category: "Art", name: "Anime Fanart ID", members: "14K", posts: [
        { id: 1, author: "Putri", handle: "@putri_fanart", time: "4j", text: "Fanart terbaru udah jadi! Warna rambutnya susah banget ternyata." },
        { id: 2, author: "Rio", handle: "@rio_chibi", time: "7j", text: "Gaya chibi ternyata susah di proporsi kepala dan badannya." },
        { id: 3, author: "Hana", handle: "@hana_art", time: "3h", text: "Open commission slot terbatas bulan ini, DM aja." }
    ]},
    { id: 18, category: "Art", name: "Fotografi Jalanan", members: "5,5K", posts: [
        { id: 1, author: "Bima", handle: "@bima_lens", time: "9j", text: "Golden hour di kota tua selalu juara. Ada spot rekomendasi lain?" },
        { id: 2, author: "Karin", handle: "@karin_frame", time: "5j", text: "Foto hitam putih bikin komposisi kelihatan lebih jujur." },
        { id: 3, author: "Gilang", handle: "@gilang_street", time: "2h", text: "Kamera saku bekas ternyata cukup banget buat belajar." }
    ]},
    { id: 19, category: "Art", name: "Lettering Corner", members: "2,8K", posts: [
        { id: 1, author: "Nina", handle: "@nina_letters", time: "1h", text: "Latihan brush pen 15 menit sehari, hasilnya mulai kelihatan." },
        { id: 2, author: "Yuda", handle: "@yuda_serif", time: "6j", text: "Kerning itu penting banget, spasi huruf jelek langsung kelihatan." },
        { id: 3, author: "Selly", handle: "@selly_script", time: "3j", text: "Rekomendasi buku latihan lettering buat pemula?" }
    ]},

    { id: 8, category: "Entertainment", name: "Film dan Serial", members: "18K", posts: [
        { id: 1, author: "Nadia", handle: "@nadiaurrr", time: "2j", text: "Serial yang baru rilis ini bagus banget!!!." },
        { id: 2, author: "Fandi", handle: "@fandi_movie", time: "5j", text: "Film lokal tahun ini kualitasnya naik banget, kalian udah nonton yang mana?" },
        { id: 3, author: "Ines", handle: "@ines_cine", time: "1h", text: "Ending film semalam bikin diskusi panjang sama temen." }
    ]},
    { id: 9, category: "Entertainment", name: "K-Pop Corner", members: "30K", posts: [
        { id: 1, author: "Ayu", handle: "@ayu_bts", time: "30m", text: "Comeback minggu depan, siapa yang udah siap begadang?" },
        { id: 2, author: "Nabila", handle: "@nabila_kpop", time: "3j", text: "Photocard langka akhirnya dapet, senengnya nggak ketulungan." },
        { id: 3, author: "Dion", handle: "@dion_stan", time: "6j", text: "Rekomendasi lagu B-side yang underrated dong." }
    ]},
    { id: 20, category: "Entertainment", name: "Stand-up Comedy ID", members: "10K", posts: [
        { id: 1, author: "Reza", handle: "@reza_mic", time: "3j", text: "Materi baru semalam di open mic, penonton ketawa di tempat yang nggak kuduga." },
        { id: 2, author: "Tasya", handle: "@tasya_joke", time: "7j", text: "Nulis premis lucu itu gampang, bikin punchline-nya yang susah." },
        { id: 3, author: "Bobby", handle: "@bobby_laugh", time: "2h", text: "Jadwal open mic minggu ini udah keluar, cek di pinned post." }
    ]},
    { id: 21, category: "Entertainment", name: "Musik Indie", members: "8K", posts: [
        { id: 1, author: "Alya", handle: "@alya_indie", time: "6j", text: "Rekomendasi band indie lokal buat playlist nugas dong." },
        { id: 2, author: "Naufal", handle: "@naufal_gig", time: "2j", text: "Gig kecil di kafe semalam suasananya hangat banget." },
        { id: 3, author: "Cecil", handle: "@cecil_vinyl", time: "1h", text: "Mulai ngoleksi piringan hitam, ada yang punya tips belinya?" }
    ]},
    { id: 22, category: "Entertainment", name: "Drama Korea Club", members: "22K", posts: [
        { id: 1, author: "Sinta", handle: "@sinta_drakor", time: "50m", text: "Episode kemarin plot twist-nya bikin nggak bisa tidur." },
        { id: 2, author: "Mutia", handle: "@mutia_drama", time: "4j", text: "OST drama ini cocok banget buat nemenin hujan-hujanan." },
        { id: 3, author: "Raka", handle: "@raka_kdrama", time: "8j", text: "Drama romcom ringan buat akhir pekan, ada saran?" }
    ]},

    { id: 10, category: "Gaming", name: "Mobile Legends ID", members: "40K", posts: [
        { id: 1, author: "Rafi", handle: "@rafi_ml", time: "1j", text: "Season baru gacorrr parah." },
        { id: 2, author: "Bella", handle: "@bella_mm", time: "4j", text: "Main marksman itu soal posisi, bukan cuma soal damage." },
        { id: 3, author: "Ilham", handle: "@ilham_push", time: "2h", text: "Cari squad mabar malam ini, mythic ke atas." }
    ]},
    { id: 11, category: "Gaming", name: "GTA Talk", members: "11K", posts: [
        { id: 1, author: "Cinna", handle: "@cinna", time: "1h", text: "Jujurrr GTA nagih bgt sih." },
        { id: 2, author: "Bagas", handle: "@bagas_rp", time: "5j", text: "Server roleplay yang rame dan santai ada yang tau?" },
        { id: 3, author: "Sheila", handle: "@sheila_mod", time: "3j", text: "Mod grafis terbaru bikin kota terlihat kayak nyata." }
    ]},
    { id: 23, category: "Gaming", name: "Valorant Indonesia", members: "19K", posts: [
        { id: 1, author: "Galih", handle: "@galih_vlr", time: "2j", text: "Cari duo ranked, main Jett atau Reyna. Chat aja kalau cocok." },
        { id: 2, author: "Anggi", handle: "@anggi_sage", time: "6j", text: "Crosshair setting yang nyaman di mata, bagi dong." },
        { id: 3, author: "Dani", handle: "@dani_ace", time: "1h", text: "Clutch 1v4 semalam masih kebayang sampai sekarang." }
    ]},
    { id: 24, category: "Gaming", name: "Genshin Impact ID", members: "16K", posts: [
        { id: 1, author: "Mei", handle: "@mei_genshin", time: "4j", text: "Banner baru keluar, tabungan primogem aman nggak nih?" },
        { id: 2, author: "Lukas", handle: "@lukas_abyss", time: "7j", text: "Tim untuk Abyss lantai 12 yang murah tapi kuat apa ya?" },
        { id: 3, author: "Okta", handle: "@okta_explore", time: "3h", text: "Eksplorasi region baru ternyata luas banget, banyak rahasia." }
    ]},
    { id: 25, category: "Gaming", name: "Minecraft Builders", members: "6K", posts: [
        { id: 1, author: "Dika", handle: "@dika_craft", time: "7j", text: "Base bawah tanah udah jadi, tinggal dekor bagian dalamnya." },
        { id: 2, author: "Eva", handle: "@eva_redstone", time: "2j", text: "Pintu otomatis pakai redstone akhirnya berhasil setelah 3 kali gagal." },
        { id: 3, author: "Jaya", handle: "@jaya_build", time: "1h", text: "Proyek kastil bareng, butuh 3 orang lagi buat bagian menara." }
    ]}
];

const JOINED_KEY = "joinedCommunities";
const BOOKMARK_KEY = "bookmarks";
const ACTION_KEY = "postActions";
const DEFAULT_AVATAR = "../image/Default_pfp.jpeg";

let currentView = "home";
let currentCategory = categories[0];
let joinedIds = loadJoined();

const homeEl = document.getElementById("home");
const exploreEl = document.getElementById("explore");
const chipsEl = document.querySelector(".category-chips");
const titleEl = document.querySelector(".explore-title");
const listEl = document.querySelector(".community-list");
const tabs = document.querySelectorAll(".nav-tab");

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

function loadJoined() {
    return new Set(readJSON(JOINED_KEY, []));
}

function saveJoined() {
    writeJSON(JOINED_KEY, [...joinedIds]);
}

function postKey(community, post) {
    return "c" + community.id + "-p" + post.id;
}

function getActions(key) {
    const all = readJSON(ACTION_KEY, {});
    return all[key] || { liked: false, reposted: false };
}

function toggleAction(key, type) {
    const all = readJSON(ACTION_KEY, {});
    const current = all[key] || { liked: false, reposted: false };
    current[type] = !current[type];
    all[key] = current;
    writeJSON(ACTION_KEY, all);
}

function isBookmarked(key) {
    return readJSON(BOOKMARK_KEY, []).some(p => p.id === key);
}

function toggleBookmark(community, post) {
    const key = postKey(community, post);
    let list = readJSON(BOOKMARK_KEY, []);

    if (list.some(p => p.id === key)) {
        list = list.filter(p => p.id !== key);
    } else {
        list.push({
            id: key,
            community: community.name,
            name: post.author,
            handle: post.handle,
            time: post.time,
            text: post.text
        });
    }
    writeJSON(BOOKMARK_KEY, list);
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

    homeEl.innerHTML = joined.flatMap(c => c.posts.map(p => {
        const key = postKey(c, p);
        const state = getActions(key);
        const saved = isBookmarked(key);
        const ref = `data-post="${c.id}" data-pid="${p.id}"`;

        return `
        <article class="post">
            <img class="post-avatar" src="${DEFAULT_AVATAR}" alt="Foto profil ${escapeHtml(p.author)}">

            <div class="post-body">
                <div class="post-community">${escapeHtml(c.name)}</div>
                <p class="post-author">
                    <strong>${escapeHtml(p.author)}</strong>
                    <span>${escapeHtml(p.handle)} · ${escapeHtml(p.time)}</span>
                </p>
                <p class="post-text">${escapeHtml(p.text)}</p>

                <div class="post-actions">
                    <button class="action-btn like-btn${state.liked ? " active" : ""}" data-action="like" ${ref} aria-label="Like">
                        <span class="icon">${state.liked ? "♥" : "♡"}</span>
                        <span class="count">${state.liked ? 1 : 0}</span>
                    </button>
                    <button class="action-btn repost-btn${state.reposted ? " active" : ""}" data-action="repost" ${ref} aria-label="Repost">
                        <span class="icon">⟲</span>
                        <span class="count">${state.reposted ? 1 : 0}</span>
                    </button>
                    <button class="action-btn bookmark-btn${saved ? " active" : ""}" data-action="bookmark" ${ref} aria-label="Simpan">
                        <span class="icon">${saved ? "🔖" : "🏷️"}</span>
                    </button>
                </div>
            </div>
        </article>`;
    })).join("");
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

    const action = button.dataset.action;

    if (button.dataset.post) {
        const community = communities.find(c => c.id === Number(button.dataset.post));
        if (!community) return;
        const post = community.posts.find(p => p.id === Number(button.dataset.pid));
        if (!post) return;

        const key = postKey(community, post);
        if (action === "like") toggleAction(key, "liked");
        if (action === "repost") toggleAction(key, "reposted");
        if (action === "bookmark") toggleBookmark(community, post);
    } else if (action === "go-explore") {
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

fetch("../sidebar.html")
    .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;
    })
    .catch(err => console.error("Sidebar gagal dimuat:", err));