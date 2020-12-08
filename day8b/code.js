const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day8b/input'),
    output: process.stdout,
    terminal: false
});

const instructions = [];

const runCode = (lineToMutate) => {
    let acc = 0;
    let ptr = 0;
    
    // Clone the original instruction array
    const newInstructions = [...instructions];

    // Mutate the line if appropriate
    const code = newInstructions[lineToMutate].substring(0, 3);
    if (code === 'jmp') {
        newInstructions[lineToMutate] = newInstructions[lineToMutate].replace('jmp', 'nop');
    } else if (code === 'nop') {
        newInstructions[lineToMutate] = newInstructions[lineToMutate].replace('nop', 'jmp');
    } else {
        return 'ERROR';
    }
    
    let nextInstruction = newInstructions[ptr];
    while (nextInstruction != 'ERROR' && ptr < newInstructions.length) {
        // Because we enter a loop as soon as we execute the same statement
        // twice, change the instruction to let us know when we've hit that
        // point.
        newInstructions[ptr] = 'ERROR';

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

        nextInstruction = newInstructions[ptr];
    }

    if (nextInstruction === 'ERROR') {
        return 'ERROR';
    } else {
        return acc;
    }

};

const onReadLine = (line) => {
    instructions.push(line);
};

const onFileEnd = () => {
    let lineToMutate = 0;

    let result = '';
    do {
        result = runCode(lineToMutate);
        lineToMutate++;
    } while (result === 'ERROR' && lineToMutate < instructions.length);

    // Once we break out of the loop, print the acc value
    console.log(`acc = ${result}`);

};

rl.on('line', onReadLine).on('close', onFileEnd);