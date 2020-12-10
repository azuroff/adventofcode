const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day10b/input'),
    output: process.stdout,
    terminal: false
});

const adapters = [];
const memo = new Map();

const countValidValues = (numDigits) => {
    if (memo.has(numDigits)) {
        return memo.get(numDigits);
    }

    if (numDigits <= 0) {
        return 0;
    } else if (numDigits < 3) {
        return Math.pow(2, numDigits);
    } else {
        let invalidValues = 0;

        for (let numZeros = 3; numZeros <= numDigits; numZeros++) {
            for (let position = 0; position <= numDigits - numZeros; position++) {
                let delta = 0;
                delta += countValidValues(position - 1);
                delta += countValidValues(numDigits - numZeros - position - 1);
                invalidValues += Math.max(1, delta);
            }
        }

        const validValues = Math.pow(2, numDigits) - invalidValues;
        memo.set(numDigits, validValues);
        return validValues;
    }
}

const onReadLine = (line) => {
    adapters.push(parseInt(line));
};

const onFileEnd = () => {
    // Sort the array smallest to largest
    adapters.sort((a, b) => a - b);

    // Add the 0-jolt outlet
    adapters.splice(0, 0, 0);

    // Only numbers with a difference of 1 on both sides
    // can removed from the list, so only count those.
    let consecutive2 = 0;
    let answer = 1;
    for (let i = 1; i < adapters.length - 1; i++) {
        const diff = adapters[i + 1] - adapters[i - 1];
        if (diff === 2) {
            consecutive2++;
        } else {
            if (consecutive2 > 0) {
                answer *= countValidValues(consecutive2);
                consecutive2 = 0;    
            }
        }
    }
    if (consecutive2 > 0) {
        answer *= countValidValues(consecutive2);
        consecutive2 = 0;    
    }

    console.log(`Answer: ${answer}`);   

};

rl.on('line', onReadLine).on('close', onFileEnd);