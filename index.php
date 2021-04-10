<?php
	// Commencer la session si elle n'a pas déja été lancé
	// Si on rappelle une session déja crée on obtient un warning qui décale le flow de la page
	if(!isset($_SESSION)){
		session_start();
	}
	
	// Regarder si l'utilisateur est déjà venu
	if(isset($_GET['accountCreated'])) {
		$message = "Merci d'avoir créée un compte, vous pouvez désormais utiliser toutes les fonctionnalités du site !";
	} else if(isset($_COOKIE['seen'])) {
		$message = "Bonjour, bienvenue heureux de vous revoir sur Ballotin un site de vote anonyme crypté en ligne !";
	} 
	// Enregistrer un cookie pour savoir si l'utilisateur est déjà venu
	else {
		$message = "Bonjour, bienvenue sur ballotin un site du vote anonyme crypté en ligne ! Créer votre compte pour pouvoir utiliser toutes ses fonctionnalités";		
		setcookie("seen", true);
	}
?>

<script type="text/javascript">
    	var sessionID ='<?= session_id();?>'
</script>

<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Ballotin</title>
  
  <!-- JAVASCRIPT -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="js/ballotCreation.js"></script>
  <script src="js/ballotVote.js"></script>
  <script src="js/mainActions.js"></script>
  <script src="js/createAccount.js"></script>
  <script src="js/changePassword.js"></script>
  <script src="js/ajax.js"></script>
  <!-- CSS -->
  <link href='css/mainStyle.css' rel='stylesheet'/>
  <link href='css/welcomeStyle.css' rel='stylesheet'/>
  <link href='css/createBallotStyle.css' rel='stylesheet'/>
</head>
<body>
	<header> 
		<p> </p>
		<h1> <a href='index.php'> Ballotin </a> </h1> 
		<div><button onClick="createAccountPage()" id="createAccount"> Créer un compte </button></div>
	</header>
	
	<main>
		<aside>
		</aside>
		<div id='box'>
			<header id='boxHeader'>
				<a id='back'> <img src='resources/images/Arrow_left.png'> </a>
				<p id='intro'> <?= $message ?> </p>
				<img src='resources/images/logo.png'>
			</header>
			
			<main id='boxMain'>				
				<div id='buttons'>
					<button onClick='authenticate_button(); vote_button()'> Voter pour un scrutin </button>
					<button onClick='authenticate_button(); create_button()'> Créer un scrutin </button>
					<button onClick='authenticate_button(); manage_button()'> Manager un scrutin </button>
				</div>
			</main>
			
			<footer id='boxFooter'>
			</footer>
		</div>
	</main>
	
	<footer>
		<p> test </p>
	</footer>
</body>