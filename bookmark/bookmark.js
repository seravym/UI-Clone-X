const searchInput = document.querySelector(".bookmark-search input");
const emptyBookmark = document.querySelector(".bookmark-empty");
const backButton = document.querySelector(".back-button");

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const searchValue = searchInput.value.trim();

        if (searchValue !== "") {
            emptyBookmark.innerHTML = `
                <h2>Nothing to see here yet.</h2>
            `;
        }
    }
});

backButton.addEventListener("click", function () {
    searchInput.value = "";

    emptyBookmark.innerHTML = `
        <h2>Save posts for later</h2>
        <p>
            Bookmark posts to easily find them again in the future.
        </p>
    `;
});