document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const modal = document.getElementById("modalWebinario");
        const overlay = document.getElementById("overlayWebinario");
        const closeButton = document.getElementById("closeButtonWebinario");

        if (modal && overlay && closeButton) {
            modal.classList.add("show");
            overlay.style.display = "block";

            // Fechar ao clicar no botão
            closeButton.addEventListener("click", function () {
                modal.classList.remove("show");
                overlay.style.display = "none";
            });

            // Fechar ao clicar no overlay
            overlay.addEventListener("click", function () {
                modal.classList.remove("show");
                overlay.style.display = "none";
            });
        }
    }, 500);
});
