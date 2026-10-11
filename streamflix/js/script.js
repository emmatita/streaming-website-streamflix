// Sélectionner tous les boutons Masquer/Afficher
const boutons = document.querySelectorAll('.btn-toggle-section');

boutons.forEach(function (bouton) {
    bouton.addEventListener('click', function () {
        // Récupérer la section contenant le bouton
        const section = bouton.closest(
            '.films-tendance, .films-recommandes, .films-nouveaux'
        );

        // Sélectionner la grille de films
        const grille = section.querySelector('.row');

        // Inverser la visibilité de la grille
        grille.classList.toggle('d-none');

        // Mettre à jour le texte du bouton
        if (grille.classList.contains('d-none')) {
            bouton.textContent = 'Afficher';
            bouton.setAttribute('aria-expanded', 'false');
        } else {
            bouton.textContent = 'Masquer';
            bouton.setAttribute('aria-expanded', 'true');
        }
    });
});