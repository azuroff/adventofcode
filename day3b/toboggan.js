const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day3a/input'),
    output: process.stdout,
    terminal: false
});

let totalTreesEncountered = 1;
const terrain = [];
let curX = 0;
let curY = 0;

const move = (moveX, moveY) => {
    curX = curX + moveX;
    if (curX >= terrain[0].length) {
        curX = curX - terrain[0].length;
    }
    curY = curY + moveY;
};

const isTree = (x, y) => {
    return terrain[y][x] === '#';
};

const countTrees = (moveX, moveY) => {
    let treesEncountered = 0;

    curX = 0;
    curY = 0;

    while (curY < terrain.length - 1) {
        move(moveX, moveY);
        if (isTree(curX, curY)) {
            treesEncountered++;
        }
    }
    return treesEncountered;
};

rl.on('line', (line) => {
    terrain.push([...line]);
}).on('close', () => {
    totalTreesEncountered = countTrees(1, 1) * countTrees(3, 1) * countTrees(5, 1) * countTrees(7, 1) * countTrees(1, 2);
    console.log(`Trees encountered: ${totalTreesEncountered}`);
});