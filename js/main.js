

// Replace with your actual Steam API key and Steam ID
const apiKey = 'E95C242CE7F964165A8836C025ECB886';
const steamId = '76561199130288682';

// Use the CORS Anywhere proxy
const proxy = 'https://cors-anywhere.herokuapp.com/';
const playerEndpoint = `${proxy}http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;
const gamesEndpoint = `${proxy}http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json`;

// Function to fetch and display player summary
// Function to introduce delay between API requests
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to fetch and display player summary
async function fetchPlayerSummary() {
  try {
    // Delay for 1 second before making the API request
    await delay(1000);

    const response = await fetch(playerEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const player = data.response.players[0];

    if (player) {
      // Update profile elements
      document.getElementById('avatar').src = player.avatar;
      document.getElementById('username').textContent = player.personaname;
      document.getElementById('profile-link').href = player.profileurl;
    } else {
      console.error('No player data found.');
    }
  } catch (error) {
    console.error('Error fetching player summary:', error.message);
  }
}

// Function to fetch and display owned games with thumbnails
async function fetchOwnedGames() {
  try {
    // Delay for 1 second before making the API request
    await delay(1000);

    const response = await fetch(gamesEndpoint);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    const games = data.response.games;

    if (games) {
      const gameList = document.getElementById('game-list');
      gameList.innerHTML = ''; // Clear existing games

      games.forEach((game) => {
        const listItem = document.createElement('li');

        // Construct the URL for the game thumbnail (capsule image)
        const thumbnailUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/capsule_184x69.jpg`;

        // Create an image element for the thumbnail
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = thumbnailUrl;
        thumbnailImg.alt = `${game.name} Thumbnail`;

        // Create a text element for game details
        const gameDetails = document.createElement('span');
        gameDetails.textContent = `${game.name} - Playtime: ${Math.round(game.playtime_forever / 60)} hours`;

        // Append the image and game details to the list item
        listItem.appendChild(thumbnailImg);
        listItem.appendChild(gameDetails);

        // Append the list item to the game list
        gameList.appendChild(listItem);
      });
    } else {
      console.error('No games found for this player.');
    }
  } catch (error) {
    console.error('Error fetching owned games:', error.message);
  }
}

// Run both fetch functions after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchPlayerSummary();
  fetchOwnedGames();
});
