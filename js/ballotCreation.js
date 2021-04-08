/**********************************
  Projet Programmation Web
  L3 Info Université Paris-Saclay
  Auteurs: Maxime Vincent 
  & Baptiste Maquet
  Contenu: Boutons et champs texte
***********************************/

// Bar de navigation
function manageBallot() {
	$("aside").html(
		`<button onClick='createBallotAjax();
		$(this).attr("disabled", "")'> 
		Créer le scrutin </button>`)
	$("aside").append("<button> Inviter les perticipants </button>")
	$("aside").append("<button> Voter </button>")
	$("aside").append("<button> Afficher la participation </button>")
	$("aside").append("<button> Fermer le scrutin </button>")
	$("aside").append("<button> Détruire le scrutin </button>")
	$("aside").append("<button> Exit </button>")

	$("aside").css("left", "-200")
	$("aside").animate({left: '0'})
	$("aside").css("visibility", "visible")
}

function createBallot() {
	// Liste des champs du scrutin
	const $list = $("<ol>")

	// 1. Organisateur
	const $organiser = $("<li>").append("<h3>Organisateur :</h3>")
	$organiser.attr("class", "col")
	//$organiser.append("<br>")
	const $email = $("<input>").attr("type", "text")
	$email.attr("readonly", "")
	$email.attr("id", "organiser")
	$organiser.append($email)
	$list.append($organiser)
	//const $passwd = $("<input>").attr("type", "text")
	//$list.append($passwd)

	// 2. Question
	const $question = $("<li>").append("<h3>Question :</h3>")
	$question.attr("class", "col")
	//$question.append("<br>")
	const $text = $("<textarea>")
		.append("Êtes-vous d'accord pour ... ?")
	$question.append($text)
	$list.append($question)

	// 3. Choix de réponse
	const $options = $("<li>").append("<br>")
	$options.append("Options")
	$options.append("<br>")
	const $trashChoice = $("<button> - </button>").attr("onClick", "removeChoice(this)")
	$trashChoice.attr("class", "trash")

	const array = ["Oui", "Non", "Abstention"]
	array.forEach(function (x) {
		const $ch = $("<input>").attr("type", "text")
		$ch.attr("value", x)
		$ch.attr("readonly", "")
		$ch.addClass("options")
		$options.append($ch)
		$options.append($trashChoice.clone().add("<br>"))
	})

	const $new = $("<input>").attr("type", "text")
	const $addChoice = $("<button> + </button>").attr("onClick", "addChoice(this)")
	$addChoice.attr("class", "add")
	$options.append($new)
	$options.append($addChoice)
	$list.append($options)

	// 4. Votants participant
	const $voters = $("<li>").append("Électeurs ")
	
	// Listes prédéfinies
	const $select = $("<select>")
	$select.append($("<option> Personnalisé </option>").val("custom"))
	$select.append($("<option> Anonyme </option>").val("anonymous"))
	$select.append($("<option> AVIZ </option>").val("aviz"))
	$select.append($("<option> CCEC </option>").val("ccec"))
	$select.append($("<option> Elus CA </option>").val("elusca"))
	$select.append($("<option> L3 INFO </option>").val("l3info"))
	$select.append($("<option> L3 MIAGE </option>").val("l3miage"))
	$voters.append($select)

	const $trashVoter = $("<button> - </button>").attr("onClick", "removeVoter(this)")
	$trashVoter.attr("class", "trash")
	const $addVoter = $("<button> + </button>").attr("onClick", "addVoter(this)")
	$addVoter.attr("class", "trash")
	const $table = $("<table>")
	const $line1 = $("<tr>")

	$line1.append("<th> Noms </th>")
	$line1.append("<th> Procurations </th>")
	$table.append($line1)

	const $line2 = $("<tr>")
	$line2.append($("<td>").append($email.clone().addClass("voters")))
	const $checkbox = $("<input>").attr("type", "checkbox")
	const $cell = $("<td>").append($checkbox)
	$cell.append($checkbox.clone())
	const $cell2 = $("<td>").append($trashVoter)

	$line2.append($cell)
	$line2.append($cell2)
	$table.append($line2)

	const $line3 = $("<tr>")
	$line3.append($("<td>").append($new.clone()))
	$line3.append("<td>")
	$line3.append($("<td>").append($addVoter))
	$table.append($line3)
	$voters.append($table)
	$list.append($voters)

	$("#boxMain").html($list)
}

function removeChoice(tag) {
	// remove <input>
	$(tag).prev().remove()
	// remove <br>
	$(tag).next().remove()
	// remove <button>
	$(tag).remove()
}

function addChoice(tag) {
	const value = $(tag).prev().val()
	if (value !== "") {
		$(tag).prev().val("")
		const $choice = $("<input>").attr("type", "text")
		$choice.val(value)
		$choice.attr("readonly", "")
		$choice.addClass("options")
		$(tag).prev().before($choice)
		const $trash = $("<button> - </button>").attr("onClick", "removeChoice(this)")
		$trash.attr("class", "trash")
		$(tag).prev().before($trash.add("<br>"))
	}
}

function removeVoter(tag) {
	// remove <tr>
	$(tag).parent().parent().remove()
}

function addVoter(tag) {
	const value = $(tag).parent().prev().children().val()
	if (value !== "") {
		$(tag).parent().prev().children().val("")
		const $newLine = $("<tr>")
		const $voter = $("<input>").attr("type", "text")
		$voter.val(value)
		$voter.attr("readonly", "")
		$voter.addClass("voters")
		$newLine.append($("<td>").append($voter))
		const $checkbox = $("<input>").attr("type", "checkbox")
		const $cell = $("<td>").append($checkbox)
		$cell.append($checkbox.clone())
		const $trashVoter = $("<button> - </button>").attr("onClick", "removeVoter(this)")
		$trashVoter.attr("class", "trash")
		const $cell2 = $("<td>").append($trashVoter)
		$newLine.append($cell)
		$newLine.append($cell2)
		$(tag).parent().parent().before($newLine)
	}
}