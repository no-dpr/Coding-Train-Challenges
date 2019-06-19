let vehicles;
let food = [];
let poison = [];

let debug = true;

function setup() {
  createCanvas($('body').width(), $('body').height());
  $('body').css('background-color', 'rgb(51, 51, 51)');
  vehicles = new Population(10);
  for (let i = 0; i < 100; i++) {
    food.push(createVector(random(width), random(height)));
  }
  for (let i = 0; i < 100; i++) {
    poison.push(createVector(random(width), random(height)));
  }
}

function mouseDragged() {
  vehicles.vehicles.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background($('body').css('background-color'));

  if (random(1) < 0.05) food.push(createVector(random(width), random(height)));
  if (random(1) < 0.01) poison.push(createVector(random(width), random(height)));

  for (let i = 0; i < food.length; i++) {
    noStroke();
    fill(0, 255, 0);
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  for (let i = 0; i < poison.length; i++) {
    noStroke();
    fill(255, 0, 0);
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }

  vehicles.behaviors(food, poison);
  vehicles.boundaries();
  vehicles.update();
  vehicles.display();

  vehicles.addChild();
  vehicles.kill();
}

function mousePressed() {
  debug = !debug;
}
