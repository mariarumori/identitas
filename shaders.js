// -- Shaders -- //

let pixelShader;
let blurShader;
let saturateShader;
let deleteShader;
let recolorShader;

function loadShaders() {
  pixelShader = loadShaderByName("pixelate");
  blurShader = loadShaderByName("blur");
  saturateShader = loadShaderByName("saturate");
  deleteShader = loadShaderByName("delete");
  recolorShader = loadShaderByName("recolor");
}

// -- Layers -- //

let pixelLayer;
let blurLayer;
let saturateLayer;
let deleteLayer;
let recolorLayer;

function createLayers() {
  pixelLayer = createShaderLayer(pixelShader, width, height);
  blurLayer = createShaderLayer(blurShader, width, height);
  saturateLayer = createShaderLayer(saturateShader, width, height);
  deleteLayer = createShaderLayer(deleteShader, width, height);
  recolorLayer = createShaderLayer(recolorShader, width, height);
}

// -- Utils -- //

function loadShaderByName(name) {
  return loadShader("shaders/base.vert", `shaders/${name}.frag`);
}

function createShaderLayer(shader, w, h) {
  const layer = createGraphics(w, h, WEBGL);
  layer.shader(shader);
  return layer;
}
