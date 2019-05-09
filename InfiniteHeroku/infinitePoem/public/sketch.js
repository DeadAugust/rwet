// let marg; //100 x 136
let marg; //100 x 164
let memoir1, memoir2, memoir3, hope, itinerary, obit;
let m1Div, m2Div, m3Div, hDiv, iDiv, oDiv;
let beer, car, cat, pineapple, sun, tree, volleyball, whale, whata;
// let photos = [beer, car, cat, pineapple, sun, tree, volleyball, whale, whata];
let photos = 9;

let greyArray = [];
let origArray = [];
// let greyIndex = 0;
let sz = 8;
let geneArray = [];
let geneIndex = 0;
let letterArray = [];
let oldSize = 0;
let state = 48; //"0"
let pixelStep = 8;
let defaultStep;
let p = 0;
let firstJitter = true;
let jitterTimer = 0;
let resetTimer = 4000;
let clickOn = false;

let once = false;
let final = false;
let mBuff = 3; //mouse click range/buffer
let poem = ' ';
let w;

let poemInput, poemHeader;

// let obit; //1772 char (not well cleaned) 13600 needed, so repeated
// let obitArray = [];
let corpsus;

//ALL HAIL CORS-ANYWHERE: https://cors-anywhere.herokuapp.com/
let cors = "https://cors-anywhere.herokuapp.com/"
let api = "https://infinite-poem-api.herokuapp.com"

//poem
let poemX = 0;
let poemY = 0;
let poemSize = 30;
let newJSON;
let newPoem;
let eightArray = [];

function preload(){
  firstMarg = loadImage('margPortrait.jpg', goImg, error);
  marg = loadImage('margGrey.png', goImg, error); //final portrait
  margTest = loadImage('margaretObit_grey.jpg', goImg, error);
  margJSON = loadJSON(cors+api+'/margaret.json', start, error);
  memoir1 = loadStrings('margTexts/ch1.txt', goTxt, error);
  memoir2 = loadStrings('margTexts/ch2.txt', goTxt, error);
  memoir3 = loadStrings('margTexts/ch3.txt', goTxt, error);
  hope = loadStrings('margTexts/hopeIsHere_edit.txt', goTxt, error);
  itinerary = loadStrings('margTexts/margNYC.txt', goTxt, error);
  obit = loadStrings('margTexts/margaretObit.txt', goTxt, error);
  // poemJSON = loadJSON(cors+api+'/poem.json?text='+obit, got, error); //not working w/o callback in obit
  beer = loadImage('photos/beer_grey.jpeg', goImg, error);
  car = loadImage('photos/car_grey.png', goImg, error);
  cat = loadImage('photos/cat_grey.png', goImg, error);
  pineapple = loadImage('photos/pineapple_grey.png', goImg, error);
  sun = loadImage('photos/sun_grey.png', goImg, error);
  tree = loadImage('photos/tree_grey.jpeg', goImg, error);
  volleyball = loadImage('photos/volleyball_grey.png', goImg, error);
  volleyball2 = loadImage('photos/volleyball_greyNew.jpg', goImg, error);
  whale = loadImage('photos/whale_grey.jpg', goImg, error);
  whata = loadImage('photos/whata_grey.jpeg', goImg, error);
}


