document.getElementById('error-message').style.display = 'none';//hidden error message
document.getElementById('alert-message').style.display = 'none';//hidden alert message
document.getElementById('not-found-result').style.display = 'none';//hidden not found result numbers message

const searchResult = document.getElementById('search-result');
const searchResultNumbers = document.getElementById('search-result-numbers');

const searchbooks = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //clear data
    searchField.value = '';
    if(searchText === ''){
        document.getElementById('alert-message').style.display = 'block';//show alert message
        searchResult.textContent = '';
        searchResultNumbers.textContent = '';
    }
    else
    {
        document.getElementById('alert-message').style.display = 'none';
        //load data
        const url = ` http://openlibrary.org/search.json?q=${searchText}`;
        try{
            const res = await fetch(url);
            const data = await res.json();
            displaySearchResult(data);
          }
          catch (error) { // check error
            document.getElementById('error-message').style.display = 'block';//show error message
          }
    }
}

const displaySearchResult = allbooks => {
    
    const books = allbooks.docs;
    document.getElementById('error-message').style.display = 'none';//hidden error message
 
    // remove previous search data
    searchResult.textContent = '';

    // remove previous search result numbers
    searchResultNumbers.textContent = '';
    
    if (books.length === 0)
    {
        document.getElementById('not-found-result').style.display = 'block';// show not found result message
    }
    else
    {
        document.getElementById('not-found-result').style.display = 'none';
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="col">
                <div class="card h-100 p-2" style="border-radius: 10px;">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" style="height: 250px !important; border-top-right-radius: 10px;
                        border-top-left-radius: 10px;" alt="Undefined book image">
                    <div class="card-body" style="background-color: #e8e8e8; padding: 8px; border-bottom-right-radius: 10px;
                    border-bottom-left-radius: 10px;">
                        <h5 class="card-title" style="font-weight: 600;"><span style="font-weight: 700;">Book Name :
                            </span>${book.title}</h5>
                        <p class="card-title"><span style="font-weight: 700;">Author Name : </span>${book.author_name}</p>
                        <p class="card-title"><span style="font-weight: 700;">Publisher : </span>${book.publisher}</p>
                        <p class="card-title"><span style="font-weight: 700;">First publish year :
                            </span>${book.publish_date}</p>
                    </div>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });

        // search result numbers 
         const p = document.createElement('p');
         p.innerHTML = `
              <p style="color: #272727; padding-left: 10px; font-weight: 600;" class="text-center">search result number : ${allbooks.numFound}</p>
         `;
         searchResultNumbers.appendChild(p);


    }
    
}