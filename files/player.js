var player = {
	x: 0,
	getX() { return this.x; },
	y: 0,
	getY() { return this.y; },
	xRadius: 10,
	getXRadius() { return this.xRadius; },
	yRadius: 10,
	getYRadius() { return this.yRadius; }
	speed: 100,

	moveX = 0,
	moveY = 0,

	update(modifier) {
		if (this.moveX != 0) {
			this.x += this.speed * modifier * this.moveX;
		}
		if (this.moveY != 0) {
			this.y += this.speed * modifier * this.moveY;
		}
	} 
};