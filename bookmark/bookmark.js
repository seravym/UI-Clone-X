const searchInput = document.querySelector(".bookmark-search input");
const emptyBookmark = document.querySelector(".bookmark-empty");
const backButton = document.querySelector(".back-button");

let isSearching = false;

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const searchValue = searchInput.value.trim();

        if (searchValue !== "") {
            emptyBookmark.innerHTML = `
                <h2>Nothing to see here yet.</h2>
            `;

            isSearching = true;
        }
    }
});

backButton.addEventListener("click", function () {
    if (isSearching) {
        searchInput.value = "";

        emptyBookmark.innerHTML = `
            <h2>Save posts for later</h2>
            <p>
                Bookmark posts to easily find them again in the future.
            </p>
        `;

        isSearching = false;
    } else {
        window.location.href = "home.html";
    }
});