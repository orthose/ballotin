/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent & Baptiste Maquet
  Contenu: Appels Ajax
***********************************/

// Crée un fichier de scrutin sur le serveur
function createBallotAjax() {
	// Récupération des options
	const options = []
	$(".options").each(function() {
		options.push(($(this).val()).trim())
	})

	// Récupération des votantset procurations
	const voters = {}
	const powers = $("input[type='checkbox']")
	let j = 0
	$(".voters").each(function() {
		let npow = 0
		if ($(powers[j]).is(":checked")) {
			npow++
		}
		j++
		if ($(powers[j]).is(":checked")) {
			npow++
		}
		j++
		voters[($(this).val()).trim()] = npow
	})

	$.ajax({
    method: "GET",
    url: "/ballotin/php/createBallot.php",
    data: {
    	"organiser": $("#organiser").val(),
    	"question": ($("textarea").val()).trim(),
    	"options": options,
    	"voters": voters
    }
  }).done(function(e) {
    // Afficher le numéro de scrutin
    $("#boxMain").append(e)
  }).fail(function(e) {
    console.log("Error: createBallotAjax")
    console.log(e)
  })
}

// Vérifie que l'utilisateur est valide
function authenticateAjax() {
	// Récupération du login et password
	const login = $("#email").val()
	const passwd = $("#passwd").val()
	let res = false
	
	$.ajax({
    method: "GET",
    url: "/ballotin/php/authenticate.php",
    // Nécessaire car modification de variable
    // (Bogue horrible à trouver)
    async: false,
    dataType: "json",
    data: {
    	"login": login,
    	"passwd": passwd
    }
  }).done(function(bool) {
   	res = bool

   	// L'authentification a échouée
   	if (!res) {
		$("#boxFooter").html("<p><strong> Mauvais login ou mot de passe !<strong><p>")
		$("#boxFooter").css("color", "rgb(220, 0, 0)")
		$("#boxFooter").css("font-size", "2em")
   	}
  }).fail(function(e) {
    console.log("Error: authenticateAjax")
    console.log(e)
  })
	return res
}

function createUserAjax() {
	// Récupération du login et du password
	const login = $("#email").val()
	const passwd = $("#passwd").val()

	$.ajax({
    method: "GET",
    url: "/ballotin/php/createUser.php",
    dataType: "json",
    data: {
    	"login": login,
    	"passwd": passwd
    }
  }).done(function(res) {
  	if (res === 0) {
		window.location.assign("index.php?accountCreated=true")
  	}
   	else if (res === -1) {
		$("#boxFooter").html("<p> Mot de passe trop court la longueur doit au moins être de 8 charactères </p>")
   	}
   	else if (res === -2) {
   		$("#boxFooter").html("<p> Le format du mail est invalide </p>")
   	}
   	else if (res === -3) {
   		$("#boxFooter").html("<p> Le compte existe déja </p>")		
   	}
   	else {
		$("#boxFooter").html("<p> Une erreur indéfini a eu lieu </p>")		
   	}
  }).fail(function(e) {
    console.log("Error: createUserAjax")
    console.log(e)
  })
}

// Send mail
function sendMail() {
	// Récupération du login et du password
	const login = $("#email").val()

	$.ajax({
    		method: "GET",
   		url: "/ballotin/php/mail.php",
    		dataType: "json",
   		data: {
    			"mail": login,
    		}
  	}).done(function(res) {
		if(res) {
			$("#boxFooter").html("<p> Un mail à été envoyé </p>")	
		} else {
			$("#boxFooter").html("<p> Une erreur a eu lieu pendant l'envoie du mail </p>")		
		}
	}).fail(function(e) {
    		console.log("Error: sendMail")
    		console.log(e)
 	})
}
