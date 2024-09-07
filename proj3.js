// Name: proj3.js
// Description: The JavaScript file for proj3.html/proj3.css as well as battle.html/battle.cs

let isSoundPlaying = false;		// determines if the sound button has been clicked as is currently playing
let isSwitchMenuOpen = false;	// determines if the switch pokemon menu in battle.html has been clicked and if it is currently open
let activePokemon;				// determines who the user's current pokemon is during battle in battle.html
let opponentPokemon;			// determines who the opponent's current pokemon is during battle in battle.html
let userTeam;					// holds the four pokemon in user's team
let userTeamFainted = [0, 0, 0, 0];	// determines during battle which pokemon have fainted to ensure they are not used again before they are healed
let opposingTeam;				// holds the four pokemon in opponent's team
let opposingTeamIndex = 0;		// determines which pokemon the opponent is currenlty using from opponent's team
let userTeamIndex = 0;			// allows the current pokemon to be switched when one


// This is generating the users team and displays it with teams.html (calls getTeam from teams.js)
function generateTeam() {
	const team = getTeam(starterPokemon, 4);
    localStorage.setItem('userTeam', JSON.stringify(team));

    window.location.href = "http://localhost/project3/teams.html";
}

// This is generating the opponents team (calls getOpposingTeam from team.js)
function generateOpposingTeam() {
	const team2 = getOpposingTeam(starterPokemon, 4);
	localStorage.setItem('opposingTeam', JSON.stringify(team2));
	
}

// Displays the instructions page
function instructions() {
	window.location.href = "http://localhost/project3/instructions.html";
}

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

// Changes the backgrounds during the battle in battle.html 
let currentBackground = 0;
const backgrounds = [
    'url("pokemon-stadium-background.png")',
    'url("Pokemon Battle Background.jpeg")',
    'url("battleField.png")',
    'url("ocean.png")',
    'url("cave.png")'
];

// Function to switch the background during the battle in battle.html
function switchBackground() {
    currentBackground = (currentBackground + 1) % backgrounds.length;
    document.body.style.backgroundImage = backgrounds[currentBackground];
}

// Update the Battle Status - Gets data from the .php files that involves battleAction, compareEvolution, evolvePokemon
function updateBattleStatus(response) {
    const battleStatus = document.getElementById('battle-status');
    const data = JSON.parse(response); // Parse JSON response into data

    if (data.status) {
        battleStatus.innerHTML = data.status;

        // Check if the status message contains '2 experience'
        if (data.status.includes('2 experience')) {
            const evolvetxt = document.getElementById('evolve');
            evolve.style.display = 'block';
            setTimeout(() => {
                evolve.style.display = 'none';
            }, 3000);
        }
    }

    if (data.attacker_hp !== undefined && data.defender_hp !== undefined) {
		
        activePokemon.hp = data.attacker_hp;
        opponentPokemon.hp = data.defender_hp;

		// Trigger fade-out if opponent Pokémon faints
        if (data.defender_hp <= 0) {
			console.log(`${opponentPokemon.name} fainted!`);
            const opponentPokemonImage = document.querySelector('.opponent img');
            opponentPokemonImage.classList.add('fade-out');
            setTimeout(() => {
                opponentPokemonImage.style.display = 'none';

                // Check if there's another Pokémon in opposingTeam to switch to
                if (opposingTeamIndex + 1 < 4) {
                    opposingTeamIndex += 1;
                    opponentPokemon = opposingTeam[opposingTeamIndex];
                    displayBattleField();
                } else {
                    const youWonTxt = document.getElementById('youWon');
                    youWon.style.display = 'block';
                    setTimeout(() => {
                        window.location.href = "http://localhost/project3/field.html";
                    }, 3000);
                }
            }, 1000);
        }
		
		
		// Trigger fade-out if user's Pokémon faints
        if (data.attacker_hp <= 0) {
			console.log(`${activePokemon.name} fainted!`);
			
            const activePokemonImage = document.querySelector('.active-pokemon img');
            activePokemonImage.classList.add('fade-out');
            setTimeout(() => {
                activePokemonImage.style.display = 'none';

                // Update userTeamFainted array
				const indexInUserTeam = userTeam.findIndex(pokemon => pokemon.name === activePokemon.name);
				if (indexInUserTeam !== -1) {
					userTeamFainted[indexInUserTeam] = 1; // Mark as fainted
				}

				// Find the next Pokémon in userTeam that hasn't fainted
				let nextPokemonIndex = userTeam.findIndex((pokemon, index) => index >= userTeamIndex && userTeamFainted[index] === 0);

				if (nextPokemonIndex === -1) {
					
					// If no unfainted Pokémon found, end battle
					const cpuWonTxt = document.getElementById('cpuWon');
					cpuWon.style.display = 'block';
					setTimeout(() => {
						window.location.href = "http://localhost/project3/field.html";
					}, 3000);
				} else {
					// Replace activePokemon with the next unfainted Pokémon
					userTeamIndex = nextPokemonIndex;
					activePokemon = userTeam[userTeamIndex];
					displayBattleField();
				}
            }, 1000);
        }
    }
}

