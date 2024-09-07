/* 
    Name: instructions.js
   Descriptioon: instructions.js
*/

//controls the sound for home page
function playSound() {
    var sound = document.getElementById("openingSound");
    if (sound.paused || sound.currentTime === 0) {
        sound.play();
    } else {
        sound.pause();
        sound.currentTime = 0; 
    }
}

function back() {
  window.location.href = "http://localhost/project3/proj3.html";
}