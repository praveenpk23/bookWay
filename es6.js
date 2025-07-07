const formSubmit = document.querySelector("#book-form");
const clearAllBtn = document.querySelector("#clear");

formSubmit.addEventListener("submit", getFormData);
clearAllBtn.addEventListener("click", function (e) {
  if (confirm("Are you sure you want to clear all books?")) {
    localStorage.removeItem("books");
    document.querySelector("#book-list").innerHTML = "";
    Ui.showMessage("All books cleared successfully", "danger");
    ResetPage.reset();

  }
});


function getFormData(e) {
    // const ui = new Ui();
  e.preventDefault();
  const title = document.querySelector("#title").value.replace(/\s+/g, ' ').trim();
  const author = document.querySelector("#author").value.replace(/\s+/g, ' ').trim();
  const isbn = document.querySelector("#isbn").value.replace(/\s+/g, ' ').trim();
  // console.log(title,author,isbn);

  if (title === "" || isbn === "" || author === "") {
    Ui.showMessage("Please fill all the fields", "danger");
    return;
  }
  const book = new AddBook(title, author, isbn);
  console.log(book);
const btnType = e.target.children[3].children[0].textContent.trim();

  //   book.storeBooksOnLocalStorage(book);
  // AddBook.storeBooksOnLocalStorage(book);
        AddBook.storeBooksOnLocalStorage(book,btnType);
        console.log(btnType)


}


class AddBook {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

 static storeBooksOnLocalStorage(book,type) {
  const books = JSON.parse(localStorage.getItem("books"));
  console.log(books);
   const isbn =   localStorage.getItem('bookUpdateIsbn')
   console.log(isbn)
    const booksForEdit = JSON.parse(localStorage.getItem("books"));
  
  



    if (books === null || books.length === 0) {
    let booksArray = [];
    booksArray.push(book);
    localStorage.setItem("books", JSON.stringify(booksArray));
    Ui.useEffectShow();
    Ui.showMessage("This book added successfully in the library", "success");
    ResetPage.reset();
  } else { 
       console.log("Entered Add sections")

   if(type === 'Add'){
     const isExsistsIsbn = books.some((bookItem) => bookItem.isbn.toLowerCase() === book.isbn.toLowerCase() );
     const isExsistsTitle = books.some((bookItem) => bookItem.title.toLowerCase() === book.title.toLowerCase() );
    //  const isExsistsAuthor = books.some((bookItem) => bookItem.author === book.author );
    console.log(`isbn = ${isExsistsIsbn}`);
    console.log(`title = ${isExsistsTitle}`);
    // console.log(`author = ${isExsistsAuthor}`);

    if (isExsistsIsbn  || isExsistsTitle) {
      Ui.showMessage("This book already exists in the library", "danger");

    } else {
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
      Ui.showMessage("This book added successfully in the library", "success");
      ResetPage.reset();
      Ui.useEffectShow();
    }
   }else if(type === 'Edit'){
    console.log('into edit')
  booksForEdit.forEach(function(book,index){
          if(book.isbn === isbn){
            booksForEdit.splice(index,1)
          }

    })
    console.log(booksForEdit)
     const isExsistsIsbn = booksForEdit.some((bookItem) => bookItem.isbn.toLowerCase() === book.isbn.toLowerCase() );
     const isExsistsTitle = booksForEdit.some((bookItem) => bookItem.title.toLowerCase() === book.title.toLowerCase() );
    //  const isExsistsAuthor = booksForEdit.some((bookItem) => bookItem.author === book.author );
    console.log(`isbn = ${isExsistsIsbn}`);
    console.log(`title = ${isExsistsTitle}`);
    // console.log(`author = ${isExsistsAuthor}`);

    if (isExsistsIsbn ||  isExsistsTitle) {
      Ui.showMessage("This book already exists in the library", "danger");

    }else{

      booksForEdit.push(book)
      localStorage.setItem('books',JSON.stringify(booksForEdit))
        Ui.showMessage("This book updated successfully",'warning')
              ResetPage.reset();
                  document.querySelector('#cancel').remove();

        Ui.useEffectShow();
        localStorage.removeItem('bookUpdateIsbn')

    //     const edit = new EditBook()

    // const indexElement = edit.getIndexFromLocalStorage(isbn);
    // console.log('into else part')
    // books.forEach(function(element,index){
    //   if(index === indexElement ){
    //     books.splice(index,1)
    //     console.log(books)
    //     console.log(book)
    //     console.log(index)
    //     books.push(book);
    //     // JSON.stringify(localStorage.setItem('books',books))
    //     localStorage.setItem('books',JSON.stringify(books))
    //     Ui.showMessage("This book updated successfully",'warning')
    //           ResetPage.reset();
    //               document.querySelector('#cancel').remove();

    //     Ui.useEffectShow();
    //     localStorage.removeItem('bookUpdateIsbn')
    //   }
    // })
   }
    }

  
  }






  // if(type === 'Add'){
   
  // }else if(type === 'Edit'){
  //   console.log('into edit')

  //   const edit = new EditBook()

  //   const indexElement = edit.getIndexFromLocalStorage(isbn);
    
  //    if (books === null || books.length === 0) {
  //   let booksArray = [];
  //   booksArray.push(book);
  //   localStorage.setItem("books", JSON.stringify(booksArray));
  //   Ui.useEffectShow();
  //   Ui.showMessage("This book added successfully in the library", "success");
  //         ResetPage.reset();
  // } else {
  //   console.log('into else part')
  //   books.forEach(function(element,index){
  //     if(index === indexElement ){
  //       books.splice(index,1)
  //       console.log(books)
  //       console.log(book)
  //       console.log(index)
  //       books.push(book);
  //       // JSON.stringify(localStorage.setItem('books',books))
  //       localStorage.setItem('books',JSON.stringify(books))
  //       Ui.showMessage("This book updated successfully",'warning')
  //             ResetPage.reset();
  //       Ui.useEffectShow();
  //       localStorage.removeItem('bookUpdateIsbn')
  //     }
  //   })

  //   // const isExsists = books.some((bookItem) => bookItem.isbn === book.isbn);
  //   // console.log(isExsists);

  //   // if (isExsists) {
  //   //   Ui.showMessage("This book already exists in the library", "danger");
  //   // } else {
  //   //   books.push(book);
  //   //   localStorage.setItem("books", JSON.stringify(books));
  //   //   Ui.showMessage("This book added successfully in the library", "success");
  //     // Ui.useEffectShow();
  //   // }
  // }
  // }


}

}


