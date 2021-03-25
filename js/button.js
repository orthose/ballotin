/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent
  Contenu: Boutons et champs texte
***********************************/

function authenticate_button() {
	$("#boxMain").html("E-mail de l'électeur :")
	$("#boxMain").append($("<br>"))
	const $email = $("<input>").attr("type", "text")
	$("#boxMain").append($email)
	$("#boxMain").append($("<br>"))

	$("#boxMain").append("Mot de passe :")
	$("#boxMain").append($("<br>"))
	const $passwd = $("<input>").attr("type", "text")
	$("#boxMain").append($passwd)
	let $send_passwd = $("<button>").attr("onClick", "???")
	$send_passwd.append("(r)Envoyer par e-mail")
	$("#boxMain").append($send_passwd)
	$("#boxMain").append("<br>")
}

function template_vote_button(txt_b1, txt_b2) {
	$("#boxMain").append("Code de scrutin :")
	$("#boxMain").append("<br>")
	const $vote = $("<input>").attr("type", "text")
	$("#boxMain").append($vote)
	let $search_vote = $("<button>").attr("onClick", "???")
	$search_vote.append(txt_b1)
	$("#boxMain").append($search_vote)
	$("#boxMain").append("<br>")

	let $apply = $("<button>").attr("onClick", "???")
	$apply.append(txt_b2)
	$("#boxMain").append($apply)
}

function vote_button() {
	const txt_b1 = "Recherche de mes scrutins"
	const txt_b2 = "Voter"
	template_vote_button(txt_b1, txt_b2)
}

function manage_button() {
	const txt_b1 = "Recherche de scrutins à administrer"
	const txt_b2 = "Administrer ce scrutin"
	template_vote_button(txt_b1, txt_b2)
}

function create_button() {
	let $apply = $("<button>").attr("onClick", "createBallotPage()")
	$apply.append("Créer un scrutin")
	$("#boxMain").append($apply)
}