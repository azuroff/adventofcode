const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day2b/input'),
    output: process.stdout,
    terminal: false
});

let validPasswordCount = 0;
const passwordRegex = /(?<first>\d+)-(?<second>\d+) (?<letter>[a-z]): (?<password>[a-z]+)/;

const isValidPassword = (passwordLine) => {
    const contents = passwordRegex.exec(passwordLine);
    if (contents) {
        const first = contents.groups.first;
        const second = contents.groups.second;
        const letter = contents.groups.letter;
        const password = contents.groups.password;

        const isInFirstPosition = password.substring(first - 1, first) === letter;
        const isInSecondPosition = password.substring(second - 1, second) === letter;
        
        return isInFirstPosition ^ isInSecondPosition;
    } else {
        return false;
    }
};

rl.on('line', (line) => {
    if (isValidPassword(line)) {
        validPasswordCount++;
    }
}).on('close', () => {
    console.log('Valid passwords: ' + validPasswordCount);
});