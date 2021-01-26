# JS | Fish Game  

-> https://www.youtube.com/watch?v=jl29qI62XPg

###### Day 1
1. canvas setup
2. mouse Interaction - capture mouse position and make it available for the whole aplication.
3. create a Player
4. create Bubbles for a player to pop und score points.
4.1 create function handleBubbles()
5. function handleBackground(){ 
6. Animation Loop where all of that will bring the game to life.
7. add sound to the bubbles. 
The bubbles have two sounds. In the constructor of the class Bubbel both sounds are assigned randomly, with the ternary operator when a new bubble is created. 
another if statement in the handleBubbles function plays the assigned sound,when player and a bubble has a collision
soundeffects: www.opengameart.org

8. Player Image

##### Day 2
1. background image 
2. player image 
3. rotation of the fish 
4. bubble image
5. Readme 


## 1. canvas setup  
## 2 mouse Interaction & coordinates
###### Get the right mouse coordinates 
with getBoundingClientRect();  wird der Abstand von der Kante des Fensters und nicht von den Kanten des Bildschirmelements gemessen. 
Mit dieser Methode wird die aktuelle Größe und Position des Canvas-Elements gemessen. 
###### even if the screen is displayed in a reduced size
EventListener'resize' = resize window to right mouse position 

###### create mouse object with his startposition
###### create two eventlisteners mousedown & mouseup
   They will overwrite the properties of mouse object with correct mouseposition, whenever the user press mouse down or up.

-> addEventListener ('mousedown') takes two arguments: type of event to listen for which is mousedown and callback Function that will run, when the event occurs / erfolgt the callback function has access to event object where we get the real x and y coordinates.
.> addEventListener ('mouseup') takes two arguments: type of event to listen for wich is mouseup and callback Function set the booleanvalue to false.

# 3 create a class of Player
###### properties

-> startposition = this.x || this.y
-> radius = 30
-> this.angle will rotate the player towards current mouse position
-> Frames.x || y will Face the direction the fish is swimming in.
-> frame will keep track of number of frames and the current position we are animating.

###### Methods 
#### Update() 
#### move player towards the mouse
     in this Method the Player position will updated towards the mouse. It compares player current position and current mouse position. If they don't have the same y and x coordinates,the function should measure the distance and subtract the distance from player position. It also takes care how fast the Object takes the position of the mouse  /30

##### how the fish will always face the mouse
    calculation of theta wich is the counterclockwise angle between x acsis and any point. Cause update method runs over and over this angle will be recalulated for every frame of the game. 
        

######  draw()
    The purpose of a draw method is to update the screen in milliseconds. This is the reason why on the screen you can see the movements. 
##### show images and change the images depending on the direction 
   1. In Player draw() method the if statement checking if the mouse position is smaller or larger than the player position.and executes one of the two drawImage() methods. 
  
  The drawImage() method manages which image is displayed and how it behaves in terms of size and scalability. 
   > save() saves current canvas settings
   > translate() reflect curretly player position
   > rotate(this.angle)
   > restore() reset all translate and rotate cores, to the  last call of ctx safe = so just the player changing, nothing others. 


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

##### move bubbles up.  

Each bubble move in negative direction on y-axis 
depending on their individual speed. 
##### calculate distance between player and a bubble

###### draw()
###### show Bubble IMG 

# 4.1 function handleBubbles()
###### create every 50 frame rates a new Bubble Object
This function should create every 50 frame rates a new Bubble Object 
and push it to the bubblesArray The gameFrame can be used to add periodic events to our game and has his invoking place in the animationfunction. The new Bubble trigger the constructor that is in
the Bubble class and create a new Bubble object  
###### Each bubble call Update() and the draw method.  
 iterate throw bubblesArray.
######  prevent the array from growing endlessly.
 If this bubble vertical y position is less than 0, than it has moved pass the top of canvas, call splice method.
 if so remove with Splice. Decrementing i by one for the correct index 
 ###### check if if player and a bubble has a collision
That's happen when the distance is less than 80.
else if Is executed only for existing bubbles not the removed. 
###### if there is a collision 
-> increment the score by one 
-> Play one of the sounds
-> set counted to true
-> remove this bubble from the array 
-> Decrementing i by one for the correct index 


# 5 function handleBackground()

This function handle the background image 
every time this function runs it decrease the firstImg_x by one, the 
background (firstImg_x) sliding to the left.if firstImg_x is less than - BG.width (canvas width)so if it has completely disappeared behind the left edge of canvas,set firstImg_x to BG.width again.Same thing happens with the second image, secondImg_x.
# 6. animation Loop 

###### clearing the entire canvas from old paint with clearRect 
###### calling handleBubbles()
###### calling player.update();
###### show the current score 
###### increment gameFrame++ by one 
######  creating an animation loop = requestAnimationFrame(animate);
through a principle that called recursion, where a function calls itself over an over.
