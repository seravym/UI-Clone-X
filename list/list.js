fetch("../sidebar.html")
    .then(res => {
        if (!res.ok) throw new Error("Status " + res.status);
        return res.text();
    })
    .then(html => {
        document.getElementById("sidebar").innerHTML = html;
    })
    .catch(err => console.error("Sidebar gagal dimuat:", err));