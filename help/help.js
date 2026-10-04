    const input = document.getElementById("help-search");
    const items = document.querySelectorAll("#help-list details");
    const empty = document.getElementById("help-empty");

    input.addEventListener("input", function () {
        const q = input.value.toLowerCase().trim();
        let shown = 0;
        items.forEach(function (d) {
            const match = d.textContent.toLowerCase().includes(q);
            d.style.display = match ? "" : "none";
            if (match) shown++;
        });
        empty.hidden = shown !== 0;
    });