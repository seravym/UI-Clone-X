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
    if (!Array.isArray(postPrefs.liked)) postPrefs.liked = [];
    if (!Array.isArray(postPrefs.saved)) postPrefs.saved = [];

    function savePostPrefs() {
        localStorage.setItem(STORE_POST_PREFS, JSON.stringify(postPrefs));
    }

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

    const STORE_COMMENTS = "xclone.posts.comments";

    function getComments(uniquePostKey, post) {
        let allComments = JSON.parse(localStorage.getItem(STORE_COMMENTS)) || {};
        let customComments = allComments[uniquePostKey] || [];
        const baseRepliesCount = post && post.replies ? post.replies : 0;
        const maxSeedCount = Math.min(baseRepliesCount, 10);
        let seedComments = [];
        const dummyNames = [
            { name: "Alexander", handle: "@alex_ander", message: "Setuju banget sama postingan ini!" },
            { name: "Kat", handle: "@trin_writes", message: "Keren pembahasannya." },
            { name: "Garth", handle: "@garth_dev", message: "Mantap!" },
            { name: "Athena", handle: "@athena_wisdom", message: "Informasi yang sangat bermanfaat." },
            { name: "Bagus", handle: "@bagus_bola", message: "Mantap sekali pembahasannya." },
            { name: "Citra", handle: "@citra_coding", message: "Sangat membantu, terima kasih!" },
            { name: "Tasya", handle: "@tasya_dev", message: "Setuju dengan pendapat ini." },
            { name: "Eka", handle: "@eka_tech", message: "Keren banget!" },
            { name: "Fajar", handle: "@fajar_frontend", message: "Sangat informatif." },
            { name: "Gita", handle: "@gita_guru", message: "Terima kasih atas informasinya!" }
        ];
        let neededSeed = Math.max(0, maxSeedCount - customComments.length);
        for (let i = 0; i < neededSeed; i++) {
            const dummy = dummyNames[i % dummyNames.length];
            seedComments.push({
                name: dummy.name,
                handle: dummy.handle,
                time: `${i + 1}j`,
                message: dummy.message
            });
        }
        return [...customComments, ...seedComments];
    }

    function saveComment(uniquePostKey, replyText) {
        let allComments = JSON.parse(localStorage.getItem(STORE_COMMENTS)) || {};
        if (!allComments[uniquePostKey]) {
            allComments[uniquePostKey] = [];
        }

        const newReply = {
            name: "user",
            handle: "@user",
            time: "Now",
            message: replyText
        };
        allComments[uniquePostKey].unshift(newReply);
        localStorage.setItem(STORE_COMMENTS, JSON.stringify(allComments));
        return allComments[uniquePostKey];
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
    function setSaved(post, postId, on) {
        var list = getBookmarks().filter(function (b) {
            return b && b.id !== postId;
        });
        if (on) {
            list.unshift({
                id: postId,
                name: post.name,
                handle: post.handle,
                time: post.time,
                text: post.message,
                community: "Post"
            });
        }
        saveBookmarks(list);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const targetIdParam = urlParams.get('id'); 
    const posts = getStoredPosts();

    let post = null;
    let uniquePostKey = "";

    if (targetIdParam) {
        post = posts.find(p => (p.id || `post_index_${posts.indexOf(p)}`) === targetIdParam);
        if (post) {
            uniquePostKey = post.id || targetIdParam;
        } else if (!isNaN(targetIdParam) && posts[targetIdParam]) {
            post = posts[targetIdParam];
            uniquePostKey = post.id || `post_index_${targetIdParam}`;
        }
    }

    if (post) {
        const replies = getComments(uniquePostKey, post);
        const totalActualReplies = (post.replies || 0) + (JSON.parse(localStorage.getItem(STORE_COMMENTS)) || {})[uniquePostKey]?.length || 0;
        
        const isLiked = postPrefs.liked.includes(uniquePostKey);
        const isSaved = postPrefs.saved.includes(uniquePostKey);
        const displayLikes = (post.likes || 0) + (isLiked ? 1 : 0);
        const likeIconSrc = isLiked ? '../image/icons/like-full.svg' : '../image/icons/like.svg';
        const saveIconSrc = isSaved ? '../image/icons/bookmark-full.svg' : '../image/icons/bookmark.svg';

        const postDetailContainer = document.getElementById('post-detail-container');
        if (postDetailContainer) {
            let repliesHTML = replies.map(r => `
                <div class="post-container" style="border-top: 1px solid #eff3f4; padding-left: 30px;">
                    <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                    <div style="width: 100%;">
                        <b>${r.name}</b> <span style="color: #536471;">${r.handle} • ${r.time}</span>
                        <p style="margin-top: 5px;">${r.message}</p>
                    </div>
                </div>
            `).join('');

            postDetailContainer.innerHTML = `
                <div class="post-container" data-id="${uniquePostKey}">
                    <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                    <div style="width: 100%;">
                        <b>${post.name}</b> <span style="color: #536471;">${post.handle} • ${post.time}</span>
                        <p style="font-size: 1.1rem; margin-top: 10px;">${post.message}</p>
                        
                        <div class="post-actions" style="margin-top: 15px; display: flex; justify-content: space-around;">
                            <span class="action-item">
                                <img src="../image/icons/chat.svg" class="action-icon" alt="Reply"> ${totalActualReplies}
                            </span>
                            
                            <span class="action-item action-btn action-like ${isLiked ? 'active' : ''}" data-action="like" data-id="${uniquePostKey}">
                                <img src="${likeIconSrc}" class="action-icon action-icon-like" alt="Like"> 
                                <span class="count">${displayLikes}</span>
                            </span>
                            
                            <span class="action-item">
                                <img src="../image/icons/view.svg" class="action-icon" alt="View"> ${post.views || 0}
                            </span>
                            
                            <span class="action-item action-btn action-save ${isSaved ? 'active' : ''}" data-action="save" data-id="${uniquePostKey}">
                                <img src="${saveIconSrc}" class="action-icon action-icon-save" alt="Bookmark">
                            </span>
                        </div>
                    </div>
                </div>

                <div class="create-post" style="border-bottom: 1px solid #eff3f4; padding: 15px; display: flex; gap: 10px;">
                    <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                    <div style="width: 100%;">
                        <textarea placeholder="Post your reply" class="post-input reply-input" style="width:100%; border:none; outline:none; resize:none; font-family:inherit;"></textarea>
                        <div style="text-align: right; margin-top: 10px;">
                            <button class="bg-pink btn-reply-send" style="padding: 8px 16px; border-radius: 20px; font-weight: bold; cursor: pointer; background-color: #f91880; color: white; border: none;">Reply</button>
                        </div>
                    </div>
                </div>

                <div id="replies-container">
                    ${repliesHTML}
                </div>
            `;

            postDetailContainer.addEventListener('click', function(e) {
                const actionBtn = e.target.closest('.action-btn');
                if (actionBtn) {
                    const action = actionBtn.getAttribute('data-action');
                    const id = actionBtn.getAttribute('data-id');
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
                        let newSaveStatus;
                        if (index === -1) {
                            postPrefs.saved.push(id);
                            actionBtn.classList.add('active');
                            imgIcon.src = '../image/icons/bookmark-full.svg';
                            newSaveStatus = true;
                        } else {
                            postPrefs.saved.splice(index, 1);
                            actionBtn.classList.remove('active');
                            imgIcon.src = '../image/icons/bookmark.svg';
                            newSaveStatus = false;
                        }
                        setSaved(post, id, newSaveStatus);
                    }
                    savePostPrefs();
                }
            });
        }
    }

    function attachReplyEvents() {
        document.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("btn-reply-send")) {
                const textarea = document.querySelector(".reply-input");
                if (textarea) {
                    const replyText = textarea.value.trim();
                    if (replyText !== "" && uniquePostKey) {
                        saveComment(uniquePostKey, replyText);
                        textarea.value = "";
                        location.reload();
                    }
                }
            }
        });
    }
});