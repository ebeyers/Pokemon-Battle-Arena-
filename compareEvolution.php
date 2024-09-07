<?php
// Name: compareEvolution.php
// Description: Compares the evolution to determine if there is a next evolution for the pokemon


$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "pokemonData";

//new connection and check conntection
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//select database
$conn->select_db($dbname);

function compareEvolution($pokemonName) {
    global $conn;
    
    // get all pokemon ordered by generation
    $allPokemonsResult = $conn->query("SELECT * FROM pokemons ORDER BY Generation");
    $allPokemons = [];
    while ($row = $allPokemonsResult->fetch_assoc()) {
        $allPokemons[] = $row;
    }
    // find the current pokemon and the next pokemon in the list
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
    
	// compare evolution points
    $status = "Next evolution is higher.";
    if ($currentPokemon['Evolution'] >= $nextPokemon['Evolution']) {
        $status = "Current Pokémon has the highest evolution.";
    }

    return json_encode([
        'status' => $status,
        'current' => [
            'name' => $currentPokemon['Name'],
            'evolution' => $currentPokemon['Evolution']
        ],
        'next' => [
            'name' => $nextPokemon['Name'],
            'evolution' => $nextPokemon['Evolution']
        ]
    ]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pokemonName = $_POST['pokemonName'];
    $response = compareEvolution($pokemonName);
    echo $response;
}

$conn->close();
?>