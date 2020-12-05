const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day5a/input'),
    output: process.stdout,
    terminal: false
});

const inputSeats = [];
let seatIds = [];
const seatRegex = /(?<row>[FB]{7})(?<seat>[LR]{3})/;

const calculateNumber = (str, charForOne) => {
    let val = 0;
    let len = str.length - 1;

    for (let i = 0; i <= len; i++) {
        if (str[i] === charForOne) {
            val += Math.pow(2, (len - i));
        }
    }

    return val;
}

const calculateSeatId = (row, seat) => {
    return row * 8 + seat;
}

const onReadLine = (line) => {
    inputSeats.push(line);
};

const onFileEnd = () => {
    inputSeats.forEach((seat) => { 
        const seatMatch = seatRegex.exec(seat);
        const rowVal = calculateNumber(seatMatch.groups.row, 'B');
        const seatVal = calculateNumber(seatMatch.groups.seat, 'R');
        const seatId = calculateSeatId(rowVal, seatVal);
        seatIds.push(seatId);
    });

    let missingSeatId = 0;
    seatIds = seatIds.sort((a, b) => a - b);
    for (let i = 0; i < seatIds.length - 1; i++) {
        if (seatIds[i + 1] - seatIds[i] > 1) {
            missingSeatId = seatIds[i] + 1;
            break;
        };
    };

    console.log(`Missing seat id: ${missingSeatId}`);

};

rl.on('line', onReadLine).on('close', onFileEnd);