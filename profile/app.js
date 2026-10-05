// ===== SIDEBAR (hanya kalau ada #right-bar) =====
const rightBar = document.getElementById("right-bar");
if (rightBar) {
    fetch("../right-sidebar.html")
        .then(res => res.text())
        .then(data => { rightBar.innerHTML = data; })
        .catch(err => console.error("Error memuat sidebar kanan:", err));
}


// ===== DATA TERSIMPAN =====
const profileName = localStorage.getItem("profileName") || "Nama Akun";
const profileUsername = localStorage.getItem("profileUsername") || "username";
const bio = localStorage.getItem("profileBio");
const pic = localStorage.getItem("profilePic");
const banner = localStorage.getItem("profileBanner");

// ===== HALAMAN PROFILE =====
const elName = document.getElementById("profile-name");
if (elName) {
    elName.textContent = profileName;
    document.getElementById("profile-username").textContent = "@" + profileUsername;
    if (bio) document.getElementById("profileBio").textContent = bio;
    if (pic) document.getElementById("profile-pic").src = pic;

    document.querySelectorAll(".post-name").forEach(el => el.textContent = profileName);
    document.querySelectorAll(".post-username").forEach(el => el.textContent = "@" + profileUsername);
    if (pic) document.querySelectorAll(".post-profile").forEach(el => el.src = pic);
}
const bannerEl = document.getElementById("banner-pic");
if (bannerEl && banner) bannerEl.src = banner;
if (bannerEl) bannerEl.style.objectPosition = "center " + (localStorage.getItem("profileBannerPos") || 50) + "%";

const lockEl = document.getElementById("profile-lock");
if (lockEl) {
    const isProtected = localStorage.getItem("profileProtected") === "true";
    lockEl.style.display = isProtected ? "inline-block" : "none";
}

// ===== HALAMAN EDIT PROFILE =====
const upload = document.getElementById("profile-upload");
if (upload) {
    const preview = document.getElementById("profile-preview");
    const nameInput = document.getElementById("akun");
    const usernameInput = document.getElementById("acc");
    const bioInput = document.getElementById("bio");
    const bannerInput = document.getElementById("banner-upload");
    const bannerPreview = document.getElementById("banner-preview");

    let newPic = null;
    let bannerData = banner || "";

    if (pic) preview.src = pic;
    if (bannerData) {
        bannerPreview.src = bannerData;
        bannerPreview.style.display = "block";
    }

    nameInput.value = localStorage.getItem("profileName") || "";
    usernameInput.value = localStorage.getItem("profileUsername") || "";
    bioInput.value = localStorage.getItem("profileBio") || "";
    const bioCount = document.getElementById("bio-count");

    function updateBioCount() {
    bioCount.textContent = bioInput.value.length + "/50";
}

bioInput.addEventListener("input", updateBioCount);
updateBioCount();

    usernameInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^a-zA-Z0-9._]/g, "");
    });

    upload.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const size = 300;
                const canvas = document.createElement("canvas");
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext("2d");
                const min = Math.min(img.width, img.height);
                ctx.drawImage(img, (img.width - min) / 2, (img.height - min) / 2, min, min, 0, 0, size, size);
                newPic = canvas.toDataURL("image/jpeg", 0.85);
                preview.src = newPic;
            };
            img.onerror = () => alert("Format foto tidak didukung, coba JPG atau PNG.");
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });

  const bannerRemove = document.getElementById("banner-remove");

bannerInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const scale = Math.min(1, 1200 / img.width);
            const canvas = document.createElement("canvas");
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            bannerData = canvas.toDataURL("image/jpeg", 0.8);
            bannerPreview.src = bannerData;
            bannerPos = 50; applyBannerPos();     // <-- BARU
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

bannerRemove.addEventListener("click", function () {
    bannerData = "";
    bannerPreview.src = "banner.png";
    bannerPos = 50; applyBannerPos();
});


const bannerBox = bannerPreview.parentElement;
let bannerPos = parseFloat(localStorage.getItem("profileBannerPos")) || 50;
let dragY = null, startPos = 50;

function applyBannerPos() {
    bannerPreview.style.objectPosition = "center " + bannerPos + "%";
}
applyBannerPos();


bannerPreview.draggable = false;
bannerBox.style.cursor = "grab";
bannerBox.style.touchAction = "none";

bannerBox.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".banner-actions")) return;
    dragY = e.clientY;
    startPos = bannerPos;
    bannerBox.setPointerCapture(e.pointerId);
    bannerBox.style.cursor = "grabbing";
});

bannerBox.addEventListener("pointermove", function (e) {
    if (dragY === null) return;
    const scaledH = bannerBox.clientWidth * bannerPreview.naturalHeight / bannerPreview.naturalWidth;
    const range = scaledH - bannerBox.clientHeight;
    if (range <= 0) return;
    bannerPos = Math.min(100, Math.max(0, startPos - (e.clientY - dragY) / range * 100));
    applyBannerPos();
});

