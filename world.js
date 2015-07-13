var world = {
	playerLoc: [0,0],
	translateMap(maps) {
		// edges, TM makes arr area into w, everyone else it reads from array maps and sets the class
		var map = document.getElementById("map");
		
		for (var i = 0; i < maps.length; i++) {
			var tr = document.createElement("tr");
			map.appendChild(tr);

			for (var j = 0; j < maps[i].length; j++) {
				var th = document.createElement("th");
				if (i === 0 || j === 0 || i === maps.length - 1 || j === maps[i].length - 1) {
					th.setAttribute("class", "wall");
					maps[i][j] = "W";
				} else if (maps[i][j] === " ") {
					th.setAttribute("class", "space");
				} else if (maps[i][j] == "M") {
					th.setAttribute("class", "monster");
					maps[i][j] = monster.make();
				} else if (maps[i][j] === "P") {
					th.setAttribute("class", "player");
					this.playerLoc = [i, j];
				}
				th.setAttribute("id", i + " " + j);
				tr.appendChild(th);
			}
		}
	},

	changeClass(class1, x1, y1) {
		var loc = document.getElementById(x1 + " " + y1);
		loc.setAttribute("class", class1);
	},

	move(y, x, y1, x1) {
		if (map[y1][x1] === " ") {
			map[y1][x1] = map[y][x]; // set new location of player
			this.changeClass("player", y1, x1);

			map[y][x] = " "; // set area where player was to "space"
			this.changeClass("space", y, x);

			this.playerLoc = [y1, x1]; // change the player coordinates record
		}
	},
};

var player = {
	level: 1,
}

var monster = {
	counter: -1,
	make() {
		this.counter++;
		var level = Math.ceil(Math.random() * 5)
		monster[this.counter] = {
			level: level,
			hp: Math.ceil(Math.random() * level * 3 * player.level * player.level),
		}
		return this.counter;
	},
	rem(num) {
		delete this[num];

	},
};

const controller = {
	keyMap: {65: false},
	keypress(e) {
		var mapID = document.getElementById("map");
		if (e.keyCode == 65) {
			this.keyMap[65] = true;
		}

		if (e.keyCode == 37) { // left key
			if (this.keyMap[65] == true) {
				display("Attack left");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], world.playerLoc[0], world.playerLoc[1] - 1);
			}
		} else if (e.keyCode == 38) { // down key
			if (this.keyMap[65] == true) {
				display("Attack up");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], world.playerLoc[0] - 1, world.playerLoc[1]);
			}
		} else if (e.keyCode == 39) { // right key
			if (this.keyMap[65] == true) {
				display("Attack right");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], world.playerLoc[0], world.playerLoc[1] + 1);
			}
		} else if (e.keyCode == 40) { // up key
			if (this.keyMap[65] == true) {
				display("Attack down");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], world.playerLoc[0] + 1, world.playerLoc[1]);
			}
		} 		
	}
};


window.onload = function() {
	world.translateMap(map);

	document.onkeydown = function(e) {
		controller.keypress(e);
	};

	document.onkeyup = function(e) {
		if (e.keyCode == 65) {
			controller.keyMap[65] = false;
		}
	}
};
