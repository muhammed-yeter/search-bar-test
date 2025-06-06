var data = null;
fetch("../data/data.json")
    .then(response => response.json())
    .then(json => {
        data = json;
    })

function searchForInputValue() {
    const searchBar = document.getElementById("search-bar");
    const searchResults = document.getElementById("search-results");
    const query = searchBar.value.trim().toLowerCase();
    searchResults.innerHTML = ""; // Clear previous results

    if (query.length > 0) {
        const filteredData = data.filter(item => item.name.toLowerCase().includes(query));

        if (filteredData.length > 0) {
            searchResults.innerHTML = '<h4 class="w-100 text-center h-25">Search Results:</h4>';
            searchResults.classList.remove("p-3");
            filteredData.forEach(item => {
                searchResults.innerHTML += `
                    <div class="query-result">
                        <div class="img-holder">
                            <img src="${item.image}" alt="img" class="image">
                        </div>
                        <div class="information">
                            <div class="info-element">
                                <h4 class="name">${item.name}</h4>
                            </div>
                            <div class="info-element">
                                <span class="description">${item.description}</span>
                            </div>
                            <span class="price">${item.price} $</span>
                        </div>
                    </div>
                `;
            });
        } else {
            searchResults.innerHTML = "<p>No results found</p>";
        }
    } else {
        searchResults.innerHTML = "";
    }
}

function buttonActions(actionType) {
    if (actionType === "show") {
        document.body.classList.add("overflow-hidden")
        const modalBG = document.getElementById("modal-bg");
        modalBG.classList.remove("d-none");
        modalBG.classList.remove("d-block");
        const dataDisplayer = document.getElementById("modal-data");
        dataDisplayer.innerText = JSON.stringify(data, null, 1);
    }
    else if (actionType === "copy") {
        navigator.clipboard.writeText(document.getElementById('modal-data').innerText);
        alert("Data copied to clipboard!");
    }
    else {
        const modalBG = document.getElementById("modal-bg");
        modalBG.classList.add("d-none");
                document.body.classList.remove("overflow-hidden")
    }
}