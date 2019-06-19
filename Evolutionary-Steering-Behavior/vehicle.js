const mr = 0.1;

class Vehicle {
  constructor(x, y, dna = {
    food: {
      weight: random(0, 1),
      perception: random(0, 1)
    },
    poison: {
      weight: random(0, 1),
      perception: random(0, 1)
    }
  }) {
    this.acc = createVector(0, 0);
    this.vel = createVector(0, -2);
    this.pos = createVector(x, y);
    this.r = 4;
    this.maxspeed = 5;
    this.maxforce = 0.5;

    this.dna = {};
    this.dna.food = dna.food;
    this.dna.poison = dna.poison;

    this.health = 1;
  }

  update() {
    this.health -= 0.001;

    this.vel.add(this.acc);

    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);

    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  dead() {
    return this.health < 0;
  }

  behaviors(good, bad) {
    let steerG = this.eat(good, 0.2, map(this.dna.food.perception, 0, 1, 0, 100));
    let steerB = this.eat(bad, -0.5, map(this.dna.poison.perception, 0, 1, 0, 100));

    steerG.mult(map(this.dna.food.weight, 0, 1, -2, 2));
    steerB.mult(map(this.dna.poison.weight, 0, 1, -2, 2));

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  clone() {
    if (random(1) < map(this.health, 0, 1, 0, 0.001)) return new Vehicle(this.pos.x, this.pos.y, this.dna);
    else return null;
  }

  mutate() {
    const chooser = {
      outer: random(1),
      inner: random(1)
    }

    const vals = {}

    if (chooser.outer < 0.5) vals.outer = 'food';
    else vals.outer = 'poison'

    if (chooser.inner < 0.5) vals.inner = 'weight';
    else vals.inner = 'perception';

    if (random(1) < mr) this.dna[vals.outer][vals.inner] += random(-0.01, 0.01);
  }

  eat(list, nutrition, perception) {
    let record = Infinity;
    let closest = null;
    for (let i = list.length - 1; i >= 0; i--) {
      let d = this.pos.dist(list[i]);

      if (d < this.maxspeed) {
        list.splice(i, 1);
        this.health += nutrition;
      } else if (d < record && d < perception) {
        record = d;
        closest = list[i];
      }
    }
    if (closest != null) return this.seek(closest);

    return createVector(0, 0);

  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);

    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);

    return steer;
  }

  boundaries() {

    let desired = null;

    let d = 25;

    if (this.pos.x < d) {
      desired = createVector(this.maxspeed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-this.maxspeed, this.vel.y);
    }

    if (this.pos.y < d) {
      desired = createVector(this.vel.x, this.maxspeed);
    } else if (this.pos.y > height - d) {
      desired = createVector(this.vel.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  display() {
    const red = color(255, 0, 0);
    const green = color(0, 255, 0);

    const col = lerpColor(red, green, this.health)

    const angle = this.vel.heading() + PI / 2;

    push();

    translate(this.pos.x, this.pos.y);
    rotate(angle)

    strokeWeight(2);

    if (debug) {
      noFill();

      strokeWeight(3);

      stroke(0, 255, 0);
      ellipse(0, 0, map(this.dna.food.perception, 0, 1, 0, 100), map(this.dna.food.perception, 0, 1, 0, 100))
      line(0, 0, 0, -map(this.dna.food.weight, 0, 1, -2, 2) * 20);

      strokeWeight(2);

      stroke(255, 0, 0);
      ellipse(0, 0, map(this.dna.poison.perception, 0, 1, 0, 100), map(this.dna.poison.perception, 0, 1, 0, 100))
      line(0, 0, 0, -map(this.dna.poison.weight, 0, 1, -2, 2) * 20);
    }

    fill(col);
    stroke(col);

    beginShape();

    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);

    endShape(CLOSE);

    pop();
  }
}
