let cols, rows;
const w = 20;
let grid = [];
let stack = [];
let done = false

let current;

function setup() {
	createCanvas(floor($('body').width()/w) * w, floor($('body').height()/w) * w);
	$('body').css('background-color', 'rgb(51, 51, 51)');
	$('canvas').css('border', '1px white solid')

	cols = floor(width/w);
	rows = floor(height/w);

	for (let y = 0; y < rows; y++) {
		let row = [];
		for (let x = 0; x < cols; x++) {
			let cell = new Cell(x, y);
			row.push(cell);
		}
		grid.push(row);
	}

	current = grid[0][0];
}

function draw() {
	background(51);

	current.visited = true;

	if (!done) {
		fill(0, 255, 0);
		rect(current.x * w, current.y * w, w, w)
	}

	for (var y = 0; y < grid.length; y++) {
		let row = grid[y]
		for (var x = 0; x < row.length; x++) {
			row[x].show();
		}
	}

	// STEP 1:
	let next = current.checkNeighbors();
	if (next) {
		next.visited = true;

		//STEP 2:
		stack.push(current);

		//STEP 3:
		removeWalls(current, next);

		//STEP 4:
		current = next;
	} else if (stack.length > 0) current = stack.pop();
	else done = true;

}