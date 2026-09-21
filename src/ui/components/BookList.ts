import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { Library } from "../../services/Library";
import { BorrowService } from "../../services/BorrowService";
import { showLimitModal } from "./Modal";

export function createBookList(
    books: Library<Book>,
    users: Library<User>,
    onChange: () => void
): HTMLElement {
    const container = document.createElement("div");

    const title = document.createElement("h3");
    title.className = "mt-4";
    title.textContent = "Книги";

    const search = document.createElement("input");
    search.className = "form-control mb-3";
    search.placeholder = "Пошук за назвою або автором";

    const list = document.createElement("div");
    const pagination = document.createElement("div");

    pagination.className = "d-flex gap-2 mt-3";

    container.appendChild(title);
    container.appendChild(search);
    container.appendChild(list);
    container.appendChild(pagination);

    let currentPage = 1;
    const booksPerPage = 5;

    function drawBooks(): void {
        list.innerHTML = "";
        pagination.innerHTML = "";

        const query = search.value.trim().toLowerCase();

        const filteredBooks = books
            .getAll()
            .filter(
                (book) =>
                    book.title.toLowerCase().includes(query) ||
                    book.author.toLowerCase().includes(query)
            );

        if (filteredBooks.length === 0) {
            list.innerHTML = `
                <p class="text-muted">
                    Книг не знайдено.
                </p>
            `;
            return;
        }

        const pageCount = Math.ceil(filteredBooks.length / booksPerPage);

        if (currentPage > pageCount) {
            currentPage = pageCount;
        }

        const start = (currentPage - 1) * booksPerPage;

        const pageBooks = filteredBooks.slice(start, start + booksPerPage);

        pageBooks.forEach((book) => {
            const card = document.createElement("div");

            card.className = "card mb-2";

            const owner = users
                .getAll()
                .find((user) => user.borrowedBookIds.includes(book.id));

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">
                        ${book.title}
                    </h5>

                    <p class="mb-1">
                        <strong>Автор:</strong>
                        ${book.author}
                    </p>

                    <p class="mb-2">
                        <strong>Рік:</strong>
                        ${book.publicationYear}
                    </p>

                    <span class="badge ${
                        book.isBorrowed ? "bg-warning text-dark" : "bg-success"
                    }">
                        ${book.isBorrowed ? "Видана" : "Доступна"}
                    </span>

                    <div class="actions mt-3"></div>
                </div>
            `;

            const actions = card.querySelector(".actions") as HTMLElement;

            if (!book.isBorrowed) {
                const select = document.createElement("select");

                select.className = "form-select mb-2";

                select.innerHTML = `
                    <option value="">
                        Оберіть користувача
                    </option>
                `;

                users.getAll().forEach((user) => {
                    const option = document.createElement("option");

                    option.value = String(user.id);
                    option.textContent = user.name;

                    select.appendChild(option);
                });

                const borrowButton = document.createElement("button");

                borrowButton.className = "btn btn-success btn-sm me-2";

                borrowButton.textContent = "Взяти";

                borrowButton.addEventListener("click", () => {
                    const user = users.find(Number(select.value));

                    if (!user) {
                        return;
                    }

                    if (user.borrowedBookIds.length >= 3) {
                        showLimitModal();
                        return;
                    }

                    BorrowService.borrowBook(book, user);

                    onChange();
                });

                actions.appendChild(select);
                actions.appendChild(borrowButton);
            } else {
                const returnButton = document.createElement("button");

                returnButton.className = "btn btn-warning btn-sm me-2";

                returnButton.textContent = "Повернути";

                returnButton.addEventListener("click", () => {
                    if (!owner) {
                        return;
                    }

                    BorrowService.returnBook(book, owner);

                    onChange();
                });

                actions.appendChild(returnButton);
            }

            const deleteButton = document.createElement("button");

            deleteButton.className = "btn btn-danger btn-sm";

            deleteButton.textContent = "Видалити";

            deleteButton.disabled = book.isBorrowed;

            deleteButton.addEventListener("click", () => {
                books.remove(book.id);
                onChange();
            });

            actions.appendChild(deleteButton);

            list.appendChild(card);
        });

        if (pageCount > 1) {
            for (let page = 1; page <= pageCount; page++) {
                const button = document.createElement("button");

                button.className =
                    page === currentPage
                        ? "btn btn-primary btn-sm"
                        : "btn btn-outline-primary btn-sm";

                button.textContent = String(page);

                button.addEventListener("click", () => {
                    currentPage = page;
                    drawBooks();
                });

                pagination.appendChild(button);
            }
        }
    }

    search.addEventListener("input", () => {
        currentPage = 1;
        drawBooks();
    });

    drawBooks();

    return container;
}
