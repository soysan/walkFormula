
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.head = null;
    }

    push(data) {
        let temp = this.head;
        this.head = new Node(data);
        this.head.next = temp;
    }

    pop() {
        if (this.head.data === null) return null;
        let temp = this.head;
        this.head = this.head.next;
        return temp.data;
    }

    peek() {
        if (this.head === null) return null;
        return this.head.data;
    }
}

const opes = ["*", "/", "^", "+", "-"];

function walkFormula(str) {
    let operand = new Stack();
    let operator = new Stack();
    let temp = "";

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "(") operator.push(str[i]);

        else if (str[i] === ")") {
            if (temp.length !== 0) {
                operand.push(parseInt(temp));
                temp = ""
            }
            while (operator.peek() !== "(") {
                operand.push(calculate(operand, operator));
            }
            operator.pop();
        }

        else if (opes.indexOf(str[i]) === - 1) temp += str[i]; // accumulate the num to temp

        else if (operator.head === null) {
            operator.push(str[i]);
            if (temp.length !== 0) {
                operand.push(parseInt(temp));
                temp = "";
            }
        }

        else if (opes.indexOf(operator.peek()) > opes.indexOf(str[i])) {
            if (temp.length !== 0) {
                operand.push(parseInt(temp));
                temp = "";
            }
            operator.push(str[i]);
        }

        else {
            if (temp.length !== 0) {
                operand.push(parseInt(temp));
                temp = "";
            }
            if (isNaN(operand.peek())) operand.push(calculate(operand, operator));
            operator.push(str[i]);
        }
    }
    if (temp.length !== 0) operand.push(parseInt(temp)); // last num

    while (operator.peek() !== null) operand.push(calculate(operand, operator));

    return operand.peek();
}

function calculate(operand, operator) {
    let temp = 0;
    if (operator.peek() == "+") {
        operator.pop();
        return operand.pop() + operand.pop();
    }
    if (operator.peek() == "-") {
        operator.pop();
        temp = operand.pop();
        return operand.pop() - temp;
    }
    if (operator.peek() == "*") {
        operator.pop();
        return operand.pop() * operand.pop();
    }
    if (operator.peek() == "/") {
        operator.pop();
        temp = operand.pop();
        return operand.pop() / temp;
    }
    if (operator.peek() == "^") {
        operator.pop();
        temp = operand.pop();
        return operand.pop() ** temp;
    }
}

// node index.jsで実行。

console.log(walkFormula("22+24+(12+2)")) // 60
console.log(walkFormula("22+24+(12-2)+(3*4)")) // 68

// 課題 カッコが二回以上あると計算結果が変わる→operatorの優先度が怪しい
console.log(walkFormula("22+24+(12*2)*(3*4)+4/5")) // 334.8
// 課題 カッコ内に掛け算、割り算などがあると計算結果が違う。→優先度の変更。
console.log(walkFormula("22*24+45*54+(12*2+4)+52")) // 3038
