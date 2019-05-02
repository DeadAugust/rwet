let img; //100 x 136

let greyArray = [];
let greyIndex = 0;
let sz = 8;
let geneArray = [];
let geneIndex = 0;

let once = false;
let mBuff = 3; //mouse click range/buffer
let poem = ' ';

let obit; //1772 char (not well cleaned) 13600 needed, so repeated
// let obitArray = [];

function preload(){
  marg = loadImage('margaretObit_grey.jpg');
  obit = loadStrings('margaretObit.txt');
  // avara = loadFont('assets/Avara.otf'); //https://fontlibrary.org/en/font/avara
  // testJSON = loadJSON('http://localhost:5000/poem.json', got, error);
}




function setup() {
  // createCanvas(600, 816);
  let w = (100/136) * windowHeight;
  createCanvas(w, windowHeight).parent('myCanvas');
  marg.loadPixels();

  obit = obit[0].split(" ");
  obit = join(obit, "");
  textAlign(CENTER);
  textSize(8);
  // textFont(avara); //too slow

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
  textSize(30);
  fill(0);
  text(poem, width/2, height/3);
  if (!once) {
    for (let i = 0; i < geneArray.length; i ++){
      // geneArray[i].goHome();
      geneArray[i].display();
    }
    console.log(testJSON);
  //   console.log(geneArray);
  //
  //   once = false;
  // }
  //- - - - - - text movement test
  }else{
    for (let i = 0; i < geneArray.length; i ++){
      geneArray[i].goHome();
      geneArray[i].display();
    }
  }

}

function mousePressed(){
  //to trigger animation
  if (!once) once = !once;
  //click test
  // console.log(mouseX + " / " + mouseY);
  for (let i = 0; i < geneArray.length; i++){
    if (mouseX >= (geneArray[i].x - mBuff) && mouseX <= (geneArray[i].x + mBuff) &&
    mouseY >= (geneArray[i].y - mBuff) && mouseY <= (geneArray[i].y + mBuff)){
    // mouseY == int(geneArray[i].y)){
      // console.log(geneArray[i])
      // textSize(30);
      // fill(0);
      // text(geneArray[i].c, width/2, height/2);
      poem = geneArray[i].poem();
    }
  }

}

function got(){
  console.log('got it!');
}

function error(){
  console.log('ERROR');
}
