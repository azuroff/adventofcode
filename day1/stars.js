const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('input'),
    output: process.stdout,
    terminal: false
});

const inputArray = [];
rl.on('line', (line) => {
    const number = parseInt(line);
    inputArray.push(number);
}).on('close', () => {
    let finished = false;
    for (let a = 0; a < inputArray.length - 2; a++) {
        const numA = inputArray[a];
        for (let b = a + 1; b < inputArray.length - 1; b++) {
            const numB = inputArray[b];
            for (let c = b + 1; c < inputArray.length; c++) {
                const numC = inputArray[c];
                if (numA + numB + numC == 2020) {
                    console.log('numA: ' + numA);
                    console.log('numB: ' + numB);
                    console.log('numC: ' + numC);
                    console.log('Answer: ' + (numA * numB * numC));
                    finished = true;
                    break;
                }    
            }
            if (finished) {
                break;
            }
        }
        if (finished) {
            break;
        }
    }
})
