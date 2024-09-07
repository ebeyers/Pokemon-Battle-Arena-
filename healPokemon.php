<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "pokemonData";

// new connection
$conn = new mysqli($servername, $username, $password);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// select the database
$conn->select_db($dbname);

// get the pokemon list
$userPokemon = isset($_POST['userPokemon']) ? json_decode($_POST['userPokemon'], true) : [];

if (empty($userPokemon)) {
    echo json_encode(['status' => 'error', 'message' => 'No Pokémon specified to heal.']);
    $conn->close();
    exit();
}

// convert pokemon names to commaa seperated list
$userPokemonList = "'" . implode("','", $userPokemon) . "'";

// update to restore the user's pokemon Current_HP to their HP (max HP before battle)
$sql = "UPDATE pokemons SET Current_HP = HP WHERE Name IN ($userPokemonList)";

// run query
if ($conn->query($sql) === TRUE) {
    echo json_encode(['status' => 'success', 'message' => 'User’s Pokémon have been healed!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error updating records: ' . $conn->error]);
}

$conn->close();
?>