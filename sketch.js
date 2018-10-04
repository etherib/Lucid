 var man, stand, walk, lamp, ground, wall, musak, player, can, title, titleImage, musakGame; // Image load var
 var imgMask, limit, oil, scary;
 var timer0, timer1, timer2, timer3, timer4, timer5;
 var lu, playerAnimation; // player var 
 var xPos = 800 / 2 - 20;
 var yPos = 800 - 50;

 var gameStage = 0;
 var song = 0;
  var add = 0;
 //var for the walls 
 const WALL_SIZE = 53;
 const WALL_NUM = 15;
 
 //a 15x15 multi-dimaional array that lays out a blueprint for the tiles to be plasced 
 wallz = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1], //1
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1], //2
  [1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], //3
  [1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1], //4
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], //5
  [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1], //6
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1], //7
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], //8
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1], //9
  [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1], //10
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1], //11
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1], //12
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1], //13
  [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1], //14
  [1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1], //15
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] //NO TURNING BACK
 ];

 function preload() {
  player = loadImage('assets/manSTANDING.png');
  walking = loadAnimation("assets/walk0.png", "assets/walk1.png");

  ground = loadImage('assets/checkeredfloor.jpg');
  can = loadImage('assets/oil can.png');
  wall = loadImage('assets/brick copy.png');
  musakTitle = loadSound("assets/Bernard Hermann The City.mp3");
  musakGame = loadSound("assets/Bernard Herrmann Prelude.mp3");
  scary = loadSound("assets/scary.mp3");


  title = loadAnimation("assets/lucidtitle0.png", "assets/lucidtitle2.png")
  titleImage = loadImage('assets/back.png')
  imgMask = loadImage("assets/mask.png");

  lamp = loadAnimation("assets/lamp0.png", "assets/lamp4.png");
  timer0 = loadImage("assets/timer0.png");
  timer1 = loadImage("assets/timer1.png");
  timer2 = loadImage("assets/timer2.png");
  timer3 = loadImage("assets/timer3.png");
  timer4 = loadImage("assets/timer4.png");
  timer5 = loadImage("assets/timer5.png");

  oil = loadImage("assets/oil can.png");

  lightsOut = loadAnimation("assets/lightsout0.png", "assets/lightsout6.png");
  lightsBack = loadImage("assets/lightsback.png");

  win = loadAnimation("assets/tobecontinued0.png", "assets/tobecontinued5.png");


 }



 function setup() {
  createCanvas(800, 800);
  musakGame.setVolume(.5);
  musakGame.play();

 // creates The Player sprite 
  lu = createSprite(xPos, yPos);
  lu.addImage(player);
  lu.scale = .15;
  playerAnimation = lu.addAnimation("walking", walking);
  lu.addAnimation("standing", player);
 
 // creates the group for the tiles to be easily modified. 
  dahWallz = new Group();
 
 // a nested for loop that goes through the rows of the array frist and then the columes. i.e wallz[0][1], ect
 // After going through the index, when a 1 is read, it creates a sprite, adds the image, scaled it dwo, than finally adds it to the wall group 
 
  for (var x = 0; x < WALL_NUM; x++) {
   for (var y = 0; y < wallz.length; y++) {
    if (wallz[y][x] === 1) {
     wallSprite = createSprite((x * WALL_SIZE) + 8, y * WALL_SIZE);
     wallSprite.addImage(wall);
     wallSprite.scale = .28;
     dahWallz.add(wallSprite);
    }
   }
  }

  can = createSprite(650, 300);  //create oil can sprite to extend limit
  can.addImage(oil);
  can.scale = .15;

  limit = 35000; //set time limit to 35 seconds
 }

 function draw() {
  //Title Menu 
  if (gameStage === 0) {
   StartGame();
   if (keyDown(32)) { // code 32 is the key code for spacebar 
    gameStage++;
   }
  } 
  //the game itself 
  else if (gameStage == 1) {
   RunGame();
  } 
  //Losing screen
  else if (gameStage == 2) {
   YouLose();
  } 
  //Winning screen
  else if (gameStage == 3) {
   YouWin();
  }



 }

 function StartGame() {     //title sequence 

  image(titleImage, 0, 0, width, height);
  title.frameDelay = 16;
  animation(title, width / 2, height / 2 - 50);
 }

 function RunGame() { //actual game

  background(255, 255, 255);
  image(ground, 0, 0, width, height);

  Lucid();
  drawSprites();
  
  push();              //draws spotlight over player (lamp light)
  imageMode(CENTER);
  image(imgMask, lu.position.x, lu.position.y)
  pop();

  push();          //lamp animation bottom right
  scale(.3)
  animation(lamp, 2000, 2450);
  lamp.frameDelay = 16;
  pop();

 
  if (lu.collide(can) && add < 1) {  //if player collides with can add 5 seconds - only once
   can.remove();
   limit += 5000;
   add++;
  }


  push();
  scale(.25)   //timer check, every 6 seconds change timer image to lower oil amount

  if ((limit - millis()) > 30000)
   image(timer0, 2600, 2800)

  else if ((limit - millis()) > 24000 && (limit / millis()) < 30000)
   image(timer1, 2600, 2800)

  else if ((limit - millis()) > 18000 && (limit / millis()) < 24000)
   image(timer2, 2600, 2800)

  else if ((limit - millis()) > 12000 && (limit / millis()) < 18000)
   image(timer3, 2600, 2800)

  else if ((limit - millis()) > 6000 && (limit / millis()) < 12000)
   image(timer4, 2600, 2800)

  else if ((limit - millis()) > 0)
   image(timer5, 2600, 2800)
  pop();

 
                                 //if time runs out, YouLose() function called
  if ((limit - millis()) <= 0) { 
   gameStage++;
  }

  if (lu.position.y < 0) {  //if player reaches end, YouWin() function called
   gameStage += 2;
  }




 }


var rate = 0;

 function YouLose() {    // lights out animation plays
  clear();

  musakGame.rate(rate);
 
  image(lightsBack, 0, 0, width, height);
  animation(lightsOut, width / 2, height / 2 - 50);
  lightsOut.frameDelay = 15;
  rate-= .01;
 }
 
 
var vol = 1;

 function YouWin() {  //to be continuted animation plays
  clear();
 
  musakGame.pause();
 
  scary.play();
  scary.setVolume(vol) 

  image(titleImage, 0, 0, width, height);
  animation(win, width / 2, height / 2);
  win.frameDelay = 15;
  
  vol-= 1;

 }