let cnv;
function setup() {
  // createCanvas(600, 816);
  // let w = int((100/136) * windowHeight);
  w = int((100/164) * windowHeight);

  // cnv = createCanvas(w, windowHeight).parent("myCanvas");
  cnv = createCanvas(windowWidth, windowHeight).parent("myCanvas");
  cnv.style("margin-left", "auto");
  cnv.style("margin-right", "auto");
  //load all images?
  imageMode(CENTER);
  firstMarg.loadPixels();
  marg.loadPixels();
  margTest.loadPixels();
  beer.loadPixels();
  car.loadPixels();
  cat.loadPixels();
  pineapple.loadPixels();
  sun.loadPixels();
  tree.loadPixels();
  volleyball.loadPixels();
  volleyball2.loadPixels();

  whale.loadPixels();
  whata.loadPixels();

  //text
  corpsus = margJSON['text'];
  textAlign(CENTER);
  textSize(9);
  //corpsus
  m1Div = createDiv(memoir1).parent("myCanvas").position(0,0);
  m1Div.hide();
  m2Div = createDiv(memoir2).parent("myCanvas").position(0,height/4 + 3);
  m2Div.hide();
  m3Div = createDiv(memoir3).parent("myCanvas").position(0,height/2.411);
  m3Div.hide();
  hDiv = createDiv(hope).parent("myCanvas").position(0,height/1.94);
  hDiv.hide();
  iDiv = createDiv(itinerary).parent("myCanvas").position(0,height/1.338);
  iDiv.hide();
  oDiv = createDiv(obit).parent("myCanvas").position(0,height/1.163);
  oDiv.hide();
  // newImage(marg);

  //poem input
  poemHeader = createDiv().parent("poemInput").id("poemHead");
  poemInput = createInput("").parent("poemHead").position(width/2, 0);
  poemInput.input(function(){
    // poemFeed.html(this.value());
  });
  poemFeed = createP(poemInput.value()).parent("poemHead").position(width/3, height/2).id('feed');
  // poemFeed.style('font-size', '100');
  poemFeed.style("font-size", "40px");

  poemHeader.hide();

  //setting up array empty
  // defaultStep = (width*height/8);
  let o = -1;
  for (let x = 0; x < width; x += pixelStep){
    for (let y = 0; y < height; y += pixelStep){
      if (o < corpsus.length - 1){
        o++;
      } else {
        o = 0;
      }
      let char = corpsus[o]; //letter from orig text in JSON
      let item = margJSON[o];
      let parameters = {
        c: char ,
        item: item
        // grey: g,
        // hX: (width / marg.width) * (x + 1),
        // hY: (height / marg.height) * (y + 1)
      }
      let letter = new Letter(parameters);
      letterArray.push(letter);
      origArray.push(letter);
    }
  }
  oldSize = (width/pixelStep * height/pixelStep);
  // background(0);
}

