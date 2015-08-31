var map = {
	map: null,
	start() {
		this.map = this.makeMap();
	},

	makeMap() {
		var width = 40,
			length = 40,
			emptySpace = "s",
			map = [];

		for (var i = 0; i < width; i++) {
			map.push([]);
			for (var j = 0; j < length; j++) {
				map[i][j] = emptySpace;
			}
		}

		return map;
	}
}