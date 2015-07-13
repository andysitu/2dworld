var world = {
	playerLoc: [0,0],
	translateMap(maps) {
		var map = document.getElementById("map");
		
		for (var i = 0; i < maps.length; i++) {
			var tr = document.createElement("tr");
			map.appendChild(tr);
			for (var j = 0; j < maps[i].length; j++) {
				var th = document.createElement("th");
				if (maps[i][j] == " ") {
					th.setAttribute("class", "space");
				} else if (maps[i][j] == "P") {
					th.setAttribute("class", "player");
					this.playerLoc = [i, j];
				}
				th.setAttribute("id", i + "" + j);
				tr.appendChild(th);
			}
		}
	},

	changeClass(class1, x1, y1) {
		var loc = document.getElementById(x1 + "" + y1);
		loc.setAttribute("class", class1);
	},

	move(arr, y, x, y1, x1) {
		if (arr[y1][x1] == " ") {
			arr[y1][x1] = arr[y][x]; // set new location of player
			this.changeClass("player", y1, x1);

			arr[y][x] = " "; // set area where player was to "space"
			this.changeClass("space", y, x);

			this.playerLoc = [y1, x1]; // change the player coordinates record
		}
	},
};

window.onload = function() {
	world.translateMap(map);

	document.onkeydown = function(e) {
		var mapID = document.getElementById("map");
		if (e.keyCode == 37) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0], world.playerLoc[1] - 1);
		} else if (e.keyCode == 38) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0] - 1, world.playerLoc[1]);
		} else if (e.keyCode == 39) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0], world.playerLoc[1] + 1);
		} else if (e.keyCode == 40) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0] + 1, world.playerLoc[1]);
		} 
	};


};