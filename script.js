// gestion de la recherche
function handleSearch() {
    const practitioner = document.getElementById('practicien').value.trim();
    const location = document.getElementById('localisation').value.trim();

    // fonction si rien n'est rempli
    if (!practicien && !localisation) {
        alert('Veuillez renseigner au moins un champ de recherche');
        return;
    }
    
    console.log('Recherche:', { practicien, localisation });
    
    // FONCTION PAS FINIS DE LA RECHERCHE
    const searchQuery = `${practicien || 'Tous praticiens'} - ${localisation || 'Toutes localisations'}`;
    alert(`Recherche en cours pour: ${searchQuery}`);
}

// récupération du practicien lorsqu'on appui sur entrée 
document.getElementById('practicien').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// récupération de la localisation lorsqu'on appui sur entrée 
document.getElementById('localisation').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});