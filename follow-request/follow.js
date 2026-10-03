document.addEventListener("DOMContentLoaded", () => {
    const usersContainer = document.getElementById("users-container");

    const suggestUsers = [
        { id: "alex_ander", name: "Alexander", handle: "@alex_ander" },
        { id: "trin_writes", name: "Kat", handle: "@trin_writes" },
        { id: "garth_dev", name: "Garth", handle: "@garth_dev" },
        { id: "athena_wisdom", name: "Athena", handle: "@athena_wisdom" }
    ];

    function getFollowingList() {
        return JSON.parse(localStorage.getItem("xclone_following")) || [];
    }

    function saveFollowingList(list) {
        localStorage.setItem("xclone_following", JSON.stringify(list));
    }

    function renderUsers() {
        const following = getFollowingList();
        let html = "";

        suggestUsers.forEach(user => {
            const isFollowing = following.includes(user.id);
            html += `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #eff3f4;">
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <img src="../image/Default_pfp.jpeg" alt="Pfp" class="pfp" style="width: 40px; height: 40px;">
                        <div>
                            <b>${user.name}</b><br>
                            <span style="color: gray; font-size: 14px;">${user.handle}</span>
                        </div>
                    </div>
                    <button class="bg-pink btn-follow" data-id="${user.id}" style="padding: 6px 16px; border-radius: 9999px; border: none; cursor: pointer; font-weight: bold;">
                        ${isFollowing ? "Following" : "Follow"}
                    </button>
                </div>
            `;
        });

        usersContainer.innerHTML = html;

        document.querySelectorAll(".btn-follow").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const userId = e.target.getAttribute("data-id");
                let following = getFollowingList();

                const index = following.indexOf(userId);
                if (index === -1) {
                    following.push(userId);
                } else {
                    following.splice(index, 1);
                }

                saveFollowingList(following);
                renderUsers();
            });
        });
    }

    renderUsers();
    
});