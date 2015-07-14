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
					this.playerLoc = [i, j]
;				}
				th.setAttribute("id", i + " " + j);
				tr.appendChild(th);
			}
		}
	},

	changeClass(class1, x1, y1) {
		var loc = document.getElementById(x1 + " " + y1);
		loc.setAttribute("class", class1);
	},

	move(y, x, dir) { // 1 for left, 2 for up, 3 for right, 4 for down
		var y1, x1; // new direction where character will move to

		if (dir == "left" || dir === 1) { // converts y1 and x1 to correct coordinates according to dir
			y1 = y; x1 = x - 1;
		} else if (dir == "up" || dir === 2) {
			y1 = y - 1; x1 = x;
		} else if (dir == "right" || dir === 3) {
			y1 = y; x1 = x + 1;
		} else if (dir == "down" || dir === 4) {
			y1 = y + 1; x1 = x;
		} else {
			display("Error with move function");
			x1 = x;
			y1 = y;
		}

		var class1 = document.getElementById(y + " " + x).className;
		var class2 = document.getElementById(y1 + " " + x1).className;

		if (map[y1][x1] === " ") {
			map[y1][x1] = map[y][x]; // set new location of player
			this.changeClass(class1, y1, x1);

			map[y][x] = " "; // set area where player was to "space"
			this.changeClass(class2, y, x);

			if (class1 == "player") {
				this.playerLoc = [y1, x1]; // change the player coordinates record
			}
			return true;
		}

		return false;
	},
};

var player = {
	level: 1,
	range: 1,
	damage() {
		return Math.floor(Math.random() * 5 * player.level + 1 * player.level)
	},

	attack(dir) {
		var checkit = check(dir, this.range);
		if (typeof checkit == "number") {
			monster.attacked(checkit, this.damage());
		} else {
			display("There is no monster there!");
		}
	},
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
	attacked(num, dmg) {
		this[num]["hp"] -= dmg;
		display(dmg + " damage was done to the monster.");
	},
};

const controller = { // for now, controller just handles the key presses and key combinations
	keyMap: {65: false},
	keypress(e) {
		var mapID = document.getElementById("map");
		if (e.keyCode == 65) {
			this.keyMap[65] = true;
		} else if (e.keyCode == 37) { // left key
			if (this.keyMap[65] == true) {
				player.attack("left");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], "left");
			}
		} else if (e.keyCode == 38) { // down key
			if (this.keyMap[65] == true) {
				player.attack("down");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], "up");
			}
		} else if (e.keyCode == 39) { // right key
			if (this.keyMap[65] == true) {
				player.attack("right");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], "right");
			}
		} else if (e.keyCode == 40) { // up key
			if (this.keyMap[65] == true) {
				player.attack("up");
			} else {
				world.move(world.playerLoc[0], world.playerLoc[1], "down");
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
