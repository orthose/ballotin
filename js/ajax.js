/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent 
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
   	// L'authentification a échoué
   	let color = "rgb(255,0,0)"
   	// L'authentification a réussi
   	if (res) {
   		color = "rgb(0,255,0)"
   	}
   	// TODO: Le vert ne s'affiche pas
   	$("#email").css("background", color)
    $("#email").css("transition", "background 3s")
    $("#passwd").css("background", color)
    $("#paswwd").css("transition", "background 3s")
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
  		$("#boxFooter").
  	}
   	else if (res === -1) {
   		$("#boxFooter").
   	}
   	else if (res === -2) {

   	}
   	else if (res === -3) {
   		
   	}
   	else {

   	}
  }).fail(function(e) {
    console.log("Error: createUserAjax")
    console.log(e)
  })
}