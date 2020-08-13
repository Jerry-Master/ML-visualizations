// no protect
let arch = [];
let real_arch = [];

let input, button, button2, animate_button, iterate_button, texto;

let animate = false, method = "forward";
let layer = 0;
let values = [];

let nn, iteration = [], start_it = false;


function preload(){
  nn = loadJSON('static/out2.json');
} 


function setup() {
  createCanvas(800, 600);
  
  input = createInput();
  input.position(width / 2, height - 30);

  button = createButton('Add layer');
  button.position(input.x + input.width, input.y);
  button.size(100, input.height);
  button.mousePressed(add_layer);

  button2 = createButton('Create');
  button2.position(button.x + button.width, button.y);
  button2.size(70, input.height);
  button2.mousePressed(create_nn);

  texto = createElement('h2', 'Enter architecture');
  texto.position(input.x, input.y - 80);
  texto.size(400, 50);

  textAlign(CENTER);
  textSize(50);

  animate_button = createButton('Animate');
  animate_button.position(width / 2, 0);
  animate_button.mousePressed(next_animation);
  
  iterate_button = createButton('Start iterating');
  iterate_button.position(width / 2 - 150, 0);
  iterate_button.mousePressed(start_iteration);
  
}

function keyPressed(){
  if (keyCode == RETURN){
    add_layer();
  }
}


function draw() {
  background(220);

  // Mark corners
  corners();

  // Draw NN
  draw_nn(real_arch);

  // Display animations
  display_anim();
  
  // Increase iterations if needed
  if (start_it) {
    let n = iteration.length;
    for (let i = 0; i < n; i++) {
      iteration[i] = iteration[i] + 100;
      if (iteration[i] >= 10000) iteration[i] = 9999; 
    }
  }
  
}