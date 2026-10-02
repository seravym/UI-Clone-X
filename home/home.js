document.addEventListener("DOMContentLoaded", () => {
    const postButtons = document.querySelectorAll(".btn-reply, .sidebar-post-btn");
    const textareas = document.querySelectorAll(".post-input");
    const feedContainer = document.getElementById("feed-container");
    const sidebarContainer = document.getElementById("sidebar"); 
    const BOOKMARK_KEY = "bookmarks";
    const BOOKMARK_PREFIX = "post-";
    const STORE_POST_PREFS = "xclone.posts.prefs";
    const STORE_ALL_POSTS = "xclone.posts.list"; // Kunci localStorage untuk daftar post
    
    // Fungsi untuk mengambil post dari localStorage (atau inisialisasi dari postData.posts)
    function getStoredPosts() {
        let posts = JSON.parse(localStorage.getItem(STORE_ALL_POSTS));
        if (!posts && typeof postData !== 'undefined' && postData.posts) {
            posts = [...postData.posts];
            localStorage.setItem(STORE_ALL_POSTS, JSON.stringify(posts));
        }
        return posts || [];
    }

    function saveStoredPosts(posts) {
        localStorage.setItem(STORE_ALL_POSTS, JSON.stringify(posts));
    }
    
    if (sidebarContainer) {
        fetch("../sidebar.html") 
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                attachPostButtonEvents();
            })
            .catch(error => console.error("Error memuat sidebar:", error));
    } else {
        attachPostButtonEvents();
    }

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

    function setSaved(post, postId, on) {
        var key = BOOKMARK_PREFIX + postId;
        var list = getBookmarks().filter(function (b) {
            return !b || b.id !== key;
        });
        
        if (on) {
            list.unshift({
                id: key,
                name: post.name,
                handle: post.handle,
                time: post.time,
                text: post.message,
                community: "Post"
            });
        }
        saveBookmarks(list);
    }
    
    let postPrefs = JSON.parse(localStorage.getItem(STORE_POST_PREFS)) || { liked: [], saved: [] };

    function savePostPrefs() {
        localStorage.setItem(STORE_POST_PREFS, JSON.stringify(postPrefs));
    }

    let posts = getStoredPosts();

    if (feedContainer && posts.length > 0) {
        let feedHTML = "";
        
        posts.forEach((post, index) => {
            const isLiked = postPrefs.liked.includes(index);
            const isSaved = postPrefs.saved.includes(index);
            
            const displayLikes = (post.likes || 0) + (isLiked ? 1 : 0);

            const likeIconSrc = isLiked ? '../image/icons/like-full.svg' : '../image/icons/like.svg';
            const saveIconSrc = isSaved ? '../image/icons/bookmark-full.svg' : '../image/icons/bookmark.svg';

            feedHTML += `
            <div class="post-container" data-index="${index}">
                <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                <div style="width: 100%;">
                    <b>${post.name}</b> <span style="color: #536471;">${post.handle} · ${post.time}</span>
                    <p>${post.message}</p>
                    
                    <div class="post-actions">
                        <span class="action-item">
                            <img src="../image/icons/chat.svg" class="action-icon" alt="Reply"> ${post.replies || 0}
                        </span> 
                        
                        <span class="action-item action-btn action-like ${isLiked ? 'active' : ''}" data-action="like" data-id="${index}">
                            <img src="${likeIconSrc}" class="action-icon action-icon-like" alt="Like"> 
                            <span class="count">${displayLikes}</span>
                        </span> 
                        
                        <span class="action-item">
                            <img src="../image/icons/view.svg" class="action-icon" alt="View"> ${post.views || 0}
                        </span>
                        
                        <span class="action-item action-btn action-save ${isSaved ? 'active' : ''}" data-action="save" data-id="${index}">
                            <img src="${saveIconSrc}" class="action-icon action-icon-save" alt="Bookmark">
                        </span>
                    </div>
                </div>
            </div>
            `;
        });

        feedContainer.innerHTML = feedHTML;

        feedContainer.addEventListener('click', function(e) {
            const actionBtn = e.target.closest('.action-btn');
            const postContainer = e.target.closest('.post-container');

            if (actionBtn) {
                e.stopPropagation();
                
                const action = actionBtn.getAttribute('data-action');
                const postId = parseInt(actionBtn.getAttribute('data-id'));
                const imgIcon = actionBtn.querySelector('img'); 

                if (action === 'like') {
                    const index = postPrefs.liked.indexOf(postId);
                    const countSpan = actionBtn.querySelector('.count');
                    let currentCount = parseInt(countSpan.textContent);

                    if (index === -1) {
                        postPrefs.liked.push(postId);
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
                    let currentPosts = getStoredPosts();
                    const post = currentPosts[postId];
                    if (post) {
                        const index = postPrefs.saved.indexOf(postId);
                        let newSaveStatus;

                        if (index === -1) {
                            postPrefs.saved.push(postId);
                            actionBtn.classList.add('active');
                            imgIcon.src = '../image/icons/bookmark-full.svg';
                            newSaveStatus = true;
                        } else {
                            postPrefs.saved.splice(index, 1);
                            actionBtn.classList.remove('active');
                            imgIcon.src = '../image/icons/bookmark.svg';
                            newSaveStatus = false;
                        }
                        
                        setSaved(post, postId, newSaveStatus);
                        savePostPrefs();
                    }
                }
                savePostPrefs();
                
            } else if (postContainer) {
                const postId = postContainer.getAttribute('data-index');
                window.location.href = `../post/post.html?id=${postId}`;
            }
        });
    }

    function attachPostButtonEvents() {
        postButtons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.replaceWith(newBtn);
            newBtn.addEventListener("click", () => {
                textareas.forEach(ta => {
                    const postText = ta.value.trim();
                    if (postText !== "") {
                        let currentPosts = getStoredPosts();
                        const newPost = {
                            name: "user",
                            handle: "@user",
                            time: "Now",
                            message: postText,
                            replies: 0,
                            likes: 0,
                            views: "0"
                        };

                        currentPosts.unshift(newPost); // Masukkan ke urutan paling atas
                        saveStoredPosts(currentPosts); // Simpan permanen ke localStorage

                        alert("Your tweet has been posted!");
                        ta.value = "";
                        location.reload(); // Refresh otomatis agar indeks dan tampilan tersinkron sempurna
                    }
                });
            });
        });
    }
});