// Playerimages 
const playerLeft = new Image();
playerLeft.src = 'images/fish_swim_left.png ';

const playerRight = new Image(); 
playerRight.src ='images/fish_swim_right.png';

// Repeating BackgroundImage 
const background = new Image(); 
background.src = 'images/D8GEAg5.png'; 

//BubbleImage  
const bubbleImage = new Image(); 
bubbleImage.src = 'images/bubble_pop_frame_01.png'; 

//EnemyfromRightImage
const enemyFromRightImg = new Image(); 
enemyFromRightImg.src = 'images/enemy1.png';

//EnemyfromLeftImage
const enemyLeftImg= new Image(); 
enemyLeftImg.src = 'images/enemyLeft.png';


//sounds 
const bubblePop1 = document.createElement('audio');
bubblePop1.src = 'sound/Plop.ogg';
const bubblePop2 = document.createElement('audio');
bubblePop2.src = 'sound/bubbles-single2.wav';

//button 
const restartBtn= document.getElementById('startBtn');
restartBtn.style.display ='none'; 
 

/////////// 1. Canvas Setup //////////////////////

const canvas = document.getElementById('canvas1');
//  getContext, to have access to build in 2d drawing methods 
const ctx = canvas.getContext('2d');
canvas.width = 800; 
canvas.height = 500; 

//Global variables 
let score = 0; 
//GameFrame increased by one for every animation Loop.
let gameFrame = 80; 
ctx.font = '50px Grandstander'; 
let gameSpeed = 1; 
let gameOver = false; 

///////////////// 2. Mouse coordinates ////////////////////

let canvasPosition = canvas.getBoundingClientRect(); 
// console.log(canvasPosition)

//resize window to right mouse position
window.addEventListener('resize', function (){
    canvasPosition = canvas.getBoundingClientRect(); 
});

// mouse object & startposition
const mouse =  { 
    x: canvas.width / 2 ,    // = 400 ist die mitte 
    y: canvas.height / 2,   //  = 250 ist die mitte
    click: false
}

// eventlistener 
canvas.addEventListener('mousedown', function(event) {
   mouse.click = true; 
   mouse.x = event.x - Math.floor(canvasPosition.left); 
   mouse.y = event.y - Math.floor(canvasPosition.top);
   console.log(mouse.x, mouse.y);
}); 

canvas.addEventListener('mouseup',function(){
    mouse.click = false; 
}) 


////////////////////// player Class /////////////////////

class Player {
    constructor(){
        //startposition 
        this.x = canvas.width;    // direction from left or right
        this.y = canvas.height/2; // half of the height 
        this.radius = 30; 
        // calculation result of theta
        this.angle = 0; 
        //for the images
        this.frameX = 0; 
        this.frameY = 0; 
        this.frame = 0;  
        //the position of the frame, from the Sprite sheets
        this.spriteWidth = 498; 
        this.spriteHeight = 327; 
    }

