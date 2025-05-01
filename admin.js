
const ADMIN_PASSWORD = "Umedul70";

// Function to login
function login() {
    const password = document.getElementById("admin-password").value;
    if (password === ADMIN_PASSWORD) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        fetchTeams();
        fetchPlayers();
    } else {
        document.getElementById("login-error").innerText = "Incorrect password.";
    }
}

// Function to fetch teams from the backend
function fetchTeams() {
    fetch('https://spl-auction-backend.onrender.com/api/teams')  // Updated URL
        .then(response => response.json())
        .then(teams => {
            renderTeams(teams)
        })
        .catch(error => console.error('Error fetching teams:', error));
}

// Function to fetch players from the backend
function fetchPlayers() {
    fetch('https://spl-auction-backend.onrender.com/api/players')  // Updated URL
        .then(response => response.json())
        .then(players => {
            renderPlayers(players);
        })
        .catch(error => console.error('Error fetching players:', error));
}

// Function to add a new team
function addTeam() {
    const name = document.getElementById("team-name").value;
    const newTeam = { name };

    fetch('https://spl-auction-backend.onrender.com/api/teams', {  // Updated URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTeam),
    })
        .then(response => response.json())
        .then(team => {
            renderTeams([team]);
        })
        .catch(error => console.error('Error adding team:', error));
}

// Function to add a new player
function addPlayer() {
    const name = document.getElementById("player-name").value;
    const team = document.getElementById("player-team").value;
    const newPlayer = { name, team };

    fetch('https://spl-auction-backend.onrender.com/api/players', {  // Updated URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer),
    })
        .then(response => response.json())
        .then(player => {
            renderPlayers([player]);
        })
        .catch(error => console.error('Error adding player:', error));
}

// Render teams (this would need to be implemented based on your page structure)
function renderTeams(teams) {
    const teamsContainer = document.getElementById("teams-container");
    teamsContainer.innerHTML = '';  // Clear the existing teams
    teams.forEach(team => {
        const teamElement = document.createElement("div");
        teamElement.innerText = team.name;
        teamsContainer.appendChild(teamElement);
    });
}

// Render players (this would need to be implemented based on your page structure)
function renderPlayers(players) {
    const playersContainer = document.getElementById("players-container");
    playersContainer.innerHTML = '';  // Clear the existing players
    players.forEach(player => {
        const playerElement = document.createElement("div");
        playerElement.innerText = `${player.name} (Team: ${player.team})`;
        playersContainer.appendChild(playerElement);
    });
}
