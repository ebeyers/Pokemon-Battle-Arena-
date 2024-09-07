/* 
    Name: teams.js
    Description: data used to provide the teams for user and opponent 
*/
// All Pokemon
const pokemon = [
    { name: "Charmander", img: "004Charmander.png" },
	{name: "Charmeleon", img: "005Charmeleon.png"},
	{name: "Charizard", img: "006Charizard.png"},
    { name: "Squirtle", img: "007Squirtle.png" },
	{ name: "Wartortle", img: "008Wartortle.png" },
	{ name: "Blastoise", img: "009Blastoise.png" },
	{ name: "Caterpie", img: "010Caterpie.png" },
	{ name: "Metapod", img: "011Metapod.png" },
	{ name: "Butterfree", img: "012Butterfree.png" },
	{ name: "Weedle", img: "013Weedle.png" },
	{ name: "Kakuna", img: "014Kakuna.png" },
	{ name: "Beedrill", img: "015Beedrill.png" },
	{ name: "Pidgey", img: "016Pidgey.png" },
	{ name: "Pidgeotto", img: "017Pidgeotto.png" },
	{ name: "Pidgeot", img: "018Pidgeot.png" },
	{ name: "Rattata", img: "019Rattata.png" },
	{ name: "Spearow", img: "021Spearow.png" },
	{ name: "Fearow", img: "022Fearow.png" },
	{ name: "Ekans", img: "023Ekans.png" },
	{ name: "Arbok", img: "024Arbok.png" },
	{ name: "Pikachu", img: "025Pikachu.png" },
	{ name: "Raichu", img: "026Raichu.png" },
	{ name: "Sandshrew", img: "027Sandshrew.png" },
	{ name: "Sandslash", img: "028Sandslash.png" },
	{ name: "Nidoranâ™€", img: "029Nidoran.png" },
	{ name: "Nidorina", img: "030Nidorina.png" },
	{ name: "Nidoqueen", img: "031Nidoqueen.png" },
	{ name: "Nidoranâ™", img: "032Nidoran.png" },
	{ name: "Nidorino", img: "033Nidorino.png" },
	{ name: "Nidoking", img: "034Nidoking.png" },
	{ name: "Clefairy", img: "035Clefairy.png" },
	{ name: "Clefable", img: "036Clefable.png" },
	{ name: "Vulpix", img: "037Vulpix.png" },
	{ name: "Ninetales", img: "038Ninetales.png" },
	{ name: "Jigglypuff", img: "039Jigglypuff.png" },
	{ name: "Wigglytuff", img: "040Wigglytuff.png" },
	{ name: "Zubat", img: "041Zubat.png" },
	{ name: "Golbat", img: "042Golbat.png" },
	{ name: "Oddish", img: "043Oddish.png" },
	{ name: "Gloom", img: "044Gloom.png" },
	{ name: "Vileplume", img: "045Vileplume.png" },
	{ name: "Paras", img: "046Paras.png" },
	{ name: "Parasect", img: "047Parasect.png" },
	{ name: "Venonat", img: "048Venonat.png" },
	{ name: "Venomoth", img: "049Venomoth.png" },
	{ name: "Diglett", img: "050Diglett.png" },
	{ name: "Dugtrio", img: "051Dugtrio.png" },
	{ name: "Meowth", img: "052Meowth.png" },
	{ name: "Persian", img: "053Persian.png" },
	{ name: "Psyduck", img: "054Psyduck.png" },
	{ name: "Golduck", img: "055Golduck.png" },
	{ name: "Mankey", img: "056Mankey.png" },
	{ name: "Primeape", img: "057Primeape.png" },
	{ name: "Growlithe", img: "058Growlithe.png" },
	{ name: "Arcanine", img: "059Arcanine.png" },
	{ name: "Poliwag", img: "060Poliwag.png" },
	{ name: "Poliwhirl", img: "061Poliwhirl.png" },
	{ name: "Poliwrath", img: "062Poliwrath.png" },
	{ name: "Abra", img: "063Abra.png" },
	{ name: "Kadabra", img: "064Kadabra.png" },
	{ name: "Alakazam", img: "065Alakazam.png" },
	{ name: "Machop", img: "066Machop.png" },
	{ name: "Machoke", img: "067Machoke.png" },
	{ name: "Machamp", img: "068Machamp.png" },
	{ name: "Bellsprout", img: "069Bellsprout.png" },
	{ name: "Weepinbell", img: "070Weepinbell.png" },
	{ name: "Victreebel", img: "071Victreebel.png" },
	{ name: "Tentacool", img: "072Tentacool.png" },
	{ name: "Tentacruel", img: "073Tentacruel.png" },
	{ name: "Geodude", img: "074Geodude.png" },
	{ name: "Graveler", img: "075Graveler.png" },
	{ name: "Golem", img: "076Golem.png" },
	{ name: "Ponyta", img: "077Ponyta.png" },
	{ name: "Rapidash", img: "078Rapidash.png" },
	{ name: "Slowpoke", img: "079Slowpoke.png" },
	{ name: "Slowbro", img: "080Slowbro.png" },
	{ name: "Magnemite", img: "081Magnemite.png" },
	{ name: "Magneton", img: "082Magneton.png" },
	{ name: "Doduo", img: "084Doduo.png" },
	{ name: "Dodrio", img: "085Dodrio.png" },
	{ name: "Seel", img: "086Seel.png" },
	{ name: "Dewgong", img: "087Dewgong.png" },
	{ name: "Grimer", img: "088Grimer.png" },
	{ name: "Muk", img: "089Muk.png" },
	{ name: "Shellder", img: "090Shellder.png" },
	{ name: "Cloyster", img: "091Cloyster.png" },
	{ name: "Gastly", img: "092Gastly.png" },
	{ name: "Haunter", img: "093Haunter.png" },
	{ name: "Gengar", img: "094Gengar.png" },
	{ name: "Onix", img: "095Onix.png" },
	{ name: "Drowzee", img: "096Drowzee.png" },
	{ name: "Hypno", img: "097Hypno.png" },
	{ name: "Krabby", img: "098Krabby.png" },
	{ name: "Kingler", img: "099Kingler.png" },
	{ name: "Voltorb", img: "100Voltorb.png" },
	{ name: "Electrode", img: "101Electrode.png" },
	{ name: "Exeggcute", img: "102Exeggcute.png" },
	{ name: "Exeggutor", img: "103Exeggutor.png" },
	{ name: "Cubone", img: "104Cubone.png" },
	{ name: "Marowak", img: "105Marowak.png" },
	{ name: "Hitmonlee", img: "106Hitmonlee.png" },
	{ name: "Hitmonchan", img: "107Hitmonchan.png" },
	{ name: "Lickitung", img: "108Lickitung.png" },
	{ name: "Koffing", img: "109Koffing.png" },
	{ name: "Weezing", img: "110Weezing.png" },
	{ name: "Rhyhorn", img: "111Rhyhorn.png" },
	{ name: "Rhydon", img: "112Rhydon.png" },
	{ name: "Chansey", img: "113Chansey.png" },
	{ name: "Tangela", img: "114Tangela.png" },
	{ name: "Kangaskhan", img: "115Kangaskhan.png" },
	{ name: "Horsea", img: "116Horsea.png" },
	{ name: "Seadra", img: "117Seadra.png" },
	{ name: "Goldeen", img: "118Goldeen.png" },
	{ name: "Seaking", img: "119Seaking.png" },
	{ name: "Staryu", img: "120Staryu.png" },
	{ name: "Starmie", img: "121Starmie.png" },
	{ name: "Mr. Mime", img: "122Mr._Mime.png" },
	{ name: "Scyther", img: "123Scyther.png" },
	{ name: "Jynx", img: "124Jynx.png" },
	{ name: "Electabuzz", img: "125Electabuzz.png" },
	{ name: "Magmar", img: "126Magmar.png" },
	{ name: "Pinsir", img: "127Pinsir.png" },
	{ name: "Tauros", img: "128Tauros.png" },
	{ name: "Magikarp", img: "129Magikarp.png" },
	{ name: "Gyarados", img: "130Gyarados.png" },
	{ name: "Lapras", img: "131Lapras.png" },
	{ name: "Ditto", img: "132Ditto.png" },
	{ name: "Eevee", img: "133Eevee.png" },
	{ name: "Vaporeon", img: "134Vaporeon.png" },
	{ name: "Jolteon", img: "135Jolteon.png" },
	{ name: "Flareon", img: "136Flareon.png" },
	{ name: "Porygon", img: "137Porygon.png" },
	{ name: "Omanyte", img: "138Omanyte.png" },
	{ name: "Omastar", img: "139Omastar.png" },
	{ name: "Kabuto", img: "140Kabuto.png" },
	{ name: "Kabutops", img: "141Kabutops.png" },
	{ name: "Aerodactyl", img: "142Aerodactyl.png" },
	{ name: "Snorlax", img: "143Snorlax.png" },
	{ name: "Articuno", img: "144Articuno.png" },
	{ name: "Zapdos", img: "145Zapdos.png" },
	{ name: "Moltres", img: "146Moltres.png" },
	{ name: "Dratini", img: "147Dratini.png" },
	{ name: "Dragonair", img: "148Dragonair.png" },
	{ name: "Dragonite", img: "149Dragonite.png" },
	{ name: "Mewtwo", img: "150Mewtwo.png" },
	{ name: "Mewtwo-Mega_X", img: "150Mewtwo-Mega_X.png" },
	{ name: "Mewtwo-Mega_Y", img: "150Mewtwo-Mega_Y.png" },
	{ name: "Mew", img: "151Mew.png" }
]

