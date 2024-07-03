//

function preload() {
  loadShaders();
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  startCamera(width, height);
  noStroke();
  hideCanvas();
  createLayers();
  createUI();
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

function keyPressed() {
  if (key == "p") {
    print();
  } else if (key == "r") {
    showUI();
    startCamera();
    hideCanvas();
  }
}
