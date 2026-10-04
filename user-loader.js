(function () {
  function apply() {
    var name = localStorage.getItem("profileName") || "user";
    var username = localStorage.getItem("profileUsername") || "user";
    var pic = localStorage.getItem("profilePic") || "/profile/default.jpg";
    var bio = localStorage.getItem("profileBio") || "";

    document.querySelectorAll("[data-user-name]").forEach(function (el) {
      if (el.textContent !== name) el.textContent = name;
    });
    document.querySelectorAll("[data-user-handle]").forEach(function (el) {
      var handle = "@" + username;
      if (el.textContent !== handle) el.textContent = handle;
    });
    document.querySelectorAll("[data-user-avatar]").forEach(function (img) {
      if (img.src !== pic && !img.src.endsWith(pic)) img.src = pic;
    });
    document.querySelectorAll("[data-user-bio]").forEach(function (el) {
      if (el.textContent !== bio) el.textContent = bio;
    });
  }

  apply();

  document.addEventListener("DOMContentLoaded", apply);

  new MutationObserver(apply).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("storage", apply);
})();