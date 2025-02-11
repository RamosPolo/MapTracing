# MapTracing - Application Full-Stack Dockerisée

## Description

**MapTracing** est une application full-stack comprenant :

- Un **frontend** en Node.js
- Un **backend** avec :
    - Une **API REST** en Node.js avec Express
    - Un **service SOAP** en Python

L'application est dockerisée avec **Docker Compose** pour une exécution simplifiée.

---

## Prérequis

Avant de lancer l'application, assurez-vous d'avoir installé :

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Structure du projet

```
MapTracing/
│── frontend/             # Application frontend en Node.js
│    ├── server.js        # Serveur Express
│    ├── package.json     # Dépendances Node.js
│    ├── Dockerfile       # Dockerfile du frontend
│    │
│    ├── public/              # Fichiers scripts
│    │   ├── carsRender.js    # Rendu de la liste des véhicules
│    │   ├── mapRender.js     # Rendu de la carte
│    │   ├── requestAPI.js    # Appelle vers les APIs
│    │   ├── resultRender.js  # Rendu du resultat final
│    │   ├── script.js        # Script principal de l'application
│    │   ├── store.js         # Partage des données entre les pages js
│    │   ├── style.css        # Style de la page
│    │   ├── index.html       # Page principal de l'application
│    │
│── backend/
│    ├── api/             # API REST en Node.js
│    │   ├── server.js    # Serveur Express
│    │   ├── package.json # Dépendances Node.js
│    │   ├── Dockerfile   # Dockerfile de l'API REST
│    │   │
│    │   ├── routes/                   # Routes de l'API
│    │   │   ├── carsRequest.js        # Appelle vers l'API chargetrip (GraphSQL)
│    │   │   ├── coordonnesRoute.js    # Appelle vers l'API openrouteservice
│    │   │   ├── mapping.js            # Appelle vers l'API jsonplaceholder pour la carte
│    │   │   ├── travel-time.js        # Appelle vers le service SOAP en python
│    │   │
│    │   │
│    ├── soapService/               # Service SOAP en Python
│        ├── soap.py                # Service SOAP
│        ├── Dockerfile             # Dockerfile du service SOAP
│
│── docker-compose.yml    # Configuration Docker Compose
│── README.md             # Documentation du projet
```

---

## Installation et exécution

### 1. Cloner le projet

```sh
git clone https://github.com/RamosPolo/MapTracing.git
cd MapTracing
```

### 2. Construire et lancer les conteneurs

```sh
docker-compose up --build
```

Cette commande va : ✅ Construire les images Docker de chaque service ✅ Démarrer les conteneurs (frontend, API, service SOAP) ✅ Connecter les services via un réseau interne

### 3. Accéder aux services

| Service          | URL                                            |
| ---------------- | ---------------------------------------------- |
| **Frontend**     | [http://localhost:8020](http://localhost:8020) |
| **API REST**     | [http://localhost:8030](http://localhost:8030) |
| **Service SOAP** | [http://localhost:8033](http://localhost:8033) |

---

## Arrêter et nettoyer les conteneurs

Pour arrêter les conteneurs sans supprimer les données :

```sh
docker-compose down
```

Pour supprimer les conteneurs, images et volumes associés :

```sh
docker-compose down --volumes --rmi all
```

---

## Personnalisation

Si vous souhaitez modifier les ports, modifiez les valeurs dans `docker-compose.yml` et les fichiers `Dockerfile` correspondants.

```yaml
services:
  frontend:
    ports:
      - "8020:3000"  # Modifie le port d'accès
```

---

## Auteur

👤 **Coulmeau Paul**

📧 Contact : [Paul.Coulmeau@etu.univ-smb.fr](mailto\:Paul.Coulmeau@etu.univ-smb.fr)]

🚀 Projet développé avec **Node.js, Express, Python et Docker**.

