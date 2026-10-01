const contacts = [
  { id: "Anne", name: "Ann", handle: "@AnnewithE", color: "blue" },
  { id: "Rin", name: "Rina Kent", handle: "@rinn", color: "" },
  { id: "Sandy", name: "Sandy Man", handle: "@sandy", color: "purple" },
  { id: "citrus", name: "Citrus", handle: "@cloudy", color: "yellow" },
];
const sampleChats = [
  {
    id: "Anne",
    name: "Ann",
    color: "blue",
    type: "direct",
    unread: true,
    request: false,
    messages: [
      {
        text: "Hey.. can i get your number?",
        mine: false,
        time: "09:30",
      },
      {
        text: "No.",
        mine: true,
        time: "09:32",
      },
      {
        text: "Whyy?",
        mine: false,
        time: "09:35",
      },
    ],
  },
  {
    id: "Fams",
    name: "Family Reunited",
    color: "purple",
    type: "group",
    members: ["Rin", "Anne"],
    unread: true,
    request: false,
    messages: [
      {
        text: "Rina: Has anyone seen my tab?",
        mine: false,
        time: "08:45",
      },
    ],
  },
  {
    id: "rin",
    name: "Rina Kent",
    color: "",
    type: "direct",
    unread: false,
    request: false,
    messages: [
      {
        text: "Plz help me find my tab!",
        mine: false,
        time: "08:20",
      },
    ],
  },
  {
    id: "Sandy",
    name: "Sandy Man",
    color: "purple",
    type: "direct",
    unread: true,
    request: true,
    messages: [
      {
        text: "Where should we meet?",
        mine: false,
        time: "10:10",
      },
    ],
  },
  {
    id: "citrus",
    name: "Citrus",
    color: "yellow",
    type: "direct",
    unread: true,
    request: true,
    messages: [
      {
        text: "Hi, im the one from library.",
        mine: false,
        time: "10:25",
      },
    ],
  },
];

let chats = JSON.parse(JSON.stringify(sampleChats));
let storageWarning = "";
try {
  let saved = JSON.parse(localStorage.getItem("frontEnd"));
  if (
    Array.isArray(saved) &&
    saved.every(function (chat) {
      return (
        chat &&
        typeof chat.id == "string" &&
        typeof chat.name == "string" &&
        Array.isArray(chat.messages)
      );
    })
  )
    chats = saved;
} catch (error) {
  storageWarning =
    "Saved chats could not be loaded. Showing demo conversations.";
}

let requestsPage = false;
let selectedId = null;
let activeFilter = "all";
let groupMode = false;
let selectedContacts = [];
let statusTimer;

function escapeText(text) {
  return String(text).replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[character];
  });
}

function avatar(person) {
  let initials = person.name
    .split(" ")
    .slice(0, 2)
    .map(function (word) {
      return word[0];
    })
    .join("");
  let color = ["blue", "green", "purple"].includes(person.color)
    ? person.color
    : "";
  return (
    '<span class="person-avatar ' +
    color +
    '" aria-hidden="true">' +
    escapeText(initials) +
    "</span>"
  );
}

function chatIcon(name) {
  let shapes = {
    newchat:
      '<path d="M20 10a8 8 0 1 0-14 6l-1 4 4-1a8 8 0 0 0 4 1"/><path d="M19 14v8M15 18h8"/>',
    home: '<path d="m3 10 9-7 9 7v10H15v-6H9v6H3Z"/>',
    search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 0 1 19 0Z"/>',
    bell: '<path d="M5 9a7 7 0 0 1 14 0v6l2 3H3l2-3Z M9 21h6"/>',
    edit: '<path d="M13 4H4v16h16v-9 M10 14l1-5 8-8 4 4-8 8Z"/>',
    settings:
      '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="16" cy="17" r="3"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v1"/>',
    request:
      '<path d="M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 0 1 19 0Z M8 11h8M12 7v8"/>',
  };
  return (
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    shapes[name] +
    "</svg>"
  );
}

