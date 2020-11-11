var dog,happyDog,dog1;
var database;
var foodS,foodStock;

var milk = 0;
function preload()
{
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,290);
  dog.addImage(dog1);
  dog.scale = 0.2;
  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
}


function draw() {  
  background("cyan");
  drawSprites();
  textSize(20);
  fill("white");
  stroke("black");
  text("Note: PRESS UP_ARROW KEY To Feed Drago Milk",20,80);
  text("Food Remaining:"+milk,170,180);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
   
  if(keyWentUp(UP_ARROW)){
    
    dog.addImage(dog1);

  }
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1;
  }


database.ref('/').update({
Food:x
})

}


