// Adds a layer to the architecture, input and output are included as layers
function add_layer() {
  if (arch.length == 0) {
    values = [];
  }

  arch.push(parseInt(input.value(), 10));
  input.value('');
  //values.push([]);
  iteration.push(0);
}

// Adds input values to input neurons
function init_input(){
  // Restart all values
  values = [];
  for (let i = 0; i < real_arch.length; i++) values.push([]);
  
  for (let i = 0; i < real_arch[0]; i++) {
    for (let j = 0; j < real_arch[1]; j++) {
      let pos = neuron_pos(0, i + 1, real_arch);
      // Set name to its real value
      let valor = parseFloat(nn[str(iteration[0])].forward["0"][i]).toExponential(2);
      let new_val = new value(str(valor), pos.x, pos.y, [3, 45, 100], 10); 
      // To be done
      new_val.set_traj(0, i + 1, j + 1, real_arch);
      values[1].push(new_val);
    }
  }
  
  // Reset animation
  layer = 1;
}

// Activates the drawing of the NN and adds as many animating objects as input neurons
function create_nn() {

  // Generate training data
  $.ajax({
    url: "/compute_json/",
    type: "POST",
    data: JSON.stringify({filename: input_file, arch: arch, maxEpoch: maxEpoch, tol: tol}),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      // Activate drawing
      real_arch = arch;
      arch = [];
      nn = result;
      init_input();
    },
    error: function(error){
      console:log('Error ${error}');
    }
  });
}

// Starts animation
function next_animation() {
  // Check wether there is an available animation
  animate = true;
  if (layer >= (real_arch.length)){
    method = "backward";
  }
}

// Starts iterations
function start_iteration() {
  if (start_it) {
    iterate_button.html("Continue iterating");
    start_it = false;
  } else {
    iterate_button.html("Stop iterating");
    start_it = true;
  }
}
