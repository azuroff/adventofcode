const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day5a/input'),
    output: process.stdout,
    terminal: false
});

const inputSeats = [];
const seatRegex = /(?<row>[FB]{7})(?<seat>[LR]{3})/;
let maxSeatId = -1;

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

        maxSeatId = Math.max(maxSeatId, seatId);
        
    });

    console.log(`Max seat id: ${maxSeatId}`);
};


rl.on('line', onReadLine).on('close', onFileEnd);