class Cell{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.walls = [true, true, true, true];
		this.visited = false;
	}

	checkNeighbors() {
		let neighbors = [];

		let top = !(this.y - 1 < 0) ? grid[this.y-1][this.x] : undefined;
		let right = !(this.x + 1 > grid[0].length - 1) ? grid[this.y][this.x+1] : undefined;
		let bottom = !(this.y + 1 > grid.length - 1) ? grid[this.y+1][this.x] : undefined;
		let left = !(this.x - 1 < 0) ? grid[this.y][this.x-1] : undefined;

		if (top && !top.visited) neighbors.push(top);
		if (right && !right.visited) neighbors.push(right);
		if (bottom && !bottom.visited) neighbors.push(bottom);
		if (left && !left.visited) neighbors.push(left);

		if (neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}

	show() {
		stroke(255);
		const x = this.x * w;
		const y = this.y * w;

		if (this.walls[0]) line(x, y, x + w, y);
		if (this.walls[1]) line(x + w, y, x + w, y + w);
		if (this.walls[2]) line(x + w, y + w, x, y + w);
		if (this.walls[3]) line(x, y + w, x, y);

		if (this.visited) {
			noStroke();
			fill(127, 0, 127, 100) 
			rect(x, y, w, w);
		}
	}
}

function removeWalls(a, b) {
	const x = a.x - b.x;

	if (x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;
	} else if (x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}

	const y = a.y - b.y

	if (y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;
	} else if (y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}