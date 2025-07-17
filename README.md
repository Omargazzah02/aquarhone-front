 Pour démarrer le projet :
 Exécuter la commande npm install pour installer les dépendances.
 Démarer le projet avec npm run dev 

 IMPORTANT  : Modifier l'attribut role de l'utilisateur en admin dans la base de données , puis se reconnecter pour accéder au panneau d'administration.

Architecture : 
C’est une architecture Next.js moderne utilisant l’App Router, où le dossier app gère les pages et routes avec un routage basé sur les dossiers, components contient les éléments UI réutilisables, et services regroupe la logique métier et les appels API.



aquarhone-front/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── contexts/
│   └── services/
├── .gitignore
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
