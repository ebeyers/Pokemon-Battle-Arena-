// Name: Field.js 
// Description: this file contains the JavaScript code for pokemon game field

let isSoundPlaying = false;			// determines if the sound is playing
const canvas = document.getElementById('image');
const ctx = canvas.getContext('2d');
const spriteSheet = new Image();
spriteSheet.src = 'sprite.png';		// sprite image to go around the file
const mapImage = new Image();
mapImage.src = 'field.png';
const enemyImage = new Image();
enemyImage.src = 'enemy.png';		// trainer to battle pokemon with

const frameHeight = 64; 
const frameWidth = 65;
const framesPerDirection = 3;

// scale factors for map and character
const mapScaleFactor = 2.5;    
const characterScaleFactor = 1; 
const enemyScaleFactor = 1; 

// directions to desired row in the sprite sheet
const directions = {
    DOWN: 0,
    UP: 1,
    LEFT: 2,
    RIGHT: 3
};

// initial direction and frame  
let currentDirection = directions.DOWN;
let currentFrame = 0; 
let posX = 93; 
let posY = 112; 
let isMoving = false; 
const frameRate = 7; 
let frameCounter = 0;

// map dimensions
const mapWidth = 512;
const mapHeight = 384;

// camera view dimensions 
const cameraWidth = 800 / mapScaleFactor;
const cameraHeight = 600 / mapScaleFactor;

const camera = {
    x: 0,
    y: 0,
    width: cameraWidth,
    height: cameraHeight
};

// step size for character movement
const stepSize = 1;

// collision boundaries (left, top, right, bottom) for each boundary
const collisionBoxes = [
    {left: 130, top: 100, right: 150, bottom: 110},                     // House 1
    {left: 250, top: 100, right: 300, bottom: 110},                     // House 2
    {left: 250, top: 190, right: 320, bottom: 210},                     // building
    {left: 130, top: 220, right: 150, bottom: 240},                     // flower bed
    {left: 0, top: 0, right: 25, bottom: mapHeight},                    // left hedge
    {left: mapWidth-110, top: 0, right: mapWidth, bottom: mapHeight},   // right hedge
    {left: 0, top: 0, right: mapWidth, bottom: 25},                     // top hedge
    {left: 0, top: mapHeight-25, right: mapWidth, bottom: mapHeight},   // bottom hedge
];

// check if the next position collides with any of the defined boundaries
function checkCollision(newX, newY) {
    for (let box of collisionBoxes) {
        if (newX < box.right && newX + frameWidth > box.left &&
            newY < box.bottom && newY + frameHeight > box.top) {
            return true;
        }
    }
    return false;
}

const enterBoxes = [
    {left: 285, top: 210, right: 295, bottom: 215, redirect: 'pokecenter.html'}                      // enter pokecenter
];

function checkEnter(newX, newY) {
    for (let box of enterBoxes) {
        if (newX < box.right && newX + frameWidth > box.left &&
            newY < box.bottom && newY + frameHeight > box.top) {
            window.location.replace(box.redirect)
            return true;
        }
    }
    return false;
}
// keydown events to update direction and movement
window.addEventListener('keydown', (event) => {
    isMoving = true;
    switch (event.key) {
        case 'ArrowUp':
        case 'w':
            currentDirection = directions.UP;
            break;
        case 'ArrowDown':
        case 's':
            currentDirection = directions.DOWN;
            break;
        case 'ArrowLeft':
        case 'a':
            currentDirection = directions.LEFT;
            break;
        case 'ArrowRight':
        case 'd':
            currentDirection = directions.RIGHT;
            break;
        default:
            isMoving = false;
            break;
    }
});

// keyup events to stop movement and reset direction to face the screen
window.addEventListener('keyup', () => {
    isMoving = false;
});

// Name: updatePosition
// Description: This function updates the sprite's position and frame based on the direction and movement 
// sprite is moving, it increments the frame counter
// sprite is not moving it resets the current frame to 0
function updatePosition() {
    if (isMoving) {
        // update frame if the frame counter exceeds frame rate
        if (frameCounter++ >= frameRate) {
            frameCounter = 0;
            currentFrame = (currentFrame + 1) % framesPerDirection;
        }
        // calculate the new position based on the current direction
        let newX = posX;
        let newY = posY;
        switch (currentDirection) {
            case directions.UP:
                newY = Math.max(0, posY - stepSize);
                break;
            case directions.DOWN:
                newY = Math.min(mapHeight - frameHeight, posY + stepSize);
                break;
            case directions.LEFT:
                newX = Math.max(0, posX - stepSize);
                break;
            case directions.RIGHT:
                newX = Math.min(mapWidth - frameWidth, posX + stepSize);
                break;
        }
        // check for collisions and update position if no collision is detected
        if (!checkCollision(newX, newY)) {
            posX = newX;
            posY = newY;
            if (!checkEnter(newX, newY)) {
                posX = newX;
                posY = newY;
            }
        }

        // update camera position to follow the character
        camera.x = Math.max(0, Math.min(posX - camera.width / 2, mapWidth - camera.width));
        camera.y = Math.max(0, Math.min(posY - camera.height / 2, mapHeight - camera.height));
    } else {
        currentFrame = 0; 
    }
}
// enemy position 
const enemyX = 100; 
const enemyY = 220;
 
