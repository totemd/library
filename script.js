let library = [];

function Book(title, author, numberOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
}

function addBook(book) {
    library.push(book);
    displayLibrary();
}

function deleteBook(index) {
    library.splice(index, 1);
    displayLibrary();
}

function toggleRead(index) {
    library[index].isRead = !library[index].isRead
    displayLibrary();
}

function displayLibrary() {
    const tableBody = document.querySelector("tbody");
    for (let i = tableBody.rows.length-1; i >= 0; i--){
        tableBody.deleteRow(i);
    }
    let index = 0;
    library.forEach(book => {
        const row = tableBody.insertRow();

        let cell = row.insertCell();
        cell.textContent = book.title;
        cell = row.insertCell();
        cell.textContent = book.author;
        cell = row.insertCell();
        cell.textContent = book.numberOfPages;

        cell = row.insertCell();
        const readCheckBox = document.createElement("input");
        readCheckBox.setAttribute("type", "checkbox");
        readCheckBox.setAttribute("class", "read-checkbox");
        readCheckBox.setAttribute("id", `check${index}`);
        readCheckBox.checked = book.isRead;
        readCheckBox.addEventListener("change", (e) => {
            const index = +e.target.id.match(/\d+/);
            toggleRead(index);
        })
        cell.appendChild(readCheckBox);

        cell = row.insertCell();
        // const deleteButton = document.createElement("button");
        // deleteButton.setAttribute("type", "button");
        cell.setAttribute("class", "delete-button");
        cell.setAttribute("id", `delete${index++}`);
        cell.textContent = "Delete";
        cell.addEventListener("click", (e) => {
            const index = +e.target.id.match(/\d+/);
            deleteBook(index);
        })
        // cell.appendChild(deleteButton);
    });
}

library.push(new Book("The Hobbit", "J.R.R. Tolkien", 1442, false));
library.push(new Book("The Bible", "Unknown", 555, false));
library.push(new Book("Withering Heights", "Emily Brontë", 168, false));
library.push(new Book("La Serpe", "Philippe Jaennada", 671, true));

displayLibrary();

const formPopup = document.querySelector("#form-popup");
const openFormButton = document.querySelector("#open-form-button");
openFormButton.addEventListener("click", () => {
    formPopup.style.display = "block";
    openFormButton.style.display = "none";
});

const closeFormButton = document.querySelector("#cancel-button");
closeFormButton.addEventListener("click", () => {
    formPopup.style.display = "none";
    openFormButton.style.display = "block";
});

const form = document.forms[0];
const submitButton = document.querySelector("#add-button");
submitButton.addEventListener("click", () => {
    addBook(new Book(form.title.value, form.author.value, form.pages.value, form.read.checked));
    form.reset();
    formPopup.style.display = "none";
    openFormButton.style.display = "block";
});