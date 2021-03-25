<?php
	// Commencer la session si elle n'a pas déja été lancé
	// Si on rappelle une session déja crée on obtient un warning qui décale le flow de la page
	if(!isset($_SESSION)){
		session_start();
	}
	
	// Regarder si l'utilisateur est déjà venu
	if(isset($_COOKIE['seen'])) {
		$message = 'bienvenue, heureux de vous revoir';
	} 
	// Enregistrer un cookie pour savoir si l'utilisateur est déjà venu
	else {
		$message = 'bienvenue';
		setcookie("seen", true);
	}
	
?>

<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Ballotin</title>
  
  <!-- JAVASCRIPT -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="js/ballotCreation.js"></script>
  <script src="js/button.js"></script>
  <!-- CSS -->
  <link href='css/mainStyle.css' rel='stylesheet'/>
  <link href='css/welcomeStyle.css' rel='stylesheet'/>
  <link href='css/createBallotStyle.css' rel='stylesheet'/>
</head>
<body>
	<header> 
		<h1> <a href='index.php'> Ballotin </a> </h1> 
	</header>
	
	<main>
		<aside>
		</aside>
		<div id='box'>
			<header id='boxHeader'>
				<img>
				<p id='intro'> Bonjour, <?= $message ?> sur Ballotin un site de vote anonyme crypté en ligne ! </p>
				<img src='resources/images/Arrow_right.png'>
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