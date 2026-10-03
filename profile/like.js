function likePost(button) {
    const post = button.closest(".dummy-post");
    const postId = post.dataset.id;

    const countElement = button.querySelector(".like-count");
    const icon = button.querySelector("img");

    let count = parseInt(countElement.textContent);

    if (likedPosts.includes(postId)) {
        likedPosts = likedPosts.filter(id => id !== postId);
        count--;
        icon.src = "../image/icons/like.svg";
        button.classList.remove("liked");
    } else {
        likedPosts.push(postId);
        count++;
        icon.src = "../image/icons/like-full.svg";
        button.classList.add("liked");
    }

    countElement.textContent = count;

    localStorage.setItem(
        "likedPosts",
        JSON.stringify(likedPosts)
    );
}