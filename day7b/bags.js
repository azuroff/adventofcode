const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: fs.createReadStream('day7b/input'),
    output: process.stdout,
    terminal: false
});

const rules = [];
const nodeMap = new Map();
let answer = 0;

class TreeNode {
    constructor(color) {
        this.color = color;
        this.children = [];
    }

    addChild(childQty, childColor) {
        this.children.push({
            qty: childQty,
            color: childColor
        });
    }

    bagsNeeded() {
        let total = 1;
        if (this.children.length > 0) {
            this.children.forEach((child) => {
                const qty = child.qty;
                const color = child.color;
                const node = findNode(color);
                if (node) {
                    total += qty * node.bagsNeeded();
                }
            });
        }

        return total;
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

const ruleRegex = /([a-z]+ [a-z]+) bags contain (\d+.*)/;
const childRegex = /(\d+) ([a-z]+ [a-z]+)/g;
const parseRule = ((rule) => {
    let m;
    let parentNode;

    m = ruleRegex.exec(rule);
    if (m) {
        const parentNodeColor = m[1];
        parentNode = findNode(parentNodeColor);

        const childrenStr = m[2];
        while ((m = childRegex.exec(childrenStr)) !== null) {
            const childQty = m[1];
            const childColor = m[2];
            parentNode.addChild(childQty, childColor);
        }
    }

});

const onReadLine = (line) => {
    rules.push(line);
};

const onFileEnd = () => {
    rules.forEach((rule) => {
        parseRule(rule);
    });

    const node = findNode('shiny gold');
    if (node) {
        const bagsNeeded = node.bagsNeeded() - 1;
        console.log(`${bagsNeeded} bags needed`);
    } else {
        console.log('not found!');
    }

};

rl.on('line', onReadLine).on('close', onFileEnd);