class Ui{
   static useEffectShow(){
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
                    <td class="edit">
                        <span class="btn btn-warning">Edit</span>
                    </td>
                    <td class="delete">
                        <span class="btn btn-danger">X</span>
                    </td>
                `;

    bookList.appendChild(row);
  });
    }


   static showMessage(message, status) {

const container = document.querySelector(".show-alert");
container.innerHTML = ""; // Clear previous messages
    const div = document.createElement("div");
    div.className = `alert alert-${status}`;
    div.textContent = message;
    container.appendChild(div);
    setTimeout(() => {
      container.innerHTML = "";
    }, 3000);

    }
}

// const ui = new Ui();
Ui.useEffectShow();




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

          Ui.showMessage("Book deleted successfully", "danger");
                ResetPage.reset();
          Ui.useEffectShow();
        }
      });
    }
  } else {
    return;
  }
});



const editIcon = document.querySelector("#book-list");
editIcon.addEventListener("click", function(e){
  const edit = new EditBook();
  if (e.target.classList.contains("btn-warning")) {
    edit.editBook(e);
  } else {
    return;
  }
} )
class EditBook{
    editBook(e){
      const target = e.target.parentElement.parentElement.childElementCount;
      console.log(target);
      const isbn = e.target.parentElement.parentElement.children[2].textContent;
      console.log(isbn)
      this.getIndexFromLocalStorage(isbn)
      const txt = [];
     for(let i = 0; i < target-2; i++){
            txt.push(e.target.parentElement.parentElement.children[i].textContent);
     }
      console.log(txt);
    document.querySelector("#title").value = txt[0];
    document.querySelector("#author").value = txt[1];
    document.querySelector("#isbn").value = txt[2];
    document.querySelector('#test').textContent = 'Edit';
    document.querySelector('#test').className = 'btn btn-warning'
    const cancel = document.querySelector('#cancel')
    if(cancel){
      cancel.remove();
    }
     const cancelBtn = document.createElement('button');
     cancelBtn.textContent = "Cancel"
     cancelBtn.className = 'btn btn-danger'
     cancelBtn.id = 'cancel'
     cancelBtn.type = 'button'
    const btn = document.querySelector('.btns')
    btn.appendChild(cancelBtn);
    document.querySelector('#cancel').addEventListener('click',function(e){
      ResetPage.reset();
      document.querySelector('#cancel').remove();
      
    })
      localStorage.setItem('bookUpdateIsbn',isbn)


    }

   getIndexFromLocalStorage(isbn){
    const books = JSON.parse(localStorage.getItem('books'))
          let indexValue;
          console.log(isbn)
    books.forEach(function(book,index){
      if(book.isbn === isbn){
        indexValue = index
      }
    })
    console.log(indexValue)
        // this.updateBooks(indexValue)
    return indexValue
   }


    
}


class ResetPage{
    static reset(){
       document.querySelector("#title").value = '';
    document.querySelector("#author").value = ""
    document.querySelector("#isbn").value = "";
    document.querySelector('#test').textContent = 'Add';
    document.querySelector('#test').className = 'btn btn-dark'
    }
}

if(document.querySelector('#cancel')){
  console.log('yes')
}