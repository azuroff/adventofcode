const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day9a/input'),
    output: process.stdout,
    terminal: false
});

const numbers = [];
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

const getInvalidValue = () => {
    let ptr = 0;
    let range = numbers.slice(ptr, rangeSize + 1);

    while (isValidRange(range)) {
        ptr++;
        range = numbers.slice(ptr, ptr + rangeSize + 1);
    }

    return range[range.length - 1];
}

const onReadLine = (line) => {
    numbers.push(parseInt(line));
};

const onFileEnd = () => {
    const invalidValue = getInvalidValue(numbers);
    console.log(`Invalid value: ${invalidValue}`);
    let weaknessFound = false;
    let range;
    let sum;
    
    for (let i = 0; i < numbers.length - 1 && !weaknessFound; i++) {
        for (let j = i + 1; j < numbers.length && !weaknessFound; j++) {
            range = numbers.slice(i, j + 1);
            sum = 0;

            range.forEach(number => sum += number);

            if (sum > invalidValue) {
                break;
            } else if (sum === invalidValue) {
                range.sort();
                const min = range[0];
                const max = range[range.length - 1];
                console.log(`Weakness: ${min + max}`);
                weaknessFound = true;
            }
        }
    }
};

rl.on('line', onReadLine).on('close', onFileEnd);