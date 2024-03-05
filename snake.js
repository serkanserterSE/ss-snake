var isStopped = false;
var speed = 4;
var size = 20;
var direction = 0;
var directions = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];
var moves = [
    (x, y) => { return { x: (x + size), y: y } },
    (x, y) => { return { x: (x - size), y: y } },
    (x, y) => { return { y: (y + size), x: x } },
    (x, y) => { return { y: (y - size), x: x } }];

var node = {
    x: 100,
    y: 100
};

var node2 = {
    x: (100 - size),
    y: 100
};

var node3 = {
    x: (100 - (2 * size)),
    y: 100
};

var node4 = {
    x: (100 - (3 * size)),
    y: 100
};

var nodeList = [node, node2, node3, node4];
var coinList = [];

function setup() {
    noStroke();
    height = 400;
    width = 300;
    let canvas = createCanvas(width, height);
    canvas.parent('container');
    frameRate(speed);

}

function draw() {
    if (isStopped) return;
    move();
}

function checkKeyPressed() {
    if (key == directions[0] && direction != 1) {
        direction = 0;
    } else if (key == directions[1] && direction != 0) {
        direction = 1;
    } else if (key == directions[2] && direction != 3) {
        direction = 2;
    } else if (key == directions[3] && direction != 2) {
        direction = 3;
    }
}

function move() {
    checkKeyPressed();
    let tmpNodeList = JSON.parse(JSON.stringify(nodeList));
    let firstNode = nodeList[0];
    removeNode(firstNode);
    nodeList[0] = setDirection(firstNode);
    for (let i = 0; i < nodeList.length; i++) {
        if (i == 0) {
            continue;
        } else {
            let node = nodeList[i];
            removeNode(node);
            nodeList[i] = tmpNodeList[i - 1];
            generateNode(nodeList[i]);
        }
    }
    generateCoin();
    gainCoin(firstNode);
    checkForPanel();
    checkSnake();
}

function checkSnake() {
    let firstNode = nodeList[0];
    for (let i = 1; i < nodeList.length; i++) {
        let node = nodeList[i];
        let nxMax = node.x + size / 2;
        let nxMin = node.x - size / 2;
        let nyMax = node.y + size / 2;
        let nyMin = node.y - size / 2;

        if ((firstNode.x < nxMax && firstNode.x > nxMin) && (firstNode.y < nyMax && firstNode.y > nyMin)) {
            isStopped = true;
            speed = 0;
        }
    }
}

function checkForPanel() {
    let firstNode = nodeList[0];
    if (firstNode.x > width) {
        firstNode.x = 0;
    }

    if (firstNode.y > height) {
        firstNode.y = 0;
    }

    if (firstNode.x < 0) {
        firstNode.x = width;
    }

    if (firstNode.y < 0) {
        firstNode.y = height;
    }

    nodeList[0] = firstNode;
}

function setDirection(node) {
    let m = moves[direction](node.x, node.y);
    node.x = m.x;
    node.y = m.y
    return node;
}

function generateNode(node) {
    fill(0);
    ellipse(node.x, node.y, size, size);
}

function removeNode(node) {
    fill(255);
    ellipse(node.x, node.y, size + 2, size + 2);
    fill(0);
}

function generateCoin() {
    if (coinList.length < 2) {
        let r = getRandomInt(0, 255), g = getRandomInt(0, 255), b = getRandomInt(0, 255);
        fill(r, g, b);
        let cx = getRandomInt(0, 255);
        let cy = getRandomInt(0, 255);
        //rect(cx, cy, size, size);
        ellipse(cx, cy, size, size);
        coinList.push({ x: cx, y: cy, color: { r: r, g: g, b: b } });
    } else {
        for (let i = 0; i < coinList.length; i++) {
            let coin = coinList[i];
            fill(coin.color.r, coin.color.g, coin.color.b);
            ellipse(coin.x, coin.y, size, size);
        }
    }
}

function gainCoin(node) {
    for (let i = 0; i < coinList.length; i++) {
        let coin = coinList[i];
        let cxMax = coin.x + size / 2;
        let cxMin = coin.x - size / 2;
        let cyMax = coin.y + size / 2;
        let cyMin = coin.y - size / 2;

        if ((node.x <= cxMax && node.x >= cxMin) && (node.y <= cyMax && node.y >= cyMin)) {
            let lastNode = nodeList[nodeList.length - 1];
            nodeList.push({ x: lastNode.x - size, y: lastNode.y });
            coinList.splice(i, 1);
            fill(255);
            ellipse(coin.x, coin.y, size + 2, size + 2);
            fill(0)
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

