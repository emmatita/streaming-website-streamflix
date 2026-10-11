// affichage/masquage des sections de films
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

// compter les films dans le catalogue
function compterFilmsUniques() {
    // Récupérer tous les articles de films
    const films = document.querySelectorAll('article[data-film]');

    // Stocker les identifiants sans doublons
    const filmsUniques = new Set();

    films.forEach(function (film) {
        filmsUniques.add(film.dataset.film);
    });

    return filmsUniques.size;
}

function afficherCompteurFilms() {
    const compteur = document.querySelector('#compteur-films');

    if (!compteur) return;

    const nombreFilms = compterFilmsUniques();

    compteur.textContent =
        `Catalogue : ${nombreFilms} films disponibles`;
}

afficherCompteurFilms();

// mettre le film en vu si regardé
function activerFilmsVus() {
    const cartesFilms = document.querySelectorAll('.article-card');

    cartesFilms.forEach(function (carte) {
        carte.addEventListener('click', function (event) {
            // Ignorer les clics sur les boutons et les liens
            if (event.target.closest('button, a')) {
                return;
            }

            // Récupérer l'identifiant du film cliqué
            const identifiantFilm = carte.dataset.film;

            // Sélectionner toutes les cartes du même film
            const cartesDuMemeFilm = document.querySelectorAll(
                `[data-film="${identifiantFilm}"]`
            );

            // Vérifier si le film est déjà marqué comme vu
            const estVu = !carte.classList.contains('watched');

            // Appliquer le même état à toutes ses cartes
            cartesDuMemeFilm.forEach(function (carteFilm) {
                carteFilm.classList.toggle('watched', estVu);
            });
        });
    });
}

activerFilmsVus();

