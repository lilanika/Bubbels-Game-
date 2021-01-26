
/////////// 1. Canvas Setup //////////////////////

const canvas = document.getElementById('canvas1');
// it will need getContext, to have access to build in 2d drawing methods 
const ctx = canvas.getContext('2d');
canvas.width = 800; 
canvas.height = 500; 

//Global variables 

// Score increased by one for every bubble that the fish caught
let score = 0; 
//GameFrame increased by one for every animation Loop.
let gameFrame = 0; 
ctx.font = '50px Georgia'; 
let gameSpeed = 1; 

/////////////////2. Get the Mouse coordinates ////////////////

let canvasPosition = canvas.getBoundingClientRect(); 
// console.log(canvasPosition)

//resize window to right mouse position
window.addEventListener('resize', function (){
    canvasPosition = canvas.getBoundingClientRect(); 

});

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

// Playerimages 
const playerLeft = new Image();
playerLeft.src = 'images/fish_swim_left.png ';

const playerRight = new Image(); 
playerRight.src ='images/fish_swim_right.png';

class Player {
    constructor(){
        //startposition 
        this.x = canvas.width;    // direction from left or right
        this.y = canvas.height/2; // half of the height 
        this.radius = 30; 
        // player rotate around in a circle to face the mouse
        // calculte theta wich is the counterclockwise angle between x acsis and any point. 
        this.angle = 0; 
        //for the images
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0;  
        //the position of the frame, that we need from the sheet.  
        this.spriteWidth = 498; 
        this.spriteHeight = 327; 
    }

    update() { 
         //calculate distance betweend player und mouse 
        const distanceXplayerMouse = this.x -mouse.x;
        const distanceYplayerMouse  = this.y -mouse.y; 
        // to rotate the fishposition 
        let theta = Math.atan2(distanceYplayerMouse, distanceXplayerMouse )
        this.angle = theta 
        // change the current player position  
        if (mouse.x !== this.x) { 
            this.x -= distanceXplayerMouse /20 ; // speed of movemend 
        } 
        if( mouse.y !== this.y) {
            this.y -= distanceYplayerMouse/20;
        }
    }
    draw(){

       // save current canvas settings
       ctx.save(); 
       // reflect curretly player position
       ctx.translate(this.x , this.y); 
       ctx.rotate(this.angle);


        if(this.x >= mouse.x){
            ctx.drawImage(playerLeft, 
                // crop out area
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth, 
                this.spriteHeight,
                // position 
                0 - 60, 
                0 - 45,
                //scale
                this.spriteWidth /4,
                this.spriteHeight /4 ); 

        }   else {
            ctx.drawImage(playerRight, 
                this.frameX * this.spriteWidth,
                this.frameY * this.spriteHeight,
                this.spriteWidth,
                this.spriteHeight,
                0 - 60,
                0 - 45,
                this.spriteWidth / 4,
                this.spriteHeight /4 ); 
        } 
        // reset all translate and rotate cores, 
        //to the last call of ctx.safe()
        ctx.restore()
    }
} 
//create Player Object 
const player = new Player()


////////////// 4. create Bubbles ////////////////////

const bubblesArray = [];
//Bubble Image 
const bubbleImage = new Image(); 
bubbleImage.src = 'images/bubble_pop_frame_01.png'; 
class Bubble {
    constructor(){

        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100 ;
        this.radius = 50;
        //a rendom number between 1 and 6 
        this.speed = Math.random() * 5 + 1;

        this.distance; 
        // add only one point per bubble count to the score. 
        this.counted = false; 
        //ternary operator. assigned randomly
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
       //BubbleImage 
        ctx.drawImage( bubbleImage , 
        this.x -68,
        this.y -68,
        this.radius * 2.7, 
        this.radius * 2.7
        ) 
    }
}

////////////////////// 4.1 function handleBubbles() ////////////

const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'sound/Plop.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'sound/bubbles-single2.wav';

function handleBubbles() {
  
    if (gameFrame % 50 == 0) { 
        bubblesArray.push(new Bubble());
        //console.log(bubblesArray.length);
    }

    for(let i = 0; i < bubblesArray.length; i++) {
        //each element calling this methods 
        bubblesArray[i].update(); 
        bubblesArray[i].draw();   
        //check if bubble has disappeared over the top edge
        if(bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){
         //if so remove 
         bubblesArray.splice(i,1);
         //for the correct index 
         i--;


    } else if 
    (bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {   

        if(!bubblesArray[i].counted) {
        if (bubblesArray[i].sound == 'sound1') {
            bubblePop1.play();
        } else 
            bubblePop2.play();
            score ++;
            bubblesArray[i].counted = true;
            bubblesArray.splice(i, 1);
             i--;
        }
    }
   }
}

/////////////////////// animation Loop //////////////////////////
/* Here we calling all functions */
/*
###### clearing the entire canvas from old paint with clearRect 
###### calling handleBubbles()
###### calling player.update();
######  show the current score 
######  increment gameFrame++ by one 
######  creating an animation loop = requestAnimationFrame(animate);
through a principle that called recursion, where a function calls itself over an over. */ 




// Repeating Background 
const background = new Image(); 
background.src = 'images/D8GEAg5.png'; 

const BG = { 
    //first img 
    firstImg_x: 0, 
    //second img so right
    secondImg_x: canvas.width, 
    y: 0,
    width: canvas.width, 
    height: canvas.height
}

//////////////function handleBackground() ////////////////

function handleBackground(){ 

    BG.firstImg_x -= gameSpeed;
    if (BG.firstImg_x < - BG.width) {
    BG.firstImg_x= BG.width;
    }
    BG.secondImg_x -= gameSpeed;
    if (BG. secondImg_x < -BG.width) {
    BG.secondImg_x = BG.width;
    }
    ctx.drawImage(
        background,
        BG.firstImg_x,
        BG.y,
        BG.width, 
        BG.height );

    ctx.drawImage(
        background, 
        BG.secondImg_x, 
        BG.y, 
        BG.width, 
        BG.height );    
}
  
function animate( ) {
    //clearing the entire canvas from old paint. 
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    // calling bubbles function. 
    handleBackground();
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



