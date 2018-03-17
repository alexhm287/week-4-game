var gameState = {
	status: "start"
}


var bobafett = {
	hero_id:"bobafett",
	role: ""
};
var darth = {
	hero_id:"darth",
	role: ""
};
var solo = {
	hero_id:"solo",
	role: ""
};
var yoda = {
	hero_id:"yoda",
	role: ""
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
}

function setRole(player,role) {
	player.role = role

}

function drawPlayers() {
	for (var pl in players) {
		var player = players[pl];
		var playerNode = $("#" + pl);
		if(true) {
			if(player.role === "attacker") {
				$("#attacker").append(playerNode);
			}
			else if(player.role === "") { 
				$("#attacker").append(playerNode);
			}
			else if(player.role === "middle") {
				$("#middle").append(playerNode);
			}
			else if(player.role === "defender") {
				$("#defender").append(playerNode);
				$("#attack").show();
				playerNode.append($("#attack"));
			}
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
				gameState.status = "defender";
				drawPlayers();
			}
		}

	} 
	for (var pl in players) {
		var nd = $("#" + pl);
		nd.click(clickFunction);
	}

	$("#attack").click(function(){
		alert("lightsaber attack");
	})

	
	



}

$(document).ready(startGame);

