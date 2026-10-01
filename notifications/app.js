function loadSidebar() {
    fetch("../sidebar.html")
        .then(function (response) { return response.text(); })
        .then(function (html) { document.getElementById("sidebar").innerHTML = html; })
        .catch(function (error) { console.log("Sidebar gagal dimuat:", error); });
}

let notifications = [
    { name: "Anne Hattway", action: "liked your post", time: "2h", message: "sunshine by ariana is the best", type: "like", unread: true, image: "../image/Default_pfp.jpeg" },
    { name: "Andi Wijaya", action: "started following you", time: "New", type: "follow", unread: true, image: "../image/Default_pfp.jpeg" },
    { name: "Chelsea", action: "mentioned you", time: "5m", message: "@user your favorite music is out now!", type: "mention", unread: false, image: "../image/Default_pfp.jpeg" },
    { name: "Rina Kent", action: "replied to your post", time: "1h", message: "have you guys alr seen the newest book by Jane Austen?", type: "reply", unread: false, image: "../image/Default_pfp.jpeg" }
];

let currentTab = "all";
let currentType = "all";

function markAsRead(card, notification) {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", notification.name + ": " + notification.action + ". Tandai sudah dibaca");

    if (notification.unread) card.classList.add("unread");

    card.addEventListener("click", function () {
        notification.unread = false;
        card.classList.remove("unread");
        if (currentTab == "unread") showNotifications();
    });

    card.addEventListener("keydown", function (event) {
        if (event.key == "Enter" || event.key == " ") {
            event.preventDefault();
            card.click();
        }
    });
}

function showNotifications() {
    let list = document.getElementById("notif-list-main");
    list.innerHTML = "";

    notifications.forEach(function (notification) {
        let wrongType = currentType != "all" && notification.type != currentType;
        let isRead = currentTab == "unread" && !notification.unread;
        if (wrongType || isRead) return;

        let card = document.createElement("div");
        card.className = "notif-card";
        markAsRead(card, notification);
        card.innerHTML = `
            <img class="notif-avatar" src="${notification.image}" alt="Profile">
            <div class="notif-content">
                <div class="notif-text">
                    <span class="notif-name">${notification.name}</span>
                    <span class="notif-action">${notification.action}</span>
                    <span class="notif-time">${notification.time}</span>
                </div>
                ${notification.message ? `<div class="notif-message">${notification.message}</div>` : ""}
            </div>`;
        list.appendChild(card);
    });
}

function chooseTab(tabName) {
    currentTab = tabName;
    document.getElementById("all-tab").classList.toggle("active", tabName == "all");
    document.getElementById("unread-tab").classList.toggle("active", tabName == "unread");
    showNotifications();
}

function chooseFilter(filterButton) {
    document.querySelectorAll(".notif-filter-item").forEach(function (button) {
        button.classList.remove("active");
    });
    filterButton.classList.add("active");
    currentType = filterButton.getAttribute("data-filter");
    showNotifications();
}

loadSidebar();
document.getElementById("all-tab").addEventListener("click", function () { chooseTab("all"); });
document.getElementById("unread-tab").addEventListener("click", function () { chooseTab("unread"); });
document.querySelectorAll(".notif-filter-item").forEach(function (button) {
    button.addEventListener("click", function () { chooseFilter(button); });
});
showNotifications();