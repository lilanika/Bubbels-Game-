# JS | Fish Game  

-> https://www.youtube.com/watch?v=jl29qI62XPg

###### Day 1
1. canvas setup
2. mouse Interaction - capture mouse position and make it available for the whole aplication.
3. create a Player
4. create Bubbles for a player to pop und score points.
4.1 create function handleBubbles()
5. Animation Loop where all of that will bring the game to life.
6. add sound to the bubbles. 

##### Day 2

## 1. canvas setup  

## 2 mouse Interaction & coordinates

###### getBoundingClientRect(); 
    Ohne diese Methode wird der Abstand von der Kante des Fensters und nicht von den Kanten des Bildschirmelements gemessen. 
    Mit dieser Methode wird die aktuelle Größe und Position des Canvas-Elements gemessen. 

###### create mouse object with his startposition
###### create two eventlisteners mousedown & mouseup
   They will overwrite the properties of mouse object with correct mouseposition, whenever the user press mouse down or up.

-> addEventListener ('mousedown') takes two arguments: type of event to listen for which is mousedown and callback Function that will run, when the event occurs / erfolgt the callback function has access to event object where we get the real x and y coordinates.
.> addEventListener ('mouseup') takes two arguments: type of event to listen for wich is mouseup and callback Function set the booleanvalue to false.

# 3 create a class of Player
######  properties

-> startposition = this.x || this.y
-> radius = 30
-> this.angle will rotate the player towards current mouse position
-> Frames.x || y will Face the direction the fish is swimming in.
-> frame will keep track of number of frames and the current position we are animating.

###### Methods 
###### Update() 
    this Method update Player position to move the player towards the mouse. It compares player current position and current mouse position. 
    If they don't have the same y and x coordinates,the function should measure the distance and subtract the distance from player position.
    It also takes care how fast the Object takes the position of the mouse  /30 

######  draw()
    The purpose of a draw method is to update the screen in milliseconds. This is the reason why on the screen you can see the movements. 

    Here it shows a red circle. 
    Also, with each mouse click, a line is created that starts at the player object and ends at the coordinates of the mouse pointer.  The player object  move to the  new X and y coordinates calculated in the Update() function. 
# 4. create Bubbles for a player to pop und score points.

###### create a bubbleArray 
######  create class of Bubble that has properties and his own methods. 

######  Properties: 
######  this.x 
random Number between 0 and 800 (canvas.width) 
###### this.y
random Number between 500 (canvas.height )+ 100it makes sure that the bubbles looking good. 
######  this. Speed
random number between 1 and 6
######  this.distance 
 will keep track of distance between each individual bubble.
######  this. Counted = false
makes sure that only one point per bubble added to the score. 
######  this. Sound
The Bubbles have two different sound. 
They will randomly assign 
whenever new Bubble is create
For this we use the ternary operator.it's a one line if else statement.Where we define which sound will be playing when the condition is true or false.If the random Number is less or equal to 0.than the condition is true,return sound1 

2.2 Methods
######  update() 
// move bubbles up.  Each bubble move in negative direction on y-axis 
depending on their individual speed. 
// calculate distance between player and a bubble
######  draw()
2.2 draw a blue circle


# 4.1 create function handleBubbles()

######  create every 50 frame rates a new Bubble Object
This function should create every 50 frame rates a new Bubble Object 
and push it to the bubblesArray The gameFrame can be used to add periodic 
events to our game and has his invoking place in the animation function. 
The new Bubble trigger the constructor that is in
the Bubble class and create a new Bubble object */ 
###### iterate throw bubblesArray. 
 Each bubble call Update() and the draw method. 
######  prevent the array from growing endlessly.
 If this bubble vertical y position is less than 0, than it has moved pass the top of canvas, call splice method. Splice cut out every Element a certain/bestimmten index from the Array 
######  check if player and a bubble has a collision
 that's happen when the distance is less than 80 
###### if this. Counted is false
//increment the score by one 
//set counted to true
// remove this bubble from the array 
*/ 




# 6. animation Loop 

###### clearing the entire canvas from old paint with clearRect 
###### calling handleBubbles()
###### calling player.update();
######  show the current score 
######  increment gameFrame++ by one 
######  creating an animation loop = requestAnimationFrame(animate);
through a principle that called recursion, where a function calls itself over an over.
