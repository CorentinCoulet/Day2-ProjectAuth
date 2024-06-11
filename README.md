# Page de connexion et page sécurisée

Ce projet consiste en une page de connexion et une page "sécurisée" accessible uniquement après une connexion réussie. Il n'y a qu'un seul utilisateur.

## Fonctionnalités

- **Page de connexion** : Les utilisateurs doivent saisir leur login et mot de passe pour se connecter. Les informations de connexion sont vérifiées côté serveur.
- **Page sécurisée** : Une fois connecté, l'utilisateur est redirigé vers une page sécurisée où il voit un message indiquant qu'il est connecté.

## Contraintes

- **Framework CSS** : Utilisation de Bootstrap ou d'un autre framework CSS. Les sources doivent être placées dans le dossier public.
- **Gestion des mots de passe** : Les mots de passe sont hachés à l'aide de l'algorithme SHA1 de CryptoJS.
