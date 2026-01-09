/* ========================================
   SEARCH.JS - PAGE DE RECHERCHE
   Gestion de la recherche et des filtres
   ======================================== */

import { 
    getURLParam,
    logDev
} from './utils.js';

// ========== DONNEES MOCKEES ==========
const PRATICIENS_MOCK = [
    {
        id: 1,
        nom: "Dr. Sophie Martin",
        specialite: "Medecin generaliste",
        ville: "Lille",
        adresse: "15 Rue de la Republique, 59000 Lille",
        distance: "0.5 km",
        photo: "https://i.pravatar.cc/150?img=1",
        note: 4.8,
        nbAvis: 245,
        disponibilite: "Disponible aujourd'hui",
        disponible: true,
        tarif: 25
    },
    {
        id: 2,
        nom: "Dr. Jean Dupont",
        specialite: "Dentiste",
        ville: "Lille",
        adresse: "28 Avenue du Peuple Belge, 59000 Lille",
        distance: "1.2 km",
        photo: "https://i.pravatar.cc/150?img=12",
        note: 4.9,
        nbAvis: 189,
        disponibilite: "Prochain RDV: Dans 3 jours",
        disponible: false,
        tarif: 50
    },
    {
        id: 3,
        nom: "Dr. Marie Lefebvre",
        specialite: "Pediatre",
        ville: "Villeneuve-d'Ascq",
        adresse: "45 Rue Colbert, 59650 Villeneuve-d'Ascq",
        distance: "2.8 km",
        photo: "https://i.pravatar.cc/150?img=5",
        note: 4.7,
        nbAvis: 312,
        disponibilite: "Disponible demain",
        disponible: true,
        tarif: 30
    },
    {
        id: 4,
        nom: "Dr. Thomas Bernard",
        specialite: "Dermatologue",
        ville: "Roubaix",
        adresse: "12 Boulevard Gambetta, 59100 Roubaix",
        distance: "5.3 km",
        photo: "https://i.pravatar.cc/150?img=13",
        note: 4.6,
        nbAvis: 178,
        disponibilite: "Prochain RDV: Dans 2 semaines",
        disponible: false,
        tarif: 60
    },
    {
        id: 5,
        nom: "Dr. Claire Dubois",
        specialite: "Gynecologue",
        ville: "Lille",
        adresse: "67 Rue Nationale, 59000 Lille",
        distance: "0.8 km",
        photo: "https://i.pravatar.cc/150?img=9",
        note: 4.9,
        nbAvis: 421,
        disponibilite: "Disponible aujourd'hui",
        disponible: true,
        tarif: 50
    },
    {
        id: 6,
        nom: "Dr. Pierre Moreau",
        specialite: "Ophtalmologue",
        ville: "Tourcoing",
        adresse: "34 Rue du Tilleul, 59200 Tourcoing",
        distance: "7.1 km",
        photo: "https://i.pravatar.cc/150?img=15",
        note: 4.5,
        nbAvis: 156,
        disponibilite: "Prochain RDV: Dans 1 mois",
        disponible: false,
        tarif: 55
    },
    {
        id: 7,
        nom: "Dr. Emma Petit",
        specialite: "Medecin generaliste",
        ville: "Villeneuve-d'Ascq",
        adresse: "89 Avenue de la Marne, 59650 Villeneuve-d'Ascq",
        distance: "3.2 km",
        photo: "https://i.pravatar.cc/150?img=10",
        note: 4.7,
        nbAvis: 203,
        disponibilite: "Disponible demain",
        disponible: true,
        tarif: 25
    },
    {
        id: 8,
        nom: "Dr. Lucas Simon",
        specialite: "Cardiologue",
        ville: "Lille",
        adresse: "52 Rue Solferino, 59000 Lille",
        distance: "1.5 km",
        photo: "https://i.pravatar.cc/150?img=14",
        note: 4.8,
        nbAvis: 267,
        disponibilite: "Prochain RDV: Dans 1 semaine",
        disponible: false,
        tarif: 70
    },
    {
        id: 9,
        nom: "Dr. Lea Rousseau",
        specialite: "Psychiatre",
        ville: "Lille",
        adresse: "23 Rue Jean-Jaures, 59000 Lille",
        distance: "1.8 km",
        photo: "https://i.pravatar.cc/150?img=20",
        note: 4.9,
        nbAvis: 145,
        disponibilite: "Disponible cette semaine",
        disponible: true,
        tarif: 60
    },
    {
        id: 10,
        nom: "Dr. Alexandre Garnier",
        specialite: "Kinesitherapeute",
        ville: "Roubaix",
        adresse: "78 Avenue Jean Lebas, 59100 Roubaix",
        distance: "6.2 km",
        photo: "https://i.pravatar.cc/150?img=33",
        note: 4.6,
        nbAvis: 198,
        disponibilite: "Disponible aujourd'hui",
        disponible: true,
        tarif: 40
    }
];

