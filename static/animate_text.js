//
//
//         UTILITY FUNCTIONS
//
//

// Returns the points between two given
// time is the number of frames the animation will need
function trajectory(begin, end, time = 100) {
  //begin = createVector(begin[0], begin[1]);
  //end = createVector(end[0], end[1]);

  let tr = [];
  tr.push(begin);

  let dir = p5.Vector.sub(end, begin);
  dir.mult(1 / time);
  for (let i = 0; i < time; i++) {
    let next = p5.Vector.add(begin, dir);
    tr.push(next);
    begin = next;
  }
  return tr;
}

// Sort values by the y coordinate
function sort_by_y(a, b) {
  if (isChrome) return a.y - b.y;
  return a.y < b.y;
}

//
//
//        MAIN FUNCTION
//
//

function display_anim() {

  let total_layers = values.length;
  for (let i = 0; i < total_layers; i++) {
    for (let j = 0; j < values[i].length; j++) {
      values[i][j].show();
    }
  }
  if (animate == true) {
    if (method == "forward") forward(total_layers);
    else backward();
  }

}

// Forward pass
function forward(total_layers) {
  // do current animation
  let finished = true;
  for (let i = 0; i < total_layers; i++) {
    for (let j = 0; j < values[i].length; j++) {
      // Animation ends if all objects have finished
      finished = values[i][j].move() && finished;
    }
  }

  if (finished) {
    // end animation
    animate = false;

    // Clean the neurons, leaving just one value on each one
    values[layer].sort(sort_by_y);
    let valor = parseFloat(nn[str(iteration[0])].forward[str(layer)][0]).toExponential(2);
    values[layer][0].text = str(valor);
    let curr_neuron = 1;
    let aux = [values[layer][0]];
    let enter = 0;
    for (let i = 1; i < values[layer].length; i++) {
      if (abs(values[layer][i].y - values[layer][i - 1].y) > 0.1) {
        // Change text of value
        enter = enter+1;
        let valor = parseFloat(nn[str(iteration[0])].forward[str(layer)][curr_neuron]).toExponential(2);
        curr_neuron++;
        values[layer][i].text = str(valor);
        aux.push(values[layer][i]);
      }
    }
    console.log(enter);
    console.log(aux);
    values[layer] = aux;
    console.log(values);

    // Create more object to animate if needed
    for (let i = 0; i < values[layer].length; i++) {
      for (let j = 0; j < real_arch[layer + 1]; j++) {
        // Duplicate the current value
        let new_val = new value();
        new_val.x = values[layer][i].x;
        new_val.y = values[layer][i].y;
        new_val.color = values[layer][i].color;
        new_val.text = values[layer][i].text;
        new_val.set_traj(layer, i + 1, j + 1, real_arch);
        new_val.text_size = values[layer][i].text_size;
        values[layer + 1].push(new_val);

      }
    }

    // Remove old objects, except for output layer
    if (layer < real_arch.length - 1) values[layer] = [];

    // set identifier of next animation
    layer++;
  }
}

// Backward pass
function backward() {
  if (layer == 1) {
    init_input();
    method = "forward";
  } else {
    layer--;
    iteration[layer-1] = iteration[layer-1] + step_size;
    if (iteration[layer-1] >= maxEpoch) iteration[layer-1] = maxEpoch-1;
  }
  animate = false;
}


//
//
//        OBJECT TO ANIMATE
//
//

class value {

  constructor(text, x, y, color, size) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.trajectory = [];
    this.time = 0;
    this.text_size = size;
  }

  // Returns a boolean stating if finished
  move() {
    if (this.time < this.trajectory.length) {

      this.x = this.trajectory[this.time].x;
      this.y = this.trajectory[this.time].y;
      this.time++;

      return false;

    }

    return true;

  }

  // Compute trajectory based on current neuron(layer, i) and next neuron(layer+1, j)
  set_traj(layer, i, j, arch) {

    this.time = 0;

    let begin = neuron_pos(layer, i, arch);
    let end = neuron_pos(layer + 1, j, arch);
    this.trajectory = trajectory(begin, end);

  }


  show() {

    fill(this.color[0], this.color[1], this.color[2]);
    stroke(this.color[0], this.color[1], this.color[2]);
    text(this.text, this.x, this.y);
    textSize(this.text_size);

  }
}
