document.addEventListener("DOMContentLoaded", () => {
    const postButtons = document.querySelectorAll(".btn-reply, .sidebar-post-btn");
    const textareas = document.querySelectorAll(".post-input");
    const feedContainer = document.getElementById("feed-container");
    const sidebarContainer = document.getElementById("sidebar");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const BOOKMARK_KEY = "bookmarks";
    const STORE_POST_PREFS = "xclone.posts.prefs";
    const STORE_ALL_POSTS = "xclone.posts.list";
    const FOLLOWING_KEY = "xclone_following";
    let currentTab = "foryou";

    function getStoredPosts() {
        let posts = JSON.parse(localStorage.getItem(STORE_ALL_POSTS));
        if (!posts || posts.length === 0) {
            if (typeof postData !== 'undefined' && postData.posts) {
                posts = [...postData.posts];
                localStorage.setItem(STORE_ALL_POSTS, JSON.stringify(posts));
            }
        }
        return posts || [];
    }

    function saveStoredPosts(posts) {
        localStorage.setItem(STORE_ALL_POSTS, JSON.stringify(posts));
    }

    let postPrefs = JSON.parse(localStorage.getItem(STORE_POST_PREFS)) || { liked: [], saved: [] };
    if (!Array.isArray(postPrefs.liked)) postPrefs.liked = [];
    if (!Array.isArray(postPrefs.saved)) postPrefs.saved = [];

    function savePostPrefs() {
        localStorage.setItem(STORE_POST_PREFS, JSON.stringify(postPrefs));
    }

    function renderFeed() {
        if (!feedContainer) return;

        let posts = getStoredPosts();
        let postsToDisplay = [...posts];

        if (currentTab === "following") {
            const followingList = JSON.parse(localStorage.getItem(FOLLOWING_KEY)) || [];
            postsToDisplay = posts.map((post, originalIndex) => {
                const postHandle = post.handle.replace("@", "").trim().toLowerCase();
                const isFollowed = followingList.some(followedId => {
                    const cleanId = followedId.trim().toLowerCase();
                    return postHandle.includes(cleanId) || cleanId.includes(postHandle);
                });
                return isFollowed ? { ...post, originalIndex } : null;
            }).filter(post => post !== null);
        } else {
            postsToDisplay = posts.map((post, originalIndex) => ({ ...post, originalIndex }));
        }

        let feedHTML = "";
        postsToDisplay.forEach((post) => {
            const index = post.originalIndex;
            const postId = post.id || (`post_index_${index}`);
            
            const isLiked = postPrefs.liked.includes(postId);
            const savedList = getBookmarks();
            const isSaved = savedList.some(b => b && b.id === postId);
            
            const allComments = JSON.parse(localStorage.getItem("xclone.posts.comments")) || {};
            const customRepliesCount = (allComments[postId] || []).length;
            
            const totalReplies = (post.replies || 0) + customRepliesCount;
            const displayLikes = (post.likes || 0) + (isLiked ? 1 : 0);
            const likeIconSrc = isLiked ? '../image/icons/like-full.svg' : '../image/icons/like.svg';
            const saveIconSrc = isSaved ? '../image/icons/bookmark-full.svg' : '../image/icons/bookmark.svg';

            feedHTML += `
            <div class="post-container" data-post-id="${postId}">
                <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                <div style="width: 100%;">
                    <b>${post.name}</b> <span style="color: #536471;">${post.handle} • ${post.time}</span>
                    <p>${post.message}</p>
                    <div class="post-actions">
                        <span class="action-item">
                            <img src="../image/icons/chat.svg" class="action-icon" alt="Reply"> ${totalReplies}
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
        });
        feedContainer.innerHTML = feedHTML;
    }

    tabButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            tabButtons.forEach(b => b.classList.remove("border-pink"));
            e.currentTarget.classList.add("border-pink");
            currentTab = e.currentTarget.getAttribute("data-tab");
            renderFeed();
        });
    });

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
        try { return JSON.parse(localStorage.getItem(BOOKMARK_KEY)) || []; } catch (e) { return []; }
    }

    function saveBookmarks(list) {
        try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify(list)); } catch (e) {}
    }

    function setSaved(post, postId, on) {
        var list = getBookmarks().filter(b => b && b.id !== postId);
        if (on) {
            list.unshift({ id: postId, name: post.name, handle: post.handle, time: post.time, text: post.message, community: "Post" });
        }
        saveBookmarks(list);
    }

    renderFeed();

    if (feedContainer) {
        feedContainer.addEventListener('click', function(e) {
            const actionBtn = e.target.closest('.action-btn');
            const postContainer = e.target.closest('.post-container');

            if (actionBtn) {
                e.stopPropagation();
                const action = actionBtn.getAttribute('data-action');
                const postId = actionBtn.getAttribute('data-id');
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
                    const post = currentPosts.find(p => (p.id || (`post_index_${currentPosts.indexOf(p)}`)) === postId);
                    
                    if (post) {
                        const savedList = getBookmarks();
                        const isCurrentlySaved = savedList.some(b => b && b.id === postId);
                        let newSaveStatus = !isCurrentlySaved;

                        if (newSaveStatus) {
                            actionBtn.classList.add('active');
                            imgIcon.src = '../image/icons/bookmark-full.svg';
                        } else {
                            actionBtn.classList.remove('active');
                            imgIcon.src = '../image/icons/bookmark.svg';
                        }
                        setSaved(post, postId, newSaveStatus);

                        if (newSaveStatus) {
                            if (!postPrefs.saved.includes(postId)) postPrefs.saved.push(postId);
                        } else {
                            postPrefs.saved = postPrefs.saved.filter(id => id !== postId);
                        }
                    }
                }
                savePostPrefs();
            } else if (postContainer) {
                const postId = postContainer.getAttribute('data-post-id');
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
                            id: "user_post_" + Date.now(),
                            name: "user",
                            handle: "@user",
                            time: "Now",
                            message: postText,
                            replies: 0,
                            likes: 0,
                            views: "0"
                        };
                        currentPosts.unshift(newPost);
                        saveStoredPosts(currentPosts);
                        alert("Your tweet has been posted!");
                        ta.value = "";
                        renderFeed();
                    }
                });
            });
        });
    }
});