var tower, towerimg;
var door, doorimg,doorG;
var climber, climberimg, climberG;
var ghost, ghostimg;
var iv, ivg;


var gameState = "PLAY"
function preload() {
 towerimg = loadImage("tower.png")
 doorimg = loadImage("door.png")
 climberimg = loadImage("climber.png")
 ghostimg = loadImage("ghost-standing.png")
 ivg = new Group();
  doorG = new Group();
  climberG = new Group();
}

function setup() {
 createCanvas(windowWidth,windowHeight)
  
  tower = createSprite(windowWidth/2,windowHeight/2)
  tower.addImage("tower", towerimg)
  tower.velocityY = 3
  
  ghost = createSprite(windowWidth/2,windowHeight/2)
  ghost.addImage("ghost", ghostimg)
  ghost.scale = 0.35
  
  
}

function draw() {
 background(0)
 if (gameState === "PLAY") 
   {
   if(tower.y >= windowHeight)
{
  tower.y = tower.height/4
}
 
 if(ivg.isTouching(ghost)||ghost.y > windowHeight)
 {
 ghost.destroy()
  gameState = "END"
 }
   
   if(keyDown("space"))
  {
   ghost.velocityY = -5
  }

 ghost.velocityY += 0.5  
  
  if(keyDown("left"))
    {
    ghost.x -= 5
    }
  
  if(keyDown("right"))
    {
    ghost.x += 5
    }
  
  if(climberG.isTouching(ghost))
    {
     ghost.VelocityY = 0                                   
    }              
  spawnDoors()
  drawSprites()
   }
  if(gameState === "END")
    {
     
      
      text("GAMEOVER",windowWidth/2,windowHeight/2)
    }

}

function spawnDoors() {
 if(frameCount%250 === 0)
   {
     door = createSprite(windowWidth/2,-50)
     door.x = Math.round(random(windowWidth-500,windowWidth-200))
     door.addImage("door", doorimg)
     door.velocityY = 5
     door.lifetime = windowHeight/5
     
     climber = createSprite(windowWidth/2,10)
     climber.addImage("climber", climberimg)
     climber.x = door.x
     climber.velocityY = 5
     climber.lifetime = windowHeight/5
    
     iv = createSprite(windowWidth/2,15) 
     iv.width = climber.width
     iv.height = 2
     iv.x  = door.x
     iv.velocityY = 5
     iv.visible = false   
     ivg.add(iv)
     
     doorG.add(door)
     climberG.add(climber)
     
     door.depth = ghost.depth
     ghost.depth += 1
     
     
   }
}