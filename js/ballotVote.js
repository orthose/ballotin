/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Baptiste Maquet & Maxime Vincent
  Contenu: Page de vote
***********************************/

// num : numéro de scrutin
function voteBallotPage(num, voter) {

	// Nettoyage du footer
	$("#boxFooter").html("")

	// En tête de la boite
	$("#intro").html("<p> Allez voter ! </p>")	
	
	// Boite principale
	$("#boxMain").html("<h3> Électeur : </h3>")	
	
	let votant = $("<div>")
	votant.append("<input type='text' readonly value='"+voter+"'>")
	$("#boxMain").append(votant)
	
	let code = $("<div>")
	code.append("<h3> Code du scrutin : </h3>")
	code.append("<input type='text' readonly value='"+num+"'>")
	$("#boxMain").append(code)
	
	let question = $("<div>")
	question.append("<h3> Question : </h3>")
	let textzone = $("<textarea disabled>")
	textzone.css("width", "70%")
	textzone.css("height", "50px")
	
	question.append(textzone)
	$("#boxMain").append(question)
	
	let choix = $("<div>")
	choix.append("<h3> Question : </h3>")
	let choixBoite = $("<div id='options'>")
	choix.append(choixBoite)
	$("#boxMain").append(choix)
	
	$voteButton = $("<button>").text("Voter !")
	$voteButton.attr("onClick", "voteAjax("+num+", '"+voter+"')")
	$("#boxMain").append($voteButton)

	// Complétion des champs du scrutin par appel ajax
	// On suppose que le numéro de scrutin est valide
	getBallotAjax(num)
}