# Introduction
Projet de Programmation Web L3 Informatique Université Paris-Saclay

# Déploiement

* Création du fichier de mots de passe 
`htpasswd -c secret/passwd.txt dummy`
* Suppression de l'utilisateur inutile
`htpasswd -D secret/passwd.txt dummy`
* PHP doit avoir les droits en écriture
`chmod 777 secret/`
