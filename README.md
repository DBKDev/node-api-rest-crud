# 🚀 Node.js REST CRUD API (Express + MySQL)

Bienvenue sur mon projet d’API REST développé avec **Node.js**, **Express** et **MySQL**.  
Ce projet est une démonstration de mes compétences backend et de ma rigueur de développement.  

L’objectif n’était pas seulement de créer une API CRUD classique, mais aussi de :  
- Structurer le projet pour être clair et maintenable  
- Assurer la **cohérence des réponses JSON** (succès comme erreurs)  
- Mettre en place des pratiques de **sécurité basiques** (utilisateur MySQL limité, variables d’environnement)  
- Fournir un code qui puisse servir de **base réutilisable**  

---

## ✨ Points forts du projet

- 📂 **Structure claire** : séparation des routes, services, helpers, etc.  
- 📡 **Réponses JSON uniformisées** : chaque endpoint renvoie un format cohérent avec un code de succès/erreur et un message explicite.  
- 🔐 **Sécurité** :  
  - Utilisation d’un **utilisateur MySQL dédié aux droits minimaux**  
  - Stockage des informations sensibles dans un fichier `.env` (jamais versionné)  
- ⚡ **CRUD complet** : gestion de bout en bout (Create, Read, Update, Delete) sur une ressource `users`.  
- 🛠️ **Bonne pratique dev** : helpers pour les réponses, organisation en modules, préparation pour des tests unitaires.  

---

## 🛠️ Stack technique

- [Node.js](https://nodejs.org/) – Backend runtime  
- [Express](https://expressjs.com/) – Framework minimaliste  
- [MySQL](https://www.mysql.com/) – Base de données relationnelle  
- [dotenv](https://www.npmjs.com/package/dotenv) – Gestion des variables d’environnement  

---

## ⚙️ Installation

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/DBKDev/node-api-rest-crud.git
cd node-api-rest-crud
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Configurer les variables d’environnement
Créez un fichier `.env` à la racine du projet, basé sur `.env.example` :

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=user_dedie
DB_PASSWORD=mot_de_passe
DB_NAME=demo_api
```

### 4️⃣ Préparer la base de données
Importez le fichier `schema.sql` pour créer la structure (sans données sensibles) :
```bash
mysql -u user_dedie -p demo_api < schema.sql
```

### 5️⃣ Lancer le serveur
```bash
npm start
```

👉 Le serveur tourne par défaut sur [http://localhost:3000](http://localhost:3000).

---

## 📡 Endpoints disponibles

| Méthode | Endpoint          | Description                |
|---------|------------------|----------------------------|
| GET     | `/api/users`     | Récupère tous les users    |
| GET     | `/api/users/:id` | Récupère un user précis    |
| POST    | `/api/users`     | Crée un nouvel user        |
| PUT     | `/api/users/:id` | Met à jour un user         |
| DELETE  | `/api/users/:id` | Supprime un user           |

---

## ✅ Exemple de réponse

### Succès
```json
{
  "status": "success",
  "code": 200,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}
```

### Erreur
```json
{
  "status": "error",
  "code": 400,
  "message": "USER_NOT_FOUND"
}
```

👉 Chaque réponse contient un **status**, un **code HTTP clair**, et un **message explicite**, ce qui permet à un client (frontend, Postman, autre API) de comprendre rapidement le résultat.  

---

## 📂 Organisation du projet

```
📦 node-api-rest-crud
├── 📂 helpers       → Fonctions utilitaires (réponses JSON, gestion des codes d’erreur/succès)
├── 📂 modules       → Logique métier (CRUD)
├── 📂 services      → Connexion BDD, requêtes SQL
├── app.js           → Point d’entrée de l’application
├── .env.example     → Variables d’environnement à adapter
└── package.json     → Dépendances & scripts
```

---

## 🔐 Sécurité & bonnes pratiques

- ✅ Utilisation d’un **utilisateur MySQL dédié** avec permissions limitées (principe du moindre privilège).  
- ✅ Gestion des données sensibles via **`.env`** (non versionné dans Git).  
- ✅ Dump SQL (`Apirestbdd.sql`) **ignoré** dans Git pour éviter toute fuite.  
- ✅ Réponses JSON cohérentes avec **codes d’erreur et de succès uniformisés**.  

---

## 🚀 Améliorations possibles

- 📖 Ajouter une documentation Swagger/OpenAPI  
- 🧩 Intégrer un middleware de validation (`express-validator` / `zod`)  
- 🧪 Écrire des tests unitaires avec Jest + Supertest  
- 🐳 Ajouter Docker (API + MySQL) pour faciliter le déploiement  

---

## 📄 Licence

Ce projet est publié sous la licence [MIT](LICENSE).  
