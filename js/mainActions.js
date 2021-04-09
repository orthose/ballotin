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
	$email.attr("id", "email")
	$("#boxMain").append($email)
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))

	$("#boxMain").append("Mot de passe :")	
	$("#boxMain").append($("<br>"))
	const $passwd = $("<input>").attr("type", "password")
	$passwd.attr("id", "passwd")
	$("#boxMain").append($passwd)
	const $forgotten_passwd = $("<button>").attr("onClick", "sendMail()")
	$forgotten_passwd.append("Mot de passe oublié ?")
	$("#boxMain").append($forgotten_passwd)
	$("#boxMain").append("<br>")
	
	$("#back").css("visibility", "visible")
	// Modif: Revenir en arrière avec une fonction JAVASCRIPT (History de préférence)
	$("#back").attr("href", "index.php")
}

// mode: true -> voter; false -> manager
function template_vote_button(txt_b1, txt_b2, mode) {
	$("#boxMain").append("Code de scrutin :")
	$("#boxMain").append("<br>")
	const $vote = $("<input>").attr("type", "text")
	$vote.attr("id", "numBallot")
	$("#boxMain").append($vote)
	const $search_vote = $("<button>").attr("onClick", "searchBallotAjax("+mode+")")
	$search_vote.append(txt_b1)
	$("#boxMain").append($search_vote)
	$("#boxMain").append("<br>")

	const $apply = $("<button>").attr("onClick", 
		`const num = $("#numBallot").val()
		const voter = $("#email").val()
		if(authenticateAjax() && checkBallotAjax(num)) {voteBallotPage(num, voter)}`)
	$apply.append(txt_b2)
	$("#boxMain").append($apply)
	
	$("#back").css("visibility", "visible")
	// Modif: Revenir en arrière avec une fonction JAVASCRIPT (History de préférence)
	$("#back").attr("href", "index.php")
}

function vote_button() {
	const txt_b1 = "Recherche de mes scrutins"
	const txt_b2 = "Voter"
	template_vote_button(txt_b1, txt_b2, true)
}

function manage_button() {
	const txt_b1 = "Recherche de scrutins à administrer"
	const txt_b2 = "Administrer ce scrutin"
	template_vote_button(txt_b1, txt_b2, false)
}

function create_button() {
	const $apply = $("<button>").attr("onClick",
	 "if (authenticateAjax()) {manageBallot(); createBallot($('#email').val())}")
	$apply.append("Créer un scrutin")
	
	$("#boxMain").append($apply)
	$("#back").css("visibility", "visible")
	// Modif: Revenir en arrière avec une fonction JAVASCRIPT (History de préférence)
	$("#back").attr("href", "index.php")
}
