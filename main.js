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
      ).innerHTML = `<button onclick="pokemons('${data.next}')">Next</button>`;
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
          // Fetches the data
          console.log(speciesData);
          // Name
          document.querySelector(".name").innerHTML = `
          <h2>Name: ${data.name}</h2>
          <h3>Capture Rate: ${data.capture_rate}</h3>
          `;
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

// Ripple Effect for buttons
function createRipple(event) {
  const button = event.getElementsByTagName("button");

  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add("ripple");

  //   Removing existing ripples from previous clicks
  const ripple = button.getElementsByClassName("ripple")[0];

  if (ripple) {
    ripple.remove();
  }

  //   Injecting the span inside the circle
  button.appendChild(circle);
}

const buttons = document.getElementsByTagName("div");
for (const button of buttons) {
  button.addEventListener("click", createRipple);
}
