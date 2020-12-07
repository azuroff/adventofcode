const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day7a/input'),
    output: process.stdout,
    terminal: false
});

const rules = [];
const nodeMap = new Map();
let answer = 0;

class TreeNode {
    constructor(value) {
        this.value = value;
        this.parents = [];
    }
};

const findNode = (color) => {
    let node;
    if (nodeMap.has(color)) {
        node = nodeMap.get(color);
    } else {
        node = new TreeNode(color);
        nodeMap.set(color, node);
    }
    return node;
}

const ruleRegex = /([a-z]+ [a-z]+) bag/g;
const parseRule = ((rule) => {
    let m;
    let parentNode;

    while ((m = ruleRegex.exec(rule)) !== null) {

        // The color will always be found in match group 1.
        const color = m[1];

        // The node value will always be at match index 1, because the color is always the
        // very first string in the rule.
        if (m.index === 0) {
            parentNode = findNode(color);
        } else {
            if (color != 'no other') {
                // Otherwise, it will be one of the descendent bags
                let childNode = findNode(color);
                childNode.parents.push(parentNode);
            }
        }
    }
});

const getAllParents = (color) => {
    let allParents = [];
    const node = findNode(color);

    if (node && node.parents.length > 0) {
        node.parents.forEach((parent) => {
            allParents.push(parent.value);
            const grandparents = getAllParents(parent.value);
            if (grandparents.length && grandparents.length > 0) {
                grandparents.forEach((grandparent) => {
                    allParents.push(grandparent);
                })
            }
        });
    }

    return allParents;
};

const onReadLine = (line) => {
    rules.push(line);
};

const onFileEnd = () => {
    rules.forEach((rule) => {
        parseRule(rule);
    });

    let containingColors = new Set();
    getAllParents('shiny gold').forEach((parent) => {
        containingColors.add(parent);
    });

    console.log(`answer: ${containingColors.size}`);
};

rl.on('line', onReadLine).on('close', onFileEnd);