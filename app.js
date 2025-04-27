// === Change these to your actual subject codes! ===
const subjects = ["Chem20018", "MAST20026", "Chem20030"];

let data = JSON.parse(localStorage.getItem("lectures") || "{}");
// Initialize missing subjects
subjects.forEach(s => {
  if (!data[s]) data[s] = { received: 0, watched: 0 };
});

// Render UI
function render() {
  const container = document.getElementById("tracker");
  container.innerHTML = subjects.map(s => {
    const rem = data[s].received - data[s].watched;
    return `
      <div class="subject">
        <h2>${s}: ${rem} remaining</h2>
        <button onclick="addReceived('${s}')">+1 Received</button>
        <button onclick="addWatched('${s}')">+1 Watched</button>
      </div>`;
  }).join("");
}

// Handlers
window.addReceived = subject => {
  data[subject].received++;
  saveAndRender();
};
window.addWatched = subject => {
  data[subject].watched++;
  saveAndRender();
};

// Save to browser and re-draw
function saveAndRender() {
  localStorage.setItem("lectures", JSON.stringify(data));
  render();
}

// Initial draw
render();
