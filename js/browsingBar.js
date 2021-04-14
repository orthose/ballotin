/**************************************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteurs: Maxime Vincent & Baptiste Maquet
  Contenu: Barre de navigation avec boutons
  d'accès rapide aux différentes actions possibles
***************************************************/

// Création de la barre de navigation
function browsingBar(organiser) {

	// L'évènement des boutons utilisant le numéro de scrutin
	// est changé par la suite lorsqu'on crée le scrutin
	const errorFunction = function() {
		$('#boxFooter').html("<p class='error'> Veuillez créer un scrutin. </p>")
	}

	$("aside").html("<button onClick='createBallotAjax(this)'> Créer le scrutin </button>")
	$newButton = $("<button>").append("Nouveau scrutin")
	$newButton.on("click", function() {
		createBallotPage(organiser)
	})
	$("aside").append($newButton)
	$("aside").append("<button> Inviter les participants </button>")
	$voteButton = $("<button>").append("Voter")
	$voteButton.on("click", errorFunction)
	$("aside").append($voteButton)
	$statsButton = $("<button>").append("Afficher la participation")
	$statsButton.on("click", errorFunction)
	$("aside").append($statsButton)
	$closeButton = $("<button>").append("Fermer le scrutin")
	$closeButton.on("click", errorFunction)
	$("aside").append($closeButton)
	$removeButton = $("<button>").append("Détruire le scrutin")
	$removeButton.on("click", errorFunction)
	$("aside").append($removeButton)
	$("aside").append("<button onClick='window.location.assign(\"index.php\")'> Exit </button>")

	$("aside").css("left", "-200")
	$("aside").animate({left: '0'})
	$("aside").css("visibility", "visible")
}

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
    // Dans le cas où l'on part voter depuis la page de
    // création de scrutin on ne doit plus pouvoir
    // inviter les participants
    $($("aside button")[2]).attr("disabled", "")
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