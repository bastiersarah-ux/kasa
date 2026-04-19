## Description du projet

Kasa est une application web de location d'hébergements entre particuliers. Elle permet aux utilisateurs de :

- Parcourir et rechercher des propriétés disponibles
- Consulter le détail d'un hébergement (galerie photo, équipements, informations sur l'hôte)
- Créer un compte et se connecter
- Ajouter des propriétés en favoris
- Échanger via un système de chat
- Noter les hébergements

Le front-end est construit avec **Next.js 16** (App Router), **React 19**, **TypeScript**, **Tailwind CSS** et **DaisyUI**. Il communique avec une API back-end via un proxy intégré. Les tests unitaires sont gérés avec **Vitest** et **Testing Library**.

## Pré-requis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm (inclus avec Node.js)
- Une instance de l'API back-end Kasa en cours d'exécution

## Installation

1. Cloner le dépôt :

```bash
git clone https://github.com/bastiersarah-ux/kasa.git
cd kasa
```

2. Installer les dépendances :

```bash
npm install
```

3. Créer un fichier `.env.local` à la racine du projet et y définir l'URL de l'API back-end :

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Lancement du projet

### Mode développement

```bash
npm run dev
```

L'application est accessible sur [http://localhost:4000](http://localhost:4000).

### Build de production

```bash
npm run build
npm start
```

### Lancer les tests

```bash
npm test
```
