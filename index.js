const formSubmit = document.querySelector("#book-form");
const clearAllBtn = document.querySelector("#clear");

formSubmit.addEventListener("submit", getFormData);
clearAllBtn.addEventListener("click", function (e) {
  if (confirm("Are you sure you want to clear all books?")) {
    localStorage.removeItem("books");
    document.querySelector("#book-list").innerHTML = "";
    showMessage("All books cleared successfully", "danger");
  }
});
function getFormData(e) {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  if (title === "" || author === "" || isbn === "") {
    showMessage("Please fill all the fields", "danger");
    return;
  }
  const book = new AddBook(title, author, isbn);
  console.log(book);
  storeBooksOnLocalStorage(book);
  // ui(book);
}

function AddBook(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}
 
function storeBooksOnLocalStorage(book) {
  const books = JSON.parse(localStorage.getItem("books"));
  console.log(books);
  if (books === null || books.length === 0) {
    let booksArray = [];
    booksArray.push(book);
    localStorage.setItem("books", JSON.stringify(booksArray));
    ui();
    showMessage("This book added successfully in the library", "success");
  } else {
    const isExsists = books.some((bookItem) => bookItem.isbn === book.isbn);
    console.log(isExsists);

    if (isExsists) {
      showMessage("This book already exists in the library", "danger");
    } else {
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
      showMessage("This book added successfully in the library", "success");
      ui();
    }
    // books.forEach(function(bookItem){
    //     if(bookItem.isbn === book.isbn){
    //         return;
    //     }else if(bookItem.isbn !== book.isbn){
    //     books.push(book);
    //     localStorage.setItem('books', JSON.stringify(books));
    //     showMessage('This book added successfully in the library','success')
    //     ui();
    //     }

    // })
  }
}

function ui() {
  // document.querySelector('#book-list').innerHTML = '';
  const bookList = document.querySelector("#book-list");
  bookList.innerHTML = "";
  const books = localStorage.getItem("books")
    ? JSON.parse(localStorage.getItem("books"))
    : [];
  books.forEach(function (book) {
    const row = document.createElement("tr");
    row.innerHTML = ` 
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td class="delete">
                        <span class="btn btn-danger">X</span>
                    </td>
                `;

    bookList.appendChild(row);
  });
}
ui();

const removeIcon = document.querySelector("#book-list");
console.log(removeIcon);

removeIcon.addEventListener("click", function (e) {
  const books = JSON.parse(localStorage.getItem("books"));
  // console.log(books);
  const target = e.target;
  console.log(target);
  console.log(target.classList);
  const deleteRowIsdn =
    target.parentElement.parentElement.children[2].textContent;
  if (target.classList.contains("btn-danger")) {
    if (confirm("Are you sure ? ")) {
      books.forEach(function (book, index) {
        if (book.isbn === deleteRowIsdn) {
          books.splice(index, 1);
          localStorage.setItem("books", JSON.stringify(books));

          showMessage("Book deleted successfully", "danger");
          ui();
        }
      });
    }
  } else {
    return;
  }
});

// console.log(JSON.parse(localStorage.getItem('books')) );

function showMessage(message, status) {
  if (status === "success") {
    const container = document.querySelector(".show-alert");
    const div = document.createElement("div");
    div.className = "alert alert-success";
    div.textContent = message;
    container.appendChild(div);
    setTimeout(() => {
      container.innerHTML = "";
    }, 3000);
  } else if (status === "danger") {
    const container = document.querySelector(".show-alert");
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = message;
    container.appendChild(div);
    setTimeout(() => {
      container.innerHTML = "";
    }, 3000);
  }
}
