/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteurs: Baptiste Maquet
  Contenu: Page de création de compte
***********************************/

function changePasswordPage(userEmail) {
	$("aside").empty()

	$("#intro").html("Changer votre mot de passe")

	$("#boxMain").html("E-mail :")
	$("#boxMain").append($("<br>"))

	const $email = $("<input>").attr("type", "text")
	
	$email.val(userEmail)
	$email.attr("readonly", "")
	$email.attr("id", "email")
	$("#boxMain").append($email)
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))

	$("#boxMain").append("Token :")
	$("#boxMain").append($("<br>"))
	const $token = $("<input>").attr("type", "text")
	$token.attr("id", "token")
	$("#boxMain").append($token)
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))

	$("#boxMain").append("Nouveau mot de passe :")
	$("#boxMain").append($("<br>"))
	const $passwd = $("<input>").attr("type", "password")
	$passwd.attr("id", "passwd")
	$("#boxMain").append($passwd)
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))
	$("#boxMain").append($("<br>"))

	const $create = $("<button id=createButton> Changer de mot de passe </button>")
	$create.attr("onClick", "if(checkToken()) {createUserAjax(true)}")
	$("#boxMain").append($create)

	$("#back").css("visibility", "visible")
	// Modif: Revenir en arrière avec une fonction JAVASCRIPT (History de préférence)
	$("#back").attr("href", "index.php")

	$("#boxFooter").html("<p> Un mail contenant un token vous a été envoyé </p>")
}