// Starter Pokemon (first evolution)
const starterPokemon = [
    { name: "Charmander", img: "004Charmander.png" },
	{ name: "Squirtle", img: "007Squirtle.png" },
	{ name: "Caterpie", img: "010Caterpie.png" },
	{ name: "Weedle", img: "013Weedle.png" },
	{ name: "Pidgey", img: "016Pidgey.png" },
	{ name: "Rattata", img: "019Rattata.png" },
	{ name: "Spearow", img: "021Spearow.png" },
	{ name: "Ekans", img: "023Ekans.png" },
	{ name: "Pikachu", img: "025Pikachu.png" },
	{ name: "Sandshrew", img: "027Sandshrew.png" },
	{ name: "Nidoranâ™€", img: "029Nidoran.png" },
	{ name: "Nidoranâ™", img: "032Nidoran.png" },
	{ name: "Clefairy", img: "035Clefairy.png" },
	{ name: "Vulpix", img: "037Vulpix.png" },
	{ name: "Jigglypuff", img: "039Jigglypuff.png" },
	{ name: "Zubat", img: "041Zubat.png" },
	{ name: "Oddish", img: "043Oddish.png" },
	{ name: "Paras", img: "046Paras.png" },
	{ name: "Venonat", img: "048Venonat.png" },
	{ name: "Diglett", img: "050Diglett.png" },
	{ name: "Meowth", img: "052Meowth.png" },
	{ name: "Psyduck", img: "054Psyduck.png" },
	{ name: "Mankey", img: "056Mankey.png" },
	{ name: "Growlithe", img: "058Growlithe.png" },
	{ name: "Poliwag", img: "060Poliwag.png" },
	{ name: "Abra", img: "063Abra.png" },
	{ name: "Machop", img: "066Machop.png" },
	{ name: "Bellsprout", img: "069Bellsprout.png" },
	{ name: "Tentacool", img: "072Tentacool.png" },
	{ name: "Geodude", img: "074Geodude.png" },
	{ name: "Ponyta", img: "077Ponyta.png" },
	{ name: "Slowpoke", img: "079Slowpoke.png" },
	{ name: "Magnemite", img: "081Magnemite.png" },
	{ name: "Doduo", img: "084Doduo.png" },
	{ name: "Seel", img: "086Seel.png" },
	{ name: "Grimer", img: "088Grimer.png" },
	{ name: "Shellder", img: "090Shellder.png" },
	{ name: "Gastly", img: "092Gastly.png" },
	{ name: "Onix", img: "095Onix.png" },
	{ name: "Drowzee", img: "096Drowzee.png" },
	{ name: "Krabby", img: "098Krabby.png" },
	{ name: "Voltorb", img: "100Voltorb.png" },
	{ name: "Exeggcute", img: "102Exeggcute.png" },
	{ name: "Cubone", img: "104Cubone.png" },
	{ name: "Hitmonlee", img: "106Hitmonlee.png" },
	{ name: "Hitmonchan", img: "107Hitmonchan.png" },
	{ name: "Lickitung", img: "108Lickitung.png" },
	{ name: "Koffing", img: "109Koffing.png" },
	{ name: "Rhyhorn", img: "111Rhyhorn.png" },
	{ name: "Chansey", img: "113Chansey.png" },
	{ name: "Tangela", img: "114Tangela.png" },
	{ name: "Kangaskhan", img: "115Kangaskhan.png" },
	{ name: "Horsea", img: "116Horsea.png" },
	{ name: "Goldeen", img: "118Goldeen.png" },
	{ name: "Staryu", img: "120Staryu.png" },
	{ name: "Mr. Mime", img: "122Mr._Mime.png" },
	{ name: "Scyther", img: "123Scyther.png" },
	{ name: "Jynx", img: "124Jynx.png" },
	{ name: "Electabuzz", img: "125Electabuzz.png" },
	{ name: "Magmar", img: "126Magmar.png" },
	{ name: "Pinsir", img: "127Pinsir.png" },
	{ name: "Tauros", img: "128Tauros.png" },
	{ name: "Magikarp", img: "129Magikarp.png" },
	{ name: "Lapras", img: "131Lapras.png" },
	{ name: "Ditto", img: "132Ditto.png" },
	{ name: "Eevee", img: "133Eevee.png" },
	{ name: "Porygon", img: "137Porygon.png" },
	{ name: "Omanyte", img: "138Omanyte.png" },
	{ name: "Kabuto", img: "140Kabuto.png" },
	{ name: "Aerodactyl", img: "142Aerodactyl.png" },
	{ name: "Snorlax", img: "143Snorlax.png" },
	{ name: "Articuno", img: "144Articuno.png" },
	{ name: "Dratini", img: "147Dratini.png" },
	{ name: "Mewtwo", img: "150Mewtwo.png" },
	{ name: "Mew", img: "151Mew.png" }
]

