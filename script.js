
/////////// 1. Canvas Setup ///////////////////////////////////

const canvas = document.getElementById('canvas1');
// it will need getContext, to have access to build in 2d drawing methods 
const ctx = canvas.getContext('2d');
canvas.width = 800; 
canvas.height = 500; 

// Score increased by one for every bubble that the fish caught
let score = 0; 
//GameFrame increased by one for every animation Loop.
let gameFrame = 0; 
ctx.font = '50px Georgia'; 


/////////////////2. Get the Mouse coordinates ////////////////

let canvasPosition = canvas.getBoundingClientRect(); 
// console.log(canvasPosition)

// create mouse object with his startposition
const mouse =  { 
    x: canvas.width / 2 ,    // = 400 ist die mitte 
    y: canvas.height / 2,   //  = 250 ist die mitte
    click: false
}

// create two eventlistners ( mousedown, mouseup )
canvas.addEventListener('mousedown', function(event) {
   mouse.click = true; 
   mouse.x = event.x - Math.floor(canvasPosition.left); 
   mouse.y = event.y - Math.floor(canvasPosition.top);
   console.log(mouse.x, mouse.y);
}); 

canvas.addEventListener('mouseup',function(){
    mouse.click = false; 
}) 

//////////////////////3.create player///////////////////// 


class Player {
    constructor(){
        //startposition 
        this.x = canvas.width;    // manage left and right.
        this.y = canvas.height / 2; // half of the height. 
        this.radius = 30; 
        //will rotate the player towards current mouse position 
        this.angle = 0; 
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0;  
        this.spriteWidth = 498; 
        this.spriteHeight = 327; 
    }
   
    update() { 
         //calculate distance betweend player und mouse 
        const distancePlayerX = this.x -mouse.x;
        const distancePlayerY = this.y -mouse.y; 
        // change the current player position  
        if (mouse.x !== this.x) { 
            this.x -= distancePlayerX /20 ; // speed of movemend 
        } 
        if( mouse.y !== this.y) {
            this.y -= distancePlayerY/20;
        }
    }
    draw(){
        if(mouse.click) {
            //line 
            ctx.lineWidth = 0.2;
            ctx.beginPath(); 
            // starting position of the line. 
            ctx.moveTo(this.x, this.y);
            //endposition of line 
            ctx.lineTo(mouse.x, mouse.y);
            //stroke connect the two points
            ctx.stroke();
        }
      
        ctx.fillStyle = 'red'; 
        //for the circle
        ctx.beginPath(); 
        //form
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        //fill draw the circle 
        ctx.fill(); 
        ctx.closePath(); 
    }
}

//create Player Object 
const player = new Player()


////////////// 4. create Bubbles ////////////////////
const bubblesArray = [];

class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100 ;
        this.radius = 50;
        //a rendom number between 1 and 6 
        this.speed = Math.random() * 5 + 1;
        
        this.distance; 
        // add only one point per bubble to the score. 
        this.counted = false; 
        //
        this.sound = Math.random() <= 0.5 ? 'sound1':'sound2' ; 
     }
   
    update(){
         // move bubbles up 
        this.y -= this.speed; 
        // calculate distance between player and a bubble
        const distanceBubbleX = this.x - player.x;
        const distanceBubbleY = this.y - player.y;

        this.distance = Math.sqrt(distanceBubbleX * distanceBubbleX + distanceBubbleY * distanceBubbleY);
    }
    draw() {
        //draw a blue circle
        ctx.fillStyle = 'blue'; 
        ctx.beginPath(); 
        ctx.arc( this.x, this.y, this.radius, 0, Math.PI *2); 
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
    }
}

////////////////////// 4.1 Handle Bubbles /////////////////////////

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'Plop.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'bubbles-single2.wav';


function handleBubbles() {
  
    if (gameFrame % 50 == 0) { 
        bubblesArray.push(new Bubble());
        //console.log(bubblesArray.length);
    }
  
    for(let i = 0; i < bubblesArray.length; i++) {
        //each element calling both of his method
        bubblesArray[i].update(); 
        bubblesArray[i].draw();   
    }

    
    for (let i = 0; i < bubblesArray.length; i++){

    
/* if one Bubble moved past the top edge of canvas, remove this bubble. with .radius * 2 prevents the bubbles from disappearing from the screen too early */
        if(bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){
            bubblesArray.splice(i,1);
        }

        // check if player and a bubble has a collision, thats happen when the distance is less then 80 
        if (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {   
        //console.log('collision');

        // only if this.counted is false, increment the score by one 
        if(!bubblesArray[i].counted) {

            if (bubblesArray[i].sound == 'sound1') {
                bubblePop1.play();
            } else 
            bubblePop2.play();
            score++;
           
            bubblesArray[i].counted = true;
            // remove this bubble from the array 
            bubblesArray.splice(i, 1);
        }      
        }
        
    }

}

 
/////////////////////// animation Loop //////////////////////////

/* Here we calling all functions */
  
function animate( ) {
    //clearing the entire canvas from old paint. 
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    // calling bubbles function. 
    handleBubbles();
    //calling the player-update Method to calculate player position
    player.update();
    // calling player-draw Method to draw a line between player and Mouse and draw a circle
    player.draw();
    
  
    ctx.fillStyle = 'black';
    // text|| x.position || y.position
    ctx.fillText(`score: ${score}`,10,50);
    // every frame of animation this variable increment by one 
     gameFrame++; 
    //console.log(gameFrame); 
    //creating an animation loop, through a principle that called recursion, where a function calls itself over an over.
    requestAnimationFrame(animate);
}

animate()

