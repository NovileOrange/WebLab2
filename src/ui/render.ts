import { Book } from "../models/Book";
import { User } from "../models/User";

import { Library } from "../services/Library";
import { Storage } from "../services/Storage";

import { createBookForm } from "./components/BookForm";
import { createBookList } from "./components/BookList";
import { createUserForm } from "./components/UserForm";

const books = new Library<Book>();
const users = new Library<User>();

// =========================
// STORAGE
// =========================

function saveData(): void {
    Storage.save("books", books.getAll());
    Storage.save("users", users.getAll());
}

function loadData(): void {
    const savedBooks = Storage.load<Book[]>("books") ?? [];

    const savedUsers = Storage.load<User[]>("users") ?? [];

    books.setItems(
        savedBooks.map(
            (book) =>
                new Book(
                    book.id,
                    book.title,
                    book.author,
                    book.publicationYear,
                    book.isBorrowed
                )
        )
    );

    users.setItems(
        savedUsers.map(
            (user) =>
                new User(user.id, user.name, user.email, user.borrowedBookIds)
        )
    );
}

// =========================
// USER LIST
// =========================

function createUserList(): HTMLElement {
    const container = document.createElement("div");

    const title = document.createElement("h3");

    title.className = "mt-4";
    title.textContent = "Користувачі";

    container.appendChild(title);

    const allUsers = users.getAll();

    if (allUsers.length === 0) {
        const message = document.createElement("p");

        message.className = "text-muted";
        message.textContent = "Користувачів немає.";

        container.appendChild(message);

        return container;
    }

    allUsers.forEach((user) => {
        const card = document.createElement("div");

        card.className = "card mb-2";

        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">
                    ${user.name}
                </h5>

                <p class="mb-1">
                    <strong>ID:</strong>
                    ${user.id}
                </p>

                <p class="mb-1">
                    <strong>Email:</strong>
                    ${user.email}
                </p>

                <p class="mb-3">
                    <strong>Книг взято:</strong>
                    ${user.borrowedBookIds.length} / 3
                </p>

                <button
                    class="btn btn-danger btn-sm delete-user"
                    ${user.borrowedBookIds.length > 0 ? "disabled" : ""}
                >
                    Видалити
                </button>
            </div>
        `;

        const deleteButton = card.querySelector(
            ".delete-user"
        ) as HTMLButtonElement;

        deleteButton.addEventListener("click", () => {
            users.remove(user.id);

            saveData();
            renderApp();
        });

        container.appendChild(card);
    });

    return container;
}

// =========================
// MAIN RENDER
// =========================

export function renderApp(): void {
    const app = document.getElementById("app");

    if (!app) {
        return;
    }

    app.innerHTML = "";

    const container = document.createElement("div");

    container.className = "container py-4";

    // HEADER

    const header = document.createElement("div");

    header.className = "mb-4";

    header.innerHTML = `
        <h1>
            Library Management
        </h1>

        <p class="text-muted">
            Керування книгами та користувачами
        </p>
    `;

    container.appendChild(header);

    // =========================
    // FORMS
    // =========================

    const forms = document.createElement("div");

    forms.className = "row g-3 mb-4";

    // BOOK FORM

    const bookColumn = document.createElement("div");

    bookColumn.className = "col-md-6";

    bookColumn.appendChild(
        createBookForm(books, () => {
            saveData();
            renderApp();
        })
    );

    // USER FORM

    const userColumn = document.createElement("div");

    userColumn.className = "col-md-6";

    userColumn.appendChild(
        createUserForm(users, () => {
            saveData();
            renderApp();
        })
    );

    forms.appendChild(bookColumn);
    forms.appendChild(userColumn);

    container.appendChild(forms);

    // =========================
    // BOOK LIST
    // =========================

    container.appendChild(
        createBookList(books, users, () => {
            saveData();
            renderApp();
        })
    );

    // =========================
    // USER LIST
    // =========================

    container.appendChild(createUserList());

    app.appendChild(container);
}

// =========================
// INITIALIZATION
// =========================

export function initializeApp(): void {
    loadData();
    renderApp();
}
