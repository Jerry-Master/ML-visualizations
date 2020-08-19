// Draws 4 squares at the corners
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

// Return the x and y of a neuron
// layer is 0-based, i is 1-based
function neuron_pos(layer, i, arch) {
  let n = arch.length;
  let hor_dist = width / (n+1);
  let x = (layer+1) * hor_dist;
  
  let num_neuron = arch[layer];
  let ver_dist = height / (num_neuron+1);
  let y = i * ver_dist;
  
  return createVector(x, y);
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
    draw_connections(i, i+1, arch[i], arch[i+1], rad, arch); 
  }
}


// Draws num_neur neurons in the x_pos, equally space among the y direction
function draw_layer(num_neur, x_pos, diam) {
  let ver_dist = height / (num_neur+1);
  for (let i = 1; i <= num_neur; i++) {
    fill(255, 255, 255);
    stroke(0);
    circle(x_pos, ver_dist * i, diam);
  }
}

// Draw arrows between layer i and j with ni and nj number of neurons
function draw_connections(i, j, ni, nj, rad, arch) {
  for (let ii = 1; ii <= ni; ii++) {
    for (let jj = 1; jj <= nj; jj++) {
      
      let begin = neuron_pos(i, ii, arch);
      let end = neuron_pos(j, jj, arch);
      
      let r = p5.Vector.sub(end, begin);
      r.mult(rad / r.mag());
      
      begin.add(r);
      r.mult(1.2);
      end.sub(r);
      
      // Obtain color from real weights
      let curr_layer = nn[str(iteration[i])].weights[str(i)];
      let neuron_from = ii-1;
      let neuron_to = jj-1;
      let alpha = curr_layer[neuron_to][neuron_from];
      let scale = 200;
      draw_arrow(begin, end, alpha * scale);
    }
  }
}

// Draws an arrow with begin and end as the ending points of the arrow
function draw_arrow(begin, end, alpha){
  //begin = createVector(begin[0], begin[1]);
  //end = createVector(end[0], end[1]);
  if (alpha < 0) {
    stroke(255, 0, 0, -alpha);
    fill(255, 0, 0, -alpha);
  } else {
    stroke(0, 0, 255, alpha);
    fill(0, 0, 255, alpha);
  }
  line(begin.x, begin.y, end.x, end.y);
  let v = p5.Vector.sub(end, begin);
  v.mult(3 / v.mag());
  let a1 = p5.Vector.add(end, v);
  v.rotate(2 * PI / 3);
  let a2 = p5.Vector.add(end, v);
  v.rotate(2 * PI / 3);
  let a3 = p5.Vector.add(end, v);
  triangle(a1.x, a1.y, a2.x, a2.y, a3.x, a3.y);
}






