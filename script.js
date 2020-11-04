class Library {
    library = [];

    add(book) {
        this.library.push(book);
        this.displayLibrary();
    }

    delete(index) {
        this.library.splice(index, 1);
        this.displayLibrary();
    }

    toggleRead(index) {
        this.library[index].toggleRead();
        this.displayLibrary();
    }

    displayLibrary() {
        // Delete library
        const tableBody = document.querySelector("tbody");
        for (let i = tableBody.rows.length - 1; i >= 0; i--) {
            tableBody.deleteRow(i);
        }
        // Show library
        let index = 0;
        this.library.forEach(book => {
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
                this.toggleRead(index);
            });
            cell.appendChild(readCheckBox);

            cell = row.insertCell();
            cell.setAttribute("class", "delete-button");
            cell.setAttribute("id", `delete${index++}`);
            cell.textContent = "Delete";
            cell.addEventListener("click", (e) => {
                const index = +e.target.id.match(/\d+/);
                this.delete(index);
            });
        });
    }

    log() {
        console.table(this.library);
    }
}

class Book {
    title;
    author;
    numberOfPages;
    isRead;

    constructor(title, author, numberOfPages, isRead) {
        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
    }

    get title() {
        return this.title;
    }

    get author() {
        return this.author;
    }

    get numberOfPages() {
        return this.numberOfPages;
    }

    get isRead() {
        return this.isRead;
    }

    toggleRead() {
        this.isRead = !this.isRead;
    }


}

let library = new Library();

library.add(new Book("The Hobbit", "J.R.R. Tolkien", 1442, false));
library.add(new Book("The Bible", "Unknown", 555, false));
library.add(new Book("Withering Heights", "Emily Brontë", 168, false));
library.add(new Book("La Serpe", "Philippe Jaennada", 671, true));

library.displayLibrary();

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
    library.add(new Book(form.title.value, form.author.value, form.pages.value, form.read.checked));
    form.reset();
    formPopup.style.display = "none";
    openFormButton.style.display = "block";
});