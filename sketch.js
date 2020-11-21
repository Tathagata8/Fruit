var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, swordImage, t,fruitGroup,fruit, fruit1, fruit2, fruit3, fruit4, alienGroup, monsterImg; 

var knifeSound, gameOverSound

var score;

function preload(){
  
 swordImage = loadImage("sword.png");
 fruit1 = loadImage("fruit1.png");
 fruit2 = loadImage("fruit2.png");
 fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
 monsterImg = loadImage("alien1.png");   
 gameOverImage = loadImage("gameover.png");

knifeSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

}

function setup() {
  
createCanvas(600,600);
  
  //creating sword 
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  
  score =0;


  //creating groups
  fruitGroup = createGroup();
  alienGroup = createGroup();
 
  //creating gameover sprite
   gameOver = createSprite(300,300,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 2;
}






function draw(){

 //creating background
  background("skyblue");
  
  text("Score:" + score, 270,30);
  
  if(gameState === PLAY) {
    
    
    
    
    //controlling sword
    sword.y = World.mouseY;
    sword.x = World.mouseX;
  
   //increasing score
    if(fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score+2;
     knifeSound.play();
    }
    
   //creating fruits
      fruits();
    
   //creating alien1
      alien();
    
    gameOver.visible = false;
    
  if(sword.isTouching(alienGroup)) {
    gameState = END;
    fruitGroup.destroyEach();
     alienGroup.destroyEach();
     gameOverSound.play();
      
    
    }
  
  
  }
  
  else if(gameState === END) {
     sword.velocitY = 0;
      sword.velocityX = 0;
     fruitGroup.setVelocityXEach =0;
    alienGroup.setVelocityXEach =0;
    
     gameOver.visible = true;
  }
  
  
  
  
  drawSprites();
}


function fruits() {

  if(World.frameCount % 80===0) {
    fruit = createSprite(300,200,20,20);
    fruit.scale= 0.2;
    t= Math.round(random(1,4));
    if(t ==1) {
      fruit.addImage(fruit1);  
    } else if (t==2) {
      fruit.addImage(fruit2);
    } else if (t==3) {
      fruit.addImage(fruit3);      
    } else if(t==4) {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(40,560));
    
    fruit.velocityX =  -(8 + score/10 );
    fruit.setlifetime = 100;
    
    fruitGroup.add(fruit);
    
  }

}
 
 function alien() {
if(World.frameCount % 150 === 0) {
  monster= createSprite(400,200,20,20);
  monster.addImage("enemy", monsterImg);
  monster.y = Math.round(random(50,570));
  monster.velocityX = -(8 + score/10 );
  monster.setlifetime = 75;
  
  alienGroup.add(monster);
}
 
 }


