(function () {
  var script = document.currentScript;
  var root = new URL(".", script.src).href;
  var mobileQuery = window.matchMedia("(max-width: 760px)");
  var currentPath = window.location.pathname;

  var icons = {
    home: '<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>',
    communities: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="3"/><path d="M3 20a6 6 0 0 1 12 0M14 20a5 5 0 0 1 7 0"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    chat: '<svg viewBox="0 0 24 24"><path d="M20 11a8 8 0 0 1-8 8H6l-4 2v-9a8 8 0 0 1 8-8h2a8 8 0 0 1 8 7z"/></svg>',
    profile: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24"><path d="M6 4h12v17l-6-4-6 4z"/></svg>',
    list: '<svg viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
  };

  var bottomLinks = [
    { href: "home/home.html", icon: "home", label: "Home" },
    { href: "explore/explore.html", icon: "search", label: "Explore" },
    { href: "communities/communities.html", icon: "communities", label: "Communities" },
    { href: "notifications/notifications.html", icon: "bell", label: "Notifications", badge: true },
    { href: "chat/chat.html", icon: "chat", label: "Messages" }
  ];
  var drawerLinks = [
    { href: "profile/profile.html", icon: "profile", label: "Profile" },
    { href: "communities/communities.html", icon: "communities", label: "Communities" },
    { href: "bookmark/bookmark.html", icon: "bookmark", label: "Bookmarks" },
    { href: "list/list.html", icon: "list", label: "Lists" },
    { href: "notifications/notification-settings.html", icon: "settings", label: "Notification settings" }
  ];

  var fallbackAvatar = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#e9d5e1"/><circle cx="20" cy="15" r="7" fill="#fff"/><path d="M6 40a14 14 0 0 1 28 0z" fill="#fff"/></svg>');
  window.fallbackAvatar = fallbackAvatar;

  function isCurrent(href) {
    return currentPath.endsWith("/" + href.split("/").pop());
  }
  function linkHTML(link, cls) {
    return '<a class="' + cls + '" href="' + root + link.href + '"' +
      (isCurrent(link.href) ? ' aria-current="page"' : "") + ">" +
      icons[link.icon] + "<span>" + link.label + "</span>" +
      (link.badge ? '<i class="mobile-badge" hidden></i>' : "") + "</a>";
  }

  var overlay = document.createElement("div");
  overlay.className = "mobile-drawer-overlay";
  var drawer = document.createElement("aside");
  drawer.className = "mobile-drawer";
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-label", "Navigation");
  drawer.setAttribute("aria-modal", "true");
  drawer.innerHTML =
    '<div class="mobile-drawer-head">' +
    '<a href="' + root + 'profile/profile.html"><img class="mobile-drawer-avatar" src="' + root + 'image/Default_pfp.jpeg" alt=""></a>' +
    '<button class="mobile-drawer-close" aria-label="Close navigation">&times;</button></div>' +
    '<a class="mobile-drawer-name" href="' + root + 'profile/profile.html"><strong>user</strong><span>@user</span></a>' +
    "<nav>" + drawerLinks.map(function (l) { return linkHTML(l, "mobile-drawer-link"); }).join("") + "</nav>";
  document.body.appendChild(overlay);
  document.body.appendChild(drawer);
  drawer.querySelector(".mobile-drawer-avatar").onerror = function () { this.onerror = null; this.src = fallbackAvatar; };

  var drawerWidth = function () { return drawer.offsetWidth || 300; };
  var isOpen = false;

  function setProgress(p) { 
    drawer.style.transform = "translateX(" + (-100 + p * 100) + "%)";
    overlay.style.opacity = p;
  }
  function openDrawer() {
    isOpen = true;
    drawer.classList.add("open");
    overlay.classList.add("open");
    drawer.style.transform = "";
    overlay.style.opacity = "";
    document.body.style.overflow = "hidden";
    drawer.querySelector(".mobile-drawer-close").focus({ preventScroll: true });
  }
  function closeDrawer() {
    isOpen = false;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    drawer.style.transform = "";
    overlay.style.opacity = "";
    document.body.style.overflow = "";
  }
  window.openMobileDrawer = openDrawer;
  window.closeMobileDrawer = closeDrawer;

  document.querySelectorAll(".mobile-menu-button").forEach(function (b) { b.addEventListener("click", openDrawer); });
  drawer.querySelector(".mobile-drawer-close").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen) closeDrawer(); });
  mobileQuery.addEventListener("change", function (e) { if (!e.matches) closeDrawer(); });

  var startX, startY, startT, axis, dragging;

  function inHorizontalScroller(el) {
    while (el && el !== document.body) {
      if (el.scrollWidth > el.clientWidth + 2) {
        var ox = getComputedStyle(el).overflowX;
        if (ox === "auto" || ox === "scroll") return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  document.addEventListener("touchstart", function (e) {
    if (!mobileQuery.matches || e.touches.length !== 1) { dragging = false; return; }
    var t = e.touches[0];
    startX = t.clientX; startY = t.clientY; startT = Date.now(); axis = null; dragging = true;
    if (!isOpen && (inHorizontalScroller(e.target) || e.target.closest("input, textarea"))) dragging = false;
  }, { passive: true });

  document.addEventListener("touchmove", function (e) {
    if (!dragging) return;
    var t = e.touches[0], dx = t.clientX - startX, dy = t.clientY - startY;
    if (!axis) {
      if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
      axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
      if (axis === "x" && ((!isOpen && dx > 0) || (isOpen && dx < 0))) {
        drawer.classList.add("dragging");
        overlay.classList.add("dragging");
      } else { axis = "y"; }
    }
    if (axis !== "x") return;
    var w = drawerWidth();
    var p = isOpen ? 1 + dx / w : dx / w;
    setProgress(Math.max(0, Math.min(1, p)));
  }, { passive: true });

  function endDrag(e) {
    if (!dragging || axis !== "x") { dragging = false; return; }
    dragging = false;
    drawer.classList.remove("dragging");
    overlay.classList.remove("dragging");
    var t = e.changedTouches[0], dx = t.clientX - startX;
    var fast = Math.abs(dx) / Math.max(1, Date.now() - startT) > 0.5; 
    var shouldOpen = isOpen ? !(dx < -drawerWidth() * 0.3 || (fast && dx < 0))
                            : (dx > drawerWidth() * 0.3 || (fast && dx > 0));
    shouldOpen ? openDrawer() : closeDrawer();
  }
  document.addEventListener("touchend", endDrag, { passive: true });
  document.addEventListener("touchcancel", endDrag, { passive: true });

  if (document.body.hasAttribute("data-bottom-nav")) {
    var bar = document.createElement("nav");
    bar.className = "mobile-bottom-nav";
    bar.setAttribute("aria-label", "Main");
    bar.innerHTML = bottomLinks.map(function (l) { return linkHTML(l, "mobile-bottom-link"); }).join("");
    document.body.appendChild(bar);
    document.body.classList.add("has-bottom-nav");
  }

  window.setNotificationBadge = function (count) {
    document.querySelectorAll(".mobile-badge").forEach(function (b) {
      b.hidden = !count;
      b.textContent = count > 9 ? "9+" : count || "";
    });
  };
  if (typeof window.pendingBadgeCount === "number") window.setNotificationBadge(window.pendingBadgeCount);
})();
