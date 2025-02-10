# Utilise une image officielle de Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le projet
COPY . .

# Exposer le port (par exemple 3000)
EXPOSE 8020

# Démarrer l'application
CMD ["node", "server.js"]
