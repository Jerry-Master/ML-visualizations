//
//
//         UTILITY FUNCTIONS
//
//

// Returns the points between two given
// time is the number of frames the animation will need
function trajectory(begin, end, time=100) {
  //begin = createVector(begin[0], begin[1]);
  //end = createVector(end[0], end[1]);
  
  let tr = [];
  tr.push(begin);
  
  let dir = p5.Vector.sub(end, begin);
  dir.mult(1/time);
  for (let i = 0; i < time; i++){
    let next = p5.Vector.add(begin, dir);
    tr.push(next);
    begin = next;
  }
  return tr;
}

// Sort values by the y coordinate
function sort_by_y(a, b){
  return a.y < b.y;
}

//
//
//        MAIN FUNCTION
//
//

function display_anim() {
  
  let total_layers = values.length;
  for (let i = 0; i < total_layers; i++){
    for (let j = 0; j < values[i].length; j++){
      values[i][j].show();
    }
  }
  if (animate == true) {
    // do current animation
    let finished = true;
    for (let i = 0; i < total_layers; i++){
      for (let j = 0; j < values[i].length; j++){
        // Animation ends if all objects have finished
        finished = values[i][j].move() && finished;
      }
    }

    if (finished) {
      // end animation
      animate = false;
      
      // Clean the neurons, leaving just one value on each one
      values[layer].sort(sort_by_y);
      let aux = [values[layer][0]];
      for (let i = 1; i < values[layer].length; i++){
        if (abs(values[layer][i].y - values[layer][i-1].y) > 1) {
          aux.push(values[layer][i]);
        }
      }
      values[layer] = aux;
      
      // Create more object to animate if needed
      for (let i = 0; i < values[layer].length; i++){
        for (let j = 0; j < real_arch[layer+1]; j++){
          // Duplicate the current value
          let new_val = new value();
          new_val.x = values[layer][i].x;
          new_val.y = values[layer][i].y;
          new_val.color = values[layer][i].color;
          new_val.text = str(i) + '_' + str(j);
          new_val.set_traj(layer, i+1, j+1, real_arch);
          values[layer+1].push(new_val);
          
        }
      }
      
      // Remove old objects
      values[layer] = [];
      
      // set identifier of next animation
      layer = (layer + 1);
    }
  }
  
}


//
//
//        OBJECT TO ANIMATE
//
//

class value {
  
  constructor(text, x, y, color) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.trajectory = [];
    this.time = 0;
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
    let end = neuron_pos(layer+1, j, arch);
    this.trajectory = trajectory(begin, end);
    
  }

  
  show() {
    
    fill(this.color[0], this.color[1], this.color[2]);
    text(this.text, this.x, this.y);
    textSize(20);
    
  }
}