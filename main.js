let baseUrl = "https://pokeapi.co/api/v2/pokemon/";

function pokemons(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Console log to make sure I am getting the data
      console.log(data);
      // Get the list of pokemon from the results
      let pokemon = data.results;
      let pokemonContainer = document.querySelector(".buttons");
      // Clear the container
      pokemonContainer.innerHTML = "";
      // Looping over pokemon list
      pokemon.forEach((btn) => {
        pokemonContainer.innerHTML += `<button onclick="getPokemonInfo('${btn.url}')">${btn.name}</button>`;
      });
      // Add a next pokemon button
      document.querySelector(
        ".next-button"
      ).innerHTML += `<button onclick="pokemons('${data.next}')">Next</button>`;
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
      fetch(data.species.url)
        .then((res) => res.json())
        .then((speciesData) => {
          console.log(speciesData);
          // Image
          document.querySelector(".img-container").innerHTML = `
          <img src="${data.sprites.front_default} ">
          `;
          // Description
          document.querySelector(".pokemon-info").innerHTML = `
          <p>${speciesData.flavor_text_entries[0].flavor_text}</p>
          `;
        });
    });
}
