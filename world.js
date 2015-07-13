var world = {
	playerLoc: [0,0],
	translateMap(maps) {
		var map = document.getElementById("map");
		
		for (var i = 0; i < maps.length; i++) {
			var tr = document.createElement("tr");
			map.appendChild(tr);
			for (var j = 0; j < maps[i].length; j++) {
				var th = document.createElement("th");
				tr.appendChild(th);
			}

		}
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