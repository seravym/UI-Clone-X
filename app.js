fetch("sidebar.html")
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        document.getElementById("sidebar").innerHTML = data;
    })
    .catch(function(error) {
        console.log("Sidebar gagal dimuat:", error);
    });

    
