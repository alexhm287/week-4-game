var gameState = {
	status: "start"
}

//xp health ex:150, 
//xp damage adjusted xp
var bobafett = {
	hero_id:"bobafett",
	role: "",
	startingHp: 150,
	currentHp: 150,
	attackPower: 25,
	name: "Boba Fett"
};
var darth = {
	hero_id:"darth",
	role: "",
	startingHp: 200,
	currentHp: 200,
	attackPower: 35,
	name: "Darth Vader"
};
var solo = {
	hero_id:"solo",
	role: "",
	startingHp: 80,
	currentHp: 80,
	attackPower: 10,
	name: "Han Solo"
};
var yoda = {
	hero_id:"yoda",
	role: "",
	startingHp: 180,
	currentHp: 180,
	attackPower: 28,
	name: "Yoda"
};

var players = {
	bobafett: bobafett,
	darth: darth,
	solo: solo,
	yoda: yoda 
}

function clearRoles(){
	setRole(bobafett,"");
	setRole(darth, "");
	setRole(solo, "");
	setRole(yoda, "");
	bobafett.currentHp = bobafett.startingHp;
	darth.currentHp = darth.startingHp;
	solo.currentHp = solo.startingHp;
	yoda.currentHp = yoda.startingHp;


}

function setRole(player,role) {
	player.role = role

}

function findPlayerByRole(role) {
	for (var pl in players) {
		var player = players[pl];
		if (player.role === role) { 
			return player; 
		} 
	}

}

function restartGame() {
	alert("restart");
}

function drawPlayers() {
	for (var pl in players) {
		var player = players[pl];
		var playerNode = $("#" + pl);
		var hpNode = $(".hp", playerNode);
		hpNode.html(player.currentHp);
		playerNode.show();
		
		if(player.role === "attacker") {
			$("img", playerNode).css("background", "white");
			$("#attacker").append(playerNode);
			
		}
		else if(player.role === "") { 
			$("img", playerNode).css("background", "white");
			$("#start").append(playerNode);
		}
		else if(player.role === "middle") {
			$("img", playerNode).css("background", "red");
			$("#middle").append(playerNode);
		}
		else if(player.role === "defender") {
			$("#defender").append(playerNode);
			$("#attack").show();
			$("img", playerNode).css("background", "black");
			playerNode.append($("#attack"));
		}
		else if(player.role === "lost") {
			playerNode.hide();
		}
		
	}

}

function startGame() {
	gameState.status = "start";
	clearRoles();
	drawPlayers();
	$("#attack").hide();

	var clickFunction = function(e) {
		var id = e.currentTarget.id;
		var player = players[id];
		//alert(id);
		if(gameState.status === "start") {
			player.role = "attacker";
			for (var pl in players) {
				if(pl != id) {
					players[pl].role = "middle";
				}
			}
			gameState.status = "middle";
			drawPlayers(); 
		}
		else if (gameState.status == "middle") {
			if (player.role != "attacker") {
				player.role = "defender";
				gameState.status = "play";
				drawPlayers();
			}
		}
		else if(gameState.status == "play") {
			if (player.role != "attacker" && player.role != "lost") {
				player.role = "defender";
				drawPlayers();
			}
		}

	} 
	for (var pl in players) {
		var nd = $("#" + pl);
		nd.click(clickFunction);
	}
	$("#restart").click(startGame);



	$("#attack").click(function(){
		 if(gameState.status !== "play") {
		 	return;
		 }
		//alert("lightsaber attack");
		var attacker = findPlayerByRole("attacker");
		var defender = findPlayerByRole("defender");
		var defenderAttackPower = defender.attackPower; 
		var attackerAttackPower = attacker.attackPower;
		defender.currentHp -= attackerAttackPower;
		attacker.currentHp -= defenderAttackPower;
		var defenderDamage = "You attacked " + defender.name + " for " + attackerAttackPower  + " damage.";
		var attackDamage = defender.name + " attacked you for " + defenderAttackPower  + " damage.";
		$("#status").html(defenderDamage + "<p>" + attackDamage);


		var strength = Math.floor((Math.random() *10) +10);
		attacker.attackPower += strength; 

		if (attacker.currentHp < 0) {	
			$("#status").html("You lost Game Over!");
			gameState.status = "lost";
			drawPlayers();
			return;
		}

		if (defender.currentHp < 0) {
			defender.role = "lost";	
			$("#status").html("You defeated " + defender.name + ". You can now choose another enemy to fight.");

		}

		var winner = true; 
		for (var pl in players) {
			var p = players[pl];
			if (p.role !== "attacker" && p.role !== "lost") {
				winner = false; 
			}
		}

		if (winner) {
			$("#status").html("You Won Game <b>Over!</b>"); 
		}


		if (defender.currentHp  )
		drawPlayers();




	})

	
	



}

$(document).ready(startGame);

