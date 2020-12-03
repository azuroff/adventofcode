const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day2a/input'),
    output: process.stdout,
    terminal: false
});

let validPasswordCount = 0;
const passwordRegex = /(?<min>\d+)-(?<max>\d+) (?<letter>[a-z]): (?<password>[a-z]+)/;

const isValidPassword = (passwordLine) => {
    const contents = passwordRegex.exec(passwordLine);
    if (contents) {
        const min = contents.groups.min;
        const max = contents.groups.max;
        const letter = contents.groups.letter;
        const password = contents.groups.password;

        const letterRegex = new RegExp(letter, 'g');
        const count = (password.match(letterRegex) || []).length;
            
        return (count >= min) && (count <= max);
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