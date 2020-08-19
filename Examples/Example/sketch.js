let stars = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 90; i++)
    stars.push(new star(random(width), random(height), random(3,7)));
}

function draw() {
  background(0);
  for (let i = 0; i < stars.length; i++){
    stars[i].move();
    if (!stars[i].show()) {
      stars.splice(i,1);
      stars.push(new star(random(width), random(height), random(3,7)));
    }
  }
}