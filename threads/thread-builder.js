function showToast(message) {
  let toast = $("#toast");
  toast.text(message);
  toast.addClass("show");

  setTimeout(function () {
    toast.removeClass("show");
  }, 3000);
}

function userAvatarHTML() {
  return '<img data-user-avatar src="/profile/default.jpg" alt="Profile" class="avatar">';
}

$(document).ready(function () {
  $("#add-tweet-btn").click(function () {
    let newTweetBox = `
            <div class="tweet-box">
                ${userAvatarHTML()}
                <div class="input-area">
                    <textarea class="tweet-input" placeholder="Add to thread..."></textarea>
                    <div class="char-count">0 / 280</div>
                </div>
                <button class="delete-btn" title="Remove">&times;</button>
            </div>
        `;
    $("#tweets-area").append(newTweetBox);
  });

  $(document).on("click", ".delete-btn", function () {
    $(this).closest(".tweet-box").remove();
  });

  $(document).on("input", ".tweet-input", function () {
    let currentLength = $(this).val().length;
    let counter = $(this).siblings(".char-count");
    counter.text(currentLength + " / 280");

    if (currentLength > 280) {
      counter.addClass("warning");
    } else {
      counter.removeClass("warning");
    }
  });

  $("#save-draft-btn").click(function () {
    let titleText = $("#thread-title").val();
    let draftArray = [];

    $(".tweet-input").each(function () {
      let text = $(this).val();
      draftArray.push(text);
    });

    let draftData = {
      title: titleText,
      tweets: draftArray,
    };

    localStorage.setItem("myThreadDraft", JSON.stringify(draftData));

    showToast("Draft saved successfully!");
  });

  let savedDraft = localStorage.getItem("myThreadDraft");

  if (savedDraft) {
    let draftData = JSON.parse(savedDraft);

    $("#thread-title").val(draftData.title);

    $("#tweets-area").empty();

    draftData.tweets.forEach(function (text, index) {
      let isFirst = index === 0;

      let draftBox = `
                <div class="tweet-box">
                    ${userAvatarHTML()}
                    <div class="input-area">
                        <textarea class="tweet-input" placeholder="Start your thread...">${text}</textarea>
                        <div class="char-count">${text.length} / 280</div>
                    </div>
                    ${isFirst ? "" : '<button class="delete-btn" title="Remove">&times;</button>'}
                </div>
            `;
      $("#tweets-area").append(draftBox);
    });
  }

  $("#publish-btn").click(function () {
    let titleText = $("#thread-title").val();
    let allTweets = [];

    $(".tweet-input").each(function () {
      if ($(this).val().trim() !== "") {
        allTweets.push($(this).val());
      }
    });

    if (allTweets.length === 0 && titleText.trim() === "") {
      showToast("You haven't written anything yet!");
      return;
    }

    let publishedData = {
      title: titleText || "Untitled Thread",
      tweets: allTweets,
    };

    localStorage.setItem("publishedThread", JSON.stringify(publishedData));

    localStorage.removeItem("myThreadDraft");

    showToast("Thread published successfully!");

    setTimeout(function () {
      window.location.href = "thread.html";
    }, 1500);
  });
});