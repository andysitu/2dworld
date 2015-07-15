
function display(msg) {
	document.getElementById("message");
	message.value = msg;
}

function check(dir, range) {
	if (dir == "left") {
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0]][world.playerLoc[1] - i] == "number") {
				return map[world.playerLoc[0]][world.playerLoc[1] - i];
			}
		}
	} else if (dir == "down") {
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0] + i][world.playerLoc[1]] == "number") {
				return map[world.playerLoc[0] + i][world.playerLoc[1]];
			}
		}
	} else if (dir == "right") {
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0]][world.playerLoc[1] + i] == "number") {
				return map[world.playerLoc[0]][world.playerLoc[1] + i];
			}
		}
	} else {
		for (var i = 1; i <= range; i++) {
			if (typeof map[world.playerLoc[0] - i][world.playerLoc[1]] == "number") {
				return map[world.playerLoc[0] - i][world.playerLoc[1]];
			}
		}
	}

	return false;
}
