const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day10a/input'),
    output: process.stdout,
    terminal: false
});

const adapters = [];

const onReadLine = (line) => {
    adapters.push(parseInt(line));
};

const onFileEnd = () => {
    // Sort the array smallest to largest
    adapters.sort((a, b) => a - b);

    // Add the 0-jolt outlet
    adapters.splice(0, 0, 0);

    // Add the built-in adapter
    adapters.push(adapters[adapters.length - 1] + 3);

    // Loop through all the adapters and count the differences
    let diff1 = 0;
    let diff3 = 0;
    for (let i = 0; i < adapters.length - 1; i++) {
        const diff = adapters[i + 1] - adapters[i];
        if (diff === 1) {
            diff1++;
        } else if (diff === 3) {
            diff3++;
        } else {
            console.error(`Unexpected diff: ${diff} (i: ${i})`);
        }
    }

    const answer = diff1 * diff3;
    console.log(`Answer: ${answer}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);