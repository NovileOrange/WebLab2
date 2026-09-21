export function showLimitModal(): void {
    const modal = document.createElement("div");

    modal.className = "modal fade show";
    modal.style.display = "block";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <div class="modal-header">
                    <h5 class="modal-title">
                        Ліміт книг
                    </h5>
                </div>

                <div class="modal-body">
                    Користувач не може взяти більше трьох книг.
                </div>

                <div class="modal-footer">
                    <button
                        id="close-modal"
                        class="btn btn-secondary"
                    >
                        Закрити
                    </button>
                </div>

            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#close-modal")?.addEventListener("click", () => {
        modal.remove();
    });
}
