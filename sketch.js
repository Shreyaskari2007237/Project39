//Create variables here
var dog,dogHappy;
var database;
var foodS,foodStock;
var dogImg;
var feedDog,addFood;
var fedTime,lastFed;
var food;

function preload()
{
	//load images here
dogImg=loadImage("images/dogImg.png");
dogHappy=loadImage("images/dogImg1.png");

}

function setup() {
   database=firebase.database();
	createCanvas(500,500);
  dog = createSprite(250,250,5,5);
  dog.addImage(dogImg);
  dog.scale=0.2;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  food=new Food();

  feed=createButton("Feed The Dog");
  feed.position(640,90);
  feed.mousePressed(feedDog);

  add=createButton("Add Food");
  add.position(750,90);
  add.mousePressed(addFood)
}


function draw() {  
  background(46,139,87);
  fill("black");
  text(mouseX + ',' + mouseY, 30, 45);

  var fedTime = database.ref('FedTime');
  fedTime.on("value",function(data){
  lastFed= data.val();
        })
  //add styles here
  textSize(20);
  fill("white");
  stroke(2);
  textSize(20);
  text("Note:Press UP_ARROW Key To Feed Drago Milk!",30,30); 
  
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12 + "PM",40,56);
  }
  else if(lastFed==0){
    text("Last Feed:12 AM",40,56);
  }
  else{
    text("Last Feed:"+lastFed+"AM",40,56);
  }
  food.display();
  drawSprites();
}
  //Function to read values from DB
  function readStock(data){
  foodS=data.val();
  }
  //Function to write values in DB
  function writeStock(x){
    if(x<=0){
      x=0;
    }
    else{
      x=x-1;
    }
  
  }
  function addFood(){
    foodStock++
    database.ref('/').update({
      Food:foodStock
    })
  }
  function feedDog(){
    dogHappy.addImage(happyDog);
    food.updateFoodStock(food.getFoodStock()-1);
    database.ref('/').update({
      Food:food.getFoodStock(),
      fedTime:hour()
    })
  }
  


