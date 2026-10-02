$(document).ready(function () {
  let publishedThread = localStorage.getItem("publishedThread");

  if (publishedThread) {
    let data = JSON.parse(publishedThread);

    $("#view-title").text(data.title);

    let container = $("#view-tweets");
    container.empty();

    data.tweets.forEach(function (text, index) {
      let isFirst = index === 0; 

      let indentStyle = isFirst
        ? ""
        : "margin-left: 30px; border-left: 2px solid var(--border); padding-left: 15px;";

      let tweetHTML = `
                <div class="tweet-box" style="${indentStyle}">
                    <img src="https://via.placeholder.com/40" alt="Profile" class="avatar">
                    <div class="input-area">
                        <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 5px;">
                            <strong style="color: var(--text);">You</strong> @you · Part ${index + 1}
                        </div>
                        <p style="margin: 0; font-size: 16px; color: var(--text);">${text}</p>
                    </div>
                </div>
            `;
      container.append(tweetHTML);
    });
  } else {
    $("#view-tweets").html(
      "<p style='color: var(--text-dim);'>No published thread found. Go make one!</p>",
    );
  }
});
