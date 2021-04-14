/******************************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent & Baptiste Maquet
  Contenu: Appels Ajax pour le management
  et le vote des scrutins
*******************************************/

// Recherche de scrutins selon 2 modes possibles
// mode = true: Recherche de scrutins pours lesquels voter
// mode = false: Recherche de scutins à administrer
function searchBallotAjax(mode) {
  const organiser = $("#email").val()
  if (organiser === "") {
    $("#boxFooter").html("<p class='error'> Veuillez entrer votre login. <p>")
  } 
  else {
    $.ajax({
      method: "GET",
      url: serverURL + "/ballotin/php/searchBallot.php",
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
      url: serverURL + "/ballotin/php/checkBallot.php",
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

// Récupération d'un scrutin dont numéro valide
function getBallotAjax(num) {
  $.ajax({
    method: "GET",
    url: serverURL + "/ballotin/php/getBallot.php",
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
    // Si le scrutin est fermé on ne peut plus le fermer
    if (ballot["closed"]) { 
      $($("aside button")[5]).attr("disabled", "")
    }
  }).fail(function(e) {
    console.log("Error: getBallotAjax")
    console.log(e)
  })
}

// Ferme un scrutin dont numéro valide
// Puis décrypte les résultats du scrutin
function closeBallotAjax(num) {
  // Pour renvoyer les résultats décryptés
  function pushResultsAjax(arrayDecrypted) {
    $.ajax({
      method: "GET",
      url: serverURL + "/ballotin/php/pushResultsBallot.php",
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
    url: serverURL + "/ballotin/php/closeBallot.php",
    dataType: "json",
    data: {"numBallot": num}
  }).done(function(array) {
    if (array[0]) {
      $("#boxFooter").html("<p class='error'> Le scrutin a déjà été fermé. </p>")
    }
    else {
      // Décryptage des résultats
      const arrayDecrypted = array[1].map(decrypt)
      // Enregistrement des résultats
      pushResultsAjax(arrayDecrypted)
    }
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
    url: serverURL + "/ballotin/php/resultsBallot.php",
    dataType: "json",
    data: {"numBallot": num}
  }).done(function(res) {
    if (res["removed"]) {
      $("#boxFooter").html("<p class='error'> Le scrutin a été détruit par l'organisateur. </p>")
    }
    else {
      // Affichage des résultats
      let rate = (res["entries"] / res["total"]) * 100.
      const $table = $("<table id='resultTable'>")
      $table.append("<tr> <th> Nombre de participation(s) </th><td> "+res["entries"]+" </td></tr>")
      $table.append("<tr> <th> Pourcentage de participation </th><td> "+rate+"% </td></tr>")
      if (res["results"] === []) {
        $table.append("<tr><td> Le scrutin n'est pas encore clos. </td></tr>")
      }
      // Affichage de tous les résultats pour chaque option
      else {
        for (let option in res["results"]) {
          let absolute = res["results"][option]
          // ATTENTION: Cardinal sur le nombre de votes effectifs
          // donc pas sur res["total"]
          rate = (absolute / res["entries"]) * 100.
          $table.append("<tr> <th> "+option+" </th><td> "+absolute+" vote(s) soit "+rate+"% </td></tr>")
        }
      }
      $("#boxFooter").html($table)
    }
  }).fail(function(e) {
    console.log("Error: resultsBallotAjax")
    console.log(e)
  })
}

// Suppression d'un scrutin dont numéro valide
function removeBallotAjax(num) {
  $.ajax({
    method: "GET",
    url: serverURL + "/ballotin/php/removeBallot.php",
    data: {"numBallot": num}
  }).fail(function(e) {
    console.log("Error: removeBallotAjax")
    console.log(e)
  })
  // On désactive certains boutons qui ne peuvent
  // plus être utilisés
  $($("aside button")[2]).attr("disabled", "")
  $($("aside button")[3]).attr("disabled", "")
  $($("aside button")[4]).attr("disabled", "")
  $($("aside button")[5]).attr("disabled", "")
}

// Permet de voter à un scrutin
// num: numéro de scrutin valide
// voter: électeur désirant voter
function voteAjax(num, voter) {

	// Récupération du choix de vote
	const option = $("input[name='options']:checked").val()
	if (option !== undefined) {
    $.ajax({
      method: "GET",
      url: serverURL + "/ballotin/php/vote.php",
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
          $("#boxFooter").html("<p class='error'> Votre vote n'a pas été pris en compte&nbsp;! </p>")
        }
        $("#boxFooter").append("<p> Il vous reste "+res[1]+" procuration(s) pour ce scrutin. </p>")
      }).fail(function(e) {
        console.log("Error: voteAjax")
        console.log(e)
    })
  }
}