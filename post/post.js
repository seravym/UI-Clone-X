document.addEventListener("DOMContentLoaded", () => {
    
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
    
    const STORE_POST_PREFS = "xclone.posts.prefs";
    const STORE_ALL_POSTS = "xclone.posts.list";
    let postPrefs = JSON.parse(localStorage.getItem(STORE_POST_PREFS)) || { liked: [], saved: [] };

    function savePostPrefs() {
        localStorage.setItem(STORE_POST_PREFS, JSON.stringify(postPrefs));
    }

    function getStoredPosts() {
        let posts = JSON.parse(localStorage.getItem(STORE_ALL_POSTS));
        if (!posts && typeof postData !== 'undefined' && postData.posts) {
            posts = [...postData.posts];
            localStorage.setItem(STORE_ALL_POSTS, JSON.stringify(posts));
        }
        return posts || [];
    }

    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    const posts = getStoredPosts();

    if (!isNaN(postId) && posts[postId]) {
        const post = posts[postId];
        
        const isLiked = postPrefs.liked.includes(postId);
        const isSaved = postPrefs.saved.includes(postId);
        const displayLikes = (post.likes || 0) + (isLiked ? 1 : 0);

        const likeIconSrc = isLiked ? '../image/icons/like-full.svg' : '../image/icons/like.svg';
        const saveIconSrc = isSaved ? '../image/icons/bookmark-full.svg' : '../image/icons/bookmark.svg';

        const postDetailContainer = document.getElementById('post-detail-container');
        if (postDetailContainer) {
            postDetailContainer.innerHTML = `
                <div class="post-container" data-id="${postId}">
                    <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                    <div style="width: 100%;">
                        <b>${post.name}</b> <span style="color: #536471;">${post.handle} · ${post.time}</span>
                        <p style="font-size: 1.1rem; margin-top: 10px;">${post.message}</p>
                        
                        <div class="post-actions" style="margin-top: 15px; display: flex; justify-content: space-around;">
                            <span class="action-item">
                                <img src="../image/icons/chat.svg" class="action-icon" alt="Reply"> ${post.replies || 0}
                            </span> 
                            
                            <span class="action-item action-btn action-like ${isLiked ? 'active' : ''}" data-action="like" data-id="${postId}">
                                <img src="${likeIconSrc}" class="action-icon action-icon-like" alt="Like"> 
                                <span class="count">${displayLikes}</span>
                            </span> 
                            
                            <span class="action-item">
                                <img src="../image/icons/view.svg" class="action-icon" alt="View"> ${post.views || 0}
                            </span>
                            
                            <span class="action-item action-btn action-save ${isSaved ? 'active' : ''}" data-action="save" data-id="${postId}">
                                <img src="${saveIconSrc}" class="action-icon action-icon-save" alt="Bookmark">
                            </span>
                        </div>
                    </div>
                </div>
            `;

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
                            postPrefs.liked.post.splice(index, 1);
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