["pointerup", "pointercancel"].forEach(function (ev) {
    bannerBox.addEventListener(ev, function () {
        dragY = null;
        bannerBox.style.cursor = "grab";
    });
});

    window.saveProfile = function () {
        const name = nameInput.value.trim();
        const username = usernameInput.value.trim().toLowerCase();
        const bioVal = bioInput.value.trim();

        if (name === "") { alert("Nama tidak boleh kosong."); return; }
        if (username.length < 3) { alert("ID akun minimal 3 karakter."); return; }

        try {
            if (newPic) localStorage.setItem("profilePic", newPic);

            if (bannerData) localStorage.setItem("profileBanner", bannerData);
            else localStorage.removeItem("profileBanner");

            localStorage.setItem("profileBannerPos", bannerPos.toFixed(1));
            localStorage.setItem("profileName", name);
            localStorage.setItem("profileUsername", username);
            localStorage.setItem("profileBio", bioVal);
        } catch (err) {
            alert("Gagal menyimpan: " + err.message);
            return;
        }
       if (window.parent !== window) window.parent.location.reload();
else window.location.href = "profile.html";
    };
}

// LIKE SYSTEM

const posts = document.querySelectorAll(".dummy-post");
const likeButtons = document.querySelectorAll(".like-button");

let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
posts.forEach(post => {
    const postId = post.dataset.id;
    const button = post.querySelector(".like-button");
    if (!button) return;

    const icon = button.querySelector("img");
    const countEl = button.querySelector(".like-count");

    if (likedPosts.includes(postId)) {
        icon.src = "../image/icons/like-full.svg"; 
        button.classList.add("liked");
        countEl.textContent = parseInt(countEl.textContent) + 1; 
    }
});


// Ketika tombol like diklik
likeButtons.forEach(button => {

    button.addEventListener("click", function () {

        const post = button.closest(".dummy-post");
        const postId = post.dataset.id;

        const countElement = button.querySelector(".like-count");
        const icon = button.querySelector("img");

        let count = parseInt(countElement.textContent);


     // UNLIKE

        if (likedPosts.includes(postId)) {

            likedPosts = likedPosts.filter(id => id !== postId);

            count--;

            icon.src = "../image/icons/like.svg";

            button.classList.remove("liked");

        }

        // LIKe
        else {

            likedPosts.push(postId);

            count++;

            icon.src = "../image/icons/like-full.svg";

            button.classList.add("liked");
        }
        countElement.textContent = count;
        localStorage.setItem(
            "likedPosts",
            JSON.stringify(likedPosts)
        );

    });

});

/// TAB SYSTEM
const tabs = document.querySelectorAll(".tab-button");
const repliesList = document.getElementById("replies-list");

tabs.forEach(tab => {
    tab.addEventListener("click", function () {
        const selectedTab = tab.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        // POSTS
        if (selectedTab === "posts") {
            posts.forEach(post => { post.style.display = "block"; });
            if (repliesList) repliesList.style.display = "none";
        }

        // LIKES
        else if (selectedTab === "likes") {
            posts.forEach(post => {
                post.style.display = likedPosts.includes(post.dataset.id) ? "block" : "none";
            });
            if (repliesList) repliesList.style.display = "none";
        }

        // REPLIES
        else if (selectedTab === "replies") {
            posts.forEach(post => { post.style.display = "none"; });
            if (repliesList) repliesList.style.display = "block";
        }
    });
});

// ===== EDIT PROFILE SEBAGAI POPUP =====
const editBtn = document.getElementById("edit-btn");
const editModal = document.getElementById("edit-modal");
const editFrame = document.getElementById("edit-frame");

if (editBtn && editModal && editFrame) {
    editBtn.addEventListener("click", function () {
        editFrame.src = "edit_profile.html";
        editModal.hidden = false;
    });

    editModal.addEventListener("click", function (e) {
        if (e.target === editModal) editModal.hidden = true;
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") editModal.hidden = true;
    });
}

if (window.parent !== window) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
}

const BOOKMARK_KEY = "bookmarks";

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

// klik tombol bookmark
document.addEventListener("click", e => {
    const btn = e.target.closest('[data-action="bookmark"]');
    if (!btn) return;

    const post = btn.closest("[data-id]");
    const id = post.dataset.id;
    let list = getBookmarks();

    if (list.some(p => p.id === id)) {
        list = list.filter(p => p.id !== id);
        setIcon(btn, false);
    } else {
        list.push({
            id: id,
            name: post.querySelector(".post-name").textContent.trim(),
            handle: post.querySelector(".post-username").textContent.trim(),
            time: post.dataset.time || "",
            community: "",
            text: post.querySelector(".post-text").textContent.trim()
        });
        setIcon(btn, true);
    }

    saveBookmarks(list);
});

function setIcon(btn, active) {
    btn.classList.toggle("active", active);
    btn.querySelector("img").src =
        "../image/icons/" + (active ? "bookmark-full.svg" : "bookmark.svg");
}

document.querySelectorAll('[data-action="bookmark"]').forEach(btn => {
    const id = btn.closest("[data-id]").dataset.id;
    setIcon(btn, getBookmarks().some(p => p.id === id));
});