// Sends Battle Request - to battleAction.php -  sends activePokemon and opponentPokemon
function sendBattleRequest(action, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "battleAction.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(xhr.responseText);
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };
    xhr.send(`action=${action}&attacker=${activePokemon.name}&defender=${opponentPokemon.name}`);
}

// Shakes the image of the opponent when they have gotten hit
function shakeOpponent() {
    const opponent = document.getElementById('opponentPokemon');
    if (opponent) {
        opponent.classList.add('shake');
        setTimeout(() => {
            opponent.classList.remove('shake');
        }, 500); 
    }
}

// Shakes the image of the user when they have gotten hit by the opponent
function shakeUser() {
    const user = document.querySelector('.active-pokemon img');
    if (user) {
        user.classList.add('shake');
        setTimeout(() => {
            user.classList.remove('shake');
        }, 500); 
    }
}

// Attack function - sends the attack to the php file
function Attack() {
    sendBattleRequest('attack', function(response) {
        shakeOpponent();
        setTimeout(() => {
        shakeUser();
    }, 1000);
        updateBattleStatus(response);

    });
}

// Special attack function - sends the attack to the php file
function Special_Attack() {
    sendBattleRequest('special_attack', function(response) {
        shakeOpponent();
        setTimeout(() => {
        shakeUser();
    }, 1000);

        updateBattleStatus(response);
    });
}


// Loading both user and opposing team into the battle scene
function initializeBattle() {
	generateOpposingTeam();
	
	userTeam = JSON.parse(localStorage.getItem('userTeam'));
    console.log("Loaded user team:", userTeam);
    activePokemon = userTeam[userTeamIndex];
	
	opposingTeam = JSON.parse(localStorage.getItem('opposingTeam'));
	console.log("Loaded opposing team:", opposingTeam);
	opponentPokemon = opposingTeam[opposingTeamIndex];
	
    
    displayBattleField();
}

// Displays the two pokemon images
function displayBattleField() {
    const battleField = document.getElementById('battleField');
         battleField.innerHTML = `<div class="opponent">
            <img id="opponentPokemon" img src="proj3_images/1st Generation/${opponentPokemon.img}" alt="${opponentPokemon.name}">
        </div>
        <div class="active-pokemon">
            <img src="proj3_images/1st Generation/${activePokemon.img}" alt="${activePokemon.name}">
        </div>
    `;
}


// Switches users pokemon to a new pokemon
function switchToPokemon(pokemon) {
    if (pokemon !== activePokemon) {
        activePokemon = pokemon;
        displayBattleField();
    }
}

