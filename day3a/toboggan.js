const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day3a/input'),
    output: process.stdout,
    terminal: false
});

let treesEncountered = 0;
const terrain = [];
let curX = 0;
let curY = 0;

const move = () => {
    curX = curX + 3;
    if (curX >= terrain[0].length) {
        curX = curX - terrain[0].length;
    }
    curY = curY + 1;
};

const isTree = (x, y) => {
    return terrain[y][x] === '#';
};

const countTrees = () => {
    while (curY < terrain.length - 1) {
        move();
        if (isTree(curX, curY)) {
            treesEncountered++;
        }
    }
};

rl.on('line', (line) => {
    terrain.push([...line]);
}).on('close', () => {
    countTrees();
    console.log(`Trees encountered: ${treesEncountered}`);
});