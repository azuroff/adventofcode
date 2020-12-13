const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day13a/input'),
    output: process.stdout,
    terminal: false
});

let earliestLeaveTime;
const bus = [];

const onReadLine = (line) => {
    if (!earliestLeaveTime) {
        earliestLeaveTime = parseInt(line);
    } else {
        line.split(',').forEach((busId) => {
            if (busId !== 'x') {
                bus.push(parseInt(busId));
            }
        });
    }
};

const onFileEnd = () => {
    let leaveTime = 100000000000000;
    let busAvailable = false;
    let availableBus;

    do {
        leaveTime++
        bus.forEach((nextBus) => {
            if (leaveTime % nextBus === 0) {
                busAvailable = true;
                availableBus = nextBus;
            }
        })
    } while (!busAvailable);

    const answer = (leaveTime - earliestLeaveTime) * availableBus;
    console.log(`Answer: ${answer}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);