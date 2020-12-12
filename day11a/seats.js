const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day11a/input'),
    output: process.stdout,
    terminal: false
});

const originalSeats = [];
let currentSeats = [];
const occupied = [];

const getSeatAt = (seats, row, col) => {
    if (row < 0 || row >= seats.length) {
        return '.';
    }
    if (col < 0 || col >= seats[0].length) {
        return '.';
    }
    return seats[row][col];
}

const isFloorAt = (seats, row, col) => {
    return getSeatAt(seats, row, col) === '.';
}

const isEmptySeatAt = (seats, row, col) => {
    return getSeatAt(seats, row, col) === 'L';
}

const isOccupiedSeatAt = (seats, row, col) => {
    return getSeatAt(seats, row, col) === '#';
}

const countOccupiedSeats = (seats) => {
    let count = 0;
    seats.forEach((row) => {
        row.forEach((seat) => {
            if (seat === '#') {
                count++;
            }
        });
    });

    return count;
}

const countAdjacentOccupiedSeats = (seats, row, col) => {
    let count = 0;
    for (let rowNum = row - 1; rowNum <= row + 1; rowNum++) {
        for (let colNum = col - 1; colNum <= col + 1; colNum++) {
            if (rowNum === row && colNum === col) {
                continue;
            }
            if (isOccupiedSeatAt(seats, rowNum, colNum)) {
                count++;
            };
        }
    }

    return count;
}

const printSeats = (seats) => {
    let str = '';
    seats.forEach((row) => {
        row.forEach((seat) => {
            str += seat;
        });
        console.log(str);
        str = '';
    });
    console.log('');
}

const updateSeats = (seats) => {
    const rowCount = seats.length;
    const colCount = seats[0].length;
    const newSeats = [];
    let changeCount = 0;

    seats.forEach((row) => { 
        newSeats.push([...row]);
    });

    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            if (isFloorAt(seats, row, col)) {
                newSeats[row][col] = '.';
            } else {
                let count = countAdjacentOccupiedSeats(seats, row, col);
                if (count === 0) {
                    newSeats[row][col] = '#';
                    if (!isOccupiedSeatAt(seats, row, col)) {
                        changeCount++;
                    }
                } else if (count >= 4) {
                    newSeats[row][col] = 'L';
                    if (!isEmptySeatAt(seats, row, col)) {
                        changeCount++;
                    }
                }
            }
        }
    }

    return [changeCount, newSeats];
}

const onReadLine = (line) => {
    originalSeats.push([...line]);
};

const onFileEnd = () => {
    let numChanges = 0;
    let newSeats = [];

    originalSeats.forEach((row) => { 
        newSeats.push([...row]);
    });

    do {
        [numChanges, newSeats] = updateSeats(newSeats);
    } while (numChanges > 0);

    console.log(`Occupied seats: ${countOccupiedSeats(newSeats)}`);

};

rl.on('line', onReadLine).on('close', onFileEnd);