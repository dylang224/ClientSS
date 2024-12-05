const apiKey = "66434301784863C74CBE9477EF1B1983";
const steamId = "76561199130288682"; // Example Steam ID

// Fetch player profile information
async function fetchPlayerProfile() {
  const response = await fetch(
    `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`
  );
  const data = await response.json();
  return data.response.players[0];
}

// Fetch owned games
async function fetchOwnedGames() {
  const response = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`
  );
  const data = await response.json();
  return data.response.games;
}

// Display profile info
async function displayProfile() {
  const profile = await fetchPlayerProfile();

  document.getElementById("avatar").src = profile.avatar;
  document.getElementById("username").textContent = profile.personaname;
  document.getElementById("profile-link").href = profile.profileurl;
}

// Display games
async function displayGames() {
  const games = await fetchOwnedGames();
  const gameList = document.getElementById("game-list");

  games.forEach((game) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <img src="https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg" alt="${game.name}" width="100">
      <p>${game.name}</p>
      <p>Playtime: ${(game.playtime_forever / 60).toFixed(2)} hours</p>
    `;
    gameList.appendChild(listItem);
  });
}

// Initialize the app
async function init() {
  await displayProfile();
  await displayGames();
}

init();
