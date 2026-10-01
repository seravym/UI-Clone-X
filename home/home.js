document.addEventListener("DOMContentLoaded", () => {
    const postButtons = document.querySelectorAll(".btn-reply, .sidebar-post-btn");
    const textareas = document.querySelectorAll(".post-input");
    const feedContainer = document.getElementById("feed-container");
    const sidebarContainer = document.getElementById("sidebar"); 
    
    if (sidebarContainer) {
        fetch("../sidebar.html") 
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                attachPostButtonEvents();
            })
            .catch(error => console.error("Error memuat sidebar:", error));
    }else {
        attachPostButtonEvents();
    }
    
    if (feedContainer && typeof postData !== 'undefined') {
        let feedHTML = "";
        
        postData.posts.forEach(post => {
            feedHTML += `
            <div class="post-container" onclick="window.location.href='post.html'">
                <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp">
                <div style="width: 100%;">
                    <b>${post.name}</b> <span style="color: #536471;">${post.handle} · ${post.time}</span>
                    <p>${post.message}</p>
                    
                    <!-- Baris aksi menggunakan class dari home.css -->
                    <div class="post-actions">
                        <span class="action-item">
                            <img src="../image/icons/chat.svg" class="action-icon" alt="Reply"> ${post.replies}
                        </span> 
                        
                        <span class="action-item">
                            <img src="../image/icons/like.svg" class="action-icon-like" alt="Like"> ${post.likes}
                        </span> 
                        
                        <span class="action-item">
                            <img src="../image/icons/view.svg" class="action-icon" alt="View"> ${post.views}
                        </span>
                        
                        <span class="action-item">
                            <img src="../image/icons/bookmark.svg" class="action-icon" alt="Bookmark">
                        </span>
                    </div>
                </div>
            </div>
            `;
        });

        feedContainer.innerHTML = feedHTML;
    }

    function attachPostButtonEvents() {
        postButtons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.replaceWith(newBtn);

            newBtn.addEventListener("click", () => {
                textareas.forEach(ta => {
                    if (ta.value.trim() !== "") {
                        alert("Your tweet has been posted! 🌸");
                        ta.value = "";
                    }
                });
            });
        });
    }
});

//     postButtons.forEach(btn => {
//         btn.addEventListener("click", () => {
//             textareas.forEach(ta => {
//                 if(ta.value.trim() !== "") {
//                     alert("Your tweet has been posted! 🌸");
//                     ta.value = "";
//                 }
//             });
//         });
//     });
// });