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
	translateMap(maps) {
		var string = "";

		for (var i = 0; i < maps.length; i++) {
			for (var j = 0; j < maps[i].length; j++) {
				string += maps[i][j];
			}
			string += "\n"
		}

		return string;
	},

	displayMap(str) {
		var mapLoc = document.getElementById("map");
		mapLoc.innerHTML = str;
	},
};

window.onload = function() {
	world.displayMap(world.translateMap(map));
};