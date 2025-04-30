
function loadTeams() {
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  const players = JSON.parse(localStorage.getItem("players")) || [];
  const container = document.getElementById("teams-container");

  if (teams.length === 0) {
    container.innerHTML = "<p>No teams available.</p>";
    return;
  }

  container.innerHTML = "";

  teams.forEach(team => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.innerHTML = `
      <img src="images/default-team.png" alt="${team.name}" />
      <h3>${team.name}</h3>
    `;
    card.onclick = () => showTeamDetails(team.name, players);
    container.appendChild(card);
  });
}

function showTeamDetails(teamName, players) {
  const teamPlayers = players.filter(player => player.team === teamName);
  const playerList = document.getElementById("player-list");
  const details = document.getElementById("team-details");

  document.getElementById("team-name").textContent = teamName;
  playerList.innerHTML = "";

  if (teamPlayers.length === 0) {
    playerList.innerHTML = "<li>No players in this team.</li>";
  } else {
    teamPlayers.forEach(p => {
      const li = document.createElement("li");
      li.textContent = p.name;
      playerList.appendChild(li);
    });
  }

  details.style.display = "block";
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

function closeDetails() {
  document.getElementById("team-details").style.display = "none";
}

window.onload = loadTeams;
