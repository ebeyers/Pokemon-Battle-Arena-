<?php
// Name: battleAction.php
// Description: Does the damage of the pokemon, access the MySQL database and updates the pokemon

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "pokemonData";

$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$conn->select_db($dbname);

// function to calculate the damage done by an attacker to a defender
function calculateDamage($attackerAttack) {
    return $attackerAttack; 
}

// function to calculate the damage done by an attacker for a special attack
function calculateSpecialDamage($attackerSpecialAttack) {
    return $attackerSpecialAttack;
}

// function to handle attack action between two pokemon - this is for user pokemon
function attackPokemon($attackerName, $defenderName) {
    global $conn;

    // retrieve data from database and validate pokemon
    $attackerResult = $conn->query("SELECT * FROM pokemons WHERE Name='$attackerName'");
    $defenderResult = $conn->query("SELECT * FROM pokemons WHERE Name='$defenderName'");

    if ($attackerResult->num_rows == 0 || $defenderResult->num_rows == 0) {
        return json_encode(['status' => 'Invalid Pokémon names provided.']);
    }

    // fetch arrays of the attacker and defender 
    $attacker = $attackerResult->fetch_assoc();
    $defender = $defenderResult->fetch_assoc();

    $damage = calculateDamage($attacker['Attack']);
	
    // calculate the new HP of the defender after taking damage
    $newDefenderHP = max(0, $defender['Current_HP'] - $damage);
    $conn->query("UPDATE pokemons SET Current_HP=$newDefenderHP WHERE Name='$defenderName'");
    $status = "$attackerName attacked $defenderName for $damage damage. $defenderName's HP is now $newDefenderHP.";
    
    // check if opponent has fainted, if they fainted they don't attack back
    if ($newDefenderHP == 0) {
        $experience_point = ($attacker['Experience_Points']) + 1;
        $conn->query("UPDATE pokemons SET Experience_Points=$experience_point WHERE Name='$attackerName'");
        
        if ($experience_point === 1) {
            $status .= "<br><br> $defenderName has fainted! $attackerName now has $experience_point experience point.";
        } else {
            $status .= "<br><br>$defenderName has fainted! $attackerName now has $experience_point experience points.";
        }

        // Return the battle status and updated HP values as a JSON response
        return json_encode([
			'status' => $status, 
			'attacker_hp' => $attacker['Current_HP'],
			'defender_hp' => $newDefenderHP
		]);
    }

    return opponentAction($defenderName, $attackerName, $status);
}

// function to handle a special attack action between two pokemon
function specialAttackPokemon($attackerName, $defenderName) {
    global $conn;

    // Retrieve the attacker and defender pokemon data from the database and verify pokemon
    $attackerResult = $conn->query("SELECT * FROM pokemons WHERE Name='$attackerName'");
    $defenderResult = $conn->query("SELECT * FROM pokemons WHERE Name='$defenderName'");

    if ($attackerResult->num_rows == 0 || $defenderResult->num_rows == 0) {
        return json_encode(['status' => 'Invalid Pokémon names provided.']);
    }

    // fetch arrays of the attacker and defender
    $attacker = $attackerResult->fetch_assoc();
    $defender = $defenderResult->fetch_assoc();

    // calculate damage done by the attacker to the defender
    $damage = calculateSpecialDamage($attacker['Special_Attack']);
    $newDefenderHP = max(0, $defender['Current_HP'] - $damage);
	
    // update the defender's HP in the database
    $conn->query("UPDATE pokemons SET Current_HP=$newDefenderHP WHERE Name='$defenderName'");
    $status = "$attackerName used a special attack on $defenderName for $damage damage. $defenderName's HP is now $newDefenderHP.";
    
    // check if the defender has fainted 
    if ($newDefenderHP == 0) {
        $experience_point = ($attacker['Experience_Points']) + 1;
        $conn->query("UPDATE pokemons SET Experience_Points=$experience_point WHERE Name='$attackerName'");

        if ($experience_point === 1) {
            $status .= "<br><br> $defenderName has fainted! $attackerName now has $experience_point experience point.";
        } else {
            $status .= "<br><br>$defenderName has fainted! $attackerName now has $experience_point experience points.";
        }

        // return the battle status and updated HP values as a JSON response
        return json_encode([
			'status' => $status,
			'attacker_hp' => $attacker['Current_HP'],
			'defender_hp' => $newDefenderHP
		]);
    }

    return opponentAction($defenderName, $attackerName, $status);
}

