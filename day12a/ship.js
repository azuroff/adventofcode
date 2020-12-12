const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day12a/input'),
    output: process.stdout,
    terminal: false
});

const instructions = [];

const location = {
    eastWest: 0,
    northSouth: 0
};

const heading = {
    direction: 'E',
    angle: 0
};
const headings = new Map();
headings.set(0, 'E');
headings.set(90, 'S');
headings.set(180, 'W');
headings.set(270, 'N');

const executeInstruction = (instruction) => {
    const command = instruction.substring(0, 1);
    const amount = parseInt(instruction.substring(1));

    if (command === 'L' || command === 'R') {
        changeHeading(command, amount);
    } else if (command === 'F') {
        moveLocation(heading.direction, amount);
    } else {
        moveLocation(command, amount);
    }
}

const changeHeading = (direction, amount) => {
    if (direction === 'L') {
        amount = 360 - amount;
    }

    heading.angle = (heading.angle + amount) % 360;
    heading.direction = headings.get(heading.angle);
}

const moveLocation = (direction, amount) => {
    switch (direction) {
        case 'E':
            location.eastWest += amount;
            break;
        case 'W':
            location.eastWest -= amount;
            break;
        case 'N':
            location.northSouth += amount;
            break;
        case 'S':
            location.northSouth -= amount;
            break;
        }
} 

const onReadLine = (line) => {
    instructions.push(line);
};

const onFileEnd = () => {
    instructions.forEach((instruction) => {
        executeInstruction(instruction);
    });

    console.log(`Manhattan distance: ${Math.abs(location.eastWest) + Math.abs(location.northSouth)}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);