# Bibliothèque – Architecture 2-tiers (TypeScript / Node.js)

## Structure du projet

```
bibliotheque-2tiers/
│
├── Interface/
│   ├── EcranPrincipal.ts       → Menu principal + navigation
│   ├── EcranAjoutLivre.ts      → Ajout de livre (avec validation)
│   └── EcranRecherche.ts       → Recherche de livre par ISBN
│
├── Modèles/
│   └── Livre.ts                → Classe représentant un livre
│
└── BaseDeDonnées/
    └── GestionnaireBD.ts       → Accès à la base SQLite
```

## ⚙️ Installation

### 1. Initialiser le projet

Dans le dossier racine :

```bash
npm install
```

## ▶️ Exécution du programme

Lancer le programme principal :

```bash
npm start
ou
npx ts-node Interface/EcranPrincipal.ts
```

Une interface console s'ouvre :

```
=== SYSTÈME DE BIBLIOTHÈQUE ===
1. Ajouter un livre
2. Afficher tous les livres
3. Rechercher un livre
4. Emprunter un livre
5. Retourner un livre
6. Quitter
```

## 💾 Fonctionnement

- Les données sont stockées dans un fichier SQLite local : `bibliotheque.db`.
- Les opérations CRUD sont gérées par `GestionnaireBD.ts`.
- La logique métier (validation ISBN, année, etc.) est intégrée dans les écrans d'interface → exemple typique du **couplage fort** d'une architecture 2-tiers.

## 💡 Limites de la version 2-tiers

- ❌ Validation et logique métier mélangées à l'interface.
- ❌ Difficulté à réutiliser le code pour une application Web ou API.
- ❌ Peu de modularité pour les tests.

Ces points seront corrigés dans la **version 3-tiers**, où la logique métier sera déplacée dans une couche séparée.