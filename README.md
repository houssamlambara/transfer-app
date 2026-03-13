# Transfer App

Application de gestion de virements construite avec **Spring Boot** (backend) et **Angular** (frontend).

## Stack technique

- Backend: Java 17, Spring Boot 3, Spring Web, Spring Data JPA, Validation, H2
- Frontend: Angular 21, NG-Zorro (Ant Design), Tailwind CSS, RxJS
- Build: Maven Wrapper (`mvnw`), npm

## Prérequis

- Java 17
- Node.js (version LTS recommandée)
- npm

## Démarrage rapide

### 1) Lancer le backend

Depuis le dossier `backend`:

```powershell
.\mvnw.cmd spring-boot:run
```

Sous macOS/Linux:

```bash
./mvnw spring-boot:run
```

Le backend démarre sur `http://localhost:8080`.

### 2) Lancer le frontend

Depuis le dossier `frontend`:

```powershell
npm install
npm start
```

Le frontend démarre sur `http://localhost:4200`.

## Configuration locale

Le backend utilise une base **H2 en mémoire**.

- URL JDBC: `jdbc:h2:mem:transferdb`
- Utilisateur: `sa`
- Mot de passe: `password`
- Console H2: `http://localhost:8080/h2-console`

> Données de test: des utilisateurs sont initialisés automatiquement au démarrage du backend.

## Endpoints API principaux

### Utilisateurs

- `GET /api/users` - Liste des utilisateurs

### Virements

- `GET /api/transfers` - Historique des virements
- `POST /api/transfers` - Créer un virement
- `PATCH /api/transfers/{id}/status?status=PENDING|COMPLETED|FAILED|CANCELLED` - Mettre à jour le statut

Exemple de payload pour `POST /api/transfers`:

```json
{
  "senderEmail": "houssam@gmail.com",
  "receiverEmail": "recruteur@entreprise.com",
  "amount": 150.0
}
```

## Vérification rapide

1. Ouvrir `http://localhost:4200`
2. Aller sur **Nouveau Virement** et créer un virement
3. Vérifier l'apparition dans **Historique**
4. Tester l'action **Modifier** pour changer le statut

## Scripts utiles

### Backend

```powershell
.\mvnw.cmd test
.\mvnw.cmd clean package
```

### Frontend

```powershell
npm run build
npm test
```

## Structure du dépôt

- `backend/` API Spring Boot
- `frontend/` application Angular
- `README.md` documentation de démarrage
