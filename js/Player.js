class Player {
  constructor() {
  this.name = null
  this.index = null
  this.posX = 0
  this.posY = 0
  this.rank = 0
  this.score = 0
  this.fuel = 200
  this.life = 200
  }

getCount(){
  var countref = database.ref("playerCount")
  countref.on("value", (data) => {
  playerCount = data.val()
  })
}

updateCount(valor){
database.ref("/").update({
  playerCount: valor
})}

addPlayer(){
  var playersIndex = "players/player" + this.index

  if(this.index === 1){
this.posX = width/2 - 200
} 
else{
this.posX = width/2 + 100
}
database.ref(playersIndex).set({
  name: this.name,
  posX: this.posX,
  posY: this.posY,
  rank: this.rank,
  score: this.score,
  fuel: this.fuel,
  life: this.life
})
}
static getPlayerinfo(){
  var inforef = database.ref("players")
  inforef.on("value",(data)=>{
    allPlayers = data.val()
  })
}

update(){
  var playersIndex = "players/player" + this.index

  
database.ref(playersIndex).update({
  posX: this.posX,
  posY: this.posY,
  rank: this.rank,
  score: this.score,
  fuel: this.fuel,
  life: this.life
})
}

distance(){
var distanceref = database.ref("players/player"+this.index)
distanceref.on("value",data => {
  var data = data.val()
  this.posX = data.posX
  this.posY = data.posY
})

}

getcarsEnd(){
database.ref("carsEnd").on("value",data => {
this.rank = data.val()

} )
}

static updatecarsEnd(rank){
  database.ref("/").update({
    carsEnd : rank
    


  })



}
}
