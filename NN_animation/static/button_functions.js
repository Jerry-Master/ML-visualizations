// Adds a layer to the architecture, input and output are included as layers
function add_layer() {
  if (arch.length == 0) {
    values = [];
  }

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
  for (let i = 0; i < real_arch[0]; i++) {
    for (let j = 0; j < real_arch[1]; j++) {
      let pos = neuron_pos(0, i + 1, real_arch);
      let new_val = new value('x' + str(i), pos.x, pos.y, [3, 45, 100]);
      new_val.set_traj(0, i + 1, j + 1, real_arch);
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

// Executes the python script
function goPython() {
  const URL = '/something';
  $.ajax({
    url: URL,
    type: "GET",
  }).done(function() {
    alert('finished python script');
  });
}