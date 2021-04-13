/******************************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent 
  Contenu: Code pour le report de bogue
*******************************************/

// Page de report de bogue
function bugReportPage() {
	$("#boxMain").html(`<p style="text-align:justify"> 
		Ce site étant un projet universitaire, 
		tout report de bogue est le bienvenu.
		Vous pouvez expliquer clairement et succinctement
		les conditions dans lesquelles vous avez rencontré
		un problème et nous pourrons tenter d'y remédier.
		</p>`)
	$textarea = $("<textarea rows='5' cols='80'>").append(
		"1. Quel est mon bogue (brièvement) et est-il critique ?\n"
		+	"2. Quel rôle avais-je lorsqu'il est survenu (votant ou organisateur) ?\n"
		+	"3. Quel enchaînement d'actions est susceptible de le déclencher ?\n"
		+	"4. Avez-vous une idée de résolution ou d'amélioration ?\n")
	$("#boxMain").append($textarea)
	$("#boxMain").append($("<br>"))
	$sendBug = $("<button>").append("Envoyer")
	$sendBug.attr("onClick", "bugReportAjax()")
	$("#boxMain").append($sendBug)
}

// Appel Ajax pour enregistrer le bogue
// sur le serveur
function bugReportAjax() {
	$("#boxFooter").html(`<p>
		Merci beaucoup pour votre aide&nbsp;!
		Pour quitter la page cliquez sur la flèche
		de retour ou recharchez la page.
		</p>`)
	$("#boxMain button").attr("disabled", "")
	const bug = $("#boxMain textarea").text()
	$.ajax({
		method: "GET",
		url: "/ballotin/php/bugReport.php",
		data: {"bugtxt": bug}
	}).fail(function(e) {
		console.log("Error: bugReportAjax")
		console.log(e)
	})
}