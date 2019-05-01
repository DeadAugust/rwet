let img; //100 x 136

let greyArray = [];
let greyIndex = 0;
let sz = 8;
let geneArray = [];
let geneIndex = 0;

let once = true;

let obit; //1772 char (not well cleaned) 13600 needed, so repeated
// let obitArray = [];

function preload(){
  marg = loadImage('margaretObit_grey.jpg');
  obit = loadStrings('margaretObit.txt');
}


function setup() {
  createCanvas(600, 816);
  // frameRate(2);
  marg.loadPixels();

  obit = obit[0].split(" ");
  obit = join(obit, "");
  textAlign(CENTER);
  textSize(8);

  //- - - - - - - - greyscale portrait

  //setting up array
  let o = -1;
  for (let x = 0; x < marg.width; x++){
    for (let y = 0; y <marg.height; y++){
      let index = ((y * marg.width) + x) * 4;
      let g = marg.pixels[index+2]; //greyscale, but y tho
      if (o < obit.length - 1){
        o++;
      } else {
        o = 0;
      }
      let char = obit[o]; //letter from obitArray

      let parameters = {
        c: char ,
        grey: g,
        hX: (width / marg.width) * (x + 1),
        hY: (height / marg.height) * (y + 1)
      }

      let letter = new Letter(parameters);
      geneArray.push(letter);

      greyIndex++;
    }
  }


  // for (let i = 0; i < obit.length; i++){
  //   // constructor(c, s, col, spd, x, y, hX, hY){
  //   let parameters = {
  //     c: obit[i],
  //     hX:
  //   }
  //   let letter = new Letter(parameters);
  //   geneArray.push(letter);
  // }
  background(255);

/*
  let o = -1; //obit index
  for (let x = 0; x < img.width; x++){
    for (let y = 0; y <img.height; y++){ //reversed text vert
      fill(greyArray[greyIndex]);
      noStroke();
      if (o < obit.length - 1){
        o++;
        text(obit[o], (width / img.width) * (x + 1), (height / img.height) * (y + 1));
      } else {
        o = 0;
        text(obit[o], (width / img.width) * (x + 1), (height / img.height) * (y + 1));
      }
      greyIndex++;
    }
  }
  */

}

function draw() {
  background(255);
  if (once) {
    console.log(geneArray);

    once = false;
  }
  //- - - - - - text movement test
  for (let i = 0; i < geneArray.length; i ++){
    geneArray[i].goHome();
    geneArray[i].display();
  }
  // 
  // for (let i = 0; i < 100; i++){
  //   console.log(geneArray[i].x + " X " + geneArray[i].homeX);
  //   console.log(geneArray[i].y + " Y " + geneArray[i].homeY);
  //
  // }

}
