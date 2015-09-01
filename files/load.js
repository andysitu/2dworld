window.addEventListener("load", function() {
	var canvas = document.createElement("canvas"),
		ctx = canvas.getContext('2d');

	canvas.width = 1000;
	canvas.height = 800;
	var cont = document.getElementById("canvas_container");
	cont.appendChild(canvas);
})