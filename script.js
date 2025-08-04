let sheetData = [];
const levelsList = ["Lower Ground", "Upper Ground", "Level 2", "Level 3", "Level 4"];
const dormList = Array.from({ length: 30 }, (_, i) => `Dorm ${i + 1}`);

Tabletop.init({
  key: "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2J7s7yqGIoQaEzo1gtdU6zIbs4ZJDzvzEJkVqY29Q743yoI4Ga2bfZB5IYBtb5y_pKYMfUmi4LR-g/pubhtml",
  callback: function(data) {
    sheetData = data;
    console.log("Data loaded:", data);
  },
  simpleSheet: true
});

function showAnnex(annex) {
  document.getElementById("levels").innerHTML = "<h3>Select Level:</h3>" +
    levelsList.map(level => `<button onclick="showLevel('${annex}', '${level}')">${level}</button>`).join("");
  document.getElementById("dorms").innerHTML = "";
  document.getElementById("pdls").innerHTML = "";
}

function showLevel(annex, level) {
  document.getElementById("dorms").innerHTML = "<h3>Select Dorm:</h3>" +
    dormList.map(dorm => `<button onclick="showDorm('${annex}', '${level}', '${dorm}')">${dorm}</button>`).join("");
  document.getElementById("pdls").innerHTML = "";
}

function showDorm(annex, level, dorm) {
  const filtered = sheetData.filter(row =>
    row.Annex === annex &&
    row.Level === level &&
    row.Dorm === dorm
  );

  if (filtered.length === 0) {
    document.getElementById("pdls").innerHTML = `<p>No data for ${annex} → ${level} → ${dorm}</p>`;
    return;
  }

  const dormStatus = filtered[0]["Dorm Status"] || "Unknown";
  const pdls = filtered.map(row => `<li>${row["PDL Name"] || "Unnamed"}</li>`).join("");

  document.getElementById("pdls").innerHTML = `
    <h3>${dorm} - Status: <span class="status">${dormStatus}</span></h3>
    <ul>${pdls}</ul>
  `;
}

