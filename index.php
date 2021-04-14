<?php
	// Commencer la session si elle n'a pas déja été lancé
	// Si on rappelle une session déja crée on obtient un warning qui décale le flow de la page
	if(!isset($_SESSION)){
		session_start();
	}
	
	// Regarder si l'utilisateur est déjà venu
	if(isset($_GET['accountCreated'])) {
		$message = "Merci d'avoir créé un compte, vous pouvez désormais utiliser toutes les fonctionnalités du site&nbsp;!";
	} else if(isset($_GET['passwordChanged'])) {
		$message = "Votre mot de passe a été changé, vous pouvez désormais ré-utiliser toutes les fonctionnalités du site&nbsp;!";
	} else if(isset($_COOKIE['seen'])) {
		$message = "Heureux de vous revoir sur Ballotin un site de vote anonyme crypté en ligne&nbsp;!";
	} 
	// Enregistrer un cookie pour savoir si l'utilisateur est déjà venu
	else {
		$message = "Bonjour et bienvenue sur ballotin un site du vote anonyme crypté en ligne&nbsp;! Créer votre compte pour pouvoir utiliser toutes ses fonctionnalités";		
		setcookie("seen", true);
	}
?>

<script type="text/javascript">
	// On sauvegarde l'id de session dans une variable globale
  var sessionID ='<?= session_id();?>'
  let serverURL = ""
</script>

<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <title>Ballotin</title>
  <link rel="icon" type="image/png" href="resources/images/logo.png">
  
  <!-- JAVASCRIPT -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="js/jsencrypt.min.js"></script>
  <script src="js/browsingBar.js"></script>
  <script src="js/cryptActions.js"></script>
  <script src="js/ballotCreationActions.js"></script>
  <script src="js/ballotManagementActions.js"></script>
  <script src="js/userSystemActions.js"></script>
  <script src="js/bugReport.js"></script>
  <script src="js/ballotCreationPage.js"></script>
  <script src="js/ballotVotePage.js"></script>
  <script src="js/mainActions.js"></script>
  <script src="js/createAccount.js"></script>
  <script src="js/changePassword.js"></script>
  <!-- CSS -->
  <link href='css/mainStyle.css' rel='stylesheet'/>
  <link href='css/welcomeStyle.css' rel='stylesheet'/>
  <link href='css/createBallotStyle.css' rel='stylesheet'/>
  <link href='css/managementStyle.css' rel='stylesheet'/>
</head>
<body>
	<header> 
		<div><button onClick="bugReportPage()" id='reportBug'> Reporter un bogue </button></div>
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
		<p> Outil libre de droits | Université Paris-Saclay @ 2021<br>
		Concepteurs&nbsp;:&nbsp;Maxime Vincent & Baptiste Maquet </p>
	</footer>
</body>
