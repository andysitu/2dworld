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

		if (dir === "left" || dir === 0) { // converts y1 and x1 to correct coordinates according to dir
			y1 = y; x1 = x - 1;
		} else if (dir === "up" || dir === 1) {
			y1 = y - 1; x1 = x;
		} else if (dir === "right" || dir === 2) {
			y1 = y; x1 = x + 1;
		} else if (dir === "down" || dir === 3) {
			y1 = y + 1; x1 = x;
		} else {
			display("Error with move function");
			console.log("Error Here:" + x, y, dir);
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

	bestStep(y1, x1, y2, x2) {
		// if there are two or more equal points of distance, then method will do calculate again on those steps and then 
		// and then out of the directions that equal with the min distance, it'll give the first one.

		// if it returns false, then the character can't move and shouldn't.

		var coord = this.calculate(y1, x1, y2, x2);

		if (coord.length === 1) { // if there's only one direction
			return coord[0];
		} else { // multiple directions 
			var coords = [];
			for (var i = 0; i < coord.length; i++) {
				coords[i] = this.calculateFromI(coord[i], y1, x1);
			}

			for (var i = 0; i < coord.length; i++) {
				coords[i] = this.calculate(coords[i][0], coords[i][1], y2, x2, true);
				coords[i] = this.calculateDistance(coords[i][0], coords[i][1], y2, x2);
			}

			var min = Math.min.apply(null, coords);

			if (min === 999999) {
				return false; // when for example character is covered by walls
			}

			var arr = [];
			for (var i = 0; i < coord.length; i++ ) {
				if (coords[i] === min) {
					arr.push(i);
				}
			}
			return coord[ arr[Math.floor(Math.random() * arr.length)] ];
		}

	},
	calculate(y1, x1, y2, x2, status) { //  calculates the direction to move for closest distance to player
		var move = [0, 0, 0, 0];
		var dir = [];
		
			move[0] = this.calculateDistance(y1, x1 - 1, y2, x2); // left
			move[1] = this.calculateDistance(y1 - 1, x1, y2, x2); // up
			move[2] = this.calculateDistance(y1, x1 + 1, y2, x2);; // right
			move[3] = this.calculateDistance(y1 + 1, x1, y2, x2); // down

			var min = Math.min.apply(null, move);

			if (status === undefined) {
				for (var i = 0; i < move.length; i++) {
					if (move[i] === min && min !== 999999) {
						dir.push(i);
					}
				}

				return dir;
			} else {
				for (var i = 0; i < move.length; i++) {
					if (move[i] === min && min !== 999999) {
						return this.calculateFromI(i, y1, x2);
					}
				}

				return false;
			}
	},
	calculateDistance(y1, x1, y2, x2) { // calculate distance from two points
		if (map[y1][x1]) { // in case, there are no walls along the edges of the map
			if (map[y1][x1] === 'P') {
				return 0;
			} else if (map[y1][x1] === " ") {
				return Math.abs(y2 - y1) + Math.abs(x2 - x1);
			} else if (map[y1][x1] === "P") {
				return 0;
			} else {
				return 999999;
			}
		} else {
			return 999999;
		}
	},
	calculateFromI(i, y1, x1) {
		switch(i) {
			case 0: return [y1, x1 - 1]; // left
			case 1: return [y1 - 1, x1]; // up
			case 2: return [y1, x1 + 1]; // right
			case 3: return [y1 + 1, x1]; // down
			default: throw "calculateFromI only takes i from 0-3";
		}
	},
	calculateI(y1, x1, y2, x2) {
		if (y1 === y2 && x1 - 1 === x2) {
			return 0;
		} else if (y1 - 1 === y2 && x1 === x2) {
			return 1;
		} else if (y1 === y2 && x1 + 1 === x2) {
			return 2;
		} else if (y1 + 1 === y2 && x1 === x2) {
			return 3;
		}
	},
};

var player = {
	hp: 50,
	"max hp": 50,
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
	attacked(dmg) {
		this.hp -= dmg;
		display("You were hit and took " + dmg + " hp.");
	}
}

var monster = {
	counter: -1,
	list: {}, // list of all the monsters created
	statuses: ["aggressive", "passive", "coward", "superaggressive", "passive"],
	make(i, j) { // makes a new new monster obj in list and gives it a number as the obj name (based on this.counter)
		this.counter++;
		var level = Math.ceil(Math.random() * 5)
		monster["list"][this.counter] = {
			level: level * player.level,
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
	attack(num) {
		return Math.ceil(this["list"][num]["level"] * 3 * Math.random());
	},
	attacked(num, dmg) {
		this["list"][num]["hp"] -= dmg;
		display(dmg + " damage was done to the monster.");

		if (this["list"][num]["hp"] <= 0) {
			display("You killed the monster with " + dmg + " damgage!");
			this.rem(num);
		}

		if (this["list"][num]["status"] === "passive") {
			this["list"][num]["status"] = "aggressive";
		}
	},
	inRange(monstID) { 
		var loc = this["list"][monstID];
		var pLoc = world.playerLoc;
		var range = 0;
		if (loc["status"] === "aggressive") {
			range = 5;
		} else if (loc["status"] === "superaggressive") {
			range = 10;
		}
		if ( Math.abs((loc["yCoord"] * loc["yCoord"] - pLoc[0] * pLoc[0] ) + ( loc["xCoord"] * loc["xCoord"] - pLoc[1] * pLoc[1] )) <= 5) {
			return true;
		} else {
			return false;
		}
	},
	moveNormally(monsID) {
		if (Math.random() * 10 >= 6) {
			return false;;
		}

		var loc = [this["list"][monsID]["yCoord"], this["list"][monsID]["xCoord"]];

		// if all 4 directions have been tried, then the monster is stuck
		// and for loop will end 
		var dirCount = {0: 0, 1: 0, 2: 0, 3: 0}; 

		while (dirCount[1] <= 0 || dirCount[2] <= 0 || dirCount[3] <= 0 || dirCount[4] <= 0) {
			var dir = Math.floor(Math.random() * 4);
			dirCount[dir]++;
			if (world.move(loc[0], loc[1], dir)) {
				return false;
			} // math.random gives 1-4 for the direction of moving)
		}	
	},
	moveTowards(monstID) {
		var loc = this["list"][monstID];
		var pLoc = world.playerLoc;

		var dir = world.bestStep(loc["yCoord"], loc["xCoord"], pLoc[0], pLoc[1]);
		if (dir === false) {
			display("Attack!");
		} else {
			world.move(loc["yCoord"], loc["xCoord"], dir);
		}
	},
	controller() { // controls whether monster should move, attack, etc.
		for (var key in this.list) {
			if (this.inRange(key)) {
				this.moveTowards(key);
			} else {
				this.moveNormally(key);
			}
			
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
