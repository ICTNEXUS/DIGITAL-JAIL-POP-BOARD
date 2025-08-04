const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2J7s7yqGIoQaEzo1gtdU6zIbs4ZJDzvzEJkVqY29Q743yoI4Ga2bfZB5IYBtb5y_pKYMfUmi4LR-g/pubhtml";
let sheetData = [];

Tabletop.init({
  key: sheetURL,
  callback: function (data) {
    sheetData = data;
  },
  simpleSheet: true
});

function showAnnex(annex) {
  const levels = ["Lower Ground", "Upper Ground", "Level 2", "Level 3", "Level 4"];
  const container = document.getElementById("levels");
  container.innerHTML = "";
  levels.forEach(level => {
    const btn = document.createElement("button");
    btn.textContent = level;
    btn.onclick = () => showDorms(annex, level);
    container.appendChild(btn);
  });

  document.getElementById("dorms").innerHTML = "";
  document.getElementById("pdls").innerHTML = "";
}

function showDorms(annex, level) {
  const dorms = Array.from({ length: 30 }, (_, i) => `Dorm ${i + 1}`);
  const container = document.getElementById("dorms");
  container.innerHTML = "";
  dorms.forEach(dorm => {
    const btn = document.createElement("button");
    btn.textContent = dorm;
    btn.onclick = () => showPDLs(annex, level, dorm);
    container.appendChild(btn);
  });

  document.getElementById("pdls").innerHTML = "";
}

function showPDLs(annex, level, dorm) {
  const filtered = sheetData.filter(row =>
    row.Annex === annex &&
    row.Level === level &&
    row.Dorm === dorm
  );

  const container = document.getElementById("pdls");
  container.innerHTML = "";

  if (filtered.length === 0) {
    container.textContent = "No PDLs found.";
    return;
  }

  const list = document.createElement("ul");
  filtered.forEach(pdl => {
    const item = document.createElement("li");
    item.textContent = pdl["PDL Name"];
    list.appendChild(item);
  });

  container.appendChild(list);
}
