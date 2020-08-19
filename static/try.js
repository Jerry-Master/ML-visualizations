// Returns the points between two given
// time is the number of frames the animation will need
function trajectory(begin, end, time) {
  begin = createVector(begin[0], begin[1]);
  end = createVector(end[0], end[1]);
  
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