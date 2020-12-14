const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day14a/input'),
    output: process.stdout,
    terminal: false
});

const memory = new Map();
const maskRegex = /mask = (?<bitmask>[X10]+)/g;
const memRegex = /mem\[(?<address>\d+)\] = (?<value>\d+)/;
let m;
let bitmask;
let address;
let value;

function createBinaryString (n) {
    return ("000000000000000000000000000000000000" + n.toString(2)).slice(-36);
}

function loadValue(address, value, bitmask) {
    const bitMaskArray = [...bitmask];
    const binaryStrArray = [...createBinaryString(value)];
    let answer = [];

    for (let i = 0; i < 36; i++) {
        if (bitMaskArray[i] === 'X') {
            answer[i] = binaryStrArray[i];
        } else {
            answer[i] = bitMaskArray[i];
        }
    }

    memory.set(address, parseInt(answer.join(''), 2));
}

const onReadLine = (line) => {
    if (line.match(maskRegex)) {
        m = maskRegex.exec(line);
        bitmask = m.groups.bitmask;
        address = '';
        value = ''; 
    } else if (line.match(memRegex)) {
        m = memRegex.exec(line);
        address = parseInt(m.groups.address);
        value = parseInt(m.groups.value);

        loadValue(address, value, bitmask);
    } else {
        throw new Error(`Unknown line: ${line}`);
    }
};

const onFileEnd = () => {
    let answer = 0;
    memory.forEach((v, k) => answer += v);
    console.log(`Answer: ${answer}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);