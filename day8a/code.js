const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day8a/input'),
    output: process.stdout,
    terminal: false
});

const instructions = [];
let acc = 0;
let ptr = 0;

const onReadLine = (line) => {
    instructions.push(line);
};

const onFileEnd = () => {
    let nextInstruction = instructions[ptr];
    
    while (nextInstruction != 'ERROR' && ptr < instructions.length) {
        // Because we enter a loop as soon as we execute the same statement
        // twice, change the instruction to let us know when we've hit that
        // point.
        instructions[ptr] = 'ERROR';

        const code = nextInstruction.substring(0, 3);
        const argument = parseInt(nextInstruction.substring(4));
        switch (code) {
            case 'nop':
                // do nothing; just increment the pointer to move to
                // the next instruction
                ptr++;
                break;
            case 'acc':
                // Add the argument to the accumulator
                acc += argument;
                ptr++;
                break;
            case 'jmp':
                // Jump by incrementing/decrementing the pointer
                // by the amount specified by the argument
                ptr += argument;
                break;
            default:
                console.error(`Unknown code: ${code}`);
        }

        nextInstruction = instructions[ptr];
    }

    // Once we break out of the loop, print the acc value
    console.log(`acc = ${acc}`);

};

rl.on('line', onReadLine).on('close', onFileEnd);