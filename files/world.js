world = {
	width: 1000,
	length: 1000,
	pastBoundary(obj) {
		var x = obj.getX(),
			y = obj.getY(),
			rx = obj.getXRadius(),
			ry = obj.getYRadius();

		if (x-rx < -this.width || x+rx > this.width 
			|| y-ry < -this.height || y+ry > this.height ) {
			return true;
		} else {
			return false;
		}
	}
}