// ========== VARIABLES GLOBALES ==========
let praticiensFiltres = [...PRATICIENS_MOCK];
let praticiensCourants = [];
const RESULTATS_PAR_PAGE = 12;
let pageActuelle = 1;
let nombrePages = 1;

// Filtres actifs
let filtresActifs = {
    specialites: [],
    villes: [],
    disponibilite: 'tous',
    noteMin: 0
};

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', function() {
    logDev('Page de resultats chargee', 'success');
    console.log('%c✓ Search.js charge avec succes', 'color: #10b981; font-weight: bold; font-size: 14px;');
    
    // Recuperation des parametres de recherche depuis l'URL
    const praticien = getURLParam('praticien');
    const localisation = getURLParam('localisation');
    
    logDev(`Parametres URL - Praticien: "${praticien}", Localisation: "${localisation}"`, 'info');
    
    // Pre-remplissage de la barre de recherche
    const searchPraticien = document.getElementById('searchPraticien');
    const searchLocalisation = document.getElementById('searchLocalisation');
    
    if (searchPraticien && praticien) {
        searchPraticien.value = praticien;
    }
    if (searchLocalisation && localisation) {
        searchLocalisation.value = localisation;
    }
    
    // Initialisation des filtres dynamiques
    initialiserFiltres();
    
    // Application des filtres initiaux
    appliquerFiltres();
    
    // Event listeners
    const btnSearchResults = document.getElementById('btnSearchResults');
    if (btnSearchResults) {
        btnSearchResults.addEventListener('click', lancerNouvelleRecherche);
        logDev('Event listener ajoute sur btnSearchResults', 'success');
    }
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', trierResultats);
        logDev('Event listener ajoute sur sortSelect', 'success');
    }
    
    const btnResetFilters = document.getElementById('btnResetFilters');
    if (btnResetFilters) {
        btnResetFilters.addEventListener('click', reinitialiserFiltres);
        logDev('Event listener ajoute sur btnResetFilters', 'success');
    }
    
    // Mobile : gestion des filtres
    const btnMobileFilters = document.getElementById('btnMobileFilters');
    const filtersPanel = document.querySelector('.filters-panel');
    const filtersOverlay = document.getElementById('filtersOverlay');
    
    if (btnMobileFilters && filtersPanel && filtersOverlay) {
        btnMobileFilters.addEventListener('click', () => {
            filtersPanel.classList.add('active');
            filtersOverlay.classList.add('active');
            logDev('Panneau de filtres mobile ouvert', 'info');
        });
        
        filtersOverlay.addEventListener('click', () => {
            filtersPanel.classList.remove('active');
            filtersOverlay.classList.remove('active');
            logDev('Panneau de filtres mobile ferme', 'info');
        });
        
        logDev('Event listeners mobiles ajoutes', 'success');
    }
    
    console.log('%cℹ️ Page de recherche initialisee avec ' + PRATICIENS_MOCK.length + ' praticiens', 'color: #3b82f6; font-size: 12px;');
});

