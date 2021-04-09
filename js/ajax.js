/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent & Baptiste Maquet
  Contenu: Appels Ajax
***********************************/

// Crée un fichier de scrutin sur le serveur
function createBallotAjax(tag) {
	// Récupération des options
	const options = []
	$(".options").each(function() {
		options.push(($(this).val()).trim())
	})

	// Récupération des votantset procurations
  let voters
  if (votersAnonymous) { // erreur à voir
    voters = "all"
  }
  else {
    voters = {}
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
  }

  // Il faut au moins un votant 
  if (voters !== "all" && Object.keys(voters).length <= 0) {
    $("#boxFooter").html("<p class='error'> Vous n'avez pas invité de de votants au scrutin ! </p>")
  }
  // Il faut au moins 2 choix de réponses
  else if (options.length < 2) {
    $("#boxFooter").html("<p class='error'> Votre scrutin ne comporte pas assez de choix de vote ! </p>")
  }
  // On crée le scrutin
  else {
	 $.ajax({
      method: "GET",
      url: "/ballotin/php/createBallot.php",
      data: {
    	 "organiser": $("#organiser").val(),
    	 "question": ($("textarea").val()).trim(),
    	 "options": options,
    	 "voters": voters
      }
    }).done(function(res) {
      // Afficher le numéro de scrutin
      $("#boxFooter").html(res)
    }).fail(function(e) {
      console.log("Error: createBallotAjax")
      console.log(e)
    })

    // On disabled tout les éléments de création du scrutin
    $(tag).attr("disabled", "")
    $("textarea").attr("disabled", "")
    $("#addVoter").val("")
    $("#addVoter").attr("readonly", "")
    $("#addChoice").val("")
    $("#addChoice").attr("readonly", "")
    $("select").attr("disabled", "")
    $("input[type='checkbox']").attr("disabled", "")
    $("#boxMain button").attr("disabled", "")
  }
}

// Sélectionne une liste prédéfinie de votants
function selectListVotersAjax(tag) {
  // Récupération de la valeur de la liste
  const listVoters = $(tag).children("option:selected").val()
  // Réinitialisation de la variable globale
  votersAnonymous = false

  // L'utilisateur choisi un à un les votants
  if (listVoters === "custom" ) {
    $(".voters").parent().parent().remove()
  }
  // N'importe qui peut voter
  else if (listVoters === "anonymous") {
    $(".voters").parent().parent().remove()
    votersAnonymous = true
  }
  // Tous les autres cas sont gérés par PHP
  else {
    $.ajax({
      method: "GET",
      url: "/ballotin/php/selectListVoters.php",
      dataType: "json",
      data: {"listVoters": listVoters}
    }).done(function(array) {
      // Suppression des votants actuels
      $(".voters").parent().parent().remove()
      // Ajout de chacun des votants
      array.forEach(function(x) {
        $("#addVoter").val(x)
        addVoter()
      })
    }).fail(function(e) {
      console.log("Error: selectListVotersAjax")
      console.log(e)
    })
  }
}

// Recherche de scrutins
function searchBallotAjax(mode) {
  const organiser = $("#email").val()
  if (organiser === "") {
    $("#boxFooter").html("<p class='error'> Veuillez entrer votre login. <p>")
  } 
  else {
    $.ajax({
      method: "GET",
      url: "/ballotin/php/searchBallot.php",
      dataType: "json",
      data: {
        "organiser": organiser,
        "mode": mode
      }
    }).done(function(array) {
      $table = $("<table>").append("<tr><th> Organisateur </th><th> Numéro de scrutin </th></tr>")
      array.forEach(function([org, num]) {
        $table.append("<tr><td>"+org+"</td><td>"+num+"</td></tr>")
      })
      $("#boxFooter").html($table)
    }).fail(function(e) {
      console.log("Error: searchBallotAjax")
      console.log(e)
    })
  }
}

// Vérifie que le numéro de scrutin est valide
function checkBallotAjax(num) {
  let res = false
  if (num === "") {
    $("#boxFooter").html("<p class='error'> Numéro de scrutin invalide. </p>")
  }
  else {
    $.ajax({
      method: "GET",
      url: "/ballotin/php/checkBallot.php",
      // Nécessaire car modification de variable
      // (Bogue horrible à trouver)
      async: false,
      dataType: "json",
      data: {"numBallot": num}
    }).done(function(bool) {
      res = bool
      if (!res) {
        $("#boxFooter").html("<p class='error'> Numéro de scrutin invalide. </p>")
      }
    }).fail(function(e) {
      console.log("Error: checkBallotAjax")
      console.log(e)
    })
  }

  return res
}

// Récupération d'un scrutin dont numéro donné
// et valide (pas de test) 
function getBallotAjax(num) {
  $.ajax({
    method: "GET",
    url: "/ballotin/php/getBallot.php",
    dataType: "json",
    data: {"numBallot": num}
  }).done(function(ballot) {
    // Remplissage de la page de vote
    $("textarea").text(ballot["question"])
    ballot["options"].forEach(function(x) {
      $("#options").append("<input name='options' type='radio' id='"+x+"'value='"+x+"'>")
      $("#options").append("<label for='"+x+"'> "+x+" </label>")
    })
  }).fail(function(e) {
    console.log("Error: getBallotAjax")
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
		  $("#boxFooter").html("<p class='error'> Mauvais login ou mot de passe ! <p>")
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
		$("#boxFooter").html("<p class='error'> Mot de passe trop court la longueur doit au moins être de 8 caractères. </p>")
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
			$("#boxFooter").html("<p> Une erreur a eu lieu pendant l'envoi du mail </p>")		
		}
	}).fail(function(e) {
    		console.log("Error: sendMail")
    		console.log(e)
 	})
}
