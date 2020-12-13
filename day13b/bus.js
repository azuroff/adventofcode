const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day13b/input'),
    output: process.stdout,
    terminal: false
});

let earliestLeaveTime;
const bus = [];
const xcount = [];
let numx = 0;

const onReadLine = (line) => {
    if (!earliestLeaveTime) {
        earliestLeaveTime = parseInt(line);
    } else {
        line.split(',').forEach((busId) => {
            if (busId === 'x') {
                numx++;
            } else {
                bus.push(parseInt(busId));
                xcount.push(numx);
                numx = 0;
            }
        });
    }
};

const onFileEnd = () => {
    let leaveTime = 1;
    let outerIncrement = 1;
    let innerIncrement = 0;
    let bussesMatched = 0;
    let loops = 0;

    while (bussesMatched < bus.length) {
        loops++;
        leaveTime += outerIncrement;

        // We only need to check the next bus.
        // The inner increment takes care of checking matchingBus + 1 on the next loop.
        if ((leaveTime + innerIncrement) % bus[bussesMatched] == 0) {
            // The next bus matched, so update the increments
            outerIncrement *= bus[bussesMatched];
            bussesMatched++;
            innerIncrement += 1 + xcount[bussesMatched];
        }
    }

    const answer = leaveTime;
    console.log(`Answer: ${answer} (${loops} loops needed)`);
};

rl.on('line', onReadLine).on('close', onFileEnd);