# Structure CSS

## Organisation des fichiers

```
assets/css/
├── variables.css          → Variables CSS (couleurs, espacements, etc.)
├── global.css            → Styles communs (header, footer, boutons, etc.)
├── home.css              → Styles page d'accueil
├── auth.css              → Styles connexion/inscription
└── reset-password.css    → Styles mot de passe oublié
```

---

## Différences entre les fichiers

### **1. `variables.css`**
- **Contenu** : Variables CSS uniquement (`:root`)
- **Utilité** : Centraliser toutes les valeurs réutilisables
- **Exemples** : Couleurs, espacements, bordures, transitions, typographie
- **À importer** : **EN PREMIER** sur chaque page

### **2. `global.css`**
- **Contenu** : Styles communs à **toutes** les pages
- **Utilité** : Éviter la duplication de code
- **Exemples** : Reset CSS, body, header, footer, navigation, boutons réutilisables
- **À importer** : **EN DEUXIÈME** sur chaque page

### **3. Fichiers spécifiques** (`home.css`, `auth.css`, etc.)
- **Contenu** : Styles propres à **une page** uniquement
- **Utilité** : Organiser le code par fonctionnalité
- **Exemples** : Barre de recherche (home), onglets (auth), étapes (reset-password)
- **À importer** : **EN DERNIER** selon la page

