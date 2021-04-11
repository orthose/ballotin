/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent & Baptiste Maquet
  Contenu: Appels Ajax
***********************************/

// Active les boutons de la barre de navigation
function activateBrowsingBar(num, voter) {
  // Suppression des évènements enregistrés précédemment
  // pour certains boutons
  for (let i = 3; i <= 6; i++) {
    $($("aside button")[i]).prop('onclick', null).off('click');
  }
  // Inviter les participant
  $($("aside button")[2]).on("click", function() {
    inviteAll(num)	
    $(this).attr("disabled", "")
  })
  // Permettre l'accès rapide au vote
  $($("aside button")[3]).on("click", function() {
    voteBallotPage(num, voter)
    $(this).attr("disabled", "")
  })
  // Bouton des résultats de vote et taux de participation
  $($("aside button")[4]).on("click", function() {
    resultsBallotAjax(num)
  })
  // Fermeture du scrutin
  $($("aside button")[5]).on("click", function() {
    closeBallotAjax(num)
    $(this).attr("disabled", "")
    $("#boxFooter").html("<p> Fermeture du scrutin "+num+" réussie. </p>")
  })
  // Suppression du scrutin
  $($("aside button")[6]).on("click", function() {
    removeBallotAjax(num)
    $(this).attr("disabled", "")
    $("#boxFooter").html("<p> Suppression du scrutin "+num+" réussie. </p>")
  })
}

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
    	// Un électeur peut voter au moins une fois
		  let npow = 1
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
  	const organiser = $("#organiser").val()
	 	$.ajax({
      method: "GET",
      url: "/ballotin/php/createBallot.php",
      dataType: "json",
      data: {
    	 "organiser": organiser,
    	 "question": ($("textarea").val()).trim(),
    	 "options": options,
    	 "voters": voters
      }
    }).done(function(res) {
      const num = res["numBallot"]
      const privkey = res["privkey"]
      // Enregistrement de la clé privée en local
      localStorage.setItem("privkey", privkey)

      // Afficher le numéro de scrutin
      $("#boxFooter").html("<p class='good'>Le numéro de votre scrutin est : <b>"+num+"</b></p>")

      // Activation de la barre de navigation
      activateBrowsingBar(num, organiser)

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
      $table = $("<table id='numberTable'>").append("<tr><th> Organisateur </th><th> Numéro de scrutin </th></tr>")
      array.forEach(function([org, num]) {
        $table.append("<tr><td>"+org+"</td><td class='number'><button onClick='$(\"#numBallot\").val("+num+")'>"+num+"</button></td></tr>")
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
    // Enregistrement de la clé publique
    localStorage.setItem("pubkey", ballot["pubkey"])
    // Remplissage de la page de vote
    $("textarea").text(ballot["question"])
    ballot["options"].forEach(function(x) {
    	$option = $("<input name='options'type='radio'>")
    	$option.attr("id", x)
    	$option.attr("value", x)
      $("#options").append($option)
      $label = $("<label>")
      $label.attr("for", x)
      $label.append(x)
      $("#options").append($label)
    })
  }).fail(function(e) {
    console.log("Error: getBallotAjax")
    console.log(e)
  })
}

// Ferme un scrutin dont numéro valide
// closeBallot.php ne renvoie rien
function closeBallotAjax(num) {
  // Pour renvoyer les résultats décryptés
  function pushResultsAjax(arrayDecrypted) {
    $.ajax({
      method: "GET",
      url: "/ballotin/php/pushResultsBallot.php",
      data: {
        "numBallot": num,
        "results": arrayDecrypted
      }
    }).fail(function(e) {
      console.log("Error: pushResultsAjax")
      console.log(e)
    })
  }

  $.ajax({
    method: "GET",
    url: "/ballotin/php/closeBallot.php",
    dataType: "json",
    data: {"numBallot": num}
  }).done(function(array) {
    // Décryptage des résultats
    arrayDecrypted = array.map(decrypt)
    // Enregistrement des résultats
    pushResultsAjax(arrayDecrypted)
  }).fail(function(e) {
    console.log("Error: closeBallotAjax")
    console.log(e)
  })
}

// Permet d'obtenir la participation et les
// résultats d'un scrutin dont numéro valide
function resultsBallotAjax(num) {
  $.ajax({
    method: "GET",
    url: "/ballotin/php/resultsBallot.php",
    dataType: "json",
    data: {"numBallot": num}
  }).done(function(res) {
    // Affichage des résultats
    let rate = (res["entries"] / res["voters"]) * 100.
    $table = $("<table>")
    $table.append("<tr> <th> Nombre de participation(s) </th><td> "+res["entries"]+" </td></tr>")
    $table.append("<tr> <th> Pourcentage de participation </th><td> "+rate+"% </td></tr>")
    if (res["results"] === []) {
      $table.append("<tr><td> Le scrutin n'est pas encore clos. </td></tr>")
    }
    // Affichage de tous les résultats pour chaque option
    else {
      for (let option in res["results"]) {
        let absolute = res["results"][option]
        rate = (absolute / res["voters"]) * 100.
        $table.append("<tr> <th> "+option+" </th><td> "+absolute+" vote(s) soit "+rate+"% </td></tr>")
      }
    }
    $("#boxFooter").html($table)
  }).fail(function(e) {
    console.log("Error: resultsBallotAjax")
    console.log(e)
  })
}

// Suppression d'un scrutin dont numéro valide
// Ne renvoie rien
function removeBallotAjax(num) {
  $.ajax({
    method: "GET",
    url: "/ballotin/php/removeBallot.php",
    data: {"numBallot": num}
  }).fail(function(e) {
    console.log("Error: removeBallotAjax")
    console.log(e)
  })
}

// Permet de voter à un scrutin
// num : numéro de scrutin valide
// voter : électeur désirant voter
function voteAjax(num, voter) {

	// Récupération du choix de vote
	const option = $("input[name='options']:checked").val()
	if (option !== undefined) {
    $.ajax({
      method: "GET",
      url: "/ballotin/php/vote.php",
      dataType: "json",
      data: {
        "numBallot": num,
        "voter": voter,
        "option": crypt(option)
      }
    }).done(function(res) {
      if (res[0]) {
        $("#boxFooter").html("<p> Votre vote a bien été pris en compte. </p>")
  		    // On disabled le bouton de vote
  		    if (res[1] === 0) {
            $("#boxMain button").attr("disabled", "")
          }
        }
        else {
          // On disabled le bouton de vote
          $("#boxMain button").attr("disabled", "")
          $("#boxFooter").html("<p class='error'> Votre vote n'a pas été pris en compte ! </p>")
        }
        $("#boxFooter").append("<p> Il vous reste "+res[1]+" procuration(s) pour ce scrutin. </p>")
      }).fail(function(e) {
        console.log("Error: voteAjax")
        console.log(e)
    })
  }
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
    url: "/ballotin/php/createUser.php",
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
   		url: "/ballotin/php/mail.php",
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
   	url: "/ballotin/php/checkToken.php",
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
			$("#boxFooter").html("<p class='error'> Token incorrect ! </p>")		
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
      url: "/ballotin/php/inviteAll.php",
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

