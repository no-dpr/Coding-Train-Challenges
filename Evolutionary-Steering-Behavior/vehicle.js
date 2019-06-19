class Vehicle {
  constructor(x, y) {
    this.acc = createVector(0, 0);
    this.vel = createVector(0, -2);
    this.pos = createVector(x, y);
    this.r = 6;
    this.maxspeed = 8;
    this.maxforce = 0.2;

    this.dna = [];
    for (let i = 0; i < 2; i++) this.dna.push(random(-5, 5));

    this.health = 1;
  }

  update() {
    this.health -= 0.01;

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
    let steerG = this.eat(good, 0.1);
    let steerB = this.eat(bad, -0.1);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);

    this.applyForce(steerG);
    this.applyForce(steerB);
  }

  eat(list, nutrition) {
    let record = Infinity;
    let closest = -1;
    for (let i = 0; i < list.length; i++) {
      let d = this.pos.dist(list[i]);
      if (d < record) {
        record = d;
        closest = i;
      }
    }

    if (record < 5) {
      list.splice(closest, 1);
      this.health += nutrition;
    }
    else if (closest > -1) return this.seek(list[closest]);

    return createVector(0, 0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);

    desired.setMag(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);

    return steer;
  }

  display() {
    const red = color(255, 0, 0);
    const green = color(0, 255, 0);

    const col = lerpColor(red, green, this.health)

    const angle = this.vel.heading() + PI / 2;

    push();

    translate(this.pos.x, this.pos.y);
    rotate(angle)

    if (debug) {
      stroke(0, 255, 0);
      line(0, 0, 0, -this.dna[0] * 20);

      stroke(255, 0, 0);
      line(0, 0, 0, -this.dna[1] * 20);
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