function draw() {
  background(255);
  if(state == 48){ //image
    image(firstMarg, width/2, height/2, w/2, height/2);
  } else if (state == 49){ //memoir
    tint(255, 200);
    image(firstMarg, width/2, height/2, w/2, height/2);
    m1Div.show();
    m2Div.show();
    m3Div.show();
  }else if (state == 50){ //childrens book
    tint(255, 150);
    image(firstMarg, width/2, height/2, w/2, height/2);
    hDiv.show();
  }else if (state == 51){ //itinerary
    tint(255, 70);
    image(firstMarg, width/2, height/2, w/2, height/2);
    iDiv.show();
  }else if (state == 52){ //obit
    tint(255, 20);
    image(firstMarg, width/2, height/2, w/2, height/2);
    oDiv.show();
  }else if (state == 53){ //soup -- 5
    m1Div.hide();
    m2Div.hide();
    m3Div.hide();
    hDiv.hide();
    iDiv.hide();
    oDiv.hide();
    for (let i = 0; i < letterArray.length; i ++){
      letterArray[i].jitter();
      letterArray[i].display();
    }
  }else if (state == 54){ //loop -- 6
    if (!once){
      // newImage(margTest);
      scaledImage(beer);
      once = true;

    }
    for (let i = 0; i < letterArray.length; i ++){
      letterArray[i].goHome();
      letterArray[i].display();
    }
    let loopCheck = true;
    //see if the current photo is done animating
    for (let i = 0; i < letterArray.length; i ++){
      let l = letterArray[i]
      // if ((int(l.x) != int(l.homeX) || int(l.y) != int(l.homeY)) && !firstJitter){
      if (l.clock != 0 && !firstJitter){
        loopCheck = false;
        jitterTimer = millis();
      }
    }
    console.log(loopCheck);
    if (loopCheck){
      //jitter for a bit to reset
      if ((millis() - jitterTimer < resetTimer) && !firstJitter){
        // if(resetArray){
        //   for (let i = 0; i < letterArray.length; i ++){
        //     if (i < origArray.length){
        //       letterArray[i] = origArray[i];
        //       console.log("two" + letterArray.length, origArray.length);
        //     } else {
        //       let range = letterArray.length - origArray.length;
        //       letterArray.splice(i, range);
        //       console.log("check" + letterArray.length);
        //     }
        //   }
        //   resetArray = false;
        // }
        for (let i = 0; i < letterArray.length; i ++){
          letterArray[i].jitter();
          letterArray[i].display();
        }
      } else if (p < photos - 1){ //then do next photo
        console.log(p);
        photoLoop(p);
        p++;
      } else{
        p = 0;
        photoLoop(p);
      }
    } else {
      for (let i = 0; i < letterArray.length; i ++){
        letterArray[i].goHome();
        letterArray[i].display();
      }
    }
    firstJitter = false; //just so first
  }else if (state == 55){ //one loop one letter -- 7
    // poemHeader.show();
    clickOn = true;
    if (!once){
      let o = -1;
      for (let x = 0; x < width; x += pixelStep){
        for (let y = 0; y < height; y += pixelStep){
          if (o < corpsus.length - 1){
            o++;
          } else {
            o = 0;
          }
          let char = corpsus[o]; //letter from orig text in JSON
          let item = margJSON[o];
          let parameters = {
            c: char ,
            item: item
            // grey: g,
            // hX: (width / marg.width) * (x + 1),
            // hY: (height / marg.height) * (y + 1)
          }
          let letter = new Letter(parameters);
          eightArray.push(letter);
          // origArray.push(letter);
        }
      }
      oldSize = (width/pixelStep * height/pixelStep);
    }
    for (let i = 0; i < letterArray.length; i ++){
      eightArray[i].jitter();
      eightArray[i].display();
    }
  }else if (state == 56){ //poem -- 8
    poemHeader.show();
    if (!once){
      let o = -1;
      for (let x = 0; x < width; x += pixelStep){
        for (let y = 0; y < height; y += pixelStep){
          if (o < corpsus.length - 1){
            o++;
          } else {
            o = 0;
          }
          let char = corpsus[o]; //letter from orig text in JSON
          let item = margJSON[o];
          let parameters = {
            c: char ,
            item: item,
            grey: 200
            // hX: (width / marg.width) * (x + 1),
            // hY: (height / marg.height) * (y + 1)
          }
          let letter = new Letter(parameters);
          eightArray.push(letter);
          // origArray.push(letter);
        }
      }
      oldSize = (width/pixelStep * height/pixelStep);
    }
    for (let i = 0; i < letterArray.length; i ++){
      eightArray[i].jitter();
      eightArray[i].display();
    }
  }else if (state == 57){ //marg -- 9
    poemHeader.hide();
    poem = '';
    if (!once){
      margImage(marg);
      once = true;
    }
    for (let i = 0; i < letterArray.length; i ++){
      eightArray[i].goHome();
      eightArray[i].display();
    }
  }
  //after for legibility
  push();
  textSize(poemSize);
  fill(0);
  text(poem, poemX, poemY);
  pop();

}
//
function mousePressed(){

  if (clickOn){
    for (let i = 0; i < letterArray.length; i++){
      if (mouseX >= (letterArray[i].x - mBuff) && mouseX <= (letterArray[i].x + mBuff) &&
      mouseY >= (letterArray[i].y - mBuff) && mouseY <= (letterArray[i].y + mBuff)){
        console.log(letterArray[i]);
        poem = letterArray[i].item;
        poemSize = (400/poem.length);
        poemX = mouseX + random(-50, 50);
        poemY = mouseY + random(-50, 50);
      }
    }
  }
}

function keyPressed(){ //to erase
  once = false;
  if (keyCode == "32"){
    poem = "";
  } else if (keyCode == RIGHT_ARROW){
    clickOn = !clickOn;
  }else if (keyCode == ENTER){
    // poem = poemInput.value();
    // poemFeed.html(this.value());
    findJSON(poemInput.value());
  } else if( keyCode == 48 || keyCode == 49 ||
  keyCode == 50 || keyCode == 51 || keyCode == 52 ||
  keyCode == 53 || keyCode == 54 || keyCode == 55 ||
  keyCode == 56 || keyCode == 57){
    state = int(keyCode);
  }
}

