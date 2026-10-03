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

const bannerEl = document.getElementById("profile-banner");
if (bannerEl) {
    if (banner) bannerEl.src = banner;
    else bannerEl.style.display = "none";
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

    bannerInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            bannerData = e.target.result;
            bannerPreview.src = bannerData;
            bannerPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    });


    window.saveProfile = function () {
        const name = nameInput.value.trim();
        const username = usernameInput.value.trim().toLowerCase();
        const bioVal = bioInput.value.trim();

        if (name === "") { alert("Nama tidak boleh kosong."); return; }
        if (username.length < 3) { alert("ID akun minimal 3 karakter."); return; }

        try {
            if (newPic) localStorage.setItem("profilePic", newPic);
            localStorage.setItem("profileBanner", bannerData);
            localStorage.setItem("profileName", name);
            localStorage.setItem("profileUsername", username);
            localStorage.setItem("profileBio", bioVal);
        } catch (err) {
            alert("Gagal menyimpan: " + err.message);
            return;
        }
        window.location.href = "profile.html";
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

    if (likedPosts.includes(postId)) {
        icon.src = "../image/icons/like-filled.svg";
        button.classList.add("liked");
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

// TAB SYSTEM
const tabs = document.querySelectorAll(".tab-button");


tabs.forEach(tab => {

    tab.addEventListener("click", function () {

        const selectedTab = tab.dataset.tab;
        tabs.forEach(t => {
            t.classList.remove("active");
        });

        tab.classList.add("active");

        // POSTS
        if (selectedTab === "posts") {

            posts.forEach(post => {
                post.style.display = "block";
            });

        }

        // LIKES
        else if (selectedTab === "likes") {

            posts.forEach(post => {

                const postId = post.dataset.id;

                if (likedPosts.includes(postId)) {
                    post.style.display = "block";
                } else {
                    post.style.display = "none";
                }

            });

        }
        // REPLIES
        else if (selectedTab === "replies") {

            posts.forEach(post => {
                post.style.display = "none";
            });

        }

    });

});