// ========== NOUVELLE RECHERCHE ==========
function lancerNouvelleRecherche() {
    const praticien = document.getElementById('searchPraticien').value.trim();
    const localisation = document.getElementById('searchLocalisation').value.trim();
    
    logDev(`Nouvelle recherche - Praticien: "${praticien}", Localisation: "${localisation}"`, 'info');
    
    // Construction de l'URL avec les nouveaux parametres
    const params = new URLSearchParams();
    if (praticien) params.append('praticien', praticien);
    if (localisation) params.append('localisation', localisation);
    
    // Rechargement de la page avec les nouveaux parametres
    window.location.href = `search.html?${params.toString()}`;
}

// ========== INITIALISATION DES FILTRES ==========
function initialiserFiltres() {
    // Extraction des specialites uniques et triees
    const specialites = [...new Set(PRATICIENS_MOCK.map(p => p.specialite))].sort();
    const villes = [...new Set(PRATICIENS_MOCK.map(p => p.ville))].sort();
    
    logDev(`Filtres initialises - ${specialites.length} specialites, ${villes.length} villes`, 'info');
    
    // Generation des options de specialites
    const specialitesContainer = document.getElementById('filterSpecialites');
    if (specialitesContainer) {
        specialites.forEach(spec => {
            const count = PRATICIENS_MOCK.filter(p => p.specialite === spec).length;
            const option = creerOptionFiltre('specialite', spec, count);
            specialitesContainer.appendChild(option);
        });
    }
    
    // Generation des options de villes
    const villesContainer = document.getElementById('filterVilles');
    if (villesContainer) {
        villes.forEach(ville => {
            const count = PRATICIENS_MOCK.filter(p => p.ville === ville).length;
            const option = creerOptionFiltre('ville', ville, count);
            villesContainer.appendChild(option);
        });
    }
    
    // Listeners sur les filtres checkbox
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', appliquerFiltres);
    });
    
    // Listeners sur les filtres radio
    document.querySelectorAll('.filter-option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', appliquerFiltres);
    });
}

function creerOptionFiltre(type, valeur, count) {
    const div = document.createElement('div');
    div.className = 'filter-option';
    
    const id = `${type}-${valeur.replace(/\s+/g, '-').toLowerCase()}`;
    
    div.innerHTML = `
        <input type="checkbox" id="${id}" value="${valeur}" data-type="${type}">
        <label for="${id}">${valeur}</label>
        <span class="filter-count">(${count})</span>
    `;
    
    return div;
}

// ========== APPLICATION DES FILTRES ==========
function appliquerFiltres() {
    // Recuperation des specialites cochees
    filtresActifs.specialites = Array.from(
        document.querySelectorAll('#filterSpecialites input:checked')
    ).map(input => input.value);
    
    // Recuperation des villes cochees
    filtresActifs.villes = Array.from(
        document.querySelectorAll('#filterVilles input:checked')
    ).map(input => input.value);
    
    // Filtre disponibilite
    const dispoChecked = document.querySelector('input[name="disponibilite"]:checked');
    filtresActifs.disponibilite = dispoChecked ? dispoChecked.value : 'tous';
    
    // Filtre note minimale
    const noteChecked = document.querySelector('input[name="note"]:checked');
    filtresActifs.noteMin = noteChecked ? parseFloat(noteChecked.value) : 0;
    
    // Filtrage des praticiens
    praticiensFiltres = PRATICIENS_MOCK.filter(praticien => {
        // Filtre specialite
        if (filtresActifs.specialites.length > 0 && 
            !filtresActifs.specialites.includes(praticien.specialite)) {
            return false;
        }
        
        // Filtre ville
        if (filtresActifs.villes.length > 0 && 
            !filtresActifs.villes.includes(praticien.ville)) {
            return false;
        }
        
        // Filtre disponibilite
        if (filtresActifs.disponibilite === 'disponible' && !praticien.disponible) {
            return false;
        }
        
        // Filtre note
        if (praticien.note < filtresActifs.noteMin) {
            return false;
        }
        
        return true;
    });
    
    // Application du tri
    trierResultats();
    
    logDev(`${praticiensFiltres.length} resultats apres filtrage`, 'info');
}

