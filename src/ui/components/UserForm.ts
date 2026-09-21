import { User } from "../../models/User";
import { Library } from "../../services/Library";
import { Validators } from "../../utils/validators";

export function createUserForm(
    library: Library<User>,
    onSave: () => void
): HTMLElement {
    const card = document.createElement("div");
    card.className = "card p-3";

    card.innerHTML = `
        <h3>Додати користувача</h3>

        <form id="user-form">
            <input
                id="user-id"
                class="form-control mb-2"
                placeholder="ID"
            >

            <input
                id="user-name"
                class="form-control mb-2"
                placeholder="Ім'я"
            >

            <input
                id="user-email"
                type="email"
                class="form-control mb-2"
                placeholder="Email"
            >

            <button class="btn btn-primary">
                Додати користувача
            </button>
        </form>

        <div id="user-error" class="text-danger mt-2"></div>
    `;

    const form = card.querySelector("#user-form") as HTMLFormElement;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const id = (card.querySelector("#user-id") as HTMLInputElement).value;

        const name = (card.querySelector("#user-name") as HTMLInputElement)
            .value;

        const email = (card.querySelector("#user-email") as HTMLInputElement)
            .value;

        const error = card.querySelector("#user-error") as HTMLElement;

        error.textContent = "";

        if (
            !Validators.isRequired(id) ||
            !Validators.isRequired(name) ||
            !Validators.isRequired(email)
        ) {
            error.textContent = "Заповніть усі поля.";
            return;
        }

        if (!Validators.isValidId(id)) {
            error.textContent = "ID повинен містити тільки цифри.";
            return;
        }

        const numericId = Number(id);

        if (library.find(numericId)) {
            error.textContent = "Користувач з таким ID вже існує.";
            return;
        }

        library.add(new User(numericId, name, email));

        form.reset();
        onSave();
    });

    return card;
}