// function to handle opponent's action they either normal attack or special attack at random
function opponentAction($attackerName, $defenderName, $previousStatus) {
    $action = rand(0, 1) === 0 ? 'attack' : 'special_attack';
    
    if ($action === 'attack') {
        return opponentAttack($attackerName, $defenderName, $previousStatus);
    } else {
        return opponentSpecialAttack($attackerName, $defenderName, $previousStatus);
    }
}

// function to handle opponent's attack action
function opponentAttack($attackerName, $defenderName, $previousStatus) {
    global $conn;

    // retrieve the attacker and defender pokemon data from the database
    $attackerResult = $conn->query("SELECT * FROM pokemons WHERE Name='$attackerName'");
    $defenderResult = $conn->query("SELECT * FROM pokemons WHERE Name='$defenderName'");

    // fetch arrays of the attacker and defender and calculate damage
    $attacker = $attackerResult->fetch_assoc();
    $defender = $defenderResult->fetch_assoc();

    $damage = calculateDamage($attacker['Attack']);
    $newHP = max(0, $defender['Current_HP'] - $damage);
	
    // update the defender's HP in the database
    $conn->query("UPDATE pokemons SET Current_HP=$newHP WHERE Name='$defenderName'");
    $status = $previousStatus . "<br>$attackerName attacked $defenderName for $damage damage. $defenderName's HP is now $newHP.";
    
    if ($newHP == 0) {
        $status .= "<br><br>$defenderName has fainted!";
    }

    return json_encode([
        'status' => $status,
        'attacker_hp' => $newHP,
		'defender_hp' => $attacker['Current_HP']
    ]);
}

// function to handle opponent's special attack action
function opponentSpecialAttack($attackerName, $defenderName, $previousStatus) {
    global $conn;

    // retrieve the attacker and defender Pokémon data from the database
    $attackerResult = $conn->query("SELECT * FROM pokemons WHERE Name='$attackerName'");
    $defenderResult = $conn->query("SELECT * FROM pokemons WHERE Name='$defenderName'");

    // fetch arrays of the attacker and defender and calculate damage
    $attacker = $attackerResult->fetch_assoc();
    $defender = $defenderResult->fetch_assoc();

    $damage = calculateSpecialDamage($attacker['Special_Attack']);
    $newHP = max(0, $defender['Current_HP'] - $damage);
	
    // update the defender's HP in the database
    $conn->query("UPDATE pokemons SET Current_HP=$newHP WHERE Name='$defenderName'");
    $status = $previousStatus . "<br>$attackerName used a special attack on $defenderName for $damage damage. $defenderName's HP is now $newHP.";
    
    if ($newHP == 0) {
        $status .= "<br><br>$defenderName has fainted!";
    }

    return json_encode([
        'status' => $status,
        'attacker_hp' => $newHP,
		'defender_hp' => $attacker['Current_HP']
    ]);
}

// if the request method is POST, get the action type, attacker, and defender from the POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    $attacker = $_POST['attacker'];
    $defender = $_POST['defender'];

    $response = '';
	
    // handle attack action
    if ($action === 'attack') {
        $response = attackPokemon($attacker, $defender);
    } elseif ($action === 'special_attack') {
        $response = specialAttackPokemon($attacker, $defender);
    }
    
    echo $response;
}

$conn->close();
?>
