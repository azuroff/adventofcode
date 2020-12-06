const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day6b/input'),
    output: process.stdout,
    terminal: false
});

const groups = [];
const answers = [26];
let answeredQuestions = 0;
let buffer = '';

const countGroupAnswers = (group) => {
    let passengerCount = 0;
    let everyoneAnswered = 0;
    let answerCount = new Map();

    group.split(/\r\n|\r|\n/).forEach((passengerAnswers) => {
        if (passengerAnswers.length > 0) {
            passengerCount++
            [...passengerAnswers].forEach((answer) => {
                if (answerCount.has(answer)) {
                    answerCount.set(answer, answerCount.get(answer) + 1);
                } else {
                    answerCount.set(answer, 1);
                }
            });
        }
    });

    for (let [key, value] of answerCount) {
        if (value === passengerCount) {
            everyoneAnswered++;
        };
    };

    return everyoneAnswered;
}

const onReadLine = (line) => {
    if (line.length === 0) {
        groups.push(buffer + line);
        buffer = '';  
    } else {
        buffer = buffer + line + '\n';
    }
};

const onFileEnd = () => {
    groups.push(buffer);
    groups.forEach((group) => {
        answeredQuestions += countGroupAnswers(group);
    });

    console.log(`Total questions answered: ${answeredQuestions}`);

};

rl.on('line', onReadLine).on('close', onFileEnd);