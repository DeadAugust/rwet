let defSize = 8;
let defCol = "black";
let defSpeed = 1;
// let defStep = 30; //about 13 secs
// let defStep = 75;
let defStep = 10;
// let defStep = 100; //way slow but good for performance? 45 secs


class Letter {
  constructor(parameters) {
    // constructor(c, s, col, spd, x, y, hX, hY){
    this.char = parameters.c; //letter
    this.item = parameters.item; //the poem part
    this.size = parameters.s || defSize;
    this.grey = parameters.grey || defCol;
    this.col = parameters.col || defCol;
    this.speed = parameters.spd || defSpeed;
    // this.x = Math.floor(Math.random() * Math.floor(this.w)); //wasn't working b/c outside of p5 setup/draw...
    // this.y = Math.floor(Math.random() * Math.floor(this.h));
    this.x = int(parameters.x || random(1, width));
    this.y = int(parameters.y || random(1, height));
    this.homeX = parameters.hX;
    this.homeY = parameters.hY;
    this.farX = this.homeX - this.x;
    this.farY = this.homeY - this.y;
    this.defStep = parameters.step || 10;


    //timing for ordinary transitions
    // this.step = 5; //100 moves to home?
    // this.normStep = parameters.normStep || defNormStep;
    //last timing for climax
    this.step = int(random(this.defStep - (this.defStep/5), this.defStep + (this.defStep/5))) * int(random(2, 5)); //little more natural
    this.clock = this.step; //to count down
    }
  display() {
    fill(this.grey);
    // fill(this.col);
    textSize(this.size);
    text(this.char, this.x, this.y);
  }
  goHome() {
    //set new home if first time calling this
    // if (this.homeX != spot.x && this.homeY != spot.y){
    //   this.homeX = spot.x;
    //   this.homeY = spot.y;
    //   this.farX = this.homeX - this.x;
    //   this.farY = this.homeY - this.y;
    // }
    //trying counter now
    if (this.clock != 0){
      this.x = this.x + (this.farX / this.step);
      this.y = this.y + (this.farY / this.step);
      this.clock -= 1;
    }
  }
  jitter() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2)
    //had to put jitter here so they would be in the right spot later
    this.farX = this.homeX - this.x;
    this.farY = this.homeY - this.y;
  }

}
