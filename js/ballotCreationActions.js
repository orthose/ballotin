/******************************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteur: Maxime Vincent & Baptiste Maquet
  Contenu: Appels Ajax pour la 
  création de scrutin
*******************************************/

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
    $("#boxFooter").html("<p class='error'> Vous n'avez pas invité de de votants au scrutin&nbsp;! </p>")
  }
  // Il faut au moins 2 choix de réponses
  else if (options.length < 2) {
    $("#boxFooter").html("<p class='error'> Votre scrutin ne comporte pas assez de choix de vote&nbsp;! </p>")
  }
  // On crée le scrutin
  else {
  	const organiser = $("#organiser").val()
	 	$.ajax({
      method: "GET",
      url: serverURL + "/ballotin/php/createBallot.php",
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
      localStorage.setItem("privkey" + num, privkey)

      // Afficher le numéro de scrutin
      $("#boxFooter").html("<p class='good'>Le numéro de votre scrutin est&nbsp;: <b>"+num+"</b></p>")

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
      url: serverURL + "/ballotin/php/selectListVoters.php",
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