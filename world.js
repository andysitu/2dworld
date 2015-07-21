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
					maps[i][j] = "W"; // sets edges of the map into maps
				}

				th.setAttribute("class", this.classTranslator(maps[i][j], i, j, true)) // classTranslator runs any necessary functions and returns the correct class name
				th.setAttribute("id", i + " " + j);
				tr.appendChild(th);
			}
		}
	},
	classTranslator(value, i, j, status) { // set status to true only for translateMap, to create monsters,etc, to populate world
		switch(value) {
			case "W": return "wall";
			case " ": return "space";
			case "M": if (status === true) {
						map[i][j] = monster.make(i, j);
						}
						return "monster";
			case "S": return "seller";
			case "P": if (status === true) {this.playerLoc = [i, j];}
						return "player";
			default: return false;
		}
	},

	changeClass(class1, y1, x1) {
		var loc = document.getElementById(y1 + " " + x1);
		loc.setAttribute("class", class1);
	},

	move(y, x, dir) { // 1 for left, 2 for up, 3 for right, 4 for down
		var y1, x1; // new coordinate where character will move to

		if (dir === 0) { // converts y1 and x1 to correct coordinates according to dir
			y1 = y; x1 = x - 1;
		} else if (dir === 1) {
			y1 = y - 1; x1 = x;
		} else if (dir === 2) {
			y1 = y; x1 = x + 1;
		} else if (dir === 3) {
			y1 = y + 1; x1 = x;
		} else {
			display("Error with move function");
			console.log("Error Here:" + x, y, dir);
			throw "Error";
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
	calculate(y1, x1, y2, x2) { // calculates the direction to move for closest distance to player,
		var move = [0, 0, 0, 0];		// returns array(s) of best coordinate dependng on status
		var dir = [];
		
		move[0] = this.calculateDistance(y1, x1 - 1, y2, x2); // left
		move[1] = this.calculateDistance(y1 - 1, x1, y2, x2); // up
		move[2] = this.calculateDistance(y1, x1 + 1, y2, x2);; // right
		move[3] = this.calculateDistance(y1 + 1, x1, y2, x2); // down

		var min = Math.min.apply(null, move);

		for (var i = 0; i < move.length; i++) {
			if (move[i] === min && min !== 999999) {
				dir.push(i);
			}
		}

		return dir[Math.floor( Math.random() * dir.length)];
	},
	calculateDistance(y1, x1, y2, x2) { // calculate distance from two points
		if (map[y1][x1]) { // in case, there are no walls along the edges of the map
			if (map[y1][x1] === 'P') { // this is when player is right next to character
				return 0;
			} else if (map[y1][x1] === " ") {
				return Math.abs(y2 - y1) + Math.abs(x2 - x1);
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

	inRange(y1, x1, y2, x2, range) {
		if ( ( (y1 - y2 ) * (y1 - y2 )  + ( x1 - x2 ) * ( x1 - x2 ) ) <= range) {
			return true;
		} else {
			return false;
		}
	},
	finder(y1, x1, value, range) {
		var arr = [];
		for (var i = 0; i < 4; i++) {
			arr = this.calculateFromI(i, y1, x1);
			if (map[arr[0]][arr[1]] === value) {
				return true;
			}
		}
		return false;
	}
};

var player = {
	hp: 50,
	"max hp": 50,
	level: 1,
	levelUp() {
		this.level++;
		this["max hp"] += 30;
		this.hp =this["max hp"];
	},
	items: [],
	equipped: {
		0: false // 0 for weapon
	},
	range: 1,
	gold: 0,
	_exp: 0,
	get exp () {
		return this._exp;
	},
	set exp (value) {
		this._exp += value;
		var goldAmount = Math.ceil(Math.random() * value / 2);
		this.statusChange("gold", goldAmount)
		if (this._exp >= this.level * this.level * 5) {
			this._exp -= this.level * this.level * 5;
			this.levelUp();
			display("You gained " + goldAmount + " gold and leveled to level " + this.level + ".");
		} else {
			display("You gained " + goldAmount + " gold and " + value + " exp.");
		}
	},
	damage() {
		return Math.floor(Math.random() * 3 * player.level + 1 * player.level)
	},

	attack(dir) {
		var checkit = check(dir, this.range); // check checks if there is a monster within that range and returns the monster number if so
		if (typeof checkit === "number") {
			monster.attacked(checkit, this.damage());
		} else {
			display("There is no monster there!");
		}
	},

	statusChange(status, value) {
		this[status] += value;
	} 
}

var item = {
	describe() {
		display(this + " " + this.desc);
	}
}

function makeWeapon(desc, price, range, slot, damage, forSale, weight) {
	return Object.create(item, {
		'desc': {
			value: desc,
			enumerable: true
		},
		'price': {
			value: price,
			enumerable: true
		},
		'range': {
			value: range,
			enumerable: true
		},
		'slot': {
			value: slot,
			enumerable: true
		},
		'damage': {
			value: damage,
			enumerable: true
		},
		'describe': {	
			value: function() {
				display(desc + "\n" + "weight : " + this.weight + ", damage: " + this.damage + ", range: " + this.range + "\n");
			},
			enumerable: false
		},
		'forSale': {
			value: forSale,
			enumberable: false
		},
		'weight': {
			value: weight,
			enumerable: true
		}
	})
}

var items = { // desc, price, range, slot, damage, forSale
	sword: makeWeapon("A sword", 140, 1, 0, 10, true, 50),
	"super sword": makeWeapon("A super strong sword", 1500, 2, 0, 40, true, 65)
};

var npc = {
	findNPC(y, x) {
		var coord = [];
		for (var i = 0; i < 4; i++) {
			coord = world.calculateFromI(i, y, x);
			var value = world.classTranslator(map[coord[0]][coord[1]]);
			if (npc[value]) {
				return value;
			}
		}

		return false;
	},
	seller: {
		list: "items",
		options: {
			'b': "sell"
		},
		exitMsg: "Please come again!",
		menu() {
			display("Wecome!");
			display("Press \'B\' to buy items.");
		},

		sell(key) 	{
			if (player.gold >= items[key]["price"]) {
				player.items.push(items[key]);
				player.gold -= items[key]["price"];
				display("\nYou bought a " + key);
			} else {
				display("You don't have enough money!");
			}
		}
	}
}

var monster = {
	counter: -1,
	list: {}, // list of all the monsters created
	statuses: ["aggressive", "aggressive", "passive", "coward", "superaggressive", "passive"],
	make(i, j) { // makes a new new monster obj in list and gives it a number as the obj name (based on this.counter)
		this.counter++;
		var level = Math.floor(Math.random() * 6 + player.level)
		monster["list"][this.counter] = {
			level: level,
			hp: Math.ceil(Math.random() * level * level * 0.3 + 0.7 * level * level),
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
		var dmg = Math.ceil(this["list"][num]["level"] * .5 * Math.random() + this["list"][num]["level"]);
		player.statusChange("hp", -dmg);
		display("You were hit with " + dmg + " damage.");
	},
	attacked(num, dmg) {
		this["list"][num]["hp"] -= dmg;
		display(dmg + " damage was done to the monster.");

		if (this["list"][num]["hp"] <= 0) { // monster dead
			player.statusChange("exp", this["list"][num]["level"]);
			this.rem(num);
		} else if (this["list"][num]["status"] === "passive") {
			this["list"][num]["status"] = "aggressive";
		}
	},
	inRange(monstID) { 
		var loc = this["list"][monstID];
		var pLoc = world.playerLoc;
		var range = (loc["status"] === "aggressive") ? 10 : 15;

		return world.inRange(loc["yCoord"], loc["xCoord"], pLoc[0], pLoc[1], range);
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
			if (world.move(loc[0], loc[1], dir)) { // this will return true if move was successful (into space)
				return false;
			} // math.random gives 0-3 for the direction of moving)
		}	
	},
	moveTowards(monstID) {
		var loc = this["list"][monstID];
		var pLoc = world.playerLoc;

		var dir = world.calculate(loc["yCoord"], loc["xCoord"], pLoc[0], pLoc[1]);
		if (world.inRange(loc["yCoord"], loc["xCoord"], pLoc[0], pLoc[1], 1)) { // if monster is next to player
			this.attack(monstID);
		} else {
			world.move(loc["yCoord"], loc["xCoord"], dir);
		}
	},

	spawner() { // decides chance of spawning monster. spawn is the actual method that does spawning
		var chance = Math.ceil(Math.random() * 100); 
		if (chance === 1) { // 1% chance of spawning mmonster
			for ( ; ; ) {
				var yValue = Math.floor(Math.random() * map.length);
				var xValue = Math.floor(Math.random() * map[yValue].length);

				if (this.spawn(yValue, xValue)) {
					break;
				}
			}
		}
	},
	spawn(y, x) {
		if (map[y][x] === " " && !world.inRange(y, x, world.playerLoc[0], world.playerLoc[1], 32)) {
			var monstID = this.make(y, x);
			map.changeValue(y, x, monstID);
			world.changeClass("monster", y, x);

			display("Monster spawned");
			return true;
		} else {
			return false;
		}
	},

	controller() { // controls whether monster should move, attack, etc.
		for (var key in this.list) {
			if ( this["list"][key]["status"] === "aggressive" || this["list"][key]["status"] === "superaggressive") {
				if (this.inRange(key)) {
					this.moveTowards(key);
				} else {
					this.moveNormally(key);
				}
			} else {
				this.moveNormally(key);
			}
			
		}

		displayStatus();
		this.spawner(); // runs a chance of generating a monster after all the monsters had moved
	}
};

const controller = { // for now, controller just handles the key presses and key combinations
	keyMap: {'a': false},
	status: {seller: false, freeze: false},
	selectionI: 0,
	selectionList: [],
	npc: "",
	keypress(e) {
		var mapID = document.getElementById("map");
		if (this["status"]["freeze"] === true) {
			this.menuSelector(e, items);
		} else {
			if (e.keyCode === 65) { // 'a' key

				this.keyMap['a'] = true;

			} else if (e.keyCode >= 37 && e.keyCode <= 40) { // arrow keys

				var dir = this.dir(e);

				if (this.keyMap['a'] === true) { // if 'a' key is being held while pressing arrow keys
					display(false);
					player.attack(dir);
				} else { 						// just arrows keys
					display(false);
					world.move(world.playerLoc[0], world.playerLoc[1], dir);
				}

				monster.controller(); // monsters move in response

				if (this.status["seller"] === true) { // moving turns off seller status
					this.status["seller"] === false;
				}

			} else if (e.keyCode === 13) { // enter

				this.interact();

			} else if (e.keyCode === 66 && this["status"]["seller"] === true) { // 'b'

				this.menuListing("Here's what's for sale: ", items);
				this["status"]["freeze"] = true;

			}

		}

	},
	dir(e) { // translates e.keyCode to return a string of the direction
		if (e.keyCode == 37) {
			return 0;
		} else if (e.keyCode == 38) {
			return 1;
		} else if (e.keyCode == 39) {
			return 2;
		} else if (e.keyCode == 40) {
			return 3;
		} else {
			return false;
		}
	},
	interact() {
		var pLoc = world.playerLoc;
		console.log(npc.findNPC(pLoc[0], pLoc[1]));
		if (world.finder(pLoc[0], pLoc[1], "S", 0)) {
			this["status"]["seller"] = true;
			npc.seller["menu"]();
		}
	},

	menuSelector(e, list) {
		if (e.keyCode ===37) { //left key
			this.selectionI--;
			if (this.selectionI < 0) {
				this.selectionI = this.selectionList.length - 1;
			}
			this.displayMenuList("HI", this.selectionList[this.selectionI]);
		} else if (e.keyCode === 39) { // right key
			this.selectionI++;
			if (this.selectionI > this.selectionList.length - 1){
				this.selectionI = 0;
			}
			this.displayMenuList("HI", this.selectionList[this.selectionI]);
		} else if (e.keyCode === 13) { // enters
			npc.seller.sell(this.selectionList[this.selectionI])
		} else if (e.keyCode === 27) { // escape key
			this.status.seller = false;
			this.status.freeze = false;
			display(false);
			display("Please come again!");
		}

	},
	displayMenuList(msg, stuff) {
		display(false);
		display(msg);
		display(stuff);
	},
	menuListing(msg, list, e) {
		var keys = [];
		var currentI = 0;

		if (Array.isArray(list) === true) {
			for (var i = 0; i < list.length; i++) {
				keys[i] = list[i];
			}
		} else {
			keys = Object.keys(list);
		}

		this.displayMenuList(msg, keys[currentI]);

		this.selectionI = currentI;
		this.selectionList = keys;
	}
};


window.onload = function() {
	world.translateMap(map);
	displayStatus();

	document.onkeydown = function(e) {
		controller.keypress(e);
	};

	document.onkeyup = function(e) {
		if (e.keyCode === 65) {
			controller.keyMap['a'] = false;
		} 
	}

	var table = document.getElementById("map");
	for (var i = 0; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[i].cells.length; j++) {

			table.rows[i].cells[j].onclick = function(e) {
				if (this.className === "monster") {
					var str = /(\d*) (\d*)/.exec(this.id);
					var monstID = map[str[1]][str[2]];
					var monst = monster.list[monstID];

					if (world.inRange(monst["yCoord"], monst["xCoord"], world.playerLoc[0], world.playerLoc[1], 30)) {
						display(false);
						display("That's a monster!");
						display("hp: " + monst.hp + "\nlevel: " + monst.level + "\nstatus: " + monst.status);
					} else {
						display("That's a monster!");
					}
				} else {
					display(this.id + " " + this.className);
				}
			}
		}
	}

};