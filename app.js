const form = document.querySelector("#contact")
const titleForm = document.querySelector("#titleForm");
const authorForm = document.querySelector("#authorForm");
const isbnForm = document.querySelector("#isbnForm");
const masterTable = document.querySelector('#masterTable')

masterTable.addEventListener('click', deleteBook)
form.addEventListener('submit', addBook)
document.addEventListener("DOMContentLoaded", getBooks)

function addBook(event){
    const row = masterTable.insertRow()

    const cell1 = row.insertCell()
    const cell2 = row.insertCell()
    const cell3 = row.insertCell()
    const cell4 = row.insertCell()

    const cross = document.createElement('a')
    cross.appendChild(document.createTextNode('❌'))
    cross.className = 'red-text text-darken-2 secondary-content'
    cross.setAttribute('href', '#')

    cell1.innerHTML = titleForm.value
    cell2.innerHTML = authorForm.value
    cell3.innerHTML = isbnForm.value
    cell4.appendChild(cross)

    const toLSData = [titleForm.value, authorForm.value, isbnForm.value]
    addBookLS(toLSData)
    titleForm.value = ""
    authorForm.value = ""
    isbnForm.value = ""
    event.preventDefault()
}

function deleteBook(event){
    let selectedBook

    let name = event.target.parentElement.parentElement.children[0].innerText
    let author = event.target.parentElement.parentElement.children[1].innerText
    let ISBN = event.target.parentElement.parentElement.children[2].innerText
    let selectedBookLS = [name, author, ISBN]

    if (event.target.textContent === "❌") {
        if (confirm("Are you sure you want to remove the book?")) {
            selectedBook = event.target.parentElement.parentElement.rowIndex
            masterTable.deleteRow(selectedBook)
            deleteBookLS(selectedBookLS)
        }
    }
}

function addBookLS(book){
    let books
    if (localStorage.getItem("books") === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books))
}

function deleteBookLS(book){
    let books
    if (localStorage.getItem("books") === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    books.forEach((bookLS, bookIndex) => {
        const sbookLS = JSON.stringify(bookLS)
        const sbook = JSON.stringify(book)
        if(sbookLS === sbook){
            books.splice(bookIndex, 1)
        }
    })
    localStorage.setItem('books', JSON.stringify(books))
}

function getBooks(){
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach((book) => {
        console.log(book)

        const getRow = masterTable.insertRow()

        const getCell1 = getRow.insertCell()
        const getCell2 = getRow.insertCell()
        const getCell3 = getRow.insertCell()
        const getCell4 = getRow.insertCell()

        const getCross = document.createElement('a')
        getCross.appendChild(document.createTextNode('❌'))
        getCross.className = 'red-text text-darken-2 secondary-content'
        getCross.setAttribute('href', '#')

        getCell1.innerHTML = book[0].toString()
        getCell2.innerHTML = book[1].toString()
        getCell3.innerHTML = book[2].toString()
        getCell4.appendChild(getCross)
    })
}