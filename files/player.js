var player = {
	x: 0,
	getX() { return this.x; },
	y: 0,
	getY() { return this.y; },
	xRadius: 10,
	getXRadius() { return this.xRadius; },
	yRadius: 10,
	getYRadius() { return this.yRadius; },
	speed: 100,

	moveX: 0,
	moveY: 0,

	keysDown: {},

	update(modifier) {
		if (38 in this.keysDown) { //  up
			this.y -= this.speed * modifier;
		}
		if (40 in this.keysDown) { //  down
			this.y += this.speed * modifier;
		}
		if (37 in this.keysDown) { //  left
			this.x -= this.speed * modifier;
		}
		if (39 in this.keysDown) { //  right
			this.x += this.speed * modifier;
		}
	},
};