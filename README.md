# Gestion des Dettes - Application Angular 
Entrer dans src : c'est où se trouve le projet 
## Connexion

Pour accéder à l’application, utilisez les identifiants suivants :

- **Nom d’utilisateur** : `admin`
- **Mot de passe** : `admin`

> **Note :** Seul cet utilisateur permet de se connecter (authentification mockée).

---

## Fonctionnalités personnalisées

- **Palette marron** : Toute l’interface utilise des couleurs marron pour un rendu élégant et professionnel.
- **Gestion complète des clients, dettes et paiements** :
  - Ajout, modification, suppression de clients et de dettes.
  - Paiement partiel ou total d’une dette, avec calcul automatique du montant restant.
  - Historique détaillé des paiements pour chaque dette.
  - Badge « Payée » pour les dettes soldées.
- **Navigation moderne** :
  - Header et footer stylisés, masqués sur la page de connexion.
  - Bouton de déconnexion accessible partout.
- **Sécurité** :
  - Accès à l’application protégé par une page de connexion.
  - Redirection automatique vers la liste des clients après connexion.
- **Backend mocké** :
  - Utilisation de `json-server` pour simuler une API REST.

---

## Lancement du projet

1. **Installer les dépendances**
   ```bash
   npm install
   ```
2. **Démarrer le backend mocké**
   ```bash
   npx json-server --watch db.json --port 3000
   ```
3. **Démarrer l’application Angular**
   ```bash
   ng serve
   ```
4. **Accéder à l’application**
   - Ouvrez [http://localhost:4200](http://localhost:4200) dans votre navigateur.

---

## Points de personnalisation et complexité

- **Gestion dynamique des paiements** : chaque paiement met à jour en temps réel le montant payé et restant.
- **Historique interactif** : possibilité d’afficher/masquer l’historique des paiements pour chaque dette.
- **Palette de couleurs** : tout le design a été adapté pour une identité visuelle marron, avec des boutons, badges et fonds harmonisés.
- **Navigation conditionnelle** : header/footer masqués sur la page de connexion, présents partout ailleurs.
- **Code structuré et modulaire** : séparation claire des services, modèles, composants, et logique métier.

---

## Remarques pour l’enseignant

Ce projet va au-delà d’un simple CRUD :
- Il gère la logique métier réelle d’une gestion de dettes (paiements partiels, historique, calculs dynamiques).
- L’interface est moderne, responsive, et personnalisée.
- Le code est prêt à être adapté pour une vraie API ou une authentification réelle.

N’hésitez pas à tester toutes les fonctionnalités pour voir la personnalisation et la complexité apportées.
