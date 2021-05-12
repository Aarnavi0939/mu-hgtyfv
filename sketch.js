var bg, bgImg;
var astronaut,astronautImg;
var spaceShip,spaceShipImg;
var alien, alienImg, alienImg1;
var ufo, ufoImg;
var asteroids,asteroidsImg, asteroidsGroup;
var gameOver, gameOverImg;
var life, lifeImg;
var PLAY = 1, END=0;
var gameState = PLAY;
var c=5;

function preload(){
  bgImg = loadImage("images/space.png");
  spaceShipImg  = loadImage("images/Spacey.png");
  alienImg  = loadImage("images/alien1.png");
  alienImg1 = loadImage("images/alien5.png")
  ufoImg  = loadImage("images/UFO.png");
  asteroidsImg = loadImage("images/rock1.png");
  rocksImg = loadImage("images/rocks.png");
  stoneImg = loadImage("images/rock2.png");
  planetsImg = loadImage("images/planet.png");
  planetImg = loadImage("images/saturn.png");
  gameOverImg = loadImage("images/gameOver.png");
  lifeImg = loadImage("images/retro.png");
}

function setup() {
  createCanvas(1200,800);
  bg = createSprite(600, 400, 1200, 800);
  bg.addImage(bgImg);
  bg.scale = 3.5;
  

  alien = createSprite(600,600, 30, 30);
  alien.addImage(alienImg);
  alien.scale = 1.17;

  for(var i=50; i<=c*70; i+=70){
    life = createSprite(i,750,20,20);
    life.addImage(lifeImg);
    life.scale = 0.5;
    
  }
  gameOver = createSprite(600,400,20,20);
  gameOver.addImage(gameOverImg);

  asteroidsGroup = new Group();
  
}

function draw() {
  background(0);  
  if(gameState===PLAY){
  bg.velocityY = -2;
  if(bg.y<=490){
    bg.y = 600;
  }
  gameOver.visible = false;

  if(keyDown(RIGHT_ARROW)){
    alien.x=alien.x+10;
    alien.addImage(alienImg);
  }
  if(keyDown(LEFT_ARROW)){
    alien.addImage(alienImg1);
    alien.x=alien.x-10;
  }
  spawnStones();

  if(asteroidsGroup.isTouching(alien)){
      gameState = END
  }
}
  drawSprites();

  if(gameState === END){
    asteroidsGroup.destroyEach();
    life.remove();
    c=c-1;
    gameOver.visible = true;
    bg.velocityY = 0;
    asteroidsGroup.setVelocityYEach(0);
    fill("white");
    textSize(20);
    text("Press SPACE to reset the game",300,100);
    if(keyDown("space")){
      reset();
    }
  
  }
  
}

function spawnStones(){
  if(frameCount % 150 === 0){
   asteroids = createSprite(100,10,10,10);
   asteroids.x = Math.round(random(50,1150));
   asteroids.velocityY = 6;
   asteroids.scale = 0.5
   rand = Math.round(random(1,5));
   switch(rand){
     case 1 : asteroids.addImage(asteroidsImg);
     break;
     case 2 : asteroids.addImage(rocksImg);
     break;
     case 3 : asteroids.addImage(stoneImg);
     break;
     case 4 : asteroids.addImage(planetImg);
     break;
     case 5 : asteroids.addImage(planetsImg);
     break;
     default: break;
   }
    asteroidsGroup.add(asteroids);
  }
  
}

function reset(){
  gameState = PLAY
  asteroidsGroup.destroyEach();
  //life.removeEach();
}