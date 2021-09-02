const searchInput = document.getElementById('search-input');
const displayBooks = document.getElementById('display-books');
const errorResult = document.getElementById('show-result')
const quantityResult = document.getElementById('book-quantity');
const searchBook = () => {
    const searchText = searchInput.value;
    if(searchText.length === 0){
        quantityResult.innerHTML = '';
        errorResult.textContent = '';
        const div = document.createElement('div')
        div.innerHTML = `
        <h3 class="bg-danger p-4 text-center w-75 mx-auto mt-5">Search field cannot be empty</h3>
        `
        errorResult.appendChild(div);
        displayBooks.textContent = ''
    }
    else if(searchText.length > 0){
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs))
            errorResult.textContent = '';
    }
    
}
const displayBook = (books) => {
    searchInput.value = '';
    displayBooks.textContent = '';
    quantityResult.innerHTML = ''
    books.forEach(book => {
        console.log(book)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top book-cover" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book Name: ${book.title}</h5>
                    <h6 class="card-title">Author Name: ${book.author_name ? book.author_name
                    [0] : 'Unknown Author'}</h6>
                    <h6 class="card-title">First Publish Year: ${book.first_publish_year ? book.first_publish_year : 'Unknown publish year'}</h6>
                    <h6 class="card-text">Published By: ${book.publisher}</h6>
                </div>
        </div>
        `
        displayBooks.appendChild(div);
    })
    const bookQuantity  = displayBooks.childElementCount;
    if(bookQuantity > 0){
      quantityResult.innerHTML = `<h3 class = "text-primary">About ${bookQuantity} Results Found</h3>`
    }
    else if(bookQuantity === 0){
        quantityResult.innerHTML = `<h3> No result found</h3>`
    }
}
