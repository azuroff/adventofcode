const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day4b/input'),
    output: process.stdout,
    terminal: false
});

const passports = [];
let validPassports = 0;
let buffer = '';

const isValidYear = (passport, validationRegex, minYear, maxYear) => {
    const match = validationRegex.exec(passport);
    if (match) {
        const year = parseInt(match[1]);
        return year >= minYear && year <= maxYear;
    } else {
        return false;
    }
}

const birthYearRegex = /byr:(\d{4}) /;
const isValidBirthYear = (passport) => {
    const isValid = isValidYear(passport, birthYearRegex, 1920, 2002);
    console.log(`\tbirthYear: ${isValid}`);
    return isValid;
};

const issueYearRegex = /iyr:(\d{4}) /;
const isValidIssueYear = (passport) => {
    const isValid = isValidYear(passport, issueYearRegex, 2010, 2020);
    console.log(`\tissueYear: ${isValid}`);
    return isValid;
};

const expirationYearRegex = /eyr:(\d{4}) /;
const isValidExpirationYear = (passport) => {
    const isValid = isValidYear(passport, expirationYearRegex, 2020, 2030);
    console.log(`\texpirationYear: ${isValid}`);
    return isValid;
};

const heightRegex = /hgt:(\d{2,3})(in|cm) /;
const isValidHeight = (passport) => {
    let isValid = false;
    const match = heightRegex.exec(passport);
    if (match) {
        const height = parseInt(match[1]);
        const measurement = match[2];
        if (measurement === 'cm') {
            isValid = height >= 150 && height <= 193;
        } else if (measurement === 'in') {
            isValid = height >= 59 && height <= 76;
        }
    }

    console.log(`\theight: ${isValid}`);
    return isValid;
}

const hairColorRegex = /hcl:#([0-9a-f]{6}) /;
const isValidHairColor = (passport) => {
    const isValid = hairColorRegex.test(passport);
    console.log(`\thairColor: ${isValid}`);
    return isValid;
};

const eyeColorRegex = /ecl:(amb|blu|brn|gry|grn|hzl|oth)/;
const isValidEyeColor = (passport) => {
    const isValid = eyeColorRegex.test(passport);
    console.log(`\teyeColor: ${isValid}`);
    return isValid;
};

const passportIdRegex = /pid:\d{9} /;
const isValidPassportId = (passport) => {
    const isValid = passportIdRegex.test(passport);
    console.log(`\tpassportId: ${isValid}`);
    return isValid;
};

const isValidPassport = (passport) => {
    return isValidBirthYear(passport) &&
    isValidIssueYear(passport) &&
    isValidExpirationYear(passport) &&
    isValidHeight(passport) &&
    isValidHairColor(passport) &&
    isValidEyeColor(passport) &&
    isValidPassportId(passport);
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
        console.log('==========================');
        console.log(passport);
        if (isValidPassport(passport)) {
            validPassports++;
        }
    });

    console.log(`Valid passports: ${validPassports}`);
};


rl.on('line', onReadLine).on('close', onFileEnd);