let arch = [];
let real_arch = [];

let input, button, button2, animate_button, texto;

let animate = false;
let layer = 0;
let values = [];


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
}

function keyPressed(){
  if (keyCode == RETURN){
    add_layer();
  }
}

// Adds a layer to the architecture, input and output are included as layers
function add_layer() {
  if (arch.length == 0) {values = [];}
  
  arch.push(parseInt(input.value(), 10));
  input.value('');
  values.push([]);
}

// Activates the drawing of the NN and adds as many animating objects as input neurons
function create_nn() {
  // Activate drawing
  real_arch = arch;
  arch = [];
  
  // Adds objects
  for (let i = 0; i < real_arch[0]; i++){
    for (let j = 0; j < real_arch[1]; j++){
      let pos = neuron_pos(0, i+1, real_arch);
      let new_val = new value('x'+str(i), pos.x, pos.y, [3, 45, 100]);
      new_val.set_traj(0, i+1, j+1, real_arch); 
      values[1].push(new_val); 
    }
  }
  
  // Reset animation
  layer = 1;
}

// Starts animation
function next_animation() {
  // Check wether there is an available animation
  animate = (layer < (real_arch.length));
}

function draw() {
  background(220);

  // Mark corners
  corners();

  // Draw NN
  draw_nn(real_arch);

  // Display animations
  display_anim();
  
}