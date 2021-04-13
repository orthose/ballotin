/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteurs: Baptiste Maquet
  Contenu: Page de création de compte
***********************************/

function createAccountPage() {
	$("#boxFooter").html("")
	$("aside").empty()
	$("aside").css("left", "-210px")

	$("#intro").html("Creér votre compte pour pouvoir utiliser la plateforme ballotin")

	$("#boxMain").html("E-mail :")
	$("#boxMain").append($("<br>"))
	const $email = $("<input>").attr("type", "text")
	$email.attr("id", "email")
	$("#boxMain").append($email)
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))

	$("#boxMain").append("Mot de passe :")
	$("#boxMain").append($("<br>"))
	const $passwd = $("<input>").attr("type", "password")
	$passwd.attr("id", "passwd")
	$("#boxMain").append($passwd)
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))

	const $create = $("<button id=createButton> Créer mon compte </button>")
	$create.attr("onClick", "createUserAjax(false)")
	$("#boxMain").append($create)

	$("#back").css("visibility", "visible")
	// Modif: Revenir en arrière avec une fonction JAVASCRIPT (History de préférence)
	$("#back").attr("href", "index.php")
}