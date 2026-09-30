/** Render "search this page too" box used on Explore & Trending headers */
function bindHeaderSearch(inputId, clearId){
  const input = document.getElementById(inputId);
  const clear = document.getElementById(clearId);
  if(!input) return;
  input.addEventListener("input", () => {
    if(clear) clear.style.display = input.value ? "flex" : "none";
  });
  if(clear){
    clear.addEventListener("click", () => {
      input.value = "";
      clear.style.display = "none";
      input.dispatchEvent(new Event("input"));
      input.focus();
    });
  }
}

/* ---------- Card builders ---------- */

function userRowHTML(user, {context = "search"} = {}){
  return `
    <div class="user-row" data-user="${user.id}">
      <span class="avatar-fallback ${user.color}">${user.initials}</span>
      <div class="user-row__body">
        <div class="user-row__name-line">
          <span class="user-row__name">${user.name}</span>
        </div>
        <div class="user-row__handle">${user.handle}</div>
        <div class="user-row__bio">${user.bio}</div>
      </div>
      <button class="follow-btn ${user.followed ? "is-following" : ""}" data-follow="${user.id}">
        <span class="btn-label">${user.followed ? "Following" : "Follow"}</span>
      </button>
    </div>
  `;
}

function postHTML(post){
  const user = userById(post.userId);
  if(!user) return "";
  return `
    <article class="post" data-post="${post.id}">
      <span class="avatar-fallback ${user.color}">${user.initials}</span>
      <div class="post__body">
        <div class="post__head">
          <span class="post__name">${user.name}</span>
          <span class="post__handle">${user.handle}</span>
          <span class="post__dot">·</span>
          <span class="post__time">${post.time}</span>
        </div>
        <p class="post__text">${post.text}</p>
        <div class="post__actions">
          <button class="post__action" data-type="reply"><span>${ICONS.reply}</span><span>${post.replies}</span></button>
          <button class="post__action ${post.reposted ? "is-reposted" : ""}" data-type="repost" data-post="${post.id}"><span>${ICONS.repost}</span><span class="repost-count">${post.reposts}</span></button>
          <button class="post__action ${post.liked ? "is-liked" : ""}" data-type="like" data-post="${post.id}"><span>${ICONS.heart}</span><span class="like-count">${post.likes}</span></button>
          <button class="post__action" data-type="share"><span>${ICONS.share}</span></button>
        </div>
      </div>
    </article>
  `;
}

function trendRowHTML(trend, rank){
  return `
    <div class="trend-row" data-trend="${trend.id}">
      ${rank ? `<span class="trend-row__rank">${rank}</span>` : ""}
      <div class="trend-row__body">
        <div class="trend-row__meta">${trend.category}</div>
        <div class="trend-row__topic">${trend.topic}</div>
        <div class="trend-row__count">${trend.posts} postingan</div>
      </div>
      <button class="trend-row__more" aria-label="Opsi lainnya">${ICONS.more}</button>
    </div>
  `;
}

function widgetTrendRowHTML(trend){
  return `
    <div class="widget-row" data-trend="${trend.id}">
      <div class="widget-row__top">
        <div>
          <div class="widget-row__cat">${trend.category}</div>
          <div class="widget-row__topic">${trend.topic}</div>
          <div class="widget-row__count">${trend.posts} postingan</div>
        </div>
        <button class="trend-row__more" aria-label="Opsi lainnya">${ICONS.more}</button>
      </div>
    </div>
  `;
}

/** Render the right sidebar: search box (optional) + trends widget + who to follow widget */
function renderSidebar({ showSearch = true, searchInputId = "sideSearch" } = {}){
  const side = document.getElementById("sideContent");
  if(!side) return;

  const topTrends = TRENDS.slice(0, 5);
  const suggested = USERS.filter(u => !u.followed).slice(0, 3);

  side.innerHTML = `
    ${showSearch ? `
    <div class="search-box side-search">
      ${ICONS.search}
      <input id="${searchInputId}" type="text" placeholder="Cari di X" autocomplete="off">
    </div>` : ""}
    <div class="widget">
      <h2>Trending untuk Anda</h2>
      ${topTrends.map(widgetTrendRowHTML).join("")}
      <a href="../trending/trending.html" class="widget-footer">Tampilkan lebih banyak</a>
    </div>
    <div class="widget">
      <h2>Siapa yang diikuti</h2>
      ${suggested.map(u => `
        <div class="follow-row" data-user="${u.id}">
          <span class="avatar-fallback ${u.color}" style="width:40px;height:40px;">${u.initials}</span>
          <div class="follow-row__body">
            <div class="follow-row__name">${u.name}</div>
            <div class="follow-row__handle">${u.handle}</div>
          </div>
          <button class="follow-btn" data-follow="${u.id}"><span class="btn-label">Follow</span></button>
        </div>
      `).join("")}
      <a href="../explore/explore.html" class="widget-footer">Tampilkan lebih banyak</a>
    </div>
    <p class="footnote">Kelompok 9 · Clone X — Tugas UTS Front-End Programming.<br>Halaman ini dibuat oleh Elizabeth (Search, Explore, Trending).</p>
  `;
}

/* ---------- Global event delegation: follow / like / repost / trend click ---------- */
document.addEventListener("click", (e) => {
  const followBtn = e.target.closest("[data-follow]");
  if(followBtn){
    const user = userById(followBtn.dataset.follow);
    if(user){
      user.followed = !user.followed;
      followBtn.classList.toggle("is-following", user.followed);
      followBtn.querySelector(".btn-label").textContent = user.followed ? "Following" : "Follow";
    }
    return;
  }

  const likeBtn = e.target.closest('[data-type="like"]');
  if(likeBtn){
    const post = POSTS.find(p => p.id === likeBtn.dataset.post);
    if(post){
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
      likeBtn.classList.toggle("is-liked", post.liked);
      likeBtn.querySelector(".like-count").textContent = post.likes;
    }
    return;
  }

  const repostBtn = e.target.closest('[data-type="repost"]');
  if(repostBtn){
    const post = POSTS.find(p => p.id === repostBtn.dataset.post);
    if(post){
      post.reposted = !post.reposted;
      post.reposts += post.reposted ? 1 : -1;
      repostBtn.classList.toggle("is-reposted", post.reposted);
      repostBtn.querySelector(".repost-count").textContent = post.reposts;
    }
    return;
  }
});

/** Small debounce helper for search-as-you-type */
function debounce(fn, delay = 200){
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}