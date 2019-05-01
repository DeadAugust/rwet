let defSize = 8;
let defCol = "black";
let defSpeed = 1;


class Letter {
  constructor(parameters) {
    // constructor(c, s, col, spd, x, y, hX, hY){
    this.char = parameters.c;
    this.size = parameters.s || defSize;
    this.grey = parameters.grey || defCol;
    this.col = parameters.col || defCol;
    this.speed = parameters.spd || defSpeed;
    this.x = int(parameters.x || random(1, width));
    this.y = int(parameters.y || random(1, height));
    this.homeX = parameters.hX;
    this.homeY = parameters.hY;
    this.farX = this.homeX - this.x;
    this.farY = this.homeY - this.y;
    // this.farX = abs(this.homeX - this.x);
    // this.farY = abs(this.homeY - this.y);
    // this.step = 50; //100 moves to home?
    this.step = int(random(16, 24)) * int(random(2, 4));
    this.clock = this.step; //to count down
    //this.poem  //from python JSON
  }
  move() {


  }
  display() {
    fill(this.grey);
    // fill(this.col);
    textSize(this.size);
    text(this.char, this.x, this.y);
  }
  goHome() {
    //trying counter now
    if (this.clock != 0){
      this.x = this.x + (this.farX / this.step);
      this.y = this.y + (this.farY / this.step);
      this.clock -= 1;
    }

    //flicker issues (esp. with 0)
    /*
    if (this.x > this.homeX) {
      this.x = int(this.x - (this.farX / this.step));
    } else if (this.x < this.homeX) {
      this.x = int(this.x + (this.farX / this.step));
    }
    if (this.y > this.homeY) {
      this.y = int(this.y - (this.farY / this.step));
    } else if (this.y < this.homeY) {
      this.y = int(this.y + (this.farY / this.step));
    }
    */

    //slightly correct, but way small
    /*
    let goX;
    let goY;
    if (this.x > this.homeX) {
      goX = (this.x - this.homeX) / 2;
    } else if (this.x < this.homeX) {
      goX = (this.homeX - this.x) / 2;
    } else {
      goX = this.x;
    }
    if (this.y > this.homeY) {
      goY = (this.y - this.homeY) / 2;
    } else if (this.y < this.homeY) {
      goY = (this.homeY - this.y) / 2;
    } else {
      goY = this.y;
    }
    this.x = goX;
    this.y = goY;
    */
  }
  interact() {

  }

}
