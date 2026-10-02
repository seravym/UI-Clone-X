document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Memanggil Sidebar (Perhatikan path "../sidebar.html")
    const sidebarContainer = document.getElementById("sidebar"); 
    if (sidebarContainer) {
        fetch("../sidebar.html") 
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                attachReplyEvents();
            })
            .catch(error => console.error("Error memuat sidebar:", error));
    } else {
        attachReplyEvents();
    }
    
    // 1. Baca URL untuk mencari tahu kita sedang membuka postingan nomor berapa
    // Menggunakan key localStorage yang sama dengan Home agar datanya sinkron
    const STORE_POST_PREFS = "xclone.posts.prefs";
    let postPrefs = JSON.parse(localStorage.getItem(STORE_POST_PREFS)) || { liked: [], saved: [] };

    function savePostPrefs() {
        localStorage.setItem(STORE_POST_PREFS, JSON.stringify(postPrefs));
    }

    // Asumsikan kamu mendapatkan ID post dari URL parameter (misal: post.html?id=0)
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));

    // Contoh jika postData tersedia dan post ditemukan
    if (typeof postData !== 'undefined' && !isNaN(postId) && postData.posts[postId]) {
        const post = postData.posts[postId];
        
        const isLiked = postPrefs.liked.includes(postId);
        const isSaved = postPrefs.saved.includes(postId);
        const displayLikes = post.likes + (isLiked ? 1 : 0);

        const likeIconSrc = isLiked ? '../image/icons/like-full.svg' : '../image/icons/like.svg';
        const saveIconSrc = isSaved ? '../image/icons/bookmark-full.svg' : '../image/icons/bookmark.svg';

        // Render HTML detail post (sesuaikan struktur elemen dengan project kamu)
        const postDetailContainer = document.getElementById('post-detail-container'); // Ganti dengan ID kontainer post kamu
        if (postDetailContainer) {
            postDetailContainer.innerHTML = `
                <div class="post-container" data-id="${postId}">
                    <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                    <div style="width: 100%;">
                        <b>${post.name}</b> <span style="color: #536471;">${post.handle} · ${post.time}</span>
                        <p style="font-size: 1.1rem; margin-top: 10px;">${post.message}</p>
                        
                        <div class="post-actions" style="margin-top: 15px; display: flex; justify-content: space-around;">
                            <span class="action-item">
                                <img src="../image/icons/chat.svg" class="action-icon" alt="Reply"> ${post.replies}
                            </span> 
                            
                            <span class="action-item action-btn action-like ${isLiked ? 'active' : ''}" data-action="like" data-id="${postId}">
                                <img src="${likeIconSrc}" class="action-icon action-icon-like" alt="Like"> 
                                <span class="count">${displayLikes}</span>
                            </span> 
                            
                            <span class="action-item">
                                <img src="../image/icons/view.svg" class="action-icon" alt="View"> ${post.views}
                            </span>
                            
                            <span class="action-item action-btn action-save ${isSaved ? 'active' : ''}" data-action="save" data-id="${postId}">
                                <img src="${saveIconSrc}" class="action-icon action-icon-save" alt="Bookmark">
                            </span>
                        </div>
                    </div>
                </div>
            `;

            // Event Listener untuk tombol aksi di halaman Post
            postDetailContainer.addEventListener('click', function(e) {
                const actionBtn = e.target.closest('.action-btn');

                if (actionBtn) {
                    const action = actionBtn.getAttribute('data-action');
                    const id = parseInt(actionBtn.getAttribute('data-id'));
                    const imgIcon = actionBtn.querySelector('img');

                    if (action === 'like') {
                        const index = postPrefs.liked.indexOf(id);
                        const countSpan = actionBtn.querySelector('.count');
                        let currentCount = parseInt(countSpan.textContent);

                        if (index === -1) {
                            postPrefs.liked.push(id);
                            actionBtn.classList.add('active');
                            countSpan.textContent = currentCount + 1;
                            imgIcon.src = '../image/icons/like-full.svg';
                        } else {
                            postPrefs.liked.splice(index, 1);
                            actionBtn.classList.remove('active');
                            countSpan.textContent = currentCount - 1;
                            imgIcon.src = '../image/icons/like.svg';
                        }
                    } else if (action === 'save') {
                        const index = postPrefs.saved.indexOf(id);
                        if (index === -1) {
                            postPrefs.saved.push(id);
                            actionBtn.classList.add('active');
                            imgIcon.src = '../image/icons/bookmark-full.svg';
                        } else {
                            postPrefs.saved.splice(index, 1);
                            actionBtn.classList.remove('active');
                            imgIcon.src = '../image/icons/bookmark.svg';
                        }
                    }
                    savePostPrefs();
                }
            });
        }
    }

    // 2. Mengaktifkan Tombol Reply
    function attachReplyEvents() {
        const replyButtons = document.querySelectorAll(".btn-reply");
        const textareas = document.querySelectorAll(".post-input");

        replyButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                textareas.forEach(ta => {
                    if (ta.value.trim() !== "") {
                        alert("Your reply has been posted! 💬");
                        ta.value = "";
                    }
                });
            });
        });
    }
});