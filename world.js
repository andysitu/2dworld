var map =
	[	["A","A","A","A","A","A","A","A"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "W"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"],
		["&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "&nbsp", "f"] ];

var world = {
	playerLoc: [0,0],
	translateMap(maps) {
		var string = "";

		for (var i = 0; i < maps.length; i++) {
			for (var j = 0; j < maps[i].length; j++) {
				if (maps[i][j] == "P") {
					this.playerLoc = [i, j];
					string += maps[i][j];
				} else {
					string += maps[i][j];
				}
			}
			string += "\n"
		}

		return string;
	},

	displayMap(str) {
		var mapLoc = document.getElementById("map");
		mapLoc.innerHTML = str;
	},

	move(arr, y, x, y1, x1) {
		if (arr[y1][x1] == "&nbsp") {
			arr[y1][x1] = arr[y][x];
			arr[y][x] = "&nbsp";
		}
	},
};

window.onload = function() {
	world.displayMap(world.translateMap(map));
	var mapID = document.getElementById("map");

	document.onkeydown = function(e) {
		if (e.keyCode == 37) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0], world.playerLoc[1] - 1);
			world.displayMap(world.translateMap(map));
		} else if (e.keyCode == 38) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0] - 1, world.playerLoc[1]);
			world.displayMap(world.translateMap(map));
		} else if (e.keyCode == 39) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0], world.playerLoc[1] + 1);
			world.displayMap(world.translateMap(map));
		} else if (e.keyCode == 40) {
			world.move(map, world.playerLoc[0], world.playerLoc[1], world.playerLoc[0] + 1, world.playerLoc[1]);
			world.displayMap(world.translateMap(map));
};