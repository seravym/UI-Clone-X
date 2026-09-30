fetch("../sidebar.html")
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        document.getElementById("sidebar").innerHTML = data;
    })
    .catch(function(error) {
        console.log("Sidebar gagal dimuat:", error);
    });

let notifications = [
  {
    name: "Anne Hattway",
    action: "liked your post",
    time: "2h",
    message: "sunshine by ariana is the best",
    type: "like",
    unread: true,
    image: "../image/Default_pfp.jpeg",
  },

  {
    name: "Andi Wijaya",
    action: "started following you",
    time: "New",
    type: "follow",
    unread: true,
    image: "../image/Default_pfp.jpeg",
  },

  {
    name: "Chelsea",
    action: "mentioned you",
    time: "5m",
    message: "@user your favorite music is out now!",
    type: "mention",
    unread: false,
    image: "../image/Default_pfp.jpeg",
  },

  {
    name: "Rina Kent",
    action: "replied to your post",
    time: "1h",
    message: "have you guys alr seen the newest book by Jane Austen?",
    type: "reply",
    unread: false,
    image: "../image/Default_pfp.jpeg",
  },
];

function enableNotificationClick(card, notif, unreadOnly) {
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", notif.name + ": " + notif.action + ". Tandai sudah dibaca");

  if (notif.unread) {
    card.classList.add("unread");
  }

  card.addEventListener("click", function () {
    notif.unread = false;
    card.classList.remove("unread");

    if (unreadOnly) {
      showNotifications("unread");
    }
  });

  card.addEventListener("keydown", function (event) {
    if (event.key == "Enter" || event.key == " ") {
      event.preventDefault();
      card.click();
    }
  });
}

let currentTab = "all";
let currentType = "all";

function showNotifications(filter) {
  currentTab = filter;
  let list = document.getElementById("notif-list-main");
  list.innerHTML = "";
  for (let i = 0; i < notifications.length; i++) {
    let notif = notifications[i];

    if (currentType != "all" && notif.type != currentType) {
      continue;
    }

    if (filter == "unread" && notif.unread == false) {
      continue;
    }

    let card = document.createElement("div");
    card.className = "notif-card";
    enableNotificationClick(card, notif, filter == "unread");
    card.innerHTML = `
            <img class="notif-avatar"
                src="${notif.image}"
                alt="Profile">
            <div class="notif-content">
                <div class="notif-text">
                    <span class="notif-name">
                        ${notif.name}
                    </span>
                    <span class="notif-action">
                        ${notif.action}
                    </span>
                    <span class="notif-time">
                        ${notif.time}
                    </span>
                </div>
                ${
                  notif.message
                    ? `<div class="notif-message">
                        ${notif.message}
                      </div>`
                    : ""
                }
            </div>
        `;
    list.appendChild(card);
  }
}

document.getElementById("all-tab").addEventListener("click", function () {
  document.getElementById("all-tab").classList.add("active");
  document.getElementById("unread-tab").classList.remove("active");
  showNotifications("all");
});

document.getElementById("unread-tab").addEventListener("click", function () {
  document.getElementById("unread-tab").classList.add("active");
  document.getElementById("all-tab").classList.remove("active");
  showNotifications("unread");
});

let filters = document.querySelectorAll(".notif-filter-item");
for (let i = 0; i < filters.length; i++) {
  filters[i].addEventListener("click", function () {
    for (let j = 0; j < filters.length; j++) {
      filters[j].classList.remove("active");
    }
    this.classList.add("active");
    currentType = this.getAttribute("data-filter");
    showNotifications(currentTab);
  });
}

showNotifications("all");
