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

		function f1(i) {
			map.push([]);
		}

		function f2(j, i) {
			map[i][j] = emptySpace;
		}

		forfor(width, length, f1, f2, this);

		return map;
	}
}