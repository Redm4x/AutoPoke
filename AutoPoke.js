var FacebookURL1 = 'https://www.facebook.com/pokes';
var FacebookURL2 = 'http://www.facebook.com/pokes';
var CurrentURL = window.location.href;

if(CurrentURL.substr(0,FacebookURL1.length) != FacebookURL1 && CurrentURL.substr(0, FacebookURL2.length) != FacebookURL2)
	alert("Vous n'ête pas sur la bonne page, dirigez vous vers " + FacebookURL2 + " et réessayez");
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

	var Title = document.querySelector('h2.uiHeaderTitle');

	var AutoPokeHeader = document.createElement("span");
	AutoPokeHeader.id = "AutoPokeHeader";
	AutoPokeHeader.style.backgroundColor = 'grey';
	AutoPokeHeader.style.padding = 5+'px';
	AutoPokeHeader.style.marginLeft = 10+'px';

	AutoPokeHeader.innerHTML = "<span>AutoPoke <span id='AutoPokeStatus'>hors fonction</span></span> : <button id='AutoPokeButton' type='button'>Démarrer</button> (v0.1) <a href='#' id='AutoPokeRemoveButton'>&times;</a>";

	Title.appendChild(AutoPokeHeader);

	document.getElementById('AutoPokeButton').onclick = AutoPoke_SwitchStatus;
	document.getElementById('AutoPokeRemoveButton').onclick = AutoPoke_Remove;
}
