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
  // createCanvas(600, 816);
  let w = (100/136) * windowHeight;
  createCanvas(w, windowHeight);
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
      g += 50; //just to sharpen a little? forgot up was lighter...
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

  background(255);

}

function draw() {
  background(255);
  // if (once) {
  //   console.log(geneArray);
  //
  //   once = false;
  // }
  //- - - - - - text movement test
  for (let i = 0; i < geneArray.length; i ++){
    geneArray[i].goHome();
    geneArray[i].display();
  }

}