    update() { 
         //calculating distance betweend player und mouse 
        const distanceXplayerMouse = this.x -mouse.x;
        const distanceYplayerMouse  = this.y -mouse.y; 
        // rotate the fishposition, face the mouse 
        let theta = Math.atan2(distanceYplayerMouse, distanceXplayerMouse )
        this.angle = theta 
        // change the current player position  
        if (mouse.x !== this.x) { 
            this.x -= distanceXplayerMouse /18 ; // speed of movemend 
        } 
        if( mouse.y !== this.y) {
            this.y -= distanceYplayerMouse/18;
        }
    }
    draw(){
       // save current canvas settings
       ctx.save(); 
       // reflect currently player position
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

//Player Object 
const player = new Player()

////////////// Bubble Class ////////////////////

const bubblesArray = [];

class Bubble {
    constructor(){

        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100 ;
        this.radius = 50;
        //a rendom number between 1 and 6 
        this.speed = Math.random() * 10 + 1;
        //result of calculation of each individual bubble and player.
        this.distance; 
        // adding only one point per bubble count to the score. 
        this.counted = false; 
        //ternary operator. assigned randomly sound to bubbles
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


function handleBubbles() {
        
    if (gameFrame % 45 == 0) { 
        bubblesArray.push(new Bubble());
        //console.log(bubblesArray.length);
    }

    for(let i = 0; i < bubblesArray.length; i++) {
        //each element calling this methods 
        bubblesArray[i].update(); 
        bubblesArray[i].draw();  
        //prevent the array from growing endlessly. 
        //check if bubble has disappeared over the top edge
        if(bubblesArray[i].y < 0 - bubblesArray[i].radius * 2){
         //if so remove 
         bubblesArray.splice(i,1);
         //for the correct index 
         i--;

    // check if if player and a bubble has a collision
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

///////////////////////  Background  //////////////////////////



const BG = { 
    //first wave img 
    firstImg_x: 0, 
    //second wave img position right
    secondImg_x: canvas.width, 
    y: 0,
    width: canvas.width, 
    height: canvas.height
} 

//BackgroundImage corals
const corals = new Image(); 
corals.src = 'images/corals.png'; 

//BackgroundImage corals
const BG2 = { 
    x: 0,   
    y: 0,
    width: canvas.width, 
    height: canvas.height
}  

////////////// function handleBackground /// ////////////////

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
    
    ctx.drawImage(
        corals, 
        BG2.x, 
        BG2.y, 
        BG2.width, 
        BG2.height );  
}

///////// enemys from from Right & Left  //////////////////////////////////////



class EnemyfromRight { 
    constructor () {
        //startposition
        this.x = canvas.width - 400;
        this.y = Math.random() * (canvas.height  - 150) + 90 ; 
        //for collision 
        this.radius = 60; 
        this.speed = Math.random() * 8 + 2; 
        //for drawImage
        this.frame = 0;  
        this.frameX = 0; 
        this.frameY = 0; 
        this.spriteWidth = 418; 
        this.spriteHeight = 397;
    }
    draw() {
        /*
        ctx.fillStyle = ('red')
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2 );
        ctx.fill();
        */ 
        ctx.drawImage ( enemyFromRightImg,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x -90,
            this.y -85,
            this.spriteWidth /2.2,
            this.spriteHeight /2.2 )
    }
    update() {
        // movement direction 
        this.x -= this.speed; 
        //if enemy disapperead 
        if (this.x < 0 - this.radius * 2) {
            //reset
            this.x  = canvas.width + 700;
            this.y = Math.random() * (canvas.height -150) + 90; 
            this.speed = Math.random() * 10 + 2; 
        }

        // collision with player 
        const distanceEnemyX = this.x - player.x;
        const distanceEnemyY = this.y - player.y;
        const distance = Math.sqrt(distanceEnemyX * distanceEnemyX+ distanceEnemyY * distanceEnemyY);

        if ( distance < this.radius + player.radius) {
            handleGameOver();
        }
    } 
}

class EnemyfromLeft { 
    constructor () {
        //startposition
        this.x = 0 - 400;
        this.y = Math.random() * (canvas.height  - 150) + 90 ; 
        //for collision 
        this.radius = 30; 
        this.speed = Math.random() * 2 + 2; 
        //for drawImage
        this.frame = 0;  
        this.frameX = 0; 
        this.frameY = 0; 
        this.spriteWidth = 418; 
        this.spriteHeight = 397;
    }
    draw() {
        /*
        ctx.fillStyle = ('red')
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2 );
        ctx.fill();
        */

        ctx.drawImage ( enemyLeftImg,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.x -56,
            this.y -35,
            this.spriteWidth /4.2,
            this.spriteHeight /4.2 )
    }
    update() {

        // movement direction 
        this.x += this.speed; 
        //if enemy disapperead 
        if (this.x > canvas.width - this.radius * 2) {
            //reset
            this.x  = 0 - 5000;
            this.y = Math.random() * (canvas.height -150) + 90; 
            this.speed = Math.random() * 10 + 2; 
        }

        // collision with player 
        const distanceEnemyX = this.x - player.x;
        const distanceEnemyY = this.y - player.y;
        const distance = Math.sqrt(distanceEnemyX * distanceEnemyX+ distanceEnemyY * distanceEnemyY);

        if ( distance < this.radius + player.radius) {
            handleGameOver();
        }
    } 
}


const enemyRight = new EnemyfromRight(); 
//const enemy2 = new EnemyfromRight()
const enemyLeft = new EnemyfromLeft(); 


////// function handleEnemeies & handleGameOver /////////////////

function handleEnemies() { 
    enemyRight.draw(); 
    enemyRight.update(); 
    enemyLeft.draw()
    enemyLeft.update()
}

function handleGameOver() {
    
    //ctx.fillStyle = 'red';
    //ctx.lineWidth = 5;
    //ctx.strokeRect( 0, 0, 800, 500 ) 
    ctx.font = '60px Grandstander'
    ctx.fillStyle = ' #5499c7 ';  //#04B486
    //ctx.fillText('G A M E   O V E R ', 200, 150 ); 
    gameOver = true; 
    restartBtn.style.display ='inline'
}

////////////// function animation ////////////////

/*
const startBtn= document.getElementById('startBtn');


function reload() {
    startBtn.style.display ='none'; 
} 
*/

function animate( ) {
    ctx.clearRect( 0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBubbles();
    player.update();
    player.draw();
    handleEnemies()

    //ctx.fillStyle = ' #922b21 ';
    ctx.font = '159px Grandstander'
    ctx.fillStyle = "rgba(241, 196, 15 )";
    // text|| x.position || y.position
    ctx.fillText(` ${score}`,0, 450); //10/45
    // for the bubbels
     gameFrame++; 
    //console.log(gameFrame); 
    //creating an animation loop, through a principle that called recursion, where a function calls itself over an over.
    if(!gameOver)
    requestAnimationFrame(animate);
}

animate()

/*

https://stackoverflow.com/questions/17480115/a-function-to-preload-images-need-to-draw-them-now-but-how
https://www.reddit.com/r/learnprogramming/comments/1xrf6j/html5javascript_canvas_hell_and_image_preloading/ */


