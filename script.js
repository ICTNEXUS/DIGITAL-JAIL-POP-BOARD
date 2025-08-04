document.addEventListener("DOMContentLoaded", function () {
  let selectedAnnex = "";
  let selectedLevel = "";
  let selectedDorm = "";
  let allData = [];

  // Load Google Sheet using Tabletop
  Tabletop.init({
    key: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2J7s7yqGIoQaEzo1gtdU6zIbs4ZJDzvzEJkVqY29Q743yoI4Ga2bfZB5IYBtb5y_pKYMfUmi4LR-g/pubhtml",
    simpleSheet: true,
    callback: function (data) {
      allData = data;
    }
  });

  // Show levels
  function showLevels(annex) {
    selectedAnnex = annex;
    selectedLevel = "";
    selectedDorm = "";
    document.getElementById("level-buttons").innerHTML = `
      <button onclick="showDorms('Lower Ground')">Lower Ground</button>
      <button onclick="showDorms('Upper Ground')">Upper Ground</button>
      <button onclick="showDorms('Level 2')">Level 2</button>
      <button onclick="showDorms('Level 3')">Level 3</button>
      <button onclick="showDorms('Level 4')">Level 4</button>
    `;
    document.getElementById("dorm-buttons").innerHTML = "";
    document.getElementById("pdl-list").innerHTML = "";
  }

  // Show dorms
  window.showDorms = function (level) {
    selectedLevel = level;
    selectedDorm = "";
    let buttons = "";
    for (let i = 1; i <= 30; i++) {
      buttons += `<button onclick="showPDLs('Dorm ${i}')">Dorm ${i}</button>`;
    }
    document.getElementById("dorm-buttons").innerHTML = buttons;
    document.getElementById("pdl-list").innerHTML = "";
  };

  // Show PDL names
  window.showPDLs = function (dorm) {
    selectedDorm = dorm;
    const matches = allData.filter(row =>
      row.Annex?.trim() === selectedAnnex &&
      row.Level?.trim() === selectedLevel &&
      row.Dorm?.trim() === selectedDorm
    );

    let output = `<h3>${selectedAnnex} → ${selectedLevel} → ${selectedDorm}</h3>`;
    if (matches.length > 0) {
      output += "<ul>";
      matches.forEach(row => {
        if (row["PDL Name"]) {
          output += `<li>${row["PDL Name"]}</li>`;
        }
      });
      output += "</ul>";
    } else {
      output += "<p>No data found.</p>";
    }

    document.getElementById("pdl-list").innerHTML = output;
  };

  // Attach annex buttons
  const annexButtons = document.getElementById("annex-buttons");
  if (annexButtons) {
    ["Annex 1", "Annex 2", "Annex 3", "Annex 4"].forEach(annex => {
      const btn = document.createElement("button");
