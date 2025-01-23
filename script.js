let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${author}, ${pages} pages ${
      read ? 'read' : 'not read'
    } `;
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(
    title,
    author,
    pages,
    read ? 'read' : 'not read'
  );
  myLibrary.push(newBook);
}
const cardDiv = document.querySelector('.card');

const updatePage = () => {
  myLibrary.forEach((book) => {
    const childDiv = document.createElement('div');
    childDiv.className = 'book';
    childDiv.textContent = `${book.title}, ${book.author}, ${book.pages} pages`;
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.setAttribute('id', 'book-delete-btn');
    deleteBtn.innerText = 'Delete';
    childDiv.setAttribute('data-index', myLibrary.indexOf(book));
    childDiv.appendChild(deleteBtn);
    cardDiv.appendChild(childDiv);
  });
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, false);
addBookToLibrary('1984', 'George Orwell', 328, true);
addBookToLibrary('Rot&Ruin', 'Jonathan Maberry', 458, false);
addBookToLibrary('Alter Ego', 'Alex Segura', 320, true);
updatePage();

const newBookButton = document.getElementById('newBookButton');
const formModal = document.getElementById('formModal');
const bookForm = document.getElementById('bookForm');
const cancelButton = document.getElementById('cancelButton');

// Show the form modal
newBookButton.addEventListener('click', () => {
  formModal.classList.remove('hidden');
});

// Hide the form modal
cancelButton.addEventListener('click', () => {
  formModal.classList.add('hidden');
});

// Handle form submission
bookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission behavior
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  cardDiv.textContent = '';
  updatePage();
  bookForm.reset();
  formModal.classList.add('hidden');
});

cardDiv.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'book-delete-btn') {
    // Get the parent div with class 'book'
    const bookDiv = e.target.parentElement;
    const bookIndex = bookDiv.getAttribute('data-index'); // Get the book's index

    // Remove the book from the library
    myLibrary.splice(bookIndex, 1);

    // Remove the corresponding div from the DOM
    bookDiv.remove();

    // Update DOM
    cardDiv.textContent = '';
    updatePage();
  }
});

// Clear the form
bookForm.reset();

// Hide the modal
formModal.classList.add('hidden');
