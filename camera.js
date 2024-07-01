let cam;

function startCamera(w, h) {
  cam = createCapture(VIDEO);
  cam.size(w, h);
  cam.hide();
}

function getCamera() {
  return cam;
}
