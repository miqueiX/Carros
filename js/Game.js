class Game {
  constructor() {
    this.resetButton = createButton("")
    this.resetTitle = createElement("h2")
    this.leaderTitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
    this.key = false
    this.vida = true

  }

  start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();
  
    car1 = createSprite(width/2-50, height-100)
    car1.addImage("car1", car1img)
    car1.addImage("blast",fimvidaImage)
    car1.scale = 0.07

    car2 = createSprite(width/2+100, height-100)
    car2.addImage("car2", car2img)
    car2.scale = 0.07
    car2.addImage("blast",fimvidaImage)
    cars = [car1,car2]

    
    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];


    gasolinas = new Group()
    moedas = new Group()
    obstaculos = new Group()

    this.addSprites(fuelImg, 0.02, 5, gasolinas)
    this.addSprites(goldCoinImg, 0.09, 15, moedas)
    this.addSprites(obstacle1Image, 0.04, obstaclesPositions.length,obstaculos, obstaclesPositions)
    
  }

  play(){
    this.showElements()
    this.reset()
    form.hide()
  Player.getPlayerinfo()
  player.getcarsEnd()
  
  if(allPlayers!==undefined){
    image(pista,0,-height*5,width,height*6)
    this.showLeaderboard()
    this.showLife()
    this.showFuel()
   var index = 0
   for(var plr in allPlayers ){
    index+=1
   var x = allPlayers[plr].posX
   var y = height-allPlayers[plr].posY
   var playerlife = allPlayers[plr].life

    if(playerlife <= 0 ){
    cars[index-1].changeImage("blast")
    cars[index-1].scale = 0.3
    this.vida = false
    }




   cars[index-1].position.x = x
   cars[index-1].position.y = y

    if(index === player.index){
      fill("green")
      ellipse(x,y,50,50)
      camera.position.y = cars[index-1].position.y

      this.addFuel(index)
      this.addCoin(index)
      this.batida(index)
      this.batidacarros(index)

    }

    

  }
   




  this.controls()

  const chegada = height*6-100

  if(player.posY > chegada){
    gameState = 2
    player.rank += 1
    Player.updatecarsEnd(player.rank)
    player.update()
    this.showrank()
  }




    drawSprites()

  }
  }

 
  
  
    getState(){
    var stateref = database.ref("gameState")
    stateref.on("value", (data) => {
    gameState = data.val()
    })
  }
  
  updateState(valor){
  database.ref("/").update({
    gameState: valor
  })}

  controls(){
    //87 = W, A=65, S = 83
 if(this.vida){
  if(keyIsDown(87)){
    player.posY += 10
    player.fuel -= 0.5
    player.update()
  }
  
    if(keyIsDown(65)&& player.posX > width/3-50){
      player.posX -= 10
      player.fuel -= 0.3
      player.update()
      this.key = false
    }
  
    if(keyIsDown(68)&& player.posX < width/2+300){
      player.posX += 10
      player.fuel -= 0.3
      player.update()
      this.key = true
    }
  
 }
  

  }

 reset(){
this.resetButton.mousePressed(()=>{
  database.ref("/").set({
    carsEnd : 0, 
    playerCount : 0,
    gameState : 0,
    players :{}
  })
  location.reload()
})


 }

 showElements(){
  this.resetButton.class("resetButton")
  this.resetButton.position(width/2+225,50)
  this.resetTitle.html("Reset")
  this.resetTitle.position(width/2+200,100)
  this.resetTitle.class("resetText")

  form.titleImg.position(50,50)
  form.titleImg.class("gameTitleAfterEffect")




  this.leaderTitle.html("Placar")
  this.leaderTitle.class("resetText")
  this.leaderTitle.position(width/3-60, 50)

  this.leader1.class("leadersText")
  this.leader1.position(width/3-50, 90)

  this.leader2.class("leadersText")
  this.leader2.position(width/3-50, 140)




 }


 showLeaderboard() {
  var leader1, leader2;
  var players = Object.values(allPlayers);
  if (
    (players[0].rank === 0 && players[1].rank === 0) ||
    players[0].rank === 1
  ) {
    // &emsp;    Essa etiqueta é usada para exibir quatro espaços.
    leader1 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;

    leader2 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;
  }

  if (players[1].rank === 1) {
    leader1 =
      players[1].rank +
      "&emsp;" +
      players[1].name +
      "&emsp;" +
      players[1].score;

    leader2 =
      players[0].rank +
      "&emsp;" +
      players[0].name +
      "&emsp;" +
      players[0].score;
  }

  this.leader1.html(leader1);
  this.leader2.html(leader2);
}

addSprites(imagem,scale,numero,grupo, positions = []){
for(var i = 0; i < numero; i++){
  var x 
  var y
 
 if(positions.length > 0){
  x = positions[i].x
  y = positions[i].y
  imagem = positions[i].image
}
 else{
  
  x = random(width/2 +150, width/2 -150)
  y = random(-height*4.5,height - 400)

 }
  
  var sprite = createSprite(x,y)
  sprite.addImage(imagem)
  sprite.scale=(scale)
  grupo.add(sprite)

}
}

addFuel(index){
cars[index - 1].overlap(gasolinas,function(coletor,coletavel){
  player.fuel = 200
  coletavel.remove()
})
if(player.fuel <= 0 ){
gameState = 2
this.gameOver()


}
}


addCoin(index){
  cars[index - 1].overlap(moedas,function(coletor,coletavel){
    player.score += 1
    coletavel.remove()
    player.update()
  })
  }

  showrank(){
  swal({
    title:`Parbéns por ganhar ${"\n"} ${player.rank}º lugar`,
    Text: `Obrigado por jogar!`,
    imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "OK",
  })

  }


  showLife(){
  push()
    image(lifeImg,width/2-130, height - player.posY -300, 20, 20)
    fill("black")
    rect(width/2-100, height - player.posY - 300, 200, 20)
    fill("green")
    rect(width/2-100, height - player.posY -300, player.life, 20)

  pop()
  }


  showFuel(){
    push()
      image(fuelImg,width/2-130, height - player.posY -200, 20, 20)
      fill("black")
      rect(width/2-100, height - player.posY - 200, 200, 20)
      fill("orange")
      rect(width/2-100, height - player.posY -200, player.fuel, 20)
  
    pop()
    }

    gameOver() {
      swal({
        title: "Fim de Jogo",
        text: "Oops você perdeu a corrida!",
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      });
    }

    batida(index){
      if(cars[index-1].collide(obstaculos)){
       
       if(this.key){
        player.posX -= 100
       }
       else{
        player.posX += 100
       }
       
       
        if(player.life > 0){
          player.life -= 200/4
          
        }
        player.update()
      }
    }


    batidacarros(index){

      if(index===1){
        if(cars[index-1].collide(cars[1])){
          
          if(this.key){
            player.posX -= 100
           }
           else{
            player.posX += 100
           }
           
           
            if(player.life > 0){
              player.life -= 200/4
              
            }
            player.update()

        }
      }


      if(index===2){
        if(cars[index-1].collide(cars[0])){
          
          if(this.key){
            player.posX -= 100
           }
           else{
            player.posX += 100
           }
           
           
            if(player.life > 0){
              player.life -= 200/4
              
            }
            player.update()

        }
      }


    }







}
