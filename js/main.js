const apiKey = "E95C242CE7F964165A8836C025ECB886";
const steamId = "76561199130288682"; // Example Steam ID


const endpoint = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    console.log('Fetching data from:', endpoint);
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Data:', data);

    const player = data.response.players[0];
    if (player) {
      displayPlayerSummary(player);
    } else {
      console.error('No player data found for the provided Steam ID.');
    }
  } catch (error) {
    console.error('Error fetching player summaries:', error.message);
  }
});

function displayPlayerSummary(player) {
  console.log('Player Data:', player);

  const avatarElement = document.getElementById('avatar');
  const usernameElement = document.getElementById('username');
  const profileLinkElement = document.getElementById('profile-link');

  if (avatarElement) {
    avatarElement.src = player.avatar;
    console.log('Avatar updated:', player.avatar);
  } else {
    console.error('Avatar element not found.');
  }

  if (usernameElement) {
    usernameElement.textContent = player.personaname;
    console.log('Username updated:', player.personaname);
  } else {
    console.error('Username element not found.');
  }

  if (profileLinkElement) {
    profileLinkElement.href = player.profileurl;
    profileLinkElement.textContent = 'View Steam Profile';
    console.log('Profile link updated:', player.profileurl);
  } else {
    console.error('Profile link element not found.');
  }
}
