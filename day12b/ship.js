const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day12b/input'),
    output: process.stdout,
    terminal: false
});

const instructions = [];

const location = {
    eastWest: 0,
    northSouth: 0
};

const waypoint = {
    E: 10,
    S: 0,
    W: 0,
    N: 1
};

const executeInstruction = (instruction) => {
    const command = instruction.substring(0, 1);
    const amount = parseInt(instruction.substring(1));

    if (command === 'L' || command === 'R') {
        rotateWaypoint(command, amount);
    } else if (command === 'F') {
        moveToWaypoint(amount);
    } else {
        moveWaypoint(command, amount);
    }
}

const moveToWaypoint = (amount) => {
    location.eastWest += amount * waypoint.E;
    location.eastWest -= amount * waypoint.W;
    location.northSouth += amount * waypoint.N;
    location.northSouth -= amount * waypoint.S;
}

const rotateWaypoint = (direction, amount) => {
    if (direction === 'L') {
        amount = 360 - amount;
    }

    const limit = (amount % 360) / 90;
    for (let i = 0; i < limit; i++) {
        let clone = {
            E: waypoint.E,
            S: waypoint.S,
            W: waypoint.W,
            N: waypoint.N
        }
        
        waypoint.E = clone.N;
        waypoint.S = clone.E;
        waypoint.W = clone.S;
        waypoint.N = clone.W;
    }
}

const moveWaypoint = (direction, amount) => {
    waypoint[direction] += amount;
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