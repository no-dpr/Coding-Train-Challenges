let vehicles;
let food = [];
let poison = [];

let debug = true;

function setup() {
  createCanvas($('body').width(), $('body').height());
  $('body').css('background-color', 'rgb(51, 51, 51)');
  vehicles = new Population(10);
  for (let i = 0; i < 10; i++) {
    food.push(createVector(random(width), random(height)));
  }
  for (let i = 0; i < 10; i++) {
    poison.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background($('body').css('background-color'));

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

  // vehicle.seek(createVector(mouseX, mouseY));
  vehicles.behaviors(food, poison);
  vehicles.update();
  vehicles.display();
}

function mousePressed() {
  debug = !debug;
}
