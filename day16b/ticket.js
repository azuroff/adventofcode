const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day16a/input'),
    output: process.stdout,
    terminal: false
});

const fields = new Map();
const allValidValues = new Set();
const fieldRegex = /(?<field>[a-z ]+): (?<start1>\d+)-(?<end1>\d+) or (?<start2>\d+)-(?<end2>\d+)/;
const nearbyTickets = [];
const validTickets = [];

let yourTicket;
let isYourTicket = false;
let isNearbyTicket = false;

const extractValidValues = (line) => {
    const m = fieldRegex.exec(line);
    const validValues = new Set();

    const fieldName = m.groups.field;
    for (let i = parseInt(m.groups.start1); i <= parseInt(m.groups.end1); i++) {
        validValues.add(i);
        allValidValues.add(i);
    }

    for (let i = parseInt(m.groups.start2); i <= parseInt(m.groups.end2); i++) {
        validValues.add(i);
        allValidValues.add(i);
    }

    fields.set(fieldName, validValues);
}

const isValidTicket = (ticket) => {
    let isValidTicket = true;

    ticket.forEach((number) => {
        if (!allValidValues.has(number)) {
            isValidTicket = false;
        }
    });

    return isValidTicket;
}

const parseTicket = (ticket) => {
    let t = [];
    ticket.split(',').forEach((number) => t.push(parseInt(number)));
    return t;
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
        yourTicket = parseTicket(line);
        isYourTicket = false;
    } else if (isNearbyTicket) {
        nearbyTickets.push(parseTicket(line));
    }
};

const onFileEnd = () => {
    let answer = 1;

    // Eliminate invalid tickets
    nearbyTickets.forEach((ticket) => {
        if (isValidTicket(ticket)) {
            validTickets.push(ticket);
        }
    });

    // Figure out the possible position of each field
    const possibleFields = new Map();
    const numFields = fields.size;
    for (let position = 0; position < numFields; position++) {
        possibleFields.set(position, []);
        fields.forEach((validFieldValues, fieldName) => {
            let fieldInLocation = true;
            validTickets.forEach((ticket) => {
                const ticketValue = ticket[position];
                fieldInLocation = fieldInLocation && validFieldValues.has(ticketValue);
            });
            if (fieldInLocation) {
                possibleFields.get(position).push(fieldName);
            }
        });            
    }

    // Figure out the actual position of each field by a process of elimination
    const actualFields = new Map(); // key = fieldName, value = position
    for (let position = 0; position < numFields; position++) {
        possibleFields.forEach((v, k) => {
            if (v.length == position + 1) {
                let newFields = v.filter(fieldName => {
                    return !actualFields.has(fieldName)
                });

                actualFields.set(newFields[0], k);
                possibleFields.delete(k);
            }
        });
    }

    actualFields.forEach((v, k) => {
        if (k.startsWith('departure')) {
            answer *= yourTicket[v];
        }
    });

    console.log(`Answer: ${answer}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);