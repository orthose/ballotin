function voteBallotPage() {
	// En tête de la boite
	$("#intro").html("<p> Aller voter ! </p>")	
	
	// Boite principale
	$("#boxMain").html("<h3> Votant : </h3>")	
	
	let votant = $("<div>")
	votant.append("<input type='text' value='blabla' readonly>")
	votant.append("truie@huitre.fr")
	$("#boxMain").append(votant)
	
	let code = $("<div>")
	code.append("<h3> Code du scrutin : </h3>")
	code.append("<input type='text' value='424242' readonly>")
	$("#boxMain").append(code)
	
	let question = $("<div>")
	question.append("<h3> Question : </h3>")
	let textzone = $("<textarea readonly> Un arbre a un avant et un arrière ? </textarea>")
	textzone.css("width", "70%")
	textzone.css("height", "50px")
	
	question.append(textzone)
	$("#boxMain").append(question)
	
	let choix = $("<div>")
	choix.append("<h3> Question : </h3>")
	let choixBoite = $("<div>")
	// Liste des choix
	choixBoite.append("<input type='radio' id='v1' name='vote' value='???' checked>")
	choixBoite.append(" <label for='v1'> ??? </label>")
	choixBoite.append("<input type='radio' id='v2' name='vote' value='???'>")
	choixBoite.append(" <label for='v2'> ??? </label>")
	choixBoite.append("<input type='radio' id='v3' name='vote' value='???'>")
	choixBoite.append(" <label for='v3'> ??? </label>")
	choix.append(choixBoite)
	$("#boxMain").append(choix)
	
	$("#boxMain").append("<button> Voter ! </button>")
	
	
	$("#boxMain").html($newContent)
}