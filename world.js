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
					maps[i][j] = "W";
				}

				th.setAttribute("class", this.classTranslator(maps[i][j], i, j)) // classTranslator runs any necessary functions and returns the correct class name
				th.setAttribute("id", i + " " + j);
				tr.appendChild(th);
			}
		}
	},
	classTranslator(value, i, j) {
		switch(value) {
			case "W": return "wall";
			case " ": return "space";
			case "M": map[i][j] = monster.make(i, j);
						return "monster";
			case "P": this.playerLoc = [i, j];
						return "player";
			default: return false;
		}
	},

	changeClass(class1, x1, y1) {
		var loc = document.getElementById(x1 + " " + y1);
		loc.setAttribute("class", class1);
	},

	move(y, x, dir) { // 1 for left, 2 for up, 3 for right, 4 for down
		var y1, x1; // new coordinate where character will move to

		if (dir === "left" || dir === 1) { // converts y1 and x1 to correct coordinates according to dir
			y1 = y; x1 = x - 1;
		} else if (dir === "up" || dir === 2) {
			y1 = y - 1; x1 = x;
		} else if (dir === "right" || dir === 3) {
			y1 = y; x1 = x + 1;
		} else if (dir === "down" || dir === 4) {
			y1 = y + 1; x1 = x;
		} else {
			display("Error with move function");
			x1 = x;
			y1 = y;
		}

		if (map[y1][x1] === " ") {
			var class1 = document.getElementById(y + " " + x).className;
			var class2 = document.getElementById(y1 + " " + x1).className;

			map[y1][x1] = map[y][x]; // set new location of player
			this.changeClass(class1, y1, x1);

			map[y][x] = " "; // set area where player was to "space"
			this.changeClass(class2, y, x);

			if (class1 === "player") {
				this.playerLoc = [y1, x1]; // change the player coordinates record
			} else if (class1 === "monster") {
				monster["list"][map[y1][x1]]["yCoord"] = y1;
				monster["list"][map[y1][x1]]["xCoord"] = x1;
			}
			return true;
		}

		return false;
	},
	rem(value, newClass) { // removes monster with value and replaes it with either a newClass (ex: "W", " ") if defiend, if not, then space
		var loc = [monster["list"][value]["yCoord"], monster["list"][value]["xCoord"]];
		var i = loc[0], j = loc[1];
		if (newClass) {
			map[i][j] = newClass;
			this.changeClass(this.classTranslator(newClass, i, j), i, j);
		} else {
			map[i][j] = " ";
			this.changeClass("space", i, j); 
		}
	},
	findIt(value) {
		for (var i = 0; i < map.length; i++) {
			for (var j = 0; j < map[i].length; j++) {
				if (map[i][j] === value) {
					return [i, j];
				}
			}
		}
		return false; // if it can't find it.
	},
};

var player = {
	level: 1,
	range: 1,
	damage() {
		return Math.floor(Math.random() * 5 * player.level + 1 * player.level)
	},

	attack(dir) {
		var checkit = check(dir, this.range); // check checks if there is a monster within that range and returns the monster number if so
		if (typeof checkit === "number") {
			monster.attacked(checkit, this.damage());
		} else {
			display("There is no monster there!");
		}
	},
}

var monster = {
	counter: -1,
	list: {}, // list of all the monsters created
	statuses: ["aggressive", "passive", "coward", "superaggressive", "passive"],
	make(i, j) { // makes a new new monster obj in list and gives it a number as the obj name (based on this.counter)
		this.counter++;
		var level = Math.ceil(Math.random() * 5)
		monster["list"][this.counter] = {
			level: level,
			hp: Math.ceil(Math.random() * level * 3 * player.level * player.level),
			status: this.statuses[Math.floor(Math.random() * this.statuses.length)],
			yCoord: i,
			xCoord: j,
		}
		return this.counter;
	},
	rem(num) { // deletese monster from this.list & removes it from map
		world.rem(num);
		delete this["list"][num];
	},
	},
	attacked(num, dmg) {
		this["list"][num]["hp"] -= dmg;
		display(dmg + " damage was done to the monster.");

		if (this["list"][num]["hp"] <= 0) {
			display("You killed the monster with " + dmg + " damgage!");
			this.rem(num);
		}
	},
	move(monsID) {
		if (Math.random() * 10 >= 6) {
			return false;;
		}

		var loc = [this["list"][monsID]["yCoord"], this["list"][monsID]["xCoord"]];

		// if all 4 directions have been tried, then the monster is stuck
		// and for loop will end 
		var dirCount = {1: 0, 2: 0, 3: 0, 4: 0}; 

		while (dirCount[1] <= 0 || dirCount[2] <= 0 || dirCount[3] <= 0 || dirCount[4] <= 0) {
			var dir = Math.ceil(Math.random() * 4);
			dirCount[dir]++;
			if (world.move(loc[0], loc[1], dir)) {
				return false;
			} // math.random gives 1-4 for the direction of moving)
		}	
	},
	controller() { // controls whether monster should move, attack, etc.
		for (var key in this.list) {
			this.move(key);
		}
	},
};

const controller = { // for now, controller just handles the key presses and key combinations
	keyMap: {65: false},
	keypress(e) {
		var mapID = document.getElementById("map");
		var dir = "";
		if (e.keyCode === 65) {
			this.keyMap[65] = true;
		} else if (dir = this.dir(e)) {
			if (this.keyMap[65] === true) {
				display(false);
				player.attack(dir);
				monster.controller();
			} else {
				display(false);
				world.move(world.playerLoc[0], world.playerLoc[1], dir);
				monster.controller();
			}
 		
		}
	},
	dir(e) { // translates e.keyCode to return a string of the direction
		if (e.keyCode == 37) {
			return "left";
		} else if (e.keyCode == 38) {
			return "up";
		} else if (e.keyCode == 39) {
			return "right";
		} else if (e.keyCode == 40) {
			return "down"
		} else {
			return false;
		}
	},
};


window.onload = function() {
	world.translateMap(map);

	document.onkeydown = function(e) {
		controller.keypress(e);
	};

	document.onkeyup = function(e) {
		if (e.keyCode === 65) {
			controller.keyMap[65] = false;
		}
	}
};
