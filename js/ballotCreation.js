function createBallotPage() {
	let $newContent = $("<aside> </aside>")
	
	
	$($newContent).append("<button> Créer le scrutin </button>")
	$($newContent).append("<button> Inviter les perticipants </button>")
	$($newContent).append("<button> Voter </button>")
	$($newContent).append("<button> Afficher la participation </button>")
	$($newContent).append("<button> Fermer le scrutin </button>")
	$($newContent).append("<button> Détruire le scrutin </button>")
	
	
	$("aside").replaceWith($newContent)
}