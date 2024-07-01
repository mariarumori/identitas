function loadShaderByName(name) {
  return loadShader("shaders/_base.vert", `shaders/${name}.frag`);
}
