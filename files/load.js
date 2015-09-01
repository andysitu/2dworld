var canvas,
	ctx;

window.addEventListener("load", function() {
	canvas = document.createElement("canvas");
	ctx = canvas.getContext('2d');

	canvas.width = 1000;
	canvas.height = 600;
	var cont = document.getElementById("canvas_container");
	cont.appendChild(canvas);

	function main() {
		var now = Date.now();
		var modifier = (now - past) / 1000;

		player.update(modifier);
		player.draw(ctx);

		past = now;

		requestAnimationFrame(main);
	}

	var past = Date.now();
	main();

	window.addEventListener("keydown", function(e) {
		player.keysDown[e.keyCode] = true;
	}, false);
	window.addEventListener("keyup", function(e) {
		player.keysDown[e.keyCode] = false;
	}, false);
})