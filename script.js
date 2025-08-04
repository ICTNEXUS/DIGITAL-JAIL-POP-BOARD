const annexes = ["Annex 1", "Annex 2", "Annex 3", "Annex 4"];
const levels = ["Lower Ground", "Upper Ground", "Level 2", "Level 3", "Level 4"];
const dorms = Array.from({ length: 30 }, (_, i) => `Dorm ${i + 1}`);

const annexContainer = document.getElementById("annex-buttons");
const levelContainer = document.getElementById("level-buttons");
const dormContainer = document.getElementById("dorm-buttons");
const pdlList = document.getElementById("pdl-list");

// Google Sheets CSV URL
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2J7s7yqGIoQaEzo1gtdU6zIbs4ZJDzvzEJkVqY29Q743yoI4Ga2bfZB5IYBtb5y_pKYMfUmi4LR-g/pub?output=csv';

let sheetData = [];

// Fetch the CSV data on page load
fetch(SHEET_URL)
  .then(response => response.text())
  .then(csv => {
    sheetData = parseCSV(csv);
  });

// Simple CSV parser
function parseCSV(csv) {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const row = {};
    headers.forEach((header, i) => {
      row[header.trim()] = values[i]?.trim();
    });
    return row;
  });
}

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
  const results = sheetData.filter(row =>
    row.Annex === annex &&
    row.Level === level &&
    row.Dorm === dorm &&
    row.Name
  );

  if (results.length === 0) {
    pdlList.innerHTML = `<p>No data for <strong>${annex} → ${level} → ${dorm}</strong></p>`;
  } else {
    const names = results.map(r => `<li>${r.Name}</li>`).join('');
    pdlList.innerHTML = `
      <h3>PDLs in ${annex} → ${level} → ${dorm}</h3>
      <ul>${names}</ul>
    `;
  }
}
