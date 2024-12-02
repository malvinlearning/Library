const myLibrary = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
  this.read = false;  // Initial read status is false (unread)
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(book) {
  myLibrary.pop(book);
}

const bookA = new Book('Lord of the rings', 'Tolkien');
const bookB = new Book('48 Laws Of Power', 'Robert Greene');
addBookToLibrary(bookA);
addBookToLibrary(bookB);
console.log(myLibrary);

const table = document.querySelector('table');
let buttons;
render();

function render() {
  table.innerHTML = '';  

  myLibrary.forEach((book) => {
    const tr = document.createElement('tr');
    const tdA = document.createElement('td');
    tdA.textContent = book.title;
    const tdB = document.createElement('td');
    tdB.textContent = book.author;

    // Create the read/unread toggle button
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggleButton');
    toggleButton.textContent = book.read ? 'Read' : 'Unread';
    toggleButton.style.backgroundColor = book.read ? 'green' : 'gray';

    // Add the toggle button event listener
    toggleButton.addEventListener('click', () => {
      book.read = !book.read;
      toggleButton.textContent = book.read ? 'Read' : 'Unread';
      toggleButton.style.backgroundColor = book.read ? 'green' : 'gray';
    });

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.classList.add('removeButton');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBookFromLibrary(book);
      render(); // Re-render the table after removal
    });

    tr.appendChild(tdA);
    tr.appendChild(tdB);
    tr.appendChild(toggleButton);
    tr.appendChild(removeButton);
    table.appendChild(tr);
  });
}

const addBookButton = document.querySelector('.addBooks');
const displayDialogue = document.querySelector('.displayDialogue');

addBookButton.addEventListener('click', () => {
  displayDialogue.innerHTML += 
  `<dialog open>
    <p>Add a book!</p>
    <form action="" method="get" class="form-example">
      <div class="form-example">
        <label for="title">Enter the book title: </label>
        <input type="text" name="title" id="title" required />
      </div>
      <div class="form-example">
        <label for="author">Enter the author: </label>
        <input type="text" name="author" id="author" required />
      </div>
      <div class="form-example">
        <input type="submit" value="Add!" class="dialogueButton" />
      </div>
    </form>
  </dialog>`;

  const dialogueButton = document.querySelector('.dialogueButton');
  dialogueButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission default behavior
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // Add the new book to the library
    const newBook = new Book(title, author);
    addBookToLibrary(newBook);
    render();

    // Close the dialog
    const dialog = document.querySelector('dialog');
    dialog.close();
  });
});
