import { LinkedList } from "./lib.js";

class Bucket {
  constructor(list) {
    this.list = list;
  }
}

class HashMap {
  // hash map
  constructor() {
    this.loadFactor = 0.8; // to be multiplied with capacity
    this.capacity = 16; // list of buckets "length"
    this.buckets = []; // list of buckets
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let char of key) {
      // for (let char = 0; char < key.length; char++); --> key.charCodeAt(char);
      hashCode = primeNumber * hashCode + char.charCodeAt(0);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    // creates a new bucket for a new key-value pair
    let node = { key, value };
    let list = new LinkedList();
    // if entries exceed the calculation, double buckets array size
    if (Math.ceil(this.loadFactor * this.capacity) <= this.keys().length) {
      this.capacity = this.capacity * 2;
    }

    // different keys for the same hash collision
    const hCollision = this.buckets.find(
      (bkt) =>
        this.hash(bkt.list.head.value.key) === this.hash(key) &&
        bkt.list.head.value.key !== key
    );
    // same keys, same hash codes and with or without same values
    const kCollision = this.buckets.find(
      (bkt) => bkt.list.head.value.key === key
    );

    if (hCollision) {
      // add the new node to the tail of the linked list
      hCollision.list.append(node);
    } else if (kCollision) {
      // assign the new value to the old value, keys stay untouched
      kCollision.list.head.value.value = value;
    } else {
      // else, just add a new linked list to the bucket
      list.append(node);
      this.buckets.push(new Bucket(list));
    }
  }

  get(key) {
    // gets a value of a given key
    const bucket = this.buckets.find((bkt) => bkt.list.getNode(key));
    const currentKey = bucket.list.getNode(key).find((x) => x.key === key);
    return currentKey.value;
  }

  has(key) {
    // returns true if the key exists in the hashMap
    const bucket = this.buckets.find((bkt) => bkt.list.getNode(key));
    const condition = bucket.list.getNode(key).some((x) => x.key === key);

    return condition;
  }

  remove(key) {
    // if the given key is in the hash map, it should remove the entry with that key and return true, otherwise return false
    const currentBkt = this.buckets.find((bkt) => bkt.list.getNode(key));

    if (currentBkt.list.getSize() === 1) {
      // if there is ONLY ONE node inside of the list delete the BUCKET
      const index = this.buckets.indexOf(currentBkt);
      this.buckets.splice(index, 1);
      return true;
    } else if (currentBkt.list.getSize() > 1) {
      // if there is MORE THAN ONE node inside of the list delete the NODE
      const value = currentBkt.list.getNode(key);
      const index = currentBkt.list.find(value[0]);
      currentBkt.list.removeAt(index);
      return true;
    } else {
      return false;
    }
  }

  values() {
    // returns an array containing all the values.
    let result = [];
    for (let i = 0; i < this.buckets.length; i++) {
      result.push(...this.buckets[i].list.toValue()); // --> return an array of VALUES
    } // so we need to spread it inside the result array
    return result;
  }

  length() {
    // returns the number of stored keys in the hash map
    return this.keys().length;
  }

  clear() {
    // removes all entries in the hash map
    const allKeys = this.keys();
    for (let i = 0; i < allKeys.length; i++) {
      this.remove(allKeys[i]); // call this.remove() to all keys
    }
    return `Removed: ${allKeys}`;
  }

  keys() {
    // returns the number of stored keys in the hash map.
    let result = [];
    for (let i = 0; i < this.buckets.length; i++) {
      result.push(...this.buckets[i].list.toKey()); // --> return an array of KEYS
    } // so we need to spread it inside the result array
    return result;
  }

  entries() {
    // returns an array that contains each key, value pair
    let result = [];
    for (let i = 0; i < this.buckets.length; i++) {
      result.push(this.buckets[i].list.toEntry());
    }
    return result;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("apple", "green");

console.log(test.get("banana"));
