document.addEventListener("DOMContentLoaded", () => {
    const postButtons = document.querySelectorAll(".btn-reply, .sidebar-post-btn");
    const textareas = document.querySelectorAll(".post-input");

    const sidebarContainer = document.getElementById("sidebar"); 
    if (sidebarContainer) {
        fetch("../sidebar.html") 
            .then(response => response.text())
            .then(data => {
                sidebarContainer.innerHTML = data;
                attachPostButtonEvents();
            })
            .catch(error => console.error("Error memuat sidebar:", error));
    }

    postButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            textareas.forEach(ta => {
                if(ta.value.trim() !== "") {
                    alert("Your tweet has been posted! 🌸");
                    ta.value = "";
                }
            });
        });
    });
});