renderSidebar({ showSearch: false });

const mainSearch = document.getElementById("mainSearch");
const mainSearchClear = document.getElementById("mainSearchClear");
const recentPanel = document.getElementById("recentPanel");
const resultsPanel = document.getElementById("resultsPanel");

function renderRecent(){
  const list = document.getElementById("recentList");
  if(RECENT_SEARCHES.length === 0){
    list.innerHTML = `<div class="empty-state"><h3>Belum ada pencarian</h3><p>Coba cari topik, hashtag, atau akun.</p></div>`;
    return;
  }
  list.innerHTML = RECENT_SEARCHES.map(r => {
    if(r.type === "user"){
      const u = userById(r.userId);
      return `
        <div class="recent-item" data-remove="${r.id}" data-query="${u.name}">
          <span class="avatar-fallback ${u.color}" style="width:36px;height:36px;font-size:13px;">${u.initials}</span>
          <div class="recent-item__body">
            <div class="recent-item__title">${u.name}</div>
            <div class="recent-item__sub">${u.handle}</div>
          </div>
          <button class="recent-item__remove" data-remove-btn="${r.id}" aria-label="Hapus">✕</button>
        </div>`;
    }
    return `
      <div class="recent-item" data-remove="${r.id}" data-query="${r.label}">
        ${ICONS.clock}
        <div class="recent-item__body">
          <div class="recent-item__title">${r.label}</div>
        </div>
        <button class="recent-item__remove" data-remove-btn="${r.id}" aria-label="Hapus">✕</button>
      </div>`;
  }).join("");
}
renderRecent();

document.getElementById("recentList").addEventListener("click", (e) => {
  const removeBtn = e.target.closest("[data-remove-btn]");
  if(removeBtn){
    const idx = RECENT_SEARCHES.findIndex(r => r.id === removeBtn.dataset.removeBtn);
    if(idx > -1) RECENT_SEARCHES.splice(idx, 1);
    renderRecent();
    return;
  }
  const item = e.target.closest("[data-query]");
  if(item){
    mainSearch.value = item.dataset.query;
    mainSearch.dispatchEvent(new Event("input"));
  }
});

document.getElementById("clearRecent").addEventListener("click", () => {
  RECENT_SEARCHES.length = 0;
  renderRecent();
});

function runSearch(query){
  const q = query.trim().toLowerCase();

  if(!q){
    recentPanel.style.display = "";
    resultsPanel.style.display = "none";
    return;
  }
  recentPanel.style.display = "none";
  resultsPanel.style.display = "";

  if(!RECENT_SEARCHES.some(r => r.type === "query" && r.label.toLowerCase() === q)){
    RECENT_SEARCHES.unshift({ id: "r" + Date.now(), type: "query", label: query.trim() });
    if(RECENT_SEARCHES.length > 5) RECENT_SEARCHES.length = 5;
  }

  const matchedUsers = USERS.filter(u =>
    u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q));

  const matchedPosts = POSTS.filter(p => p.text.toLowerCase().includes(q));

  renderPanel("panelTop", matchedUsers.slice(0,2), matchedPosts, q);
  renderPanel("panelLatest", [], [...matchedPosts].reverse(), q, true);
  renderPeoplePanel(matchedUsers, q);
  renderMediaPanel(q);
}

function highlight(text, q){
  if(!q) return text;
  const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  return text.replace(re, "<mark>$1</mark>");
}

function renderPanel(panelId, users, posts, q){
  const el = document.getElementById(panelId);
  if(users.length === 0 && posts.length === 0){
    el.innerHTML = emptyState(q);
    return;
  }
  el.innerHTML =
    users.map(u => userRowHTML(u)).join("") +
    posts.map(p => {
      const html = postHTML(p);
      return html.replace(p.text, highlight(p.text, q));
    }).join("");
}

function renderPeoplePanel(users, q){
  const el = document.getElementById("panelPeople");
  el.innerHTML = users.length
    ? users.map(u => userRowHTML(u)).join("")
    : emptyState(q, "akun");
}

function renderMediaPanel(q){
  document.getElementById("panelMedia").innerHTML = `
    <div class="empty-state">
      <h3>Belum ada media</h3>
      <p>Postingan berisi foto atau video untuk "${q}" akan muncul di sini.</p>
    </div>`;
}

function emptyState(q, kind = "hasil"){
  return `<div class="empty-state"><h3>Tidak ada ${kind}</h3><p>Coba kata kunci lain untuk "${q}".</p></div>`;
}

mainSearch.addEventListener("input", debounce(() => {
  mainSearchClear.style.display = mainSearch.value ? "flex" : "none";
  runSearch(mainSearch.value);
}, 150));

mainSearchClear.addEventListener("click", () => {
  mainSearch.value = "";
  mainSearchClear.style.display = "none";
  runSearch("");
  mainSearch.focus();
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("is-active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`[data-panel="${tab.dataset.tab}"]`).classList.add("is-active");
  });
});