const UNCOMPLETED_BOOK_ID = "books";
const COMPLETED_BOOK_ID = "completed-books";
const BOOK_ITEMID = "itemId";

const searchBook = document.getElementById("searchBox").value;

function makeBook(
  bookId,
  title,
  author,
  timestamp /* string */,
  isCompleted /* boolean */
) {
  // const textID = document.getElementById("id");
  // textID.innerText = id + new Date();

  const bookID = document.createElement("p");
  bookID.innerText = bookId;

  const textTitle = document.createElement("h2");
  textTitle.innerText = title;

  const textAuthor = document.createElement("h4");
  textAuthor.innerText = author;

  const textTimestamp = document.createElement("p");
  textTimestamp.innerText = timestamp;

  const idContainer = document.createElement("li");
  idContainer.classList.add("id-book");
  idContainer.append(bookID);
  const bookContainer = document.createElement("li");
  bookContainer.classList.add("inner");
  bookContainer.append(textTitle, textAuthor, textTimestamp);

  const container = document.createElement("ul");
  container.classList.add("item", "shadowdiv");
  container.append(idContainer, bookContainer);

  if (isCompleted) {
    // container
    //   .append
    //   createUndoButton(),
    //    createTrashButton()
    //   ();
  } else {
    container.append(createCheckButton());
  }

  return container;
}

function createUndoButton() {
  return createButton("undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}

function createCheckButton() {
  return createButton("check-button", function (event) {
    addTaskToCompleted(event.target.parentElement);
  });
}

function createButton(buttonTypeClass /* string */, eventListener /* Event */) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function addBook() {
  const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
  const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
  var inputElement = document.getElementsByClassName("myCheck");
  const titleBook = document.getElementById("title").value;
  //   checkB = document.querySelector(".myCheck").value;
  const authorBook = document.getElementById("author").value;
  const timestamp = document.getElementById("date").value;
  let bookID =
    "ID-" +
    Math.floor(Math.random() * 10) +
    new Date().getMilliseconds() +
    timestamp;
  const book = makeBook(bookID, titleBook, authorBook, timestamp, false);
  const bookObject = composeBookObject(
    bookID,
    titleBook,
    authorBook,
    timestamp,
    false
  );

  book[BOOK_ITEMID] = bookObject.bookID;
  books.push(bookObject);

  if (inputElement[0].checked) {
    addTaskToCompleted(book);
  } else {
    uncompletedBook.append(book);
    updateDataToStorage();
  }
}

function addTaskToCompleted(taskElement) {
  const listCompleted = document.getElementById(COMPLETED_BOOK_ID);
  const bookID = document.getElementById("id-book");
  const titleBook = taskElement.querySelector(".inner > h2").innerText;
  const authorBook = taskElement.querySelector(".inner > h4").innerText;
  const timestamp = taskElement.querySelector(".inner > p").innerText;
  const book = makeBook(bookID, titleBook, authorBook, timestamp, true);
  const booksingle = findBook(taskElement[BOOK_ITEMID]);
  booksingle.isCompleted = true;
  book[BOOK_ITEMID] = booksingle.bookID;
  listCompleted.append(book);
  taskElement.remove();
  
  updateDataToStorage();
  console.log("Dicentang");
}

function refreshDataFromBooks() {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  let listCompleted = document.getElementById(COMPLETED_BOOK_ID);

  for (book of books) {
    const booksingle = makeBook(
      book.bookID,
      book.bookTitle,
      book.author,
      book.textTimeStamp,
      book.isCompleted
    );
    booksingle[BOOK_ITEMID] = book.bookID;

    if (book.isCompleted) {
      listCompleted.append(booksingle);
      console.log("COMPLETED");
    } else {
      listUncompleted.append(booksingle);
    }
  }
}
