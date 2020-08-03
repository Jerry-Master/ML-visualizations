let arch = [];
let real_arch = [];

let input, button, button2, texto;

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
}

// Adds a layer to the architecture, input and output are included as layers
function add_layer(){
  arch.push(parseInt(input.value(), 10));
  input.value('');
}

// Activates the drawing of the NN
function create_nn(){
  print(arch);
  real_arch = arch;
  arch = [];
}

function draw() {
  background(220);
  
  // Mark corners
  corners();
  
  // Draw NN
  draw_nn(real_arch);
}

function corners(){
  fill(100,0,30);
  rect(0,0, 50, 50);
  
  fill(100,0,30);
  rect(750,0, 50, 50);
  
  fill(100,0,30);
  rect(0,550, 50, 50);
  
  fill(100,0,30);
  rect(750,550, 50, 50);
}


// Draws the architecture given of a neural network
function draw_nn(arch){
  let n = arch.length;
  let rad = 25;
  
  // Draw neurons
  let hor_dist = width / (n+1)
  for (let i = 0; i < n; i++){
    draw_layer(arch[i], (i+1) * hor_dist, 2*rad); 
  }
  
  // Draw weights
  for (let i = 0; i < n-1; i++){
    draw_connections(i, i+1, arch[i], arch[i+1], hor_dist, rad); 
  }
}


// Draws num_neur neurons in the x_pos, equally space among the y direction
function draw_layer(num_neur, x_pos, diam) {
  let ver_dist = height / (num_neur+1);
  for (let i = 1; i <= num_neur; i++) {
    fill(255, 255, 255);
    circle(x_pos, ver_dist * i, diam);
  }
}

// Draw arrows between layer i and j with ni and nj number of neurons
function draw_connections(i, j, ni, nj, hor_dist, rad) {
  for (let ii = 1; ii <= ni; ii++) {
    for (let jj = 1; jj <= nj; jj++) {
      
      let begin = createVector((i+1)*hor_dist, height / (ni+1) * ii);
      let end = createVector((j+1)*hor_dist, height / (nj+1) * jj);
      
      let r = p5.Vector.sub(end, begin);
      r.mult(rad / r.mag());
      
      begin.add(r);
      r.mult(1.2);
      end.sub(r);
      
      draw_arrow(begin, end);
    }
  }
}

// begin and end are vectors representing the ending points of the arrow
function draw_arrow(begin, end){
  //begin = createVector(begin[0], begin[1]);
  //end = createVector(end[0], end[1]);
  line(begin.x, begin.y, end.x, end.y);
  let v = p5.Vector.sub(end, begin);
  v.mult(3 / v.mag());
  let a1 = p5.Vector.add(end, v);
  v.rotate(2 * PI / 3);
  let a2 = p5.Vector.add(end, v);
  v.rotate(2 * PI / 3);
  let a3 = p5.Vector.add(end, v);
  fill(0,0,0);
  triangle(a1.x, a1.y, a2.x, a2.y, a3.x, a3.y);
}






