const annexes = ["Annex 1", "Annex 2", "Annex 3", "Annex 4"];
const levels = ["Lower Ground", "Upper Ground", "Level 2", "Level 3", "Level 4"];
const dorms = Array.from({ length: 30 }, (_, i) => `Dorm ${i + 1}`);

const annexContainer = document.getElementById("annex-buttons");
const levelContainer = document.getElementById("level-buttons");
const dormContainer = document.getElementById("dorm-buttons");
const pdlList = document.getElementById("pdl-list");

// Show Annex Buttons
annexes.forEach(annex => {
  const btn = document.createElement("button");
  btn.textContent = annex;
  btn.onclick = () => showLevels(annex);
  annexContainer.appendChild(btn);
});

function showLevels(annex) {
  levelContainer.innerHTML = "";
  dormContainer.innerHTML = "";
  pdlList.innerHTML = "";
  levels.forEach(level => {
    const btn = document.createElement("button");
    btn.textContent = level;
    btn.onclick = () => showDorms(annex, level);
    levelContainer.appendChild(btn);
  });
}

function showDorms(annex, level) {
  dormContainer.innerHTML = "";
  pdlList.innerHTML = "";
  dorms.forEach(dorm => {
    const btn = document.createElement("button");
    btn.textContent = dorm;
    btn.onclick = () => showPDL(annex, level, dorm);
    dormContainer.appendChild(btn);
  });
}

function showPDL(annex, level, dorm) {
  pdlList.innerHTML = `<p>Showing PDLs for <strong>${annex} → ${level} → ${dorm}</strong></p>
                       <p>(Google Sheets integration goes here)</p>`;
}
