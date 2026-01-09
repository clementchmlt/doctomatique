# Structure JavaScript

## Organisation des fichiers

```
assets/js/
├── utils.js              → Fonctions réutilisables (validation, notifications, etc.)
├── home.js               → Script page d'accueil
├── auth.js               → Script connexion/inscription
└── reset-password.js     → Script mot de passe oublié
```

---

## Rôle de chaque fichier

### **1. `utils.js`** (Fichier central)
**Contenu** : Fonctions utilitaires réutilisables dans tout le projet

**Fonctions disponibles :**

#### **Validation**
- `validerEmail(email)` → Valide le format d'un email
- `validerMotdepasse(motdepasse)` → Évalue la force d'un mot de passe
- `validerChampNonVide(value)` → Vérifie qu'un champ n'est pas vide

#### **Notifications**
- `afficherNotification(message, type)` → Affiche une notification
- `notificationSucces(message)` → Notification de succès
- `notificationErreur(message)` → Notification d'erreur

#### **Formulaires**
- `recupererValeursFormulaire(formId)` → Récupère toutes les valeurs
- `reinitialiserFormulaire(formId)` → Réinitialise un formulaire
- `toggleBoutonSoumission(buttonId, actif)` → Active/désactive un bouton

#### **Événements clavier**
- `ajouterListenerEntree(elementId, callback)` → Écoute la touche Entrée
- `gererNavigationClavier(fieldIds)` → Navigation entre champs avec Entrée

#### **Manipulation DOM**
- `toggleElement(elementId, visible)` → Affiche/masque un élément
- `ajouterClasse(elementId, className)` → Ajoute une classe CSS
- `retirerClasse(elementId, className)` → Retire une classe CSS

#### **Formatage**
- `formaterDate(date)` → Format français (ex: "12 décembre 2025")
- `formaterHeure(date)` → Format heure (ex: "14:30")
- `capitaliser(str)` → Capitalise la première lettre
- `tronquerTexte(text, maxLength)` → Tronque un texte

#### **Stockage local**
- `sauvegarderLocal(key, value)` → Sauvegarde dans localStorage
- `recupererLocal(key)` → Récupère du localStorage
- `supprimerLocal(key)` → Supprime du localStorage

#### **URL**
- `getURLParam(paramName)` → Récupère un paramètre d'URL
- `getAllURLParams()` → Récupère tous les paramètres

#### **Debugging**
- `logDev(message, type)` → Log en couleur dans la console

---

### **2. `home.js`** (Page d'accueil)
**Contenu** : Gestion de la recherche de praticiens

**Fonctionnalités :**
- Validation des champs de recherche
- Construction de la requête de recherche
- Redirection vers la page de résultats avec paramètres
- Gestion de la touche Entrée sur les champs

---

### **3. `auth.js`** (Connexion/Inscription)
**Contenu** : Gestion de l'authentification

**Fonctionnalités :**
- Basculement entre onglets connexion/inscription
- Validation des formulaires (email, mot de passe, etc.)
- Gestion de la connexion via Google OAuth (à implémenter)
- Affichage/masquage du mot de passe
- Navigation au clavier entre les champs

---

### **4. `reset-password.js`** (Mot de passe oublié)
**Contenu** : Gestion de la réinitialisation du mot de passe

**Fonctionnalités :**
- Gestion des 4 étapes (demande, confirmation, nouveau mot de passe, succès)
- Indicateur de force du mot de passe en temps réel
- Détection du token dans l'URL
- Fonction de test pour le développement (`testerEtape(1-4)`)

---

### **⚠️ Important : Utilisation des modules ES6**

Les fichiers JS utilisent **les modules ES6** (`import/export`). Il faut donc :
1. Ajouter `type="module"` sur les balises `<script>`
2. Utiliser live server

---
