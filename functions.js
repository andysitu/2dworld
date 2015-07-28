
function display(msg) {
	var message = document.getElementById("message");
	if (msg !== false) {
		message.value += msg + "\n";
	} else {
		message.value = "";
	}
}

function displayStatus() {
	var status = document.getElementById("status");

	status.value = "hp: " + player.hp + "\nlevel: " + player.level + "\nexp: " + player.exp + "\ngold: " + player.gold;

	hpBar(player["hp"] / player["max hp"]);

}

function check(dir, range) { // checks if there is a monster within a certain range if it is, then it'll return the monster #
							 // only works for calculating linearly from player
	if (dir === 0) { // left
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0]][world.playerLoc[1] - i] == "number") {
				return map[world.playerLoc[0]][world.playerLoc[1] - i];
			}
		}
	} else if (dir === 1) { // up
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0] - i][world.playerLoc[1]] == "number") {
				return map[world.playerLoc[0] - i][world.playerLoc[1]];
			}
		}
	} else if (dir === 2) { // right
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0]][world.playerLoc[1] + i] == "number") {
				return map[world.playerLoc[0]][world.playerLoc[1] + i];
			}
		}
	} else { // down
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0] + i][world.playerLoc[1]] == "number") {
				return map[world.playerLoc[0] + i][world.playerLoc[1]];
			}
		}
	}

	return false;
}

function hpBar(percent) {
	var bar = document.getElementById("hp-bar");
	var msg = document.getElementById("hp-msg");

	if (percent > 0) {
		var max = document.getElementById("hp-container").clientWidth; // div container of the bar. This is to get the max width
		max = /\d+/.exec(max);

		bar.style.width = percent * Number(max) + "px";

		msg.innerHTML = "&nbsphp: " + player.hp + "/" + player["max hp"];
	} else {
		bar.style.width = "0px";
		msg.innerHTML = "&nbsphp: 0/" + player["max hp"];
	}

	

}