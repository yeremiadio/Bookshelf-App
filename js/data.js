let books = [];
const STORAGE_KEY = "BOOK_APPS";

function isStorageExist() /* boolean */ {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    }
    console.log('Local Storage available')
    return true;
 }
  
 function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
 }
 
  
 function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        books = data;
  
    document.dispatchEvent(new Event("ondataloaded"));
 }

 function updateDataToStorage() {
    if(isStorageExist())
        saveData();
 }

 function composeBookObject(bookID, bookTitle, author, textTimeStamp, isCompleted) {
    return {
        bookID,
        bookTitle,
        author,
        textTimeStamp,
        isCompleted
    };
 }

 function findBook(bookID) {
    for(book of books){
        if(book.bookID === bookID)
            return book;
    }
    return null;
 }
  
  
 function findBookIndex(bookID) {
    let index = 0
    for (book of books) {
        if(book.bookID === bookID)
            return index;
  
        index++;
    }
  
    return -1;
 }