function newImage(img){
//   // console.log("before " + letterArray);
//   // letterArray = [];
//   let o = -1;
//   let thisSize = img.width * img.height;
//   // pixelStep = thisSize % defaultStep
//   let pixelCount = 0;
//   console.log(thisSize, oldSize);
//   for (let x = 0; x < img.width; x++){
//     for (let y = 0; y <img.height; y++){
//       let index = ((y * img.width) + x) * 4;
//       let g = img.pixels[index+2]; //greyscale, but y tho
//       // g += 50; //just to sharpen a little? forgot up was lighter...
//       let px = letterArray[pixelCount];
//       if (pixelCount <= oldSize && letterArray[pixelCount] != undefined){ //to reuse letters, just set new color and spot
//         px.grey = g;
//         px.homeX = (width / img.width) * (x + 1);
//         px.homeY = (height / img.height) * (y + 1);
//         px.farX = px.homeX - px.x;
//         px.farY = px.homeY - px.y;
//         px.clock = px.step;
//       } else { //add new letters
//         if (o < corpsus.length - 1){
//           o++;
//         } else {
//           o = 0;
//         }
//         let char = corpsus[o]; //letter from orig text in JSON
//         let item = margJSON[o];
//         let parameters = {
//           c: char ,
//           item: item,
//           grey: g,
//           hX: (width / img.width) * (x + 1), //needs to be centered...
//           hY: (height / img.height) * (y + 1)
//         }
//         let letter = new Letter(parameters);
//         // letterArray.push(letter);
//         px = letter;
//       }
//       pixelCount++;
//     }
//   }
//   //if smaller than last image, get rid of extra pixels
//   if (thisSize < oldSize){
//     let extra = oldSize - thisSize;
//     for (let i = oldSize - 1; i >= thisSize; i--){
//       letterArray.splice(i,1);
//     }
//   }
//   oldSize = thisSize;
//   // console.log("after " + letterArray);
//
}

function loopImage(img){
  let o = -1;
  let thisSize = img.width * img.height;
  // let sW = int((img.width/img.height) * height);

  // let sH = img.height;
  // pixelStep = thisSize % defaultStep
  let pixelCount = 0;
  console.log(thisSize, oldSize);
  for (let x = 0; x < img.width; x++){
    for (let y = 0; y <img.height; y++){
      let index = ((y * img.width) + x) * 4;
      let g = img.pixels[index+2]; //greyscale, but y tho
      // g += 50; //just to sharpen a little? forgot up was lighter...
      let px = letterArray[pixelCount];
      if (pixelCount <= oldSize && letterArray[pixelCount] != undefined){ //to reuse letters, just set new color and spot
        px.grey = g;
        // px.homeX = (sW / img.width) * (x + 1) + (sW/2);
        px.homeX = (width / img.width) * (x + 1);
        px.homeY = (height / img.height) * (y + 1);
        px.farX = px.homeX - px.x;
        px.farY = px.homeY - px.y;
        px.clock = px.step;
      } else { //add new letters
        if (o < corpsus.length - 1){
          o++;
        } else {
          o = 0;
        }
        let char = corpsus[o]; //letter from orig text in JSON
        let item = margJSON[o];
        let parameters = {
          c: char ,
          item: item,
          grey: g,
          // hX: (sW / img.width) * (x + 1) + (sW/2),
          hX: (width / img.width) * (x + 1), //needs to be centered...
          hY: (height/ img.height) * (y + 1)
        }
        let letter = new Letter(parameters);
        // letterArray.push(letter);
        px = letter;
      }
      pixelCount++;
    }
  }
  //if smaller than last image, get rid of extra pixels
  if (thisSize < oldSize){
    let extra = oldSize - thisSize;
    for (let i = oldSize - 1; i >= thisSize; i--){
      letterArray.splice(i,1);
    }
  }
  oldSize = thisSize;
}
function scaledImage(img){
  // console.log("before " + letterArray);
  // letterArray = [];
  // newArray(img);
  let o = -1;
  let thisSize = img.width * img.height;
  let sW = int((img.width/img.height) * height);
  console.log(sW);

  // let sH = img.height;
  // pixelStep = thisSize % defaultStep
  let pixelCount = 0;
  console.log(thisSize, oldSize);
  for (let x = 0; x < img.width; x++){
    for (let y = 0; y <img.height; y++){
      let index = ((y * img.width) + x) * 4;
      let g = img.pixels[index+2]; //greyscale, but y tho
      // g += 50; //just to sharpen a little? forgot up was lighter...
      let px = letterArray[pixelCount];
      if (pixelCount <= oldSize && letterArray[pixelCount] != undefined){ //to reuse letters, just set new color and spot
        px.grey = g;
        px.homeX = (sW / img.width) * (x + 1) + (sW/2);
        // px.homeX = (sW / img.width) * (x + 1);
        px.homeY = (height / img.height) * (y + 1);
        px.farX = px.homeX - px.x;
        px.farY = px.homeY - px.y;
        px.clock = px.step;
      } else { //add new letters
        if (o < corpsus.length - 1){
          o++;
        } else {
          o = 0;
        }
        let char = corpsus[o]; //letter from orig text in JSON
        let item = margJSON[o];
        let parameters = {
          c: char ,
          item: item,
          grey: g,
          hX: (sW / img.width) * (x + 1) + (sW/2),
          // hX: (sW / img.width) * (x + 1), //needs to be centered...
          hY: (height/ img.height) * (y + 1)
        }
        let letter = new Letter(parameters);
        // letterArray.push(letter);
        px = letter;
      }
      pixelCount++;
    }
  }
  //if smaller than last image, get rid of extra pixels
  if (thisSize < oldSize){
    let extra = oldSize - thisSize;
    for (let i = oldSize - 1; i >= thisSize; i--){
      letterArray.splice(i,1);
    }
  }
  oldSize = thisSize;
  // console.log("after " + letterArray);

}