// ========== TRI DES RESULTATS ==========
function trierResultats() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect ? sortSelect.value : 'pertinence';
    
    praticiensFiltres.sort((a, b) => {
        switch(sortValue) {
            case 'distance':
                return parseFloat(a.distance) - parseFloat(b.distance);
            case 'disponibilite':
                if (a.disponible && !b.disponible) return -1;
                if (!a.disponible && b.disponible) return 1;
                return 0;
            case 'avis':
                return b.note - a.note;
            case 'pertinence':
            default:
                return 0;
        }
    });
    
    // Reinitialisation a la page 1
    pageActuelle = 1;
    afficherResultats();
}

// ========== AFFICHAGE DES RESULTATS ==========
function afficherResultats() {
    const container = document.getElementById('resultsList');
    const compteur = document.getElementById('resultsCount');
    
    if (!container || !compteur) {
        logDev('ERREUR: Containers resultsList ou resultsCount introuvables', 'error');
        return;
    }
    
    // Calcul de la pagination
    nombrePages = Math.ceil(praticiensFiltres.length / RESULTATS_PAR_PAGE);
    const debut = (pageActuelle - 1) * RESULTATS_PAR_PAGE;
    const fin = debut + RESULTATS_PAR_PAGE;
    praticiensCourants = praticiensFiltres.slice(debut, fin);
    
    // Mise a jour du compteur
    compteur.innerHTML = `<strong>${praticiensFiltres.length}</strong> praticien${praticiensFiltres.length > 1 ? 's' : ''} trouve${praticiensFiltres.length > 1 ? 's' : ''}`;
    
    // Affichage des resultats ou message vide
    if (praticiensCourants.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>Aucun resultat trouve</h3>
                <p>Essayez de modifier vos criteres de recherche ou vos filtres.</p>
                <button class="btn-submit" onclick="window.location.href='search.html'">
                    Reinitialiser la recherche
                </button>
            </div>
        `;
    } else {
        container.innerHTML = praticiensCourants.map(praticien => 
            creerCardPraticien(praticien)
        ).join('');
        
        // Ajout des event listeners sur les cards
        attacherEvenementCards();
    }
    
    // Affichage de la pagination
    afficherPagination();
    
    // Scroll en haut de page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    logDev(`${praticiensCourants.length} praticiens affiches (page ${pageActuelle}/${nombrePages})`, 'success');
}

// ========== CREATION D'UNE CARD PRATICIEN ==========
function creerCardPraticien(praticien) {
    const etoiles = genererEtoiles(praticien.note);
    const badgeDispo = praticien.disponible 
        ? '<span class="dispo-badge available">Disponible</span>'
        : '<span class="dispo-badge busy">Complet</span>';
    
    return `
        <div class="praticien-card" data-id="${praticien.id}">
            <img src="${praticien.photo}" alt="${praticien.nom}" class="praticien-photo">
            
            <div class="praticien-info">
                <h3 class="praticien-name">${praticien.nom}</h3>
                <p class="praticien-specialty">${praticien.specialite}</p>
                
                <div class="praticien-details">
                    <div class="detail-item">
                        <svg class="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                        </svg>
                        <span>${praticien.adresse}</span>
                    </div>
                    
                    <div class="detail-item">
                        <svg class="detail-icon" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                        </svg>
                        <span>${praticien.disponibilite}</span>
                    </div>
                </div>
                
                <div class="praticien-rating">
                    <span class="rating-stars">${etoiles}</span>
                    <span class="rating-value">${praticien.note}</span>
                    <span class="rating-count">(${praticien.nbAvis} avis)</span>
                </div>
            </div>
            
            <div class="praticien-actions">
                ${badgeDispo}
                <span class="distance-badge">📍 ${praticien.distance}</span>
                <button class="btn-rdv" data-id="${praticien.id}">
                    Prendre RDV
                </button>
            </div>
        </div>
    `;
}

// ========== ATTACHEMENT DES EVENEMENTS SUR LES CARDS ==========
function attacherEvenementCards() {
    // Event sur les cards entieres
    document.querySelectorAll('.praticien-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Ne pas rediriger si on clique sur le bouton RDV
            if (!e.target.closest('.btn-rdv')) {
                const id = this.dataset.id;
                logDev(`Clic sur la card du praticien ${id}`, 'info');
                alert(`Profil du praticien ${id} - Page a creer`);
            }
        });
    });
    
    // Event sur les boutons RDV
    document.querySelectorAll('.btn-rdv').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const id = this.dataset.id;
            logDev(`Clic sur le bouton RDV du praticien ${id}`, 'info');
            alert(`Prise de RDV avec le praticien ${id} - Fonctionnalite a implementer`);
        });
    });
}

// ========== GENERATION DES ETOILES ==========
function genererEtoiles(note) {
    const noteArrondie = Math.round(note * 2) / 2;
    let etoiles = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= noteArrondie) {
            etoiles += '★';
        } else if (i - 0.5 === noteArrondie) {
            etoiles += '½';
        } else {
            etoiles += '☆';
        }
    }
    
    return etoiles;
}

// ========== PAGINATION ==========
function afficherPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;
    
    if (nombrePages <= 1) {
        container.innerHTML = '';
        return;
    }
    
    let html = `
        <button class="pagination-btn" data-page="${pageActuelle - 1}" ${pageActuelle === 1 ? 'disabled' : ''}>
            ← Precedent
        </button>
    `;
    
    // Affichage des numeros de page
    for (let i = 1; i <= nombrePages; i++) {
        if (
            i === 1 || 
            i === nombrePages || 
            (i >= pageActuelle - 1 && i <= pageActuelle + 1)
        ) {
            html += `
                <button 
                    class="pagination-btn ${i === pageActuelle ? 'active' : ''}" 
                    data-page="${i}"
                >
                    ${i}
                </button>
            `;
        } else if (i === pageActuelle - 2 || i === pageActuelle + 2) {
            html += '<span class="pagination-dots">...</span>';
        }
    }
    
    html += `
        <button class="pagination-btn" data-page="${pageActuelle + 1}" ${pageActuelle === nombrePages ? 'disabled' : ''}>
            Suivant →
        </button>
    `;
    
    container.innerHTML = html;
    
    // Attachement des evenements de pagination
    container.querySelectorAll('.pagination-btn:not(:disabled)').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = parseInt(this.dataset.page);
            changerPage(page);
        });
    });
}

function changerPage(page) {
    if (page < 1 || page > nombrePages) return;
    pageActuelle = page;
    afficherResultats();
    logDev(`Navigation vers la page ${page}`, 'info');
}

// ========== REINITIALISATION DES FILTRES ==========
function reinitialiserFiltres() {
    // Decochage de tous les filtres checkbox
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    
    // Remise a zero des radio buttons
    const dispoTous = document.getElementById('dispo-tous');
    if (dispoTous) dispoTous.checked = true;
    
    const noteTous = document.getElementById('note-tous');
    if (noteTous) noteTous.checked = true;
    
    // Reinitialisation des filtres actifs
    filtresActifs = {
        specialites: [],
        villes: [],
        disponibilite: 'tous',
        noteMin: 0
    };
    
    // Reapplication
    appliquerFiltres();
    
    logDev('Filtres reinitialises', 'info');
}
