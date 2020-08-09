let stars = [];

function setup() {
  createCanvas(400, 400);

  python_button = createButton('Does something');
  python_button.position(width / 2, height / 2);
  python_button.mouseClicked(goPython);

}

// Executes the python script
function goPython() {
  const URL = 'http://localhost:8888/something';
  $.ajax({
    url: URL,
    type: "GET",
    success: function(result){
      console.log(result);
    },
    error: function(error){
      console:log('Error ${error}');
    }
  })
}

function draw() {
  background(0);
}