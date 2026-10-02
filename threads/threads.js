function showToast(message) {
  let toast = $("#toast");
  toast.text(message);
  toast.addClass("show");
  setTimeout(function () {
    toast.removeClass("show");
  }, 3000);
}

$(document).ready(function () {
  let savedDraft = localStorage.getItem("myThreadDraft");

  if (savedDraft) {
    let draftData = JSON.parse(savedDraft);
    let threadTitle = draftData.title || "Untitled Thread";
    let tweetCount = draftData.tweets.length;

    $("#drafts-container").empty();

    let draftHTML = `
            <div class="draft-card">
                <h3>${threadTitle}</h3>
                <p>${tweetCount} tweet(s) in this draft</p>
                <a href="thread-builder.html" class="continue-btn">Continue Editing →</a>
            </div>
        `;
    $("#drafts-container").append(draftHTML);
  }

  let publishedThread = localStorage.getItem("publishedThread");

  if (publishedThread) {
    let data = JSON.parse(publishedThread);
    let threadTitle = data.title || "Untitled Thread";
    let tweetCount = data.tweets.length;

    $("#published-container").empty();

    let publishedHTML = `
            <div class="draft-card" style="border-color: #e91e8c;">
                <h3 style="color: #e91e8c;">${threadTitle}</h3>
                <p>${tweetCount} tweet(s) published</p>
                <a href="thread.html" class="continue-btn" style="background: #e91e8c;">View Thread →</a>
            </div>
        `;
    $("#published-container").append(publishedHTML);
  }
});