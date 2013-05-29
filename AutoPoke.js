var CurrentURL = window.location.hostname + window.location.pathname;
var FacebookURL = "www.facebook.com/pokes";

if(CurrentURL != FacebookURL)
	alert("Vous n'êtes pas sur la bonne page, dirigez vous vers " + FacebookURL + " et réessayez");
else if(document.getElementById('AutoPokeHeader') != null)
	alert('AutoPoke est déjà installé sur la page');
else
{
	var AutoPoke_Timer;
	var AutoPoke_Running = false;

	function AutoPoke_Verif()
	{
		console.log('Checking pokes');

		var PokeList = document.querySelectorAll('.pokesDashboard .uiIconText');
		for(var i = 0 ; i < PokeList.length ; i++)
		{
			console.log('Clicking one poke');
			var Poke = PokeList[i];
			Poke.click();
		}

		AutoPoke_Timer = setTimeout(AutoPoke_Verif, 2000);
	}

	function AutoPoke_Start()
	{
		AutoPoke_Verif();
	}

	function AutoPoke_Stop()
	{
		window.clearTimeout(AutoPoke_Timer);
	}

	function AutoPoke_SwitchStatus()
	{
		if(!AutoPoke_Running)
		{
			document.getElementById('AutoPokeStatus').innerHTML = "en marche";
			document.getElementById('AutoPokeButton').innerHTML = "Arrêter";
			AutoPoke_Start();
			AutoPoke_Running = true;
		}
		else
		{
			document.getElementById('AutoPokeStatus').innerHTML = "hors fonction";
			document.getElementById('AutoPokeButton').innerHTML = "Démarrer";
			AutoPoke_Stop();
			AutoPoke_Running = false;
		}
	}

	function AutoPoke_Remove()
	{
		if(AutoPoke_Running) AutoPoke_Stop();
		var Elem = document.getElementById('AutoPokeHeader');
		Elem.parentNode.removeChild(Elem);
	}

	function AutoPoke_Info()
	{
		alert("Créateur : Redm4x\nDernière mise à jour : 28 mai 2013");
	}

	var PageTitle = document.querySelector('h2.uiHeaderTitle');

	var AutoPokeHeader = document.createElement("span");
	AutoPokeHeader.id = "AutoPokeHeader";
	AutoPokeHeader.style.backgroundColor = 'white';
	AutoPokeHeader.style.border = 'solid black 1px';
	AutoPokeHeader.style.padding = '5px';
	AutoPokeHeader.style.marginLeft = '10px';
	AutoPokeHeader.style.color = 'black';

	AutoPokeHeader.innerHTML = "AutoPoke <span id='AutoPokeStatus'>hors fonction</span> : ";
	AutoPokeHeader.innerHTML += "<button id='AutoPokeButton' type='button'>Démarrer</button>";
	AutoPokeHeader.innerHTML += " <a href='#' id='AutoPokeInfoButton' title='Infos'>?</a>";
	AutoPokeHeader.innerHTML += " <a href='#' id='AutoPokeRemoveButton' title='Supprimer'>&times;</a>";

	PageTitle.appendChild(AutoPokeHeader);

	document.getElementById('AutoPokeButton').onclick = AutoPoke_SwitchStatus;
	document.getElementById('AutoPokeRemoveButton').onclick = AutoPoke_Remove;
	document.getElementById('AutoPokeInfoButton').onclick = AutoPoke_Info;
}