function margImage(img){
  // console.log("before " + letterArray);
  // letterArray = [];
  let o = -1;
  let thisSize = img.width * img.height;
  // pixelStep = thisSize % defaultStep
  let pixelCount = 0;
  console.log(thisSize, oldSize);
  for (let x = 0; x < img.width; x++){
    for (let y = 0; y <img.height; y++){
      let index = ((y * img.width) + x) * 4;
      let g = img.pixels[index+2]; //greyscale, but y tho
      // g += 50; //just to sharpen a little? forgot up was lighter...
      let px = eightArray[pixelCount];
      if (pixelCount <= oldSize && eightArray[pixelCount] != undefined){ //to reuse letters, just set new color and spot
        let stepp = 75;
        px.grey = g - 20;
        px.homeX = (w / img.width) * (x + 1) + w;
        px.homeY = (height / img.height) * (y + 1);
        px.farX = px.homeX - px.x;
        px.farY = px.homeY - px.y;
        px.step = int(random(stepp - (stepp/5), stepp + (stepp/5))) * int(random(2, 5)); //little more natural
        px.clock = px.step;
      } else { //add new letters
        if (o < corpsus.length - 1){
          o++;
        } else {
          o = 0;
        }
        let char = corpsus[o]; //letter from orig text in JSON
        let item = margJSON[o];
        let parameters = {
          c: char ,
          item: item,
          grey: g,
          hX: (w / img.width) * (x + 1) + w, //needs to be centered...
          hY: (height / img.height) * (y + 1),
          step: 75
        }
        let letter = new Letter(parameters);
        // letterArray.push(letter);
        px = letter;
      }
      pixelCount++;
    }
  }
  //if smaller than last image, get rid of extra pixels
  if (thisSize < oldSize){
    let extra = oldSize - thisSize;
    for (let i = oldSize - 1; i >= thisSize; i--){
      letterArray.splice(i,1);
    }
  }
  oldSize = thisSize;
  // console.log("after " + letterArray);
}

function photoLoop(pNum){
  // if (!once){
    if (pNum == 0){
      loopImage(beer);
    } else if (pNum == 1){
      loopImage(car);
    }else if (pNum == 2){
      loopImage(cat);
    }else if (pNum == 3){
      loopImage(pineapple);
    }else if (pNum == 4){
      loopImage(sun);
    }else if (pNum == 5){
      loopImage(tree);
    }else if (pNum == 6){
      loopImage(volleyball2);
    }else if (pNum == 7){
      loopImage(whale);
    }else if (pNum == 8){
      loopImage(whata);
    }
    resetArray = true;
  //   once = true;
  // }
}

function poemShow(){
}

function findJSON(textt){
  newPoem = '';
  newJSON = loadJSON(cors+api+'/poem.json?text='+textt, function(){
    for (let i = 0; i < textt.length; i++){
      newPoem += newJSON[i] + " ";
    }
    poemFeed.html(newPoem);
  }, error);
}


function newArray(img){
  let o = -1;
  let letterArray = [];
  for (let x = 0; x < img.width; x += pixelStep){
    for (let y = 0; y < img.height; y += pixelStep){
      if (o < corpsus.length - 1){
        o++;
      } else {
        o = 0;
      }
      let char = corpsus[o]; //letter from orig text in JSON
      let item = margJSON[o];
      let parameters = {
        c: char ,
        item: item
        // grey: g,
        // hX: (width / marg.width) * (x + 1),
        // hY: (height / marg.height) * (y + 1)
      }
      let letter = new Letter(parameters);
      letterArray.push(letter);
    }
  }
  oldSize = (width/pixelStep * height/pixelStep);
}

function goImg(){
  console.log('img loaded');
}
function goTxt(){
  console.log('text loaded');
}
function start(){ //on JSON receive
  console.log('poem ready');
}

function error(){
  console.log('ERROR');
}
