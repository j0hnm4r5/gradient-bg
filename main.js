command: "",

refreshFrequency: 10000, // 10 seconds

style: ` 
	top: 0; 
	left: 0; 
	width: 100%; 
	height: 100%; 
	position: absolute; 
	z-index: -10000;
`,

render: function(output) {
	
	// global variables that remain between update calls
	window.step = 0; // the step counter
	window.colorIndices = [ // imdexes for colors from the color list
		0, // current left
		1, // next left
		2, // current right
		3 // next right
	];

	return ""; // return nothing; we're using the domEl as the bg element
},

update: function(output, domEl) {

	// modified from https://codepen.io/quasimondo/pen/lDdrF

	// the array of possible colors
	var colors = new Array(
		[213, 0, 249],
		[0, 230, 118],
		[245, 0, 87],
		[0, 176, 255],
		[41, 121, 255],
		[255, 23, 68],
		[255, 234, 0],
		[61, 90, 254],
		[118, 255, 3],
		[255, 196, 0],
		[101, 31, 255],
		[29, 233, 182],
		[0, 229, 255],
		[255, 61, 0],
		[198, 255, 0],
		[255, 145, 0]
	);

	// transition speed
	var gradientSpeed = 0.025;

	// get the four colors from the index list
	var curr_left = colors[window.colorIndices[0]];
	var next_left = colors[window.colorIndices[1]];
	var curr_right = colors[window.colorIndices[2]];
	var next_right = colors[window.colorIndices[3]];

	var istep = 1 - window.step; // inverted step counter value, for lerping

	// get the first color as a lerped color between the left current and next colors
	var r1 = Math.round(istep * curr_left[0] + window.step * next_left[0]);
	var g1 = Math.round(istep * curr_left[1] + window.step * next_left[1]);
	var b1 = Math.round(istep * curr_left[2] + window.step * next_left[2]);
	var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

	// get the second color as a lerped color between the right current and next colors
	var r2 = Math.round(istep * curr_right[0] + window.step * next_right[0]);
	var g2 = Math.round(istep * curr_right[1] + window.step * next_right[1]);
	var b2 = Math.round(istep * curr_right[2] + window.step * next_right[2]);
	var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

	// draw it to the screen by changing the background css property
	$(domEl)
		.css({
			background:
				"linear-gradient(" +
				window.step * 360 + // rotate the gradient through time
				"deg" + 
				"," + 
				color1 +
				", " +
				color2 +
				")"
		});

	// every update call, increment the counter
	window.step += gradientSpeed;

	// if the counter has passed 1, move the next colors to current colors, and pick new next colors
	if (window.step >= 1) {

		window.step %= 1;// reset the counter

		// set next to current
		window.colorIndices[0] = window.colorIndices[1];
		window.colorIndices[2] = window.colorIndices[3];

		// pick new next colors that are not the same as the current colors
		window.colorIndices[1] =
			(window.colorIndices[1] +
				Math.floor(1 + Math.random() * (colors.length - 1))) %
			colors.length;
		
		window.colorIndices[3] =
			(window.colorIndices[3] +
				Math.floor(1 + Math.random() * (colors.length - 1))) %
			colors.length;
	};
}
