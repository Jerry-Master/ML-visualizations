let step_counter = 0;
let arch = [2,3,1];

// the text for each line (should be readed from file?)
let text_lines = ['repeat','  forall n in 1≤n≤N','    1. Forward pass Present xn and compute the outputs z(l) of all the units','    2. Backward pass Compute the deltas δ(l) j \n    of all the units, from l=c+1 down to l=1: (l) ′ (c+1) (c+1)','      a. if l=c+1 then δj :=g(aj )·(zj ','      b. if l < c + 1 then δ(l) := g′(a(l)) 􏰅 δ(l+1)w(l+1) j jqqqj n (l) (l) (l−1)','    3.Set∆wji:=δj ·zi','  end','  Update the weights as wji (t+1) := wji (t)+α ','until convergence or max. epochs'];

function setup() {
    createCanvas(1400, 700);

    textSize(20);
    button = createButton('Next step');
    button.position(700, 500);
    button.size(100, 20);
    button.mousePressed(next_step);
}

function draw() {
    background(191);
    draw_nn(arch);
    draw_lines();
}

function next_step() {
    step_counter += 1;
    if (step_counter >= text_lines.length) step_counter = 0;
}

function f(i) {
    var a = 100 + 30 * i;
    if (i>=4) a += 30;
    return a;
}

function draw_lines() {
    var costat = 700;
    for (let i=0; i < text_lines.length; ++i) {
        if (i == step_counter) {
            fill(255,0,0);
            text(text_lines[i], costat, f(i))
        }
        else {
            fill(0)
            text(text_lines[i], costat, f(i));
        }
    }
}
