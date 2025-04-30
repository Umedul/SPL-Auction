const auctionDate = new Date("2025-06-15T18:00:00").getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const gap = auctionDate - now;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  document.getElementById("days").textContent = Math.floor(gap / day);
  document.getElementById("hours").textContent = Math.floor((gap % day) / hour);
  document.getElementById("minutes").textContent = Math.floor((gap % hour) / minute);
  document.getElementById("seconds").textContent = Math.floor((gap % minute) / second);
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 🆕 Display Teams from localStorage
function renderTeamsOnHome() {
  const teamContainer = document.getElementById("team-container");
  if (!teamContainer) return;

  const teams = JSON.parse(localStorage.getItem("teams")) || [];

  if (teams.length === 0) {
    teamContainer.innerHTML = "<p style='text-align:center'>No teams added yet.</p>";
    return;
  }

  teamContainer.innerHTML = "";
  teams.forEach(team => {
    const wrapper = document.createElement("a");
    wrapper.href = "team.html";
    wrapper.className = "team-card";
    wrapper.innerHTML = `
      <img src="images/default-team.png" alt="${team.name}" />
      <h3>${team.name}</h3>
    `;
    teamContainer.appendChild(wrapper);
  });
}
renderTeamsOnHome();
