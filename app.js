$(function () {
  $("#sidebar-container").load(
    "sidebar.html",
    function (response, status, xhr) {
      if (status === "error") {
        console.error(
          "Gagal memuat sidebar: " + xhr.status + " " + xhr.statusText,
        );
      } else {
        $("[href='notifications.html'], #nav-notifications").addClass(
          "fw-bold bg-secondary bg-opacity-25",
        );
      }
    },
  );

  $(".x-tab").on("click", function (e) {
    e.preventDefault();
    $(".x-tab").removeClass("active");
    $(this).addClass("active");
    var target = $(this).attr("data-bs-target");
    $(".tab-pane").removeClass("show active");
    $(target).addClass("show active");
  });
});
