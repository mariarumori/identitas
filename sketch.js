let capturedImage;

//

let slider_1;
let slider_2;
let slider_3;
let slider_4;
let slider_5;

//

let pixelShader;
let pixelLayer;

let blurShader;
let blurLayer;

let saturateShader;
let saturateLayer;

let deleteShader;
let deleteLayer;

let recolorShader;
let recolorLayer;

function preload() {
  // load the shader
  pixelShader = loadShaderByName("pixelate");
  blurShader = loadShaderByName("blur");
  saturateShader = loadShaderByName("saturate");
  deleteShader = loadShaderByName("delete");
  recolorShader = loadShaderByName("recolor");
}

let slider_max = 5;
let slider_min = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  startCamera(width, height);
  noStroke();
  // noLoop();

  createP("QUANTO PENSI CHE IL MONDO ESTERNO INFLUISCA SULLA TUA IDENTITÀ?");
  slider_1 = createSlider(slider_min, slider_max, slider_min);
  pixelLayer = createShaderLayer(pixelShader, width, height);

  createP(
    "QUANTO PENSI CHE L’AMBIENTE FAMILIARE ABBIA INCISO NELLA TUA SFERA IDENTITARIA?"
  );
  slider_2 = createSlider(slider_min, slider_max, slider_min);
  blurLayer = createShaderLayer(blurShader, width, height);

  createP(
    "QUANTO PENSI CHE L’AMBIENTE SCOLASTICO ABBIA INCISO NELLA TUA SFERA IDENTITARIA?"
  );
  slider_3 = createSlider(slider_min, slider_max, slider_min);
  saturateLayer = createShaderLayer(saturateShader, width, height);

  createP(
    "QUANTO PENSI CHE L’AMBIENTE LAVORATIVO ABBIA INCISO NELLA TUA SFERA IDENTITARIA?"
  );
  slider_4 = createSlider(slider_min, slider_max, slider_min);
  deleteLayer = createShaderLayer(deleteShader, width, height);

  createP("QUANTO PENSI DI RECITARE UN RUOLO NELLA TUA VITA?");
  slider_5 = createSlider(slider_min, slider_max, slider_min);
  recolorLayer = createShaderLayer(recolorShader, width, height);

  createP("");

  createCaptureButton();
  createRedrawButton();
}

function draw() {
  translate(-width / 2, -height / 2);

  if (capturedImage) {
    // Livello 1

    let value_1 = mapSliderValue(slider_1, 300, 100);
    pixelShader.setUniform("tex0", getCamera());
    pixelShader.setUniform("amount", value_1);
    pixelLayer.rect(0, 0, width, height);
    image(pixelLayer, 0, 0);

    // Livello 2

    let value_2 = mapSliderValue(slider_2, 0.1, 1);
    blurShader.setUniform("tex0", pixelLayer);
    blurShader.setUniform("texelSize", [value_2 / width, value_2 / height]);
    blurLayer.rect(0, 0, width, height);
    image(blurLayer, 0, 0);

    // Livello 3

    let value_3 = mapSliderValue(slider_3, 1, 4);
    saturateShader.setUniform("tex0", blurLayer);
    saturateShader.setUniform("saturation", value_3);
    saturateLayer.rect(0, 0, width, height);
    image(saturateLayer, 0, 0);

    // Livello 4

    let value_4 = mapSliderValue(slider_4, 0.01, 0.3);
    deleteShader.setUniform("tex0", saturateLayer);
    deleteShader.setUniform("whiteProbability", value_4);
    deleteShader.setUniform("amount", value_1);
    deleteLayer.rect(0, 0, width, height);
    image(deleteLayer, 0, 0);

    // Livello 5

    let value_5 = mapSliderValue(slider_5, 0, 0.5);
    recolorShader.setUniform("tex0", deleteLayer);
    recolorShader.setUniform("time", value_5);
    recolorLayer.rect(0, 0, width, height);
    image(recolorLayer, 0, 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function captureImage() {
  capturedImage = createGraphics(width, height);
  capturedImage.image(getCamera(), 0, 0);
  stopCamera();
  redraw();
}

function createCaptureButton() {
  let captureButton = createButton("SCATTA FOTO");
  captureButton.mousePressed(captureImage);
}

function createRedrawButton() {
  let redrawButton = createButton("RIDISEGNA");
  redrawButton.mousePressed(redraw);
}

function mapSliderValue(slider, min, max) {
  return map(slider.value(), slider_min, slider_max, min, max);
}