// Switch Pokemon Menu
function switchPokemon() {
    const existingSwitchMenu = document.querySelector('.switch-menu');

    if (isSwitchMenuOpen && existingSwitchMenu) {
        document.body.removeChild(existingSwitchMenu);
        isSwitchMenuOpen = false;
        return;
    }

	// Changes the current pokemon in the console log?
    console.log("Current user team:", userTeam);
    console.log("Active Pokemon:", activePokemon);
    const availablePokemon = userTeam.filter(p => p !== activePokemon);
    if (availablePokemon.length === 0) {
        alert("No other Pokémon available to switch!");
        return;
    }
	
	// Actual switch menu box
    const switchMenu = document.createElement('div');
    switchMenu.className = 'switch-menu';
    switchMenu.innerHTML = '<h3>Choose a Pokemon to switch to:</h3>';
    
	// displays available pokemon to switch to and switches when its clicked on
    availablePokemon.forEach(pokemon => {
        const pokemonButton = document.createElement('button');
        pokemonButton.textContent = pokemon.name;
        pokemonButton.onclick = () => {
            switchToPokemon(pokemon);
            document.body.removeChild(switchMenu);
            isSwitchMenuOpen = false;
        };
        switchMenu.appendChild(pokemonButton);
    });
    
    document.body.appendChild(switchMenu);
    isSwitchMenuOpen = true;
}

// When compare evolution button is clicked
function compareEvolution() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "compareEvolution.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                updateBattleStatus(xhr.responseText);
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };
    xhr.send(`pokemonName=${activePokemon.name}`);

}

// When run button is clicked, see if any of the pokemon need to be evolved
function Run() {
    const runtxt = document.getElementById('run');
    run.style.display = 'block';
    setTimeout(() => {
        window.location.href = "http://localhost/project3/field.html";
    }, 3000);
	
	userTeam.forEach(pokemon => {
		console.log(pokemon);
		evolvePokemon(pokemon);
	});
}

// Function to grab evolvePokemon.php to find the next evolution
function evolvePokemon(oldPokemon) {
	const xhr = new XMLHttpRequest();
    xhr.open("POST", "evolvePokemon.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const evolutionData = JSON.parse(xhr.responseText);
				const newPokemon = findPokemon(evolutionData.next.name);
				const currentPokeExperience = evolutionData.current.experience;
				console.log(evolutionData.current.name);
				console.log(evolutionData.current.experience);
				
				console.log(newPokemon);
				
				if (currentPokeExperience >= 2) {
					console.log("Swapping Pokemon");
					swapPokemon(oldPokemon, newPokemon);
				}
				
				console.log(userTeam);
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };
    xhr.send(`pokemonName=${oldPokemon.name}`);

}

// Swap pokemon in array when evolving pokemon
function swapPokemon(oldPokemon, newPokemon) {
    // Assuming you have access to userTeam and opposingTeam from localStorage
    let userTeam = JSON.parse(localStorage.getItem('userTeam'));

    // Find the index of oldPokemon in userTeam
    const indexInTeam = userTeam.findIndex(pokemon => pokemon.name === oldPokemon.name);

    // If indexInTeam is valid
    if (indexInTeam !== -1) {
        // Replace oldPokemon with newPokemon
        userTeam[indexInTeam] = newPokemon;

        // Update localStorage with the modified userTeam
        localStorage.setItem('userTeam', JSON.stringify(userTeam));

    } else {
        console.error(`Pokemon ${oldPokemon.name} not found in userTeam.`);
    }
}

// Resets the data in the MySQL Database
function resetGameData(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "resetGameData.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.status === 'success') {
                    console.log(response.message);
                    if (callback) callback();
                } else {
                    console.error(response.message);
                }
            } else {
                console.error("Error: " + xhr.status);
            }
        }
    };

    xhr.send();
}

// Terminate Game - goes back to the Welcome Page
function terminateGame() {
    resetGameData(function() {
        window.location.href = "http://localhost/project3/proj3.html";
    });
}

document.getElementById('terminateGameButton').addEventListener('click', terminateGame);