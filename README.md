# JS | Fish Game  

How the game works: 
To get points the fish catches bubbles. He needs to be careful not to be eaten by his enemies.

When creating the game I  was follow this tutorial: https://www.youtube.com/watch?v=jl29qI62XPg
Images: 
https://www.gamedeveloperstudio.com/
underwater-vector: 
https://pngtree.com/freepng/cartoon-colorful-coral-under-seabed-reef-ocean-underwater-vector_5691694.html
Sound: 
www.opengameart.org

With the animation function everything starts its course
#### The Animation function repeats itself using requestAnimationFrame(animate). 
This function calls itself over an over again.
Through a principle that called recursion until Game over is set to true
This happens when the fish has a collision with its enemy.

###### 1. clearing the entire canvas from old paint with clearRect 
##### 2. calls function handleBackground(); 
for the movement of the background.
###### 3 calls function handleBubbles 
 This function, create every 50 frame rates a new Bubble Object,
 calls on each bubble the draw and update method. Prevent the array from growing endlessly. 
 Check if  player and a bubble has a collision. 
 If there is a collision 
increment the score by one 
-> Play one of the sounds
-> set counted to true
-> remove this bubble from the array 
-> Decrementing i by one for the correct index 
#### 4 calls player.update method. 
Update position of Player. The player moves in the direction of the mouse. 
And the player looks in the direction of the mouse. 
#### 5 calls player.draw()
show images
and change the Player img depending on the direction 
#### 6 handleEnemies()
calls the Update () method 
-> handle the movement direction. 
-> reset his Position to start position, when enemy disappeared entirely behind the left edge of canvas
-> If there is a collision with player and Enemy the Game is over.   

calls the draw() method 
-> shows the image and determines the behavior of the image

###### show the current score 
###### increment gameFrame++ by one to create Bubbles


 Long summary

## 1. canvas setup  
 to have access to build in 2d drawing methods it needs getContext. 
 Set the size of the canvas
 set global variables 
## 2 mouse Interaction & coordinates
###### Get the right mouse coordinates 

###### create mouse object with start position
###### getBoundingClientRect(); helps to get the correct
mouse coordinates.  
EventListener'resize' = resize window to right mouse position 
even if the screen is displayed in a reduced size
##### The two eventlisteners mouse down & mouse up,
 will overwrite the properties of mouse object with correct mouse position, whenever the user press mouse down or up.


# 3 create a class of Player

#### Update() 
#### move player towards the mouse
     in this Method the Player position will update towards the mouse. It compares player current position and current mouse position. If they don't have the same y and x coordinates, the function should measure the distance and subtract the distance from player position. It also takes care how fast the Object takes the position of the mouse  /30

##### ensures that the player always looks to the mouse when a click happens.
    Cause update method runs over and over this angle will be recalculated for every frame of the game.  calculation of theta which is the counterclockwise angle between x and any point. 
##### show images and change the images depending on the direction 
   1. In Player draw() 
  If the mouse position is smaller or larger than the player position it will execute  one of the two drawImage() methods. 
  The drawImage() method manages which image is displayed and how it behaves in terms of size and scalability. 
   > save() saves current canvas settings
   > translate() reflect currently player position
   > rotate(this.angle)
   > restore() reset all translate and rotate cores, to the  last call of ctx safe = so just the player changing, nothing others. 



# 4. create bubbles for a player to pop and score points.

###### create a bubbleArray 
######  create class of Bubble that has properties and his own methods. 

######  Properties: 
######  this.x 
random Number between 0 and 800 (canvas.width) 
###### this.y
random Number between 500 (canvas.height)+ 100it makes sure that the bubbles looking good. 
######  this. Speed
random number between 1 and 6
######  this. distance 
 will keep track of distance between each individual bubble.
######  this. Counted = false
makes sure that only one point per bubble added to the score. 
######  this. Sound
The Bubbles have two different sound. 
They will randomly assign 
whenever new Bubble is create
For this we use the ternary operator.it's a one line if else statement. Where we define which sound will be playing when the condition is true or false. If the random Number is less or equal to 0.than the condition is true, return sound1 

2.2 Methods

 ##### update() 
 ##### move bubbles up.  

Each bubble move in negative direction on y-axis 
depending on their individual speed. 
##### calculate distance between player and a bubble

###### draw()
###### show Bubble IMG 




# 4.1 function handleBubbles()
###### create every 50 frame rates a new Bubble Object
This function should create every 50 frame rates a new Bubble Object 
and push it to the bubblesArray The gameFrame can be used to add periodic events to our game and has his invoking place in the animation function. The new Bubble trigger the constructor that is in
the Bubble class and create a new Bubble object  
###### Each bubble call Update() and the draw method.  
 iterate throw bubblesArray.
######  prevent the array from growing endlessly.
 If this bubble vertical y position is less than 0, than it has moved pass the top of canvas, call splice method.
 If so remove with Splice. Decrementing i  by one for the correct index 
 ###### check if if player and a bubble has a collision
That's happen when the distance is less than 80.
Else if Is executed only for existing bubbles not the removed. 
###### if there is a collision 
-> increment the score by one 
-> Play one of the sounds
-> set counted to true
-> remove this bubble from the array 
-> Decrementing i by one for the correct index 

# 5 function handleBackground()

This function handle the background image 
every time this function runs it decrease the firstImg_x by one, the 
background (firstImg_x) sliding to the left.if firstImg_x is less than - BG.width (canvas width)so if it has completely disappeared behind the left edge of canvas,set firstImg_x to BG.width again. Same thing happens with the second image, secondImg_x.

# 2 Classes of Enemies 
###### properties

###### Methods 
#### Update() 
Movement direction & if enemy disappeared entirely behind the left or right edge of canvas, reset his Position to start position. 

##### If there is a collision with player and Enemy the Game is over.  

# 7 function handleEnemeies & handleGameOver
HandleEnemies calls on enemy update and draw Methods 

 handleGameOver 
 set the text to white 
 showing Game over Text 
 set Game over to true