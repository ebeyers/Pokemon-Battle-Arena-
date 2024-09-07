<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pokemonData";

// connection
$conn = new mysqli($servername, $username, $password);

// check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->select_db($dbname);

// Reset pokemon table
$resetPokemonTable = "UPDATE pokemons SET Current_HP = HP, Experience_Points = 0";

// run query
if ($conn->query($resetPokemonTable) === TRUE) {
    $statusMessage = 'Pokémon data has been reset.';
} else {
    $statusMessage = 'Error resetting Pokémon data: ' . $conn->error;
}

echo json_encode(['status' => 'success', 'message' => $statusMessage]);

$conn->close();
?>