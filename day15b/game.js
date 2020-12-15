const turns = [2, 15, 0, 9, 1, 20];

const lastMentions = new Map();
for (let i = 0; i < turns.length - 1; i++) {
    lastMentions.set(turns[i], i + 1);
}

for (let turn = 1; turn <= 30000000; turn++) {
    let lastNumber = turns[turn - 1];
    let nextNumber = turns[turn] || 0;

    if (nextNumber === 0) {
        if (lastMentions.has(lastNumber)) {
            const lastMention = lastMentions.get(lastNumber);
            nextNumber = turn - lastMention;
        }    

        turns[turn] = nextNumber;
        lastMentions.set(lastNumber, turn);    
    }
}

console.log(`Last mention: ${turns[turns.length - 2]}`);