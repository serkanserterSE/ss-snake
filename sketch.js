var height;
var width;
var XY;
var x = 0;
var y = 0;

function setup() {
    height = $(document).height();
    width = $(document).width();
    createCanvas(width, height);
    colorMode(HSB);
    noStroke();
    frameRate(2400);
    XY = new Array(width * height).fill(0);
}

function draw() {
    fill(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255));
    x = getRandomInt(0, width);
    y = getRandomInt(0, height);
    rect(x, y, 10, 10);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function check(x, y) {
    if (x - 11 > 0 && y - 11 > 0)
        for (let i = x - 11; i < x; i++) {
            for (let j = y - 11; j < y; j++) {
                if (XY[i * j] == 1) return false;
            }
        }

    if (x + 11 < width && y + 11 < height)
        for (let i = x; i < x + 11; i++) {
            for (let j = y; j < y + 11; j++) {
                if (XY[i * j] == 1) return false;
            }
        }

    return true;
}

function setIndex(x, y) {
    if (x - 11 > 0 && y - 11 > 0)
        for (let i = x - 11; i < x; i++) {
            for (let j = y - 11; j < y; j++) {
                XY[i * j] = 1;
            }
        }

    if (x + 11 < width && y + 11 < height)
        for (let i = x; i < x + 11; i++) {
            for (let j = y; j < y + 11; j++) {
                XY[i * j] = 1;
            }
        }
}