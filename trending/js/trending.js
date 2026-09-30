fetch("sidebar.html")
    .then(function (response) {
        if (!response.ok) {
            throw new Error(response.status + " " + response.url);
        }
        return response.text();
    })
    .then(function (data) {
        document.getElementById("sidebar").innerHTML = data;
    })
    .catch(function (error) {
        console.error("Sidebar gagal dimuat:", error);
    });

var trends = [
    { tag: "#SepakBola", cat: "Olahraga", label: "Sedang tren", count: 26300 },
    { tag: "#KonserAkhirTahun", cat: "Hiburan", label: "Sedang tren", count: 21500 },
    { tag: "#Jakarta", cat: "Berita", label: "Sedang tren", count: 18400 },
    { tag: "#KecerdasanBuatan", cat: "Teknologi", label: "Naik cepat", count: 15400 },
    { tag: "#gaming", cat: "Hiburan", label: "Sedang tren", count: 12800 },
    { tag: "#Badminton", cat: "Olahraga", label: "Sedang tren", count: 11200 },
    { tag: "#javascript", cat: "Teknologi", label: "Sedang tren", count: 9200 },
    { tag: "#CuacaHariIni", cat: "Berita", label: "Sedang tren", count: 8900 },
    { tag: "#FilmIndonesia", cat: "Hiburan", label: "Naik cepat", count: 7300 },
    { tag: "#kopi", cat: "Kuliner", label: "Sedang tren", count: 6100 },
    { tag: "#ResepRumahan", cat: "Kuliner", label: "Sedang tren", count: 5200 },
    { tag: "#Gadget", cat: "Teknologi", label: "Sedang tren", count: 4800 },
    { tag: "#Transportasi", cat: "Berita", label: "Sedang tren", count: 4300 },
    { tag: "#KulinerMalam", cat: "Kuliner", label: "Naik cepat", count: 3700 },
    { tag: "#LariPagi", cat: "Olahraga", label: "Sedang tren", count: 2900 }
];

var PAGE_SIZE = 6;
var SEARCH_PAGE = "search/search.html";

var state = {
    cat: "all",
    visible: PAGE_SIZE,
    hidden: []
};

function esc(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatCount(n) {
    if (n >= 1000000) {
        return (n / 1000000).toFixed(1).replace(".", ",").replace(",0", "") + " jt";
    }
    if (n >= 1000) {
        return (n / 1000).toFixed(1).replace(".", ",").replace(",0", "") + " rb";
    }
    return String(n);
}

function searchUrl(tag) {
    return SEARCH_PAGE + "?q=" + encodeURIComponent(tag);
}

function getFiltered() {
    return trends
        .filter(function (t) {
            var inCat = state.cat === "all" || t.cat === state.cat;
            return inCat && state.hidden.indexOf(t.tag) === -1;
        })
        .sort(function (a, b) {
            return b.count - a.count;
        });
}

var closeIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' +
    '<path d="M6 6l12 12M18 6L6 18"/></svg>';

function trendRow(t, rank) {
    return (
        '<div class="trend-row">' +
        '<span class="trend-row__rank">' + rank + "</span>" +
        '<a class="trend-row__main" href="' + searchUrl(t.tag) + '">' +
        '<span class="trend-row__meta">' + esc(t.cat) + " &middot; " + esc(t.label) + "</span>" +
        '<span class="trend-row__tag">' + esc(t.tag) + "</span>" +
        '<span class="trend-row__count">' + formatCount(t.count) + " postingan</span>" +
        "</a>" +
        '<button class="trend-row__hide" type="button" data-tag="' + esc(t.tag) + '" aria-label="Sembunyikan ' + esc(t.tag) + '">' +
        closeIcon +
        "</button>" +
        "</div>"
    );
}

function miniTrend(t) {
    return (
        '<a class="mini-trend" href="' + searchUrl(t.tag) + '">' +
        '<span class="mini-trend__cat">' + esc(t.cat) + "</span>" +
        '<span class="mini-trend__tag">' + esc(t.tag) + "</span>" +
        '<span class="mini-trend__count">' + formatCount(t.count) + " postingan</span>" +
        "</a>"
    );
}

function renderList() {
    var list = document.getElementById("trendList");
    var more = document.getElementById("showMore");
    var items = getFiltered();

    if (items.length === 0) {
        list.innerHTML =
            '<div class="empty"><h3>Tidak ada tren</h3>' +
            "<p>Semua topik di kategori ini sudah disembunyikan. Coba kategori lain.</p></div>";
        more.hidden = true;
        return;
    }

    var shown = items.slice(0, state.visible);
    list.innerHTML = shown
        .map(function (t, i) {
            return trendRow(t, i + 1);
        })
        .join("");

    more.hidden = items.length <= state.visible;
}

function renderTopToday() {
    var top = trends
        .slice()
        .sort(function (a, b) {
            return b.count - a.count;
        })
        .slice(0, 3);
    document.getElementById("topToday").innerHTML = top.map(miniTrend).join("");
}

function setCategory(cat) {
    state.cat = cat;
    state.visible = PAGE_SIZE;

    var tabs = document.querySelectorAll("#trendTabs .tab");
    for (var i = 0; i < tabs.length; i++) {
        var on = tabs[i].getAttribute("data-cat") === cat;
        tabs[i].classList.toggle("is-active", on);
        tabs[i].setAttribute("aria-selected", String(on));
    }
    renderList();
}

document.getElementById("trendTabs").addEventListener("click", function (event) {
    var tab = event.target.closest(".tab");
    if (tab) {
        setCategory(tab.getAttribute("data-cat"));
    }
});

document.getElementById("showMore").addEventListener("click", function () {
    state.visible += PAGE_SIZE;
    renderList();
});

document.getElementById("trendList").addEventListener("click", function (event) {
    var btn = event.target.closest(".trend-row__hide");
    if (!btn) return;
    state.hidden.push(btn.getAttribute("data-tag"));
    renderList();
});

renderTopToday();
renderList();