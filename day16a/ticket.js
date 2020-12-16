const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day16a/input'),
    output: process.stdout,
    terminal: false
});

const validValues = new Set();
const fieldRegex = /(?<field>[a-z ]+): (?<start1>\d+)-(?<end1>\d+) or (?<start2>\d+)-(?<end2>\d+)/;
const nearbyTickets = [];

let yourTicket = [];
let isYourTicket = false;
let isNearbyTicket = false;

const extractValidValues = (line) => {
    const m = fieldRegex.exec(line);

    for (let i = parseInt(m.groups.start1); i <= parseInt(m.groups.end1); i++) {
        validValues.add(i);
    }

    for (let i = parseInt(m.groups.start2); i <= parseInt(m.groups.end2); i++) {
        validValues.add(i);
    }
}

const validateTicket = (ticket) => {
    let invalidValues = 0;

    ticket.forEach((number) => {
        const n = parseInt(number);
        if (!validValues.has(parseInt(n))) {
            invalidValues += n;
        }
    });

    return invalidValues;
}

const onReadLine = (line) => {
    if (line.match(fieldRegex)) {
        extractValidValues(line);
    } else if (line === 'your ticket:') {
        isYourTicket = true;
    } else if (line === 'nearby tickets:') {
        isNearbyTicket = true;
        isYourTicket = false;
    } else if (isYourTicket) {
        yourTicket = line.split(',');
    } else if (isNearbyTicket) {
        nearbyTickets.push(line.split(','));
    }
};

const onFileEnd = () => {
    let answer = 0;

    nearbyTickets.forEach((ticket) => {
        answer += validateTicket(ticket);
    });

    console.log(`Answer: ${answer}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);