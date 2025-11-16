## Section 1
### Explication du workflow ci.yml
Le workflow ci.yml permet de vérifier
- S'il n'y a pas d'erreurs dans le code
- Si le code à bien été formatté
- Si l'ensemble des tests passent

Ces vérifications sont faites via 2 jobs expliqués plus en détails dans la deuxième Section.

### Protection de la branche main
J'utilise ces 2 jobs dans une règle de protection de la branche main lors des pull requests.

Configuration:
![alt text](images/config1.png)
![alt text](images/config2.png)
![alt text](images/config3.png)

Ces règles sont importantes pour vérifier que le code déployé par les développeurs est fonctionnel, mais aussi pour vérifier que le code est stylisé selon les règles du projet.

### Création d'une pull request
- Pour la création d'une pull request, l'utilisateur devra se rendre sur github et faire "Compare & pull request".
- Ensuite l'utilisateur aura une description préremplie grâce au template "pull_request_template.md" à remplir.
- L'éxecution des Github Actions s'effectuerons (ci.yml) et acceptera ou non la pull request.

## Section 2
### Badges de status des pull requests
![alt text](images/badge_pr1.png)

### Explication des jobs effectués

### Required checks et leur rôle

## Section 3
### Prérequis

### Installation

### Variables d'environnement

### Commandes disponibles

### Exemples d'appels API

## Section 4
### Arborescence