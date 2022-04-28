let img = [];
let table;
const randomness = 0.1; // 0 to 0.5
const side = 16; // edit side in processing.py to match

function preload() {
  table = loadTable('images.csv', 'csv', 'header');
}

function setup() {
  for (let k = 0; k < table.getRowCount(); k++) {
    img[k] = loadImage(`output_images/${table.getString(k, 'filename')}`);
  }
  video = createCapture(VIDEO);
  video.size(64, 48);
  video.hide();
  createCanvas(video.width * side, video.height * side);
}

function draw() {
  video.loadPixels();
  clear();
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const rand = (Math.random() - 0.5) * randomness;
      const br = (r + g + b) / 765;
      const x = rand + br
      const closest = table.getColumn('brightness').sort( (a, b) => Math.abs(x - a) - Math.abs(x - b) )[0];
      const closestId = table.findRow(closest, 'brightness').get('id');
      image(img[closestId], i * side, j * side, side, side);
    }
  }
}