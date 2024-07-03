// -- Canvas -- //

const canvasId = "defaultCanvas0";

function hideCanvas() {
  hideElement(canvasId);
}

function showCanvas() {
  showElement(canvasId);
}

// -- Interfaccia -- //

const domande = [
  "Quanto pensi che il mondo esterno influisca sulla tua identità?",
  "Quanto pensi che l’ambiente familiare abbia inciso nella tua sfera identitaria?",
  "Quanto pensi che l’ambiente scolastico abbia inciso nella tua sfera identitaria?",
  "Quanto pensi che l’ambiente lavorativo abbia inciso nella tua sfera identitaria?",
  "Quanto pensi di recitare un ruolo nella tua vita?",
];

let slider_1;
let slider_2;
let slider_3;
let slider_4;
let slider_5;

let slider_max = 5;
let slider_min = 0;

function createUI() {
  const container = createUIContainer();

  createElement("h1", "Identitas").parent(container);

  createP(domande[0]).parent(container);
  slider_1 = createSlider(slider_min, slider_max, slider_min).parent(container);

  createP(domande[1]).parent(container);
  slider_2 = createSlider(slider_min, slider_max, slider_min).parent(container);

  createP(domande[2]).parent(container);
  slider_3 = createSlider(slider_min, slider_max, slider_min).parent(container);

  createP(domande[3]).parent(container);
  slider_4 = createSlider(slider_min, slider_max, slider_min).parent(container);

  createP(domande[4]).parent(container);
  slider_5 = createSlider(slider_min, slider_max, slider_min).parent(container);

  createSmascheraButton().parent(container);
}

function mapSliderValue(slider, min, max) {
  return map(slider.value(), slider_min, slider_max, min, max);
}

// -- Smaschera -- //

function createSmascheraButton() {
  let captureButton = createButton("Smaschera");
  captureButton.mousePressed(smaschera);
  return captureButton;
}

function smaschera() {
  hideUI();
  captureImage();
  stopCamera();
  showCanvas();
  redraw();
}

// -- UI Container -- //

const uiContainerId = "UI";

function createUIContainer() {
  const controlsContainer = createDiv();
  controlsContainer.elt.id = uiContainerId;
  return controlsContainer;
}

function hideUI() {
  hideElement(uiContainerId);
}

function showUI() {
  showElement(uiContainerId);
}

// -- Utils -- //

const hideClass = "hide";

function hideElement(id) {
  document.getElementById(id).classList.add(hideClass);
}

function showElement(id) {
  document.getElementById(id).classList.remove(hideClass);
}
