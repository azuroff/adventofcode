const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day9a/input'),
    output: process.stdout,
    terminal: false
});

const numbers = [];
let ptr = 0;
const rangeSize = 25;

const isValidRange = (range) => {
    const valueToCheck = range[rangeSize];
    let isValid = false;

    for (let i = 0; i < rangeSize - 1 && !isValid; i++) {
        for (let j = 1; j < rangeSize && !isValid; j++) {
            if (i !== j) {
                if (range[i] + range[j] === valueToCheck) {
                    isValid = true;
                    break;
                }
            }
        }
    }

    return isValid;
};

const onReadLine = (line) => {
    numbers.push(parseInt(line));
};

const onFileEnd = () => {
    let range = numbers.slice(ptr, rangeSize + 1);

    while (isValidRange(range)) {
        ptr++;
        range = numbers.slice(ptr, ptr + rangeSize + 1);
    }

    console.log(`failing number is ${range[range.length - 1]}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);