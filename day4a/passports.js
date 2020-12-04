const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day4a/input'),
    output: process.stdout,
    terminal: false
});

const passports = [];
let validPassports = 0;
let buffer = '';

const containsField = (passport, field) => {
    return passport.match(new RegExp(field)) !== null;
}

const isValidPassport = (passport) => {
    return containsField(passport, 'byr') &&
    containsField(passport, 'iyr') &&
    containsField(passport, 'eyr') &&
    containsField(passport, 'hgt') &&
    containsField(passport, 'hcl') &&
    containsField(passport, 'ecl') &&
    containsField(passport, 'pid');
};

const onReadLine = (line) => {
    buffer = buffer + line + ' ';
    if (line.length === 0) {
        passports.push(buffer);
        buffer = '';  
    }
};

const onFileEnd = () => {
    passports.push(buffer);
    passports.forEach((passport) => {
        if (isValidPassport(passport)) {
            validPassports++;
        }
    });

    console.log(`Valid passports: ${validPassports}`);
};


rl.on('line', onReadLine).on('close', onFileEnd);