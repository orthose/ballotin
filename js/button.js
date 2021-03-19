/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent
  Contenu: Boutons et champs texte
***********************************/

function authenticate_button() {
	$("#box").html("E-mail de l'électeur :")
	$("#box").append($("<br>"))
	const $email = $("<input>").attr("type", "text")
	$("#box").append($email)
	$("#box").append($("<br>"))

	$("#box").append("Mot de passe :")
	$("#box").append($("<br>"))
	const $passwd = $("<input>").attr("type", "text")
	$("#box").append($passwd)
	let $send_passwd = $("<button>").attr("onClick", "???")
	$send_passwd.append("(r)Envoyer par e-mail")
	$("#box").append($send_passwd)
	$("#box").append("<br>")
}

function template_vote_button(txt_b1, txt_b2) {
	$("#box").append("Code de scrutin :")
	$("#box").append("<br>")
	const $vote = $("<input>").attr("type", "text")
	$("#box").append($vote)
	let $search_vote = $("<button>").attr("onClick", "???")
	$search_vote.append(txt_b1)
	$("#box").append($search_vote)
	$("#box").append("<br>")

	let $apply = $("<button>").attr("onClick", "???")
	$apply.append(txt_b2)
	$("#box").append($apply)
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
	let $apply = $("<button>").attr("onClick", "???")
	$apply.append("Créer un scrutin")
	$("#box").append($apply)
}