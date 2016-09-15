//const MaxHeap = require('./max-heap.js');
//
//class PriorityQueue {
//
//    constructor(maxSize) {
//        if (maxSize != null) {
//            this.maxSize = maxSize;
//            this.heap = new MaxHeap;
//            let sizeOfQueue = 0;
//        } else {
//            this.maxSize = 30;
//            this.heap = new MaxHeap;
//            let sizeOfQueue = 0;
//        }
//    }
//
//    push(data, priority) {
//        if (this.size() == this.maxSize) {
//            throw new Error("Queue has max size");
//        } else {
//            this.heap.push(data, priority);
//        }
//    }
//
//    shift() {
//
//    }
//
//    size() {
//        //if push was called size++
//        //if shift was called size --;
//    }
//
//    isEmpty() {
//
//    }
//}
//
//module.exports = PriorityQueue;


const MaxHeap = require('./max-heap.js');

class PriorityQueue {
    constructor(maxSize) {
        this.maxSize = maxSize || 30;
        this.heap = new MaxHeap();
    }

    push(data, priority) {
        if (this.heap.size() >= this.maxSize) {
            throw 'Max size exceeded';
        }

        this.heap.push(data, priority);
    }

    shift() {
        if (this.isEmpty()) {
            throw 'Queue is empty';
        }

        return this.heap.pop();
    }

    size() {
        return this.heap.size();
    }

    isEmpty() {
        return this.heap.isEmpty();
    }
}

module.exports = PriorityQueue;