// building position 
const buildingBox = {left: 250, top: 190, right: 320, bottom: 210}; 

// check if the click is within the enemy area
function isClickInEnemy(x, y) {
    const enemyScreenX = (enemyX - camera.x) * mapScaleFactor;
    const enemyScreenY = (enemyY - camera.y) * mapScaleFactor;
    const enemyWidth = frameWidth * enemyScaleFactor;
    const enemyHeight = frameHeight * enemyScaleFactor;

    return x >= enemyScreenX && x <= enemyScreenX + enemyWidth &&
           y >= enemyScreenY && y <= enemyScreenY + enemyHeight;
}

// click event listener to the canvas
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (isClickInEnemy(clickX, clickY)) {
        // navigate to the battle page
        window.location.href = 'battle.html';
    } 
});

// Name: draw
// Description: This function clears the canvas and draws the sprite on the canvas based on the current direction and frame.
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw the visible part of the map
	
    ctx.drawImage(
        mapImage,
        camera.x, camera.y, camera.width, camera.height,
        0, 0, canvas.width, canvas.height
    );
    // draw the character sprite
    ctx.drawImage(
        spriteSheet,
        currentFrame * frameWidth,                  // source X position
        currentDirection * frameHeight,             // source Y position
        frameWidth,                                 // source width
        frameHeight,                                // source height
        (posX - camera.x) * mapScaleFactor,         // destination X position (relative to camera)
        (posY - camera.y) * mapScaleFactor,         // destination Y position (relative to camera)
        frameWidth * characterScaleFactor,          // destination width (scaled)
        frameHeight * characterScaleFactor          // destination height (scaled)
    );

    // draw the enemy image at a fixed position 
    const enemyScreenX = (enemyX - camera.x) * mapScaleFactor;
    const enemyScreenY = (enemyY - camera.y) * mapScaleFactor;
    ctx.drawImage(
        enemyImage,
        0, 0, frameWidth, frameHeight,              // source X, Y, width, height
        enemyScreenX,                               // destination X position (relative to camera)
        enemyScreenY,                               // destination Y position (relative to camera)
        frameWidth * enemyScaleFactor,              // destination width (scaled)
        frameHeight * enemyScaleFactor              // destination height (scaled)
    );

    // draw the text box above the enemy
    const enemyTextBox = {
        x: enemyScreenX,
        y: enemyScreenY - 20,                       // position the text box slightly above the enemy
        width: 110,                                 
        height: 20                                 
    };
    ctx.fillStyle = 'white';
    ctx.fillRect(enemyTextBox.x, enemyTextBox.y, enemyTextBox.width, enemyTextBox.height); 
	
    // draw the border of the text box
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeRect(enemyTextBox.x, enemyTextBox.y, enemyTextBox.width, enemyTextBox.height);
	
    // draw the text inside the text box
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Click me to battle!', enemyTextBox.x + 5, enemyTextBox.y + 15);
	
    // draw the text box on the building
    const buildingScreenX = (buildingBox.left - camera.x) * mapScaleFactor - 15;
    const buildingScreenY = (buildingBox.top - camera.y) * mapScaleFactor + 30 ;
    const buildingTextBox = {
        x: buildingScreenX,
        y: buildingScreenY - 20,                    // position the text box slightly above the building
        width: 100,                                  
        height: 25                                      
    };

    ctx.fillStyle = 'white';
    ctx.fillRect(buildingTextBox.x, buildingTextBox.y, buildingTextBox.width, buildingTextBox.height);
    
    // draw the border of the text box
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeRect(buildingTextBox.x, buildingTextBox.y, buildingTextBox.width, buildingTextBox.height);
    
    // draw the text inside the text box
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText('Walk up to enter!', buildingTextBox.x + 5, buildingTextBox.y + 15);
}

// Name: animateSprite
// Description: This function updates the sprite's position and then draws it on the canvas
// requestAnimationFrame keeps the loop running
function animateSprite() {
    updatePosition();
    draw();
    window.requestAnimationFrame(animateSprite);
}

// Name: spriteSheet.onload
spriteSheet.onload = function () {
    canvas.width = 800;
    canvas.height = 600;
    animateSprite();
};
// Name: mapImage.onload
mapImage.onload = function () {
    canvas.width = 800;
    canvas.height = 600;
    animateSprite();
};
// Name: enemyImage.onload
enemyImage.onload = function () {
    canvas.width = 800;
    canvas.height = 600;
    animateSprite();
};

function exitPage() {
    window.location.href = "http://localhost/project3/exit.html";
};

// Plays the sound when the button is pressed (Sound ON/OFF Button)
function playSound(soundId) {
    var sound = document.getElementById(soundId);

    if (!isSoundPlaying) {
        sound.play();
        isSoundPlaying = true;
    } else {
        sound.pause();
        sound.currentTime = 0;
        isSoundPlaying = false;
    }
}

// If the button is pressed again when it's playing, it will stop the sound
function stopSound(soundId) {
    var sound = document.getElementById(soundId);
    sound.pause();
    sound.currentTime = 0;
    isSoundPlaying = false;
}