let selectedAnnex = "";
let selectedLevel = "";
let selectedDorm = "";

const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2J7s7yqGIoQaEzo1gtdU6zIbs4ZJDzvzEJkVqY29Q743yoI4Ga2bfZB5IYBtb5y_pKYMfUmi4LR-g/pubhtml";


function showLevels(annex) {
  selectedAnnex = annex;
  document.getElementById("selected-annex").textContent = annex;
  document.getElementById("level-section").classList.remove("hidden");
  document.getElementById("dorm-section").classList.add("hidden");
  document.getElementById("pdl-section").classList.add("hidden");
}

function showDorms(level) {
  selectedLevel = level;
  document.getElementById("selected-level").textContent = level;
  document.getElementById("dorm-section").classList.remove("hidden");
  document.getElementById("pdl-section").classList.add("hidden");

  const dormButtonsDiv = document.getElementById("dorm-buttons");
  dormButtonsDiv.innerHTML = "";

  for (let i = 1; i <= 30; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Dorm ${i}`;
    btn.className = "btn dorm-btn";
    btn.onclick = () => loadPDL(`Dorm ${i}`);
    dormButtonsDiv.appendChild(btn);
  }
}

function loadPDL(dorm) {
  selectedDorm = dorm;
  document.getElementById("selected-dorm").textContent = `${selectedAnnex} > ${selectedLevel} > ${dorm}`;
  document.getElementById("pdl-section").classList.remove("hidden");

  Tabletop.init({
    key: sheetURL,
    simpleSheet: true,
    callback: function(data) {
      const list = document.getElementById("pdl-list");
      list.innerHTML = "";

      const filtered = data.filter(row =>
        row.Annex === selectedAnnex &&
        row.Level === selectedLevel &&
        row.Dorm === dorm
      );

      if (filtered.length === 0) {
        list.innerHTML = "<li>No PDLs found.</li>";
      } else {
        filtered.forEach(pdl => {
          const li = document.createElement("li");
          li.textContent = pdl["PDL Name"];
          list.appendChild(li);
        });
      }
    }
  });
}
