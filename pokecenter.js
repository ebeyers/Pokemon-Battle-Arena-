// Name: pokecenter.js
// Description: the control panel of the pokecenter

// Images of the sprite and background image - along with the nurse
const canvas = document.getElementById('image');
const ctx = canvas.getContext('2d');
const spriteSheet = new Image();
spriteSheet.src = 'sprite.png';
const nurseSprite = new Image();
nurseSprite.src = 'nurse.png';
const pokecenterBgndIm = new Image();
pokecenterBgndIm.src = 'pokecenter1.png';

const frameHeight = 64; 
const frameWidth = 65;
const framesPerDirection = 3;

const characterScaleFactor = 1; 
const nurseScaleFactor = 1; 
const mapScaleFactor = 2.5; 

const cameraWidth = 800 / mapScaleFactor;
const cameraHeight = 600 / mapScaleFactor;

const camera = {
    x: 0,
    y: 0,
    width: cameraWidth,
    height: cameraHeight
};

const directions = {
    DOWN: 0,
    UP: 1,
    LEFT: 2,
    RIGHT: 3
};

let currentDirection = directions.DOWN;
let currentFrame = 0; 
let posX = 180; 
let posY = 210; 
const mapWidth = 512;
const mapHeight = 384;
let isMoving = false; 

const frameRate = 8; 
let frameCounter = 0;
const stepSize = 3;

const nurseX = 180;  
const nurseY = 45;  

let showMessage = true; 
const textBoxWidth = 310;
const textBoxHeight = 45;
const textBoxX = 150;
const textBoxY = 40;
const message = "Hello! Click on me to heal your pokemon!";

// Add Event Listener for arrow Keys and WASD
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

window.addEventListener('keyup', () => {
    isMoving = false;
});

const collisionBoxes = [
    {left: 150, top: 0, right: 275, bottom: 80},                        // desk boundary
    {left: 0, top: 0, right: 45, bottom: mapHeight},                      // left wall boundary
    {left: 400, top: 0, right: mapWidth, bottom: mapHeight},              // right wall boundary
    {left: 0, top: 0, right: mapWidth, bottom: 40},                       // top boundary
    {left: 0, top: mapHeight - 110, right: mapWidth, bottom: mapHeight},  // bottom boundary
];  

function checkCollision(newX, newY) {
    for (let box of collisionBoxes) {
        if (newX < box.right && newX + frameWidth > box.left &&
            newY < box.bottom && newY + frameHeight > box.top) {
            return true;
        }
    }
    return false;
}

function updatePosition() {
    if (isMoving) {
        if (frameCounter++ >= frameRate) {
            frameCounter = 0;
            currentFrame = (currentFrame + 1) % framesPerDirection;
        }
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
        if (!checkCollision(newX, newY)) {
            posX = newX;
            posY = newY;
        }

        camera.x = Math.max(0, Math.min(posX - camera.width / 2, mapWidth - camera.width));
        camera.y = Math.max(0, Math.min(posY - camera.height / 2, mapHeight - camera.height));
    } else {
        currentFrame = 0; 
    }
}

// Draw the image
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
        pokecenterBgndIm,
        camera.x, camera.y, camera.width, camera.height,
        0, 0, canvas.width, canvas.height
    );
    
    // draw the nurse sprite at a fixed position
    const nurseScreenX = (nurseX - camera.x) * mapScaleFactor;
    const nurseScreenY = (nurseY - camera.y) * mapScaleFactor;
    ctx.drawImage(
        nurseSprite,
        0, 0, frameWidth, frameHeight,
        nurseScreenX,
        nurseScreenY,
        frameWidth * nurseScaleFactor,
        frameHeight * nurseScaleFactor
    );

    ctx.drawImage(
        spriteSheet,
        currentFrame * frameWidth,
        currentDirection * frameHeight,
        frameWidth,
        frameHeight,
        (posX - camera.x) * mapScaleFactor,
        (posY - camera.y) * mapScaleFactor,
        frameWidth * characterScaleFactor,
        frameHeight * characterScaleFactor
    );
    if (showMessage) {
        drawTextBox(nurseScreenX, nurseScreenY);
    }
}

function drawTextBox(nurseScreenX, nurseScreenY) {
    const textBoxX = nurseScreenX + (frameWidth * nurseScaleFactor) / 2 - textBoxWidth / 2;
    const textBoxY = nurseScreenY - textBoxHeight - 10; 

    ctx.fillStyle = 'white';
    ctx.fillRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(textBoxX, textBoxY, textBoxWidth, textBoxHeight);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(message, textBoxX + 10, textBoxY + 25);
}

function animateSprite() {
    updatePosition();
    draw();
    window.requestAnimationFrame(animateSprite);
}

spriteSheet.onload = function() {
    canvas.width = 800;
    canvas.height = 600;
    animateSprite();
}
function back() {
    window.location.href = "http://localhost/project3/field.html";
  }
  
//function to check if a click is within the nurse area
function isClickInNurse(x, y) {
    const nurseScreenX = (nurseX - camera.x) * mapScaleFactor;
    const nurseScreenY = (nurseY - camera.y) * mapScaleFactor;
    const nurseWidth = frameWidth * nurseScaleFactor;
    const nurseHeight = frameHeight * nurseScaleFactor;

    return x >= nurseScreenX && x <= nurseScreenX + nurseWidth &&
           y >= nurseScreenY && y <= nurseScreenY + nurseHeight;
}

// Make an AJAX request to the PHP file
function healPokemon() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "healPokemon.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    const healedtxt = document.getElementById('healed');
                    healedtxt.style.display = 'block';
                    setTimeout(() => {
                        window.location.href = "http://localhost/project3/pokecenter.html";
                    }, 3000);
                } else {
                    console.error(response.message);
                }
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    // Get the user's Pokémon names from local storage
    const userTeam = JSON.parse(localStorage.getItem('userTeam'));
    if (!userTeam) {
        console.error("User team not found in localStorage");
        return;
    }

    const userPokemonNames = userTeam.map(pokemon => pokemon.name);

    // Send the list of Pokémon names to the PHP script
    xhr.send(`userPokemon=${JSON.stringify(userPokemonNames)}`);
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    if (isClickInNurse(clickX, clickY)) {
        // Calls the heal pokemon function which updates the database
        healPokemon();
    } 
});

// Play the sound
let isSoundPlaying = false;

function toggleSound() {
    const sound = document.getElementById('pokecenter');
    if (isSoundPlaying) {
        sound.pause();
        sound.currentTime = 0;
        isSoundPlaying = false;
    } else {
        sound.play();
        isSoundPlaying = true;
    }
}

function back() {
    window.location.href = "http://localhost/project3/field.html";
}