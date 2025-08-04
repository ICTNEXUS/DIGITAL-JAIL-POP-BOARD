const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2J7s7yqGIoQaEzo1gtdU6zIbs4ZJDzvzEJkVqY29Q743yoI4Ga2bfZB5IYBtb5y_pKYMfUmi4LR-g/pubhtml";

let selectedAnnex = "";
let selectedLevel = "";
let selectedDorm = "";

function showLevels(annex) {
  selectedAnnex = annex;
  selectedLevel = "";
  selectedDorm = "";

  const levels = ["Lower Ground", "Upper Ground", "Level 2", "Level 3", "Level 4"];
  const container = document.getElementById("levels");
  container.innerHTML = `<h3>${annex} Levels</h3>` +
    levels.map(level => `<button onclick="showDorms('${level}')">${level}</button>`).join(" ");

  document.getElementById("dorms").innerHTML = "";
  document.getElementById("pdls").innerHTML = "";
}

function showDorms(level) {
  selectedLevel = level;
  selectedDorm = "";

  const container = document.getElementById("dorms");
  container.innerHTML = `<h3>${level} Dorms</h3>` +
    Array.from({ length: 30 }, (_, i) => `<button onclick="showPDLs('Dorm ${i + 1}')">Dorm ${i + 1}</button>`).join(" ");

  document.getElementById("pdls").innerHTML = "";
}

function showPDLs(dorm) {
  selectedDorm = dorm;

  Tabletop.init({
    key: sheetURL,
    callback: function (data) {
      const filtered = data.filter(row =>
        row["Annex"] === selectedAnnex &&
        row["Level"] === selectedLevel &&
        row["Dorm"] === selectedDorm
      );

      const container = document.getElementById("pdls");
      if (filtered.length === 0) {
        container.innerHTML = `<p>No PDLs found for ${selectedDorm}</p>`;
      } else {
        container.innerHTML = `<h3>${selectedDorm} PDLs</h3><ul>` +
          filtered.map(row => `<li>${row["PDL Name"]}</li>`).join("") + "</ul>";
      }
    },
    simpleSheet: true
  });
}
