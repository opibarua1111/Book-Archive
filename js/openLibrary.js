

const searchbooks = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if(searchText == ''){
        // document.getElementById('alert-message').style.display = 'block';
    }
    else
    {
        const url = ` http://openlibrary.org/search.json?q=${searchText}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data);
          }
          catch (error) {
            // document.getElementById('error-message').style.display = 'block';
          }
    }
}

const displaySearchResult = allbooks => {
    const books = allbooks.docs;
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="col">
                    <div class="card h-100">
                        <img src="https://covers.openlibrary.org/b/id/${cover_i}-L.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h2 class="card-title">${book.title}</h2>
                            <h5 class="card-title">${book.author_name}</h5>
                            <p class="card-text"></p>
                        </div>
                    </div>
                </div>
        `;
        searchResult.appendChild(div);
    });
}