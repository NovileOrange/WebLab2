import { Book } from "../../models/Book";
import { Library } from "../../services/Library";
import { Validators } from "../../utils/validators";

export function createBookForm(
    library: Library<Book>,
    onSave: () => void
): HTMLElement {
    const card = document.createElement("div");
    card.className = "card p-3";

    card.innerHTML = `
        <h3>Додати книгу</h3>

        <form id="book-form">
            <input
                id="book-id"
                class="form-control mb-2"
                placeholder="ID"
            >

            <input
                id="book-title"
                class="form-control mb-2"
                placeholder="Назва"
            >

            <input
                id="book-author"
                class="form-control mb-2"
                placeholder="Автор"
            >

            <input
                id="book-year"
                class="form-control mb-2"
                placeholder="Рік видання"
            >

            <button class="btn btn-primary">
                Додати книгу
            </button>
        </form>

        <div id="book-error" class="text-danger mt-2"></div>
    `;

    const form = card.querySelector("#book-form") as HTMLFormElement;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const id = (card.querySelector("#book-id") as HTMLInputElement).value;

        const title = (card.querySelector("#book-title") as HTMLInputElement)
            .value;

        const author = (card.querySelector("#book-author") as HTMLInputElement)
            .value;

        const year = (card.querySelector("#book-year") as HTMLInputElement)
            .value;

        const error = card.querySelector("#book-error") as HTMLElement;

        error.textContent = "";

        if (
            !Validators.isRequired(id) ||
            !Validators.isRequired(title) ||
            !Validators.isRequired(author) ||
            !Validators.isRequired(year)
        ) {
            error.textContent = "Заповніть усі поля.";
            return;
        }

        if (!Validators.isValidId(id)) {
            error.textContent = "ID повинен містити тільки цифри.";
            return;
        }

        if (!Validators.isValidYear(year)) {
            error.textContent = "Введіть правильний рік.";
            return;
        }

        const numericId = Number(id);

        if (library.find(numericId)) {
            error.textContent = "Книга з таким ID вже існує.";
            return;
        }

        library.add(new Book(numericId, title, author, Number(year)));

        form.reset();
        onSave();
    });

    return card;
}
