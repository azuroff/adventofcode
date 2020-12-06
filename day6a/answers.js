const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day6a/input'),
    output: process.stdout,
    terminal: false
});

const groups = [];
let answeredQuestions = 0;
let buffer = '';

const onReadLine = (line) => {
    buffer = buffer + line;
    if (line.length === 0) {
        groups.push(buffer);
        buffer = '';  
    }
};

const onFileEnd = () => {
    groups.push(buffer);
    groups.forEach((group) => {
        console.log([...new Set(group)].length);
        answeredQuestions += [...new Set(group)].length; 
    });
    console.log(`Answered questions: ${answeredQuestions}`);

};

rl.on('line', onReadLine).on('close', onFileEnd);