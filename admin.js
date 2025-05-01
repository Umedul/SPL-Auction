
document.addEventListener('DOMContentLoaded', function() {
    // Fetch team and player data from the backend (using the provided API URL)
    fetch('https://spl-auction-backend.onrender.com/api/teams')  // Updated with your actual API URL
        .then(response => response.json())
        .then(data => {
            // Render the team and player data in the admin page
            renderTeamsAndPlayers(data);
        })
        .catch(error => {
            console.error('Error fetching team data:', error);
        });

    // Function to render the fetched teams and players
    function renderTeamsAndPlayers(teams) {
        const teamContainer = document.getElementById('team-container');  // Assuming there's a container in your admin HTML to show teams

        // Clear existing data in case this is not the first load
        teamContainer.innerHTML = '';

        teams.forEach(team => {
            // Create a container for each team
            const teamDiv = document.createElement('div');
            teamDiv.classList.add('team');
            
            // Team name
            const teamName = document.createElement('h3');
            teamName.textContent = team.teamName;
            teamDiv.appendChild(teamName);

            // Create a list for players
            const playerList = document.createElement('ul');
            team.players.forEach(player => {
                const playerItem = document.createElement('li');
                playerItem.textContent = `${player.name} - ${player.position}`;
                playerList.appendChild(playerItem);
            });

            // Append player list to the team container
            teamDiv.appendChild(playerList);

            // Append the team div to the main container
            teamContainer.appendChild(teamDiv);
        });
    }
});
    