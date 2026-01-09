/* ========================================
   HOME.JS - PAGE D'ACCUEIL
   Gestion de la recherche de praticiens
   ======================================== */

// Import des fonctions utilitaires
import { validerChampNonVide, notificationErreur, ajouterListenerEntree, logDev } from './utils.js';

console.log('%c🚀 HOME.JS CHARGE', 'color: #10b981; font-weight: bold; font-size: 16px;');

// ========== GESTION DE LA RECHERCHE ==========

/**
 * Lance la recherche de praticiens
 */
function lancerRecherche() {
    console.log('%c🔍 FONCTION RECHERCHE APPELEE', 'color: #3b82f6; font-weight: bold;');
    
    // Recuperation des valeurs des champs
    const champPraticien = document.getElementById('champPraticien');
    const champLocalisation = document.getElementById('champLocalisation');
    
    if (!champPraticien || !champLocalisation) {
        console.error('❌ ERREUR: Champs introuvables');
        alert('ERREUR: Les champs de recherche sont introuvables');
        return;
    }
    
    const praticien = champPraticien.value.trim();
    const localisation = champLocalisation.value.trim();
    
    console.log(`📝 Valeurs recuperees - Praticien: "${praticien}", Localisation: "${localisation}"`);
    
    // Validation : au moins un champ doit etre rempli
    if (!praticien && !localisation) {
        console.warn('⚠️ Aucun champ rempli');
        alert('Veuillez renseigner au moins un champ de recherche');
        return;
    }
    
    // Construction de la requete de recherche
    const params = new URLSearchParams();
    if (praticien) params.append('praticien', praticien);
    if (localisation) params.append('localisation', localisation);
    
    // Redirection vers la page de resultats
    const url = `pages/search.html?${params.toString()}`;
    console.log(`🎯 REDIRECTION VERS: ${url}`);
    
    // REDIRECTION
    window.location.href = url;
}

// ========== INITIALISATION ==========

// Attendre que le DOM soit completement charge
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✅ DOM READY - Initialisation...', 'color: #10b981; font-weight: bold;');
    
    // Recuperation des elements
    const btnSearch = document.querySelector('.btn-search');
    const champPraticien = document.getElementById('champPraticien');
    const champLocalisation = document.getElementById('champLocalisation');
    
    console.log('🔍 Recherche des elements...');
    console.log('  - Bouton recherche:', btnSearch ? '✅ TROUVE' : '❌ INTROUVABLE');
    console.log('  - Champ praticien:', champPraticien ? '✅ TROUVE' : '❌ INTROUVABLE');
    console.log('  - Champ localisation:', champLocalisation ? '✅ TROUVE' : '❌ INTROUVABLE');
    
    // Verification que les elements existent
    if (!btnSearch) {
        console.error('❌ ERREUR CRITIQUE: Bouton .btn-search introuvable !');
        alert('ERREUR: Le bouton de recherche est introuvable. Verifiez la structure HTML.');
        return;
    }
    
    if (!champPraticien) {
        console.error('❌ ERREUR CRITIQUE: Champ #champPraticien introuvable !');
        return;
    }
    
    if (!champLocalisation) {
        console.error('❌ ERREUR CRITIQUE: Champ #champLocalisation introuvable !');
        return;
    }
    
    // AJOUT DE L'EVENT LISTENER SUR LE BOUTON
    console.log('🔗 Ajout de l\'event listener sur le bouton...');
    btnSearch.addEventListener('click', function(e) {
        console.log('%c👆 CLIC DETECTE SUR LE BOUTON !', 'color: #f59e0b; font-weight: bold; font-size: 14px;');
        e.preventDefault();
        lancerRecherche();
    });
    console.log('✅ Event listener ajoute avec succes');
    
    // Gestion de la touche Entree sur les champs
    champPraticien.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('⌨️ Touche Entree detectee sur champPraticien');
            e.preventDefault();
            lancerRecherche();
        }
    });
    
    champLocalisation.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            console.log('⌨️ Touche Entree detectee sur champLocalisation');
            e.preventDefault();
            lancerRecherche();
        }
    });
    
    // Auto-focus sur le premier champ
    champPraticien.focus();
    
    // Message de confirmation dans la console
    console.log('%c═══════════════════════════════════════', 'color: #10b981;');
    console.log('%c✓ PAGE D\'ACCUEIL PRETE !', 'color: #10b981; font-weight: bold; font-size: 16px;');
    console.log('%cℹ️ Essayez maintenant:', 'color: #3b82f6; font-weight: bold;');
    console.log('%c  1. Saisissez "medecin" dans le premier champ', 'color: #3b82f6;');
    console.log('%c  2. Saisissez "lille" dans le second champ', 'color: #3b82f6;');
    console.log('%c  3. Cliquez sur le bouton "Rechercher"', 'color: #3b82f6;');
    console.log('%c  4. Vous devriez voir "CLIC DETECTE" puis la redirection', 'color: #3b82f6;');
    console.log('%c═══════════════════════════════════════', 'color: #10b981;');
});

// Message immediat pour confirmer le chargement
console.log('%c✓ Script home.js execute', 'color: #10b981; font-weight: bold;');
