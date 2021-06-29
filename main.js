let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

function pokemons(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      let pokemonContainer = document.querySelector(".img-container");
      // Clear the container
      pokemonContainer.innerHTML = "";
      // Looping over pokemon list
      pokemon.forEach((btn) => {
        pokemonContainer.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Add a next pokemon button
      pokemonContainer.innerHTML += `<br><br><button onclick="pokemons('${data.next}')">Next</button>`;
    });
}

// Get default pokemon list
pokemons(baseUrl);

// Function to get information about a specific pokemin
function getPokemonInfo(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".pokemon-info").innerHTML = `
    <img src="${data.sprites.front_default} ">
    `;
    });
}

// let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

// function pokemons(url) {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       let pokemon = data.results;
//       let pokemonList = document.querySelector(".pokemon-list");
//       container.innerHTML = "";
//       pokemon.forEach((btn) => {
//         pokemonList.innerHTML += `<button onclick="pokemons('${btn.url}')">${btn.name}</button>`;
//       });
//       pokemonList.innerHTML += `<br><br><button onclick="pokemons('${data.next}')">Next</button>`;
//     });
// }

// pokemons(base_URL);

// function pokemonInfo(url) {
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       document.querySelector(".pokemon-info").innerHTML = `
//     <img src="${data.sprites.front_default} ">
//     `;
//     });
// }
