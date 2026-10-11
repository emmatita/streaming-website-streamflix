// ===================================
// EXERCICE 1 : Afficher/masquer sections
// ===================================
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

// ===================================
// EXERCICE 2 : Compteur de films
// ===================================
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

// ===================================
// EXERCICE 3 : Films vus
// ===================================
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

// ===================================
// EXERCICE 4 : Recherche
// ===================================
function activerRechercheFilms() {
    const searchInput = document.querySelector('#search');
    const cartesFilms = document.querySelectorAll('.article-card');

    // Vérifier que le champ de recherche existe
    if (!searchInput) {
        return;
    }

    searchInput.addEventListener('input', function () {
        const recherche = searchInput.value.toLowerCase().trim();

        const sectionHero = document.querySelector('.section-hero');

        if (sectionHero) {
            sectionHero.style.display = recherche === '' ? '' : 'none';
        }

        let nombreResultats = 0;

        cartesFilms.forEach(function (carte) {
            const titre = carte.querySelector('.card-title');

            if (!titre) {
                return;
            }

            const correspond = titre.textContent
                .toLowerCase()
                .includes(recherche);

            // Afficher ou masquer la carte
            carte.style.display = correspond ? '' : 'none';

            if (correspond) {
                nombreResultats++;
            }
        });

        afficherMessageRecherche(nombreResultats, recherche);
    });
}

function afficherMessageRecherche(nombreResultats, recherche) {
    let message = document.querySelector('#message-recherche');

    // Créer le message s'il n'existe pas encore
    if (!message) {
        message = document.createElement('p');
        message.id = 'message-recherche';
        message.textContent = 'Aucun résultat';

        const grilleFilms = document.querySelector('.grille-films');

        if (grilleFilms) {
            grilleFilms.prepend(message);
        }
    }

    // Afficher le message uniquement si une recherche ne trouve rien
    message.style.display =
        recherche !== '' && nombreResultats === 0 ? 'block' : 'none';
}

activerRechercheFilms();

// ===================================
// EXERCICE 5 : Modal
// ===================================
function openModal(title) {
    const modal = document.querySelector('#modal');
    const modalBody = document.querySelector('#modal-body');

    modalBody.replaceChildren();

    const titre = document.createElement('h2');
    titre.textContent = title;

    modalBody.appendChild(titre);
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.querySelector('#modal');
    modal.style.display = 'none';
}

function activerModalFilms() {
    const cartesFilms = document.querySelectorAll('.article-card');
    const boutonFermer = document.querySelector('#modal .close');

    cartesFilms.forEach(function (carte) {
        carte.addEventListener('click', function (event) {
            if (event.target.closest('button, a')) {
                return;
            }

            const titre = carte.querySelector('.card-title');

            if (titre) {
                openModal(titre.textContent.trim());
            }
        });
    });

    if (boutonFermer) {
        boutonFermer.addEventListener('click', function () {
            closeModal();
        });
    } else {
        console.error('Bouton de fermeture introuvable');
    }
}

activerModalFilms();

