let data = {};

window.onload = async function () {
  const response = await fetch('data.json');
  data = await response.json();
  loadAnnexButtons();
};

function loadAnnexButtons() {
  const annexContainer = document.getElementById("annex-buttons");
  annexContainer.innerHTML = "";

  Object.keys(data).forEach(annex => {
    const btn = document.createElement("button");
    btn.innerText = annex;
    btn.onclick = () => showDorms(annex);
    annexContainer.appendChild(btn);
  });
}

function showDorms(annex) {
  const dormContainer = document.getElementById("dorms-container");
  const pdlsContainer = document.getElementById("pdls-container");
  dormContainer.innerHTML = `<h2>${annex} Dorms</h2>`;
  pdlsContainer.innerHTML = "";

  Object.keys(data[annex]).forEach(dorm => {
    const btn = document.createElement("button");
    btn.innerText = dorm;
    btn.onclick = () => showPDLs(annex, dorm);
    dormContainer.appendChild(btn);
  });
}

function showPDLs(annex, dorm) {
  const pdlsContainer = document.getElementById("pdls-container");
  pdlsContainer.innerHTML = `<h2>${dorm} - PDLs</h2><ul>`;

  data[annex][dorm].forEach(pdl => {
    const li = document.createElement("li");
    li.innerText = pdl;
    pdlsContainer.appendChild(li);
  });
}
