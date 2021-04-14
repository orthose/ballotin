/******************************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent & Baptiste Maquet
  Contenu: Appels Ajax pour la gestion 
  des utilisateurs par le système
*******************************************/

// Vérifie que l'utilisateur est valide
function authenticateAjax() {
	// Récupération du login et password
	const login = $("#email").val()
	const passwd = $("#passwd").val()
	let res = false
	
	$.ajax({
    method: "GET",
    url: serverURL + "/ballotin/php/authenticate.php",
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
		  $("#boxFooter").html("<p class='error'> Mauvais login ou mot de passe&nbsp;! <p>")
   	}
  }).fail(function(e) {
    console.log("Error: authenticateAjax")
    console.log(e)
  })
	return res
}

function createUserAjax(override) {
	//console.log("start createUser")
	// Récupération du login et du password
	const login = $("#email").val()
	const passwd = $("#passwd").val()

	$.ajax({
    method: "GET",
    url: serverURL + "/ballotin/php/createUser.php",
    dataType: "json",
    data: {
    	"login": login,
    	"passwd": passwd,
			"override": override
    }
  }).done(function(res) {
		//console.log("res createUser")
  	if (res === 0) {
		  if(override) {
			 //console.log("override")
			 window.location.assign("index.php?passwordChanged=true")
		  } else {
        //console.log("accountCreated")
        window.location.assign("index.php?accountCreated=true")
		  }
  	}
   	else if (res === -1) {
      $("#boxFooter").html("<p class='error'> Mot de passe trop court, la longueur doit au moins être de 8 caractères. </p>")
   	}
   	else if (res === -2) {
   		$("#boxFooter").html("<p class='error'> Le format du mail est invalide. </p>")
   	}
   	else if (res === -3) {
   		$("#boxFooter").html("<p class='error'> Le compte existe déja. </p>")		
   	}
   	else {
		  $("#boxFooter").html("<p class='error'> Une erreur indéfinie a eu lieu. </p>")		
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

	if (login === "") {
		$("#boxFooter").html("<p class='error'> Veuillez entrer votre login. </p>")
	}
	else {
		$("#boxFooter").html("<p> Envoi du mail en cours... </p>")	

		$.ajax({
			method: "GET",
			url: serverURL + "/ballotin/php/mail.php",
			dataType: "json",
			data: {
				"mail": login,
				"sess_id": sessionID
			}
		}).done(function(res) {
			if(res) {
				changePasswordPage(login)	
			} else {
				$("#boxFooter").html("<p class='error'> Une erreur a eu lieu pendant l'envoi du mail. </p>")		
			}
		}).fail(function(e) {
			console.log("Error: sendMail")
			console.log(e)
		})
	}
}

// Vérifie le token
function checkToken() {
	//console.log("start checkToken")
	const token = $("#token").val()

	let bool = false

	$.ajax({
		method: "GET",
		url: serverURL + "/ballotin/php/checkToken.php",
		async: false,
		dataType: "json",
		data: {
			"token": token,
			"sess_id": sessionID 
		}
	}).done(function(res) {
		//console.log("res checkToken")
		//console.log(res)
		// Le token est incorrecte
		if(!res) {
			$("#boxFooter").html("<p class='error'> Token incorrect&nbsp;! </p>")		
		}

		bool = res		
	}).fail(function(e) {
		console.log("Error: checkToken")
		console.log(e)
	})

	return bool
}

// Invite les participants
function inviteAll(code) {
	let voters = []

	// On récupère les participants
	$(".voters").each(
		function(){
			const val = $(this).val()
			voters.push(val)
		}
		)
	
	// On envoie les mails
	$.ajax({
		method: "GET",
		url: serverURL + "/ballotin/php/inviteAll.php",
		dataType: "json",
		data: {"voters": voters, "code": code}
	}).done(function(res) {
		if (!res) {
			$("#boxFooter").html("<p class='error'> Erreur lors de l'invitation des participants. </p>")
		}
	}).fail(function(e) {
		console.log("Error: InviteAll")
		console.log(e)
	})
}