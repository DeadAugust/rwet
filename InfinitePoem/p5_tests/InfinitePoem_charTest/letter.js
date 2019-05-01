let defSize = 9;
let defCol = "black";
let defSpeed = 1;
let defStep = 30;


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
    this.step = int(random(defStep - (defStep/5), defStep + (defStep/5))) * int(random(2, 5)); //little more natural
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
  }
  interact() {

  }

}
