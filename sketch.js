var dog1, dog2, dog, database, foods, foodStock

function preload()
{
  dog1 = loadImage("images/dog1.png")
  dog2 = loadImage("images/dog2.png")
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,350,20,20)
  dog.addImage(dog1)
  dog.scale = 0.3

  database = firebase.database();

  foodStock = database.ref("food")
  foodStock.on("value", readStock)
}


function draw() { 
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW)) {
    writeStock(foods)
    dog.addImage(dog2)
  }

  drawSprites();
  
  textSize(20)
  fill ("white")
  stroke (3)
  text("Food remaining: " + foods, 170, 225)
  text("press the up arrow to feed to the dog", 80,50)
}

function readStock(data) {
  foods = data.val()
}

function writeStock(x) {

  if(x<=0) {
    x = 0
  } else {
    x = x-1
  }

  database.ref("/").update({
    food : x
  })
}



