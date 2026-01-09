# Structure du html

## Règles de liens selon l'emplacement

### **Depuis `index.html` (racine) :**
| Type | Chemin |
|------|--------|
| CSS | `assets/css/fichier.css` |
| JS | `assets/js/fichier.js` |
| Images | `assets/images/fichier.png` |
| Pages | `pages/fichier.html` |

### **Depuis `pages/*.html` (sous-dossier) :**
| Type | Chemin |
|------|--------|
| CSS | `../assets/css/fichier.css` |
| JS | `../assets/js/fichier.js` |
| Images | `../assets/images/fichier.png` |
| Accueil | `../index.html` |
| Autres pages | `fichier.html` (même dossier) |

---

