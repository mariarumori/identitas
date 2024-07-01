let capture;
let captureButton;
let capturedImage;

let slider_1;
let slider_2;
let slider_3;
let slider_4;
let slider_5;

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

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  startCamera(width, height);
  noStroke();
  startCapture();
  noLoop();

  createP("QUANTO PENSI CHE IL MONDO ESTERNO INFLUISCA SULLA TUA IDENTITÀ?");
  slider_1 = createSlider(0, 5, 0);
  pixelLayer = createShaderLayer(pixelShader, width, height);

  createP(
    "QUANTO PENSI CHE L’AMBIENTE FAMILIARE ABBIA INCISO NELLA TUA SFERA IDENTITARIA?"
  );
  slider_2 = createSlider(0, 5, 0);
  blurLayer = createShaderLayer(blurShader, width, height);

  createP(
    "QUANTO PENSI CHE L’AMBIENTE SCOLASTICO ABBIA INCISO NELLA TUA SFERA IDENTITARIA?"
  );
  slider_3 = createSlider(0, 5, 0);
  saturateLayer = createShaderLayer(saturateShader, width, height);
  createP(
    "QUANTO PENSI CHE L’AMBIENTE LAVORATIVO ABBIA INCISO NELLA TUA SFERA IDENTITARIA?"
  );
  slider_4 = createSlider(0, 5, 0);
  deleteLayer = createShaderLayer(deleteShader, width, height);

  createP("QUANTO PENSI DI RECITARE UN RUOLO NELLA TUA VITA?");
  slider_5 = createSlider(0, 5, 0);
  recolorLayer = createShaderLayer(recolorShader, width, height);

  createP("");

  createCaptureButton();
  createRedrawButton();
}

function draw() {
  translate(-width / 2, -height / 2);

  if (capturedImage) {
    let layer_1 = pixelShader(capturedImage, slider_1.value());
    let layer_2 = blurShader(layer_1, slider_2.value() * 10);
    let layer_3 = saturateShader(layer_2, map(slider_3.value(), 0, 5, 25, 100));
    let layer_4 = deleteShader(layer_3, slider_4.value());
    let layer_5 = recolorShader(layer_4, slider_5.value() / (5 + 2));

    image(layer_5, 0, 0);
  }

  // Livello 1

  pixelShader.setUniform("tex0", getCamera());
  pixelShader.setUniform("amount", 40.0);
  pixelLayer.rect(0, 0, width, height);
  image(pixelLayer, 0, 0);

  // Livello 2

  blurShader.setUniform("tex0", pixelLayer);
  blurShader.setUniform("texelSize", [1.0 / width, 1.0 / height]);
  blurLayer.rect(0, 0, width, height);
  image(blurLayer, 0, 0);

  // Livello 3

  saturateShader.setUniform("tex0", blurLayer);
  saturateShader.setUniform("saturation", 5.0);
  saturateLayer.rect(0, 0, width, height);
  image(saturateLayer, 0, 0);

  // Livello 4

  deleteShader.setUniform("tex0", saturateLayer);
  deleteShader.setUniform("whiteProbability", 0.1);
  deleteShader.setUniform("amount", 40.0);
  deleteLayer.rect(0, 0, width, height);
  image(deleteLayer, 0, 0);

  // Livello 5

  recolorShader.setUniform("tex0", deleteLayer);
  recolorShader.setUniform("time", frameCount * 0.01);
  recolorLayer.rect(0, 0, width, height);
  image(recolorLayer, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function startCapture() {
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
}

function stopCapture() {
  capture.stop();
  capture.remove();
}

function captureImage() {
  capturedImage = createGraphics(width, height);
  capturedImage.image(capture, 0, 0);
  stopCapture();
  redraw();
}

function createCaptureButton() {
  captureButton = createButton("SCATTA FOTO");
  captureButton.mousePressed(captureImage);
}

function createRedrawButton() {
  let redrawButton = createButton("RIDISEGNA");
  redrawButton.mousePressed(redraw);
}
