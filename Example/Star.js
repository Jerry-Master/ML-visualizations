class star{
  constructor(x, y, r){
    this.x = x; this.y = y; this.r = r;
    this.x0 = x; this.y0 = y;
  }
  
  outOfBounds(){
    return this.x > width || this.x < 0 || 
      this.y > height || this.y < 0; 
  }
  
  show(){
    if (!this.outOfBounds()){
      noStroke();
      fill(255);
      let v = [this.x - width/2, this.y - height/2];
      let modul = sqrt(v[0]**2 + v[1]**2);
      let ratio = map(modul, 0, sqrt((width/2)**2 + (height/2)**2), 1, 1.5);
      ellipse(this.x, this.y, this.r*ratio, this.r*ratio);
      stroke(255);
      fill(10, 255);
      line(this.x, this.y, this.x0, this.y0);
      return true;
    }
    else return false;
  }
  
  move(){
    let v = [this.x - width/2, this.y - height/2];
    let modul = sqrt(v[0]**2 + v[1]**2);
    let speed = 1/35;
    this.x += v[0] * speed;
    this.y += v[1] * speed;
  }
}