let socket = io('/');

// Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});



// let marg; //100 x 136
let marg; //100 x 164

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
let corpsus;

//ALL HAIL CORS-ANYWHERE: https://cors-anywhere.herokuapp.com/
let cors = "https://cors-anywhere.herokuapp.com/"
let api = "https://infinite-poem-api.herokuapp.com"

function preload(){
  marg = loadImage('margGrey.png', go1, error);

  // marg = loadImage('margaretObit_grey.jpg', go1, error);
  // obit = loadStrings('margaretObit.txt'); //should add callback later for poemJSON
  // obitTest = obit.replace(' ', "%");
  // obit = obit[0].split(" ");
  // obit = join(obit, "");
  // avara = loadFont('assets/Avara.otf'); //https://fontlibrary.org/en/font/avara
  // testJSON = loadJSON(cors+api+'/test.json', got, error);
  margJSON = loadJSON(cors+api+'/margaret.json', start, error);
  // poemJSON = loadJSON(cors+api+'/poem.json?text='+obit, got, error); //not working w/o callback in obit
}



function setup() {
  // createCanvas(600, 816);
  // let w = int((100/136) * windowHeight);
  let w = int((100/164) * windowHeight);

  createCanvas(w, windowHeight);
  marg.loadPixels();
  corpsus = margJSON['text'];
  textAlign(CENTER);
  textSize(9);

  // marg = loadImage('margaretObit_grey.jpg', go1, error);


  //setting up array
  let o = -1;
  for (let x = 0; x < marg.width; x++){
    // console.log((width / marg.width) * (x + 1));
    // console.log(h)
    for (let y = 0; y <marg.height; y++){
      let index = ((y * marg.width) + x) * 4;
      // console.log(index)
      let g = marg.pixels[index+2]; //greyscale, but y tho
      g += 50; //just to sharpen a little? forgot up was lighter...
      if (o < corpsus.length - 1){ //needed still?
        o++;
      } else {
        o = 0;
      }
      // console.log(o);
      let char = corpsus[o]; //letter from orig text in JSON
      let item = margJSON[o];
      // console.log((width / marg.width) * (x + 1));
      let parameters = {
        c: char ,
        item: item,
        grey: g,
        hX: (width / marg.width) * (x + 1),
        hY: (height / marg.height) * (y + 1)
      }
      // console.log(parameters)

      let letter = new Letter(parameters);
      geneArray.push(letter);

      greyIndex++;
    }
  }

  /* //all in JSON callback now
  obit = obit[0].split(" ");
  obit = join(obit, "");

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
  */
  background(0);
}

function draw() {
  background(255);
  textSize(30);
  fill(0);
  text(poem, 2* width/3, height/3);
  // rect(100, 100, 100, 100)
  if (!once) {
    for (let i = 0; i < geneArray.length; i ++){
      // geneArray[i].goHome();
      geneArray[i].display();
    }
    // console.log(margJSON);
    // console.log(obit);

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
function go1(){
  console.log('img loaded');
  // margJSON = loadJSON(cors+api+'/margaret.json', start, error);
}

function start(){ //on JSON receive
  console.log('poem ready');
  // marg.loadPixels();
  // corpsus = margJSON['text'];
  // let w = int((100/136) * windowHeight); //such issues...
  // console.log(w);
  // let h = int(windowHeight);
  // console.log(h);

  // console.log(corpsus);
  // textFont(avara); //too slow

  //- - - - - - - - greyscale portrait
/*
  //setting up array
  let o = -1;
  for (let x = 0; x < marg.width; x++){
    // console.log((width / marg.width) * (x + 1));
    // console.log(h)
    for (let y = 0; y <marg.height; y++){
      let index = ((y * marg.width) + x) * 4;
      // console.log(index)
      let g = marg.pixels[index+2]; //greyscale, but y tho
      g += 50; //just to sharpen a little? forgot up was lighter...
      if (o < corpsus.length - 1){ //needed still?
        o++;
      } else {
        o = 0;
      }
      // console.log(o);
      let char = corpsus[o]; //letter from orig text in JSON
      let item = margJSON[o];
      // console.log((width / marg.width) * (x + 1));
      let parameters = {
        c: char ,
        item: item,
        grey: g,
        hX: (w / marg.width) * (x + 1),
        hY: (h / marg.height) * (y + 1),
        w: w,
        h: h
      }
      // console.log(parameters)

      let letter = new Letter(parameters);
      geneArray.push(letter);

      greyIndex++;
    }
  }
  */
}

function mousePressed(){
  //to trigger animation
  if (!once) once = !once;
  console.log(once);
  //click test
  // console.log(mouseX + " / " + mouseY);
  for (let i = 0; i < geneArray.length; i++){
    if (mouseX >= (geneArray[i].x - mBuff) && mouseX <= (geneArray[i].x + mBuff) &&
    mouseY >= (geneArray[i].y - mBuff) && mouseY <= (geneArray[i].y + mBuff)){
    // mouseY == int(geneArray[i].y)){
      console.log(geneArray[i])
      // textSize(30);
      // fill(0);
      // text(geneArray[i].c, width/2, height/2);
      poem = geneArray[i].poem();
    }
  }
}

function keyPressed(){ //to erase
  if (keyCode = "32") poem = ""
}

function got(){
  console.log('got it!');
}

function error(){
  console.log('ERROR');
}
