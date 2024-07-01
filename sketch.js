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

  pixelLayer = createShaderLayer(pixelShader, width, height);
  blurLayer = createShaderLayer(blurShader, width, height);
  saturateLayer = createShaderLayer(saturateShader, width, height);
  deleteLayer = createShaderLayer(deleteShader, width, height);
  recolorLayer = createShaderLayer(recolorShader, width, height);
}

function draw() {
  translate(-width / 2, -height / 2);

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
