let cam;
let capturedImage;

function startCamera(w, h) {
  cam = createCapture(VIDEO);
  cam.size(w, h);
  cam.hide();
}

function getCamera() {
  return cam;
}

function stopCamera() {
  cam.stop();
  cam.remove();
}

function captureImage() {
  capturedImage = createGraphics(width, height);
  capturedImage.image(getCamera(), 0, 0);
}
