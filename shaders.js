function loadShaderByName(name) {
  return loadShader("shaders/base.vert", `shaders/${name}.frag`);
}

function createShaderLayer(shader, w, h) {
  const layer = createGraphics(w, h, WEBGL);
  layer.shader(shader);
  return layer;
}
