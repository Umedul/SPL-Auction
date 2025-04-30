const ADMIN_PASSWORD = "Umedul70";
function login() {
  const password = document.getElementById("admin-password").value;
  if (password === ADMIN_PASSWORD) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    renderTeams();
    renderPlayers();
  } else {
    document.getElementById("login-error").innerText = "Incorrect password.";
  }
}
function addTeam() {
  const name = document.getElementById("team-name").value.trim();
  if (!name) return;
  const teams = getStoredData("teams");
  teams.push({ id: Date.now(), name });
  saveData("teams", teams);
  document.getElementById("team-message").innerText = `✅ Team "${name}" added.`;
  document.getElementById("team-name").value = "";
  renderTeams();
}
function deleteTeam(id) {
  let teams = getStoredData("teams");
  teams = teams.filter(team => team.id !== id);
  saveData("teams", teams);
  renderTeams();
}
function renderTeams() {
  populateTeamDropdown();
  const teams = getStoredData("teams");
  const container = document.getElementById("team-list");
  container.innerHTML = "";
  teams.forEach(team => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `${team.name} <button onclick="deleteTeam(${team.id})">Delete</button>`;
    container.appendChild(div);
  });
}
function addPlayer() {
  const name = document.getElementById("player-name").value.trim();
  const team = document.getElementById("player-team").value.trim();
  if (!name || !team) return;
  const players = getStoredData("players");
  players.push({ id: Date.now(), name, team });
  saveData("players", players);
  document.getElementById("player-message").innerText = `✅ Player "${name}" added to "${team}".`;
  document.getElementById("player-name").value = "";
  document.getElementById("player-team").value = "";
  renderPlayers();
}
function deletePlayer(id) {
  let players = getStoredData("players");
  players = players.filter(player => player.id !== id);
  saveData("players", players);
  renderPlayers();
}
function renderPlayers() {
  const players = getStoredData("players");
  const container = document.getElementById("player-list");
  container.innerHTML = "";
  players.forEach(player => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `${player.name} — <em>${player.team}</em> <button onclick="deletePlayer(${player.id})">Delete</button>`;
    container.appendChild(div);
  });
}
function getStoredData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}



function populateTeamDropdown() {
  const teamSelect = document.getElementById("player-team");
  if (!teamSelect) return;

  const teams = getStoredData("teams");
  teamSelect.innerHTML = '<option value="">Select Team</option>';
  teams.forEach(team => {
    const option = document.createElement("option");
    option.value = team.name;
    option.textContent = team.name;
    teamSelect.appendChild(option);
  });
}
