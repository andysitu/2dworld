var map = {
	map: null,
	width: 40,
	length: 40,
	start() {
		this.map = this.makeMap();
	},

	makeMap() {
		var width = this.width,
			length = this.length,
			emptySpace = translator("space"),
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