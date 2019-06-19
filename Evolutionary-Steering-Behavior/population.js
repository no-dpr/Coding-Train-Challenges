class Population {
  constructor(size) {
    this.vehicles = [];
    for (let i = 0; i < size; i++) {
      const x = random(width);
      const y = random(height);
      this.vehicles.push(new Vehicle(x, y));
    }
  }

  behaviors(good, bad) {
    for (let i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].behaviors(good, bad);
    }
  }

  update() {
    for (let i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].update();
    }
  }

  boundaries() {
    for (let i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].boundaries();
    }
  }

  display() {
    for (let i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].display();
    }
  }

  kill() {
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      if (this.vehicles[i].dead()) {
        const x = this.vehicles[i].pos.x;
        const y = this.vehicles[i].pos.y;

        food.push(createVector(x, y));

        this.vehicles.splice(i, 1);
      }
    }
  }

  addChild() {
    for (let i = this.vehicles.length - 1; i >= 0; i--) {
      let child = this.vehicles[i].clone();
      if (child != null)  {
        child.mutate();
        this.vehicles.push(child);
      }
    }
  }
}
