// class to create nodes
class Node {
  constructor(value, nextNode) {
    this.value = value;
    this.nextNode = nextNode;
  };
};

// Linked lists
export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = null;
  };

  // adds a node to the tail of the list
  append(value) {
    const newNode = new Node();
    newNode.value = value;

    // if there is a node in "this.tail"
    // assign the "old node.nextNode" to "newNode"
    if (this.tail !== null) {
      this.tail.nextNode = newNode;
    }

    if (this.head === null) {
      this.head = newNode;
    }
    
    this.size++;
    this.tail = newNode;
  };
  
  // adds a node to the head of the list
  prepend(value) {
    // leaving the arguments for "new Node()"
    // empty because we want the properties
    // to be null
    const newNode = new Node();
    // then we explicitly assign "value" to it
    newNode.value = value;

    // if there is a node in "this.head"
    // assign "this.head" to "newNode.nextNode"
    if (this.head !== null) {
      newNode.nextNode = this.head;
    };

    // if there isn't "this.tail" (no nodes at the list)
    // then "this.head" will also be "this.tail"
    if (this.tail === null) {
      this.tail = newNode;
    }
    
    this.size++;
    // assign the new node to head
    this.head = newNode;
  };

  getSize() {
    return `List size is: ${this.size}`;
  };

  getHead() {
    return `List head is: ${JSON.stringify(this.head)}`
  };

  getTail() {
    return `List tail is: ${JSON.stringify(this.tail)}`;
  };

  at(index) {
    let number = 0;

    // if there's no head
    if (this.head === null) { return };

    const size = this.size;

    // it will recursively run until it finds
    // a "number" that equals to the "index" input
    function recursive (node) {
      
      let currentNode = node;
      if(index === number) { 
        return currentNode;
       } else if(index <= size) { // if "index" is smaller than the list "size"
        number++;
        currentNode = node.nextNode;
        return recursive(currentNode);
      } else { // if "index" is bigger than the list "size"
        return;
      }
    };

    return recursive(this.head);
  };

  // removes the last element from the list
  pop() {
    const a = this.tail; // last node
    const b = list.size - 2 // index of the node behind last node
    const nodeBehindTail = this.at(b);// the node behind last node

    a.value = null; // "popping" last node
    nodeBehindTail.nextNode = undefined;
    this.tail = nodeBehindTail; // new last node
    this.size--; // decrease list size
  };

  contains(value) { // returns true if value is found in the list
    let result;
    for (let i = 0; i < this.size; i++) {
      // this.at(index) returns a node and if that node.value
      // equals contains(value) then we have a truthy response
      this.at(i).value === value 
      ? result = this.at(i).value === value
      : result = this.at(i).value === value;
    };
    return result;
  };

  find(value) { // returns the index of the node containing value if found
    let result;
    for (let i = 0; i < this.size; i++) {
      // this.at(index) returns a node and if that node.value
      // equals find(value) then we print the index of that node
      this.at(i).value === value 
      ? result = i
      : result = null;
    };
    return result;
  }
 
  toString() { // represents your LinkedList objects as strings
    let result = `( ${this.head.value} ) ->`;
    const size = this.size;
    for (let i = 0; i < this.size; i++) {
      
      if (this.at(i).nextNode) { 
        result += ` ( ${this.at(i).nextNode.value} ) ->`;
       } else {
        result += ` ${null}`
       }
    }
    return result;
    /* if you try running this with nothing in your list the program will break */
  };

  insertAt(value, index) {
    // node creation process
    const newNode = new Node();
    newNode.value = value;
    
    if (index === 0) { // if index is the head
      newNode.nextNode = this.head;
      this.head = newNode;
      
      // list gets bigger
      this.size++
    } else {
      // insertion process
      const oldNode = this.at(index); // node at given index
      const behindOldNode = this.at(index - 1); // node behind the old node
      newNode.nextNode = oldNode; // pushed old node in front of new node
      behindOldNode.nextNode = newNode; // this line inserts the newNode in the desired index
      // list gets bigger
      this.size++
    }

  };

  removeAt(index) {
    if (index === 0) { // if index is the head
      // we, then, need to assign the head to the next node
      const newNode = this.at(index + 1);
      this.head = newNode;
      this.size--;
    } else if (index === this.size - 1) { // if index is the tail
      // we, then, need to assign the tail to the last node
      this.at(index - 1).nextNode = undefined;
      const newNode = this.at(index - 1);
      this.tail = newNode;
      this.size--;
    } else {
      this.at(index - 1).nextNode = this.at(index + 1);
      this.size--;
    }
  };
};