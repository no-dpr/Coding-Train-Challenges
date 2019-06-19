class Population {
  constructor(size) {
    this.vehicles = [];
    for (let i = 0; i < size; i++){
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

  display() {
    for (let i = 0; i < this.vehicles.length; i++) {
      this.vehicles[i].display();
    }
  }

  kill() {
    for (let i = 0; i < this.vehicles.length; i++) {
      if (this.vehicles[i].dead()) {
        this.vehicles.splice(i, 1);
      }
    }
  }
}
