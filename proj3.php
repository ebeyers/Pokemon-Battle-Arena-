<?php
// Name: proj3.php
// Description: Connects to mySQL to load in database of pokemonData

$servername = "localhost";
$username = "root"; 
$password = ""; 
$dbname = "pokemonData";
$sqlFile = 'proj3.sql'; 

try {

    $pdo = new PDO("mysql:host=$servername", $username, $password);

    $pdo->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    echo "Database was created!\n";
    
    $pdo->exec("USE $dbname");

    $sql = file_get_contents($sqlFile);
    
    $pdo->exec($sql);
    echo "SQL File Loaded!\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$pdo = null;
?>