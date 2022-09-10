var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player,game;
var playerCount,gameState;
var allPlayers
var car1 
var car2 
var cars
var car1img
var car2img
var pista
var fuelImg
var goldCoinImg
var lifeImg
var obstacle1Image
var obstacle2Image
var moedas
var gasolinas
var obstaculos
var fimvida

function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1img = loadImage("assets/car1.png")
  car2img = loadImage("assets/car2.png")
  pista = loadImage("assets/track.jpg")
   fuelImg = loadImage("assets/fuel.png")
   goldCoinImg = loadImage("assets/goldCoin.png")
   lifeImg = loadImage("assets/life.png")
   obstacle1Image = loadImage("assets/obstacle1.png")
   obstacle2Image = loadImage("assets/obstacle2.png")
   fimvidaImage = loadImage("assets/blast.png")
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  bgImg = backgroundImage;
}

function draw() {
  background(bgImg);

if(playerCount === 2){
  game.updateState(1)
}

if(gameState === 1){
  game.play()
}


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

