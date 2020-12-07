import { Node } from "./node.js";

export class Stack {
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