// Find the pokemon by name and return it
function findPokemon(pokemonName) {
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name === pokemonName) {
            return pokemon[i]; // Return the found pokemon object
        }
    }
    return null; // Return null if pokemon with the given name is not found
}

// Making a team of four for users
function getTeam(pokemons, teamSize = 4) {
	let selectedTeam = [];
    let pokemonList = [...pokemons];

    for (let i = 0; i < teamSize; i++) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        selectedTeam.push(pokemonList.splice(randomIndex, 1)[0]);
    }

    return selectedTeam;
}

// Making an opposing team of four
function getOpposingTeam(pokemons, teamSize = 4) {
	let opposingTeam = [];
    let pokemonList = [...pokemons];

    for (let i = 0; i < teamSize; i++) {
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        opposingTeam.push(pokemonList.splice(randomIndex, 1)[0]);
    }

    return opposingTeam;
}

// Initializing the team
function initializeTeam() {
    const team = JSON.parse(localStorage.getItem('userTeam'));
    if (!team) {
        console.error("No team found in localStorage");
        return;
    }
    console.log("Retrieved team:", team);
    displayTeam(team);
}

// Initializing the opponent's team
function initializeOpposingTeam() {
	const team2 = JSON.parse(localStorage.getItem('opposingTeam'));
    if (!team2) {
        console.error("No team found in localStorage");
        return;
    }
    console.log("Retrieved Opposing team:", team2);
}

// Displays the team
function displayTeam(team) {
    const teamContainer = document.getElementById('pokemonTeam');
    teamContainer.innerHTML = '';
    team.forEach(starterPokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.className = 'pokemon';
        pokemonElement.innerHTML = `
            <img src="proj3_images/1st Generation/${starterPokemon.img}" alt="${starterPokemon.name}">
            <p>${starterPokemon.name}</p>
        `;
        teamContainer.appendChild(pokemonElement);
    });
}

// Back button to go back to Welcome Page
function back() {
  window.location.href = "http://localhost/project3/proj3.html";
}

// Next button to go to field
function next() {
  window.location.href = "http://localhost/project3/field.html";
}



