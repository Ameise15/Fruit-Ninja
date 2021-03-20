//Game States
var gameState= "PLAY";

var knife;
var knifeImage ;
var melonGroup,melonImg;
var mangoGroup,mangoImg;
var pineappleGroup,pineappleImg;
var lemonGroup,lemonImg;
var bombGroup,bombImg;
var gameOver, gameOverImg

var cutSound;
var music;

function preload(){
  knifeImage = loadImage("knife.png");
  melonImg = loadImage("Watermelon .png");
  mangoImg = loadImage("Mango .png");
  pineappleImg = loadImage("Pineapple (1).png");
  lemonImg = loadImage("Lemon (1).png");
  bombImg = loadImage("bomb-emoji.png")
  gameOverImg = loadImage("gameover.png")
  cutSound = loadSound("Bite (online-audio-converter.com).mp3");
  music = loadSound("Drum Machine (online-audio-converter.com).mp3")
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  
  knife.debug = false;
  knife.setCollider("rectangle",0,0,60,120);

  score=0;
  //create fruit and monster Group variable here
  melonGroup = new Group();
  mangoGroup = new Group();
  pineappleGroup = new Group();
  lemonGroup = new Group();
  bombGroup = new Group();
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.scale= 0.3;
  gameOver.visible= false;
}

function draw() {
  background("lightblue");
  
  if(gameState==="PLAY"){
    
    //calling fruit and monster function
    spawnMelons();
    spawnMangoes();
    spawnPineapples();
    spawnLemons();
    spawnBombs();
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    if (melonGroup.isTouching(knife)) {
      melonGroup.destroyEach();
      score = score + 1;
      cutSound.play();
    }
    if (mangoGroup.isTouching(knife)) {
      mangoGroup.destroyEach();
      score = score + 3;
      cutSound.play();
    }
    if (pineappleGroup.isTouching(knife)) {
      pineappleGroup.destroyEach();
      score = score + 8;
      cutSound.play();
    }
    if (lemonGroup.isTouching(knife)) {
      lemonGroup.destroyEach();
      score = score + 15;
      cutSound.play();
    }
    if (!music.isPlaying()) {
    music.play();
  }
    // Go to end state if knife touching enemy
    if(knife.isTouching(bombGroup)) {
      gameState= "END";
    }
  } else {
    gameOver.visible = true;
    melonGroup.destroyEach();
    mangoGroup.destroyEach();
    pineappleGroup.destroyEach();
    lemonGroup.destroyEach();
    knife.visible = false;
  }
  drawSprites();
  
  //Display score
  textSize(25);
  text("Score: "+ score,250,50);
  
  
}


function spawnMelons() {
  if (frameCount%60===0) {
    var melon;
    melon = createSprite(300,0);
    melon.addImage(melonImg);
    var rand;
    rand = Math.round(random(0,600))
    melon.x = rand
    melon.velocityY = 10+(score/20);
    melon.lifetime = 60;
    melonGroup.add(melon);
  }
}
function spawnMangoes() {
  if (frameCount%200===0) {
    var mango;
    mango = createSprite(0,300);
    mango.addImage(mangoImg);
    var rand;
    rand = Math.round(random(0,600))
    mango.y = rand
    mango.velocityX = 15+(score/20);
    mango.lifetime = 40;
    mangoGroup.add(mango);
  }
}
function spawnPineapples() {
  if (frameCount%500===0) {
    var pineapple;
    pineapple = createSprite(300,600);
    pineapple.addImage(pineappleImg);
    var rand;
    rand = Math.round(random(0,600))
    pineapple.x = rand
    pineapple.velocityY = -15-(score/20);
    pineapple.lifetime = 40;
    pineappleGroup.add(pineapple);
  }
}
function spawnLemons() {
  if (frameCount%600===0) {
    var lemon;
    lemon = createSprite(600,300);
    lemon.addImage(lemonImg);
    lemon.scale = 0.5;
    var rand;
    rand = Math.round(random(0,600))
    lemon.y = rand
    lemon.velocityX = -50-(score/20);
    lemon.lifetime = 12;
    lemonGroup.add(lemon);
  }
}
function spawnBombs() {
  if (frameCount%200===0) {
    var bomb;
    bomb = createSprite(600,300);
    bomb.addImage(bombImg);
    bomb.scale = 0.2;
    var rand;
    rand = Math.round(random(0,600))
    bomb.y = rand
    bomb.velocityX = -10-(score/20);
    bomb.lifetime = 60;
    bombGroup.add(bomb);
  }
}