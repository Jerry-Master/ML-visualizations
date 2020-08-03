let w2 = 156;
let w1 = 92;
let fr = 20;

function setup() {
    createCanvas(400, 400);
    frameRate(fr);
    textSize(20);
}

function draw() {
    background(191);
    strokeWeight(1);
    stroke(0);
    // imput circles
    fill(255)
    circle(100, 100, 50);
    circle(100, 300, 50);
    textAlign(CENTER);
    fill(0);
    text('x_1', 100, 105);
    text('x_2', 100, 305);

    // output circle
    fill(255);
    circle(300, 200, 50);
    fill(0);
    text('y', 300, 205);

    // draw the lines with wheight
    strokeWeight(5);
    // w1
    stroke(w1);
    line(122, 111, 277, 188);
    // w2
    stroke(w2);
    line(122, 288, 277, 211);

    if (w1 < 255) {
        w1 += 1;
    }
    if (w2 > 0) {
        w2 -= 1;
    }
}
