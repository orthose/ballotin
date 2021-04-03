function createBallotAjax() {

	// Récupération des options
	const options = []
	$(".options").each(function() {
		options.push($(this).val())
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
		voters[$(this).val()] = npow
	})

	$.ajax({
    method: "GET",
    url: "/ballotin/php/createBallot.php",
    data: {
    	"organiser": $("#organiser").val(),
    	"question": $("textarea").val(),
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