document.getElementById("chat-app").innerHTML = `
  <div class="chat-layout" id="chat-layout">
    <aside class="sidebar-left"><div id="chat-sidebar"></div></aside>
    <section class="chat-inbox" aria-label="Conversation list">
      <header class="inbox-header">
        <div class="chat-heading"><button class="mobile-menu-button" aria-label="Open navigation" aria-haspopup="dialog"><span></span><span></span><span></span></button><h1>user</h1>
          <button class="chat-icon-button new-chat-button" id="new-chat" aria-label="New chat" title="New message">${chatIcon("newchat")}</button>
        </div>
        <input class="chat-search" id="chat-search" type="search" placeholder="Search" aria-label="Search conversations">
      </header>
      <div class="inbox-section-heading"><h2 id="inbox-title">${requestsPage ? "Requests" : "Messages"}</h2>
        <button class="requests-link" id="toggle-requests" type="button">
          <span id="requests-label">${requestsPage ? "Back to inbox" : "Requests"}</span><span class="chat-count" id="request-count"></span>
        </button>
      </div>
      <div class="inbox-tools">
        <div class="chat-filters" role="group" aria-label="Filter conversations">
          <button class="filter-chip active" data-filter="all" aria-pressed="true">All</button>
          <button class="filter-chip" data-filter="unread" aria-pressed="false">Unread</button>
          <button class="filter-chip" data-filter="direct" aria-pressed="false">Direct</button>
          <button class="filter-chip" data-filter="group" aria-pressed="false">Groups</button>
        </div>
        <button class="text-button" id="mark-read">Mark all as read</button>
      </div>
      <div class="chat-list" id="chat-list"></div>
      <footer class="inbox-footer"><a href="notifications.html">Notifications</a><a href="notification-settings.html">Settings</a></footer>
    </section>
    <main class="conversation" id="conversation"></main>
  </div>
  <dialog class="chat-dialog" id="new-chat-dialog" aria-labelledby="dialog-title">
    <div class="chat-heading"><h2 id="dialog-title">Start a conversation</h2><button class="dialog-close" id="close-dialog" aria-label="Close dialog">&times;</button></div>
    <div class="dialog-tabs"><button class="chat-secondary active" id="direct-mode">Direct message</button><button class="chat-secondary" id="group-mode">Create a group</button></div>
    <label class="dialog-field" id="group-name-field" hidden>Group name<input type="text" id="group-name" maxlength="50" placeholder="e.g. Frontend Study Club"></label>
    <input type="search" id="contact-search" placeholder="Search name or username" aria-label="Search contacts">
    <div id="contact-list"></div>
    <button class="chat-button dialog-submit" id="start-chat" disabled>Start conversation</button>
  </dialog>
  <div class="chat-status" id="chat-status" role="status"></div>`;

fetch("../sidebar.html")
  .then(function(response) {
    return response.text();
  })
  .then(function (data) {
    document.getElementById("chat-sidebar").innerHTML = data;
  })
  .catch(function (error) {
    console.log("Sidebar gagal dimuat:", error);
  });

function showStatus(message) {
  clearTimeout(statusTimer);
  document.getElementById("chat-status").textContent = message;
  statusTimer = setTimeout(function () {
    document.getElementById("chat-status").textContent = "";
  }, 4000);
}

function saveChats() {
  try {
    localStorage.setItem("frontEnd", JSON.stringify(chats));
    return true;
  } catch (error) {
    showStatus(
      "Browser storage is unavailable.",
    );
    return false;
  }
}

function renderList() {
  let query = document.getElementById("chat-search").value.toLowerCase().trim();
  let filter = activeFilter;
  let visible = chats.filter(function (chat) {
    return (
      chat.request == requestsPage &&
      chat.name.toLowerCase().includes(query) &&
      (filter == "all" ||
        (filter == "unread" ? chat.unread : chat.type == filter))
    );
  });
  document.getElementById("request-count").textContent = requestsPage
    ? ""
    : chats.filter(function (chat) {
        return chat.request;
      }).length;
  document.getElementById("chat-list").innerHTML =
    visible
      .map(function (chat) {
        let last = chat.messages[chat.messages.length - 1];
        return `<button class="chat-person ${selectedId == chat.id ? "selected" : ""}" data-chat="${escapeText(chat.id)}" aria-pressed="${selectedId == chat.id}">
      ${avatar(chat)}<span class="person-copy"><span class="person-top"><strong>${escapeText(chat.name)}</strong><small>${last ? escapeText(last.time) : "New"}</small></span>
      <p>${last ? (last.mine ? "You: " : "") + escapeText(last.text) : "Say hello to start the conversation"}</p></span>${chat.unread ? '<span class="unread-dot" aria-label="Unread"></span>' : ""}</button>`;
      })
      .join("") ||
    `<div class="list-empty"><strong>${query || filter != "all" ? "No matching conversations" : requestsPage ? "All caught up" : "Your inbox is quiet"}</strong><p>${query || filter != "all" ? "Try another name or filter." : requestsPage ? "New message requests will appear here." : "Start a new chat with someone you know."}</p></div>`;

  document.querySelectorAll("[data-chat]").forEach(function (button) {
    button.addEventListener("click", function () {
      openChat(button.dataset.chat);
    });
  });
}

function openChat(id) {
  let chat = chats.find(function (item) {
    return item.id == id;
  });
  if (!chat || chat.request != requestsPage) return;
  selectedId = id;
  chat.unread = false;
  saveChats();
  renderList();
  renderConversation();
  document.getElementById("chat-layout").classList.add("show-conversation");
}

function renderConversation() {
  let panel = document.getElementById("conversation");
  let chat = chats.find(function (item) {
    return item.id == selectedId;
  });
  if (!chat) {
    panel.innerHTML = `<div class="chat-empty"><div class="empty-art" aria-hidden="true"><span class="bubble-art"></span></div>
      <p class="eyebrow">Your space.</p><h2>${requestsPage ? "You're in control." : "More relation more satisfactions."}</h2>
      <p>${requestsPage ? "Open a request to preview the message. Choose who gets a place in your inbox." : "start by saying hello or... bye"}</p>
      <button class="chat-button" id="empty-new-chat">Start a conversation</button></div>
      <p class="demo-label">Frontend demo · Messages stay in this browser</p>`;
    document.getElementById("empty-new-chat").onclick = openNewChat;
    return;
  }
  panel.innerHTML = `<header class="conversation-header"><button class="chat-secondary mobile-back" id="back-to-inbox" aria-label="Back to conversations">&larr;</button>
    ${avatar(chat)}<div><h2>${escapeText(chat.name)}</h2><p>${chat.request ? "Message request" : chat.type == "group" ? chat.members.length + 1 + " members including you" : "Direct conversation"}</p></div>
    <button class="chat-icon-button conversation-info" id="conversation-info" title="Conversation details" aria-label="Conversation details">${chatIcon("info")}</button></header>
    <div class="conversation-details" id="conversation-details" hidden><strong>${escapeText(chat.name)}</strong><p>${
      chat.type == "group"
        ? "Members: You, " +
          chat.members
            .map(function (id) {
              let contact = contacts.find(function (item) {
                return item.id == id;
              });
              return escapeText(contact ? contact.name : id);
            })
            .join(", ")
        : "This demo conversation stored in your browser."
    }</p></div>
    <div class="chat-messages" id="chat-messages" role="log" aria-label="Messages"><p class="day-label">${chat.request ? "A NEW CONNECTION" : "YOUR CONVERSATION"}</p>
      ${chat.messages
        .map(function (message) {
          return `<div class="message ${message.mine ? "mine" : ""}"><div class="message-bubble">${escapeText(message.text)}</div><small>${message.mine ? "You · " : ""}${escapeText(message.time)}</small></div>`;
        })
        .join("")}
    </div>
    ${
      chat.request
        ? `<div class="request-actions"><p>Accept this request to move it to your inbox and start replying.</p><button class="chat-secondary" id="decline-request">Decline</button><button class="chat-button" id="accept-request">Accept request</button></div>`
        : `<form class="chat-compose" id="chat-compose"><input id="message-input" placeholder="Write a message..." aria-label="Message" maxlength="2000" autocomplete="off" required><button class="chat-button" type="submit">Send</button></form>`
    }
    <p class="demo-label">Frontend demo · Messages stay in this browser</p>`;
  document.getElementById("back-to-inbox").onclick = function () {
    setInboxMode(chat.request);
  };
  document
    .getElementById("conversation-info")
    .setAttribute("aria-expanded", "false");
  document.getElementById("conversation-info").onclick = function () {
    let details = document.getElementById("conversation-details");
    details.hidden = !details.hidden;
    this.setAttribute("aria-expanded", String(!details.hidden));
  };
  let messageList = document.getElementById("chat-messages");
  messageList.scrollTop = messageList.scrollHeight;
  if (chat.request) {
    document.getElementById("accept-request").onclick = function () {
      chat.request = false;
      saveChats();
      setInboxMode(false);
      openChat(chat.id);
    };
    document.getElementById("decline-request").onclick = function () {
      chats = chats.filter(function (item) {
        return item.id != chat.id;
      });
      selectedId = null;
      let saved = saveChats();
      renderList();
      renderConversation();
      document
        .getElementById("chat-layout")
        .classList.remove("show-conversation");
      if (saved) showStatus("Request declined.");
    };
  } else {
    document.getElementById("chat-compose").onsubmit = function (event) {
      event.preventDefault();
      let text = document.getElementById("message-input").value.trim();
      if (!text) return;
      chat.messages.push({
        text: text,
        mine: true,
        time: new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      saveChats();
      renderList();
      renderConversation();
      document.getElementById("message-input").focus();
    };
  }
}

function openNewChat() {
  selectedContacts = [];
  document.getElementById("contact-search").value = "";
  document.getElementById("group-name").value = "";
  setGroupMode(false);
  document.getElementById("new-chat-dialog").showModal();
  document.getElementById("contact-search").focus();
}

function setGroupMode(value) {
  groupMode = value;
  selectedContacts = [];
  document.getElementById("group-name-field").hidden = !value;
  document.getElementById("group-mode").classList.toggle("active", value);
  document.getElementById("direct-mode").classList.toggle("active", !value);
  document.getElementById("dialog-title").textContent = value
    ? "Make room for your group"
    : "Start a conversation";
  renderContacts();
}

function updateStartButton() {
  let button = document.getElementById("start-chat");
  button.textContent = groupMode
    ? "Create group (" + selectedContacts.length + " selected)"
    : "Start conversation";
  button.disabled = groupMode
    ? selectedContacts.length < 2 ||
      !document.getElementById("group-name").value.trim()
    : selectedContacts.length != 1;
}

function renderContacts() {
  let query = document
    .getElementById("contact-search")
    .value.toLowerCase()
    .trim();
  let matches = contacts.filter(function (contact) {
    return (contact.name + contact.handle).toLowerCase().includes(query);
  });
  document.getElementById("contact-list").innerHTML =
    matches
      .map(function (contact) {
        return `<label class="contact-option">${avatar(contact)}<span><strong>${escapeText(contact.name)}</strong><small>${escapeText(contact.handle)}</small></span>
      <input type="${groupMode ? "checkbox" : "radio"}" name="contact" value="${contact.id}" ${selectedContacts.includes(contact.id) ? "checked" : ""}></label>`;
      })
      .join("") ||
    '<p class="muted-text">No contacts found. Try another name.</p>';
  document.querySelectorAll('input[name="contact"]').forEach(function (input) {
    input.onchange = function () {
      if (!groupMode) selectedContacts = [];
      if (input.checked) selectedContacts.push(input.value);
      else selectedContacts = selectedContacts.filter(function (id) {
        return id != input.value;
      });
      updateStartButton();
    };
  });
  updateStartButton();
}

document.getElementById("start-chat").onclick = function () {
  if (document.getElementById("start-chat").disabled) return;
  let id;
  if (groupMode) {
    id = "group-" + Date.now();
    chats.unshift({
      id: id,
      name: document.getElementById("group-name").value.trim(),
      color: "purple",
      type: "group",
      members: selectedContacts,
      unread: false,
      request: false,
      messages: [],
    });
  } else {
    id = selectedContacts[0];
    let chat = chats.find(function (item) {
      return item.id == id;
    });
    if (!chat) {
      let contact = contacts.find(function (item) {
        return item.id == id;
      });
      chats.unshift({
        id: id,
        name: contact.name,
        color: contact.color,
        type: "direct",
        unread: false,
        request: false,
        messages: [],
      });
    } else if (chat.request) {
      document.getElementById("new-chat-dialog").close();
      setInboxMode(true);
      openChat(id);
      return;
    }
  }
  saveChats();
  document.getElementById("new-chat-dialog").close();
  setInboxMode(false);
  openChat(id);
};

function setInboxMode(showRequests) {
  requestsPage = showRequests;
  selectedId = null;
  document.getElementById("chat-search").value = "";
  document.getElementById("inbox-title").textContent = showRequests
    ? "Requests"
    : "Messages";
  document.getElementById("requests-label").textContent = showRequests
    ? "Back to inbox"
    : "Requests";
  document.getElementById("chat-layout").classList.remove("show-conversation");
  setChatFilter("all");
  renderConversation();
}

document.getElementById("toggle-requests").onclick = function () {
  setInboxMode(!requestsPage);
};

document.getElementById("new-chat").onclick = openNewChat;
document.getElementById("close-dialog").onclick = function () {
  document.getElementById("new-chat-dialog").close();
};
document.getElementById("direct-mode").onclick = function () {
  setGroupMode(false);
};
document.getElementById("group-mode").onclick = function () {
  setGroupMode(true);
};
document.getElementById("contact-search").oninput = renderContacts;
document.getElementById("group-name").oninput = updateStartButton;
document.getElementById("chat-search").oninput = renderList;
function setChatFilter(filter) {
  activeFilter = filter;
  document.querySelectorAll(".filter-chip").forEach(function (button) {
    let active = button.dataset.filter == filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderList();
}

document.querySelectorAll(".filter-chip").forEach(function (button) {
  button.onclick = function () {
    setChatFilter(button.dataset.filter);
  };
});
document.getElementById("mark-read").onclick = function () {
  chats.forEach(function (chat) {
    if (chat.request == requestsPage) chat.unread = false;
  });
  let saved = saveChats();
  renderList();
  if (saved) showStatus("All messages in this inbox marked as read.");
};

setInboxMode(false);
renderList();
renderConversation();
if (storageWarning) showStatus(storageWarning);
