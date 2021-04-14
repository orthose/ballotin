# Introduction
Projet de Programmation Web L3 Informatique Université Paris-Saclay

# Déploiement

* Création du fichier de mots de passe 
`touch secret/passwd.txt`
* PHP doit avoir les droits en écriture
`chmod 557 secret/passwd.txt`

* Création du fichier de report de bogue
`echo "[]" > secret/bug-report.json`
* PHP doit avoir les droits en écriture
`chmod 557 secret/bug-report.json`

* Personnalisation de l'url du serveur
1. Ajouter l'adresse dans la variable globale serverURL
du fichier index.php pour permettre les appels AJAX
(sans slash à la fin)
2. Ajouter l'adresse dans le href du message
de mail du fichier php/inviteAll.php

* Si les .htaccess ne fonctionnent pas aller
dans /etc/apache2/apache2.conf et corriger
AllowOverride None -> AllowOverride All

* Si vous ne voulez pas que les utilisateurs
aient accès à certaines listes de mails
veuillez commenter les lignes <option>
correspondantes du fichier js/ballotCreationPage.js
