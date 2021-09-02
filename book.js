const searchInput = document.getElementById('search-input');
const displayBooks = document.getElementById('display-books');
const errorResult = document.getElementById('show-result')
const quantityResult = document.getElementById('book-quantity');
//searching books list
const searchBook = () => {
    const searchText = searchInput.value;
    // error handling
    if(searchText.length === 0){
        quantityResult.innerHTML = '';
        errorResult.textContent = '';
        const div = document.createElement('div')
        div.innerHTML = `
        <h4 class="text-danger p-3 text-center w-75 mx-auto mt-3">Search field cannot be empty</h4>
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
//Showing book list
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
                    <h5 class="card-title">Book Name: <span class = "">${book.title}</span></h5>
                    <h6 class="card-title text-secondary">Author Name: ${book.author_name}</h6>
                    <h6 class="card-text">Published By- ${book.publisher}</h6>
                    <h6 class="card-title">First Publish Year: ${book.first_publish_year}</h6>
                </div>
        </div>
        `
        displayBooks.appendChild(div);
    })
    //showing book quantities
    const bookQuantity  = displayBooks.childElementCount;
    if(bookQuantity > 0){
      quantityResult.innerHTML = `<h3 class = "text-primary">About ${bookQuantity} Results Found</h3>`
    }
    // error handling
    else if(bookQuantity === 0){
        quantityResult.innerHTML = `
        <h3 class = "text-dark "> No result found</h3>
            <p class = "text-primary">Search a valid book</p>
        `
    }
}
