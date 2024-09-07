<?php
// Name: evolvePokemon.php
// Description: Evolves the pokemon to the next evolution

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "pokemonData";

//new connection and check connection
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//select database
$conn->select_db($dbname);

function evolvePokemon($pokemonName) {
    global $conn;
    
    //get all pokemon ordered by generation *MUST BE BY GENERATION!!!!
    $allPokemonsResult = $conn->query("SELECT * FROM pokemons ORDER BY Generation");
    $allPokemons = [];
    while ($row = $allPokemonsResult->fetch_assoc()) {
        $allPokemons[] = $row;
    }
    //find the current pokemon and the next pokemon in the list
    $currentIndex = -1;
    for ($i = 0; $i < count($allPokemons); $i++) {
        if ($allPokemons[$i]['Name'] == $pokemonName) {
            $currentIndex = $i;
            break;
        }
    }

    if ($currentIndex == -1 || $currentIndex == count($allPokemons) - 1) {
        return json_encode(['status' => 'No higher evolution found or invalid Pokémon name provided.']);
    }
    $currentPokemon = $allPokemons[$currentIndex];
    $nextPokemon = $allPokemons[$currentIndex + 1];
	
    //compare evolution points
    $status = "Evolving Pokemon";
    if ($currentPokemon['Evolution'] >= $nextPokemon['Evolution']) {
        $status = "Current Pokémon has the highest evolution.";
		$nextPokemon = $currentPokemon;
    }
	
	// check if they have 2 experience points
	else if ($currentPokemon['Experience_Points'] >= 2) {
		$status = "We are going to evolve the pokemon";
	}
	else if ($currentPokemon['Experience_Points'] < 2) {
		$status = "Cannot evolve yet, not enough experience points";
		$nextPokemon = $currentPokemon;
	}
	

    return json_encode([
        'status' => $status,
        'current' => [
            'name' => $currentPokemon['Name'],
            'evolution' => $currentPokemon['Evolution'],
			'experience' => $currentPokemon['Experience_Points']
        ],
        'next' => [
            'name' => $nextPokemon['Name'],
            'evolution' => $nextPokemon['Evolution'],
			'experience' => $nextPokemon['Experience_Points']
        ]
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pokemonName = $_POST['pokemonName'];
    $response = evolvePokemon($pokemonName);
    echo $response;
}

$conn->close();
?>