class Node {
  constructor(data, leftChild = null, rightChild = null) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

export class Tree {
  constructor(array) {
    if (!Array.isArray(array)) {
      throw new TypeError("Invalid: expected an array as parameter");
    }

    // Removes duplicated values and sorts array
    this.array = this.sort(this.removeDuplicate(array));

    // Sets root value to be the return value of buildTree (which is a node)
    this.root = this.buildTree(this.array);
  }

  buildTree(array = this.array) {
    if (array.length === 0) {
      return null;
    }

    // Splits the array by half and sets the middle index to be the root node
    const middle = Math.floor(array.length / 2);
    const node = new Node(array[middle]);

    // Recursively splits and set middle elements to be the children and so forth
    node.leftChild = this.buildTree(array.slice(0, middle));
    node.rightChild = this.buildTree(array.slice(middle + 1));

    return node;
  }

  sort(array) {
    return array.sort((a, b) => {
      return a - b;
    });
  }

  removeDuplicate(array) {
    // Returns a new Set using the old array
    return [...new Set(array)];
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    // Function to print out tree nodes
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      this.prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      this.prettyPrint(
        node.leftChild,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  insert(value) {
    // if (this.hasValue(value)) {
    //   console.log("Invalid: value already exists.");
    //   return;
    // }

    let current = this.root;
    let previous;

    while (current) {
      if (value < current.data) {
        previous = current;
        current = current.leftChild;
      } else if (value > current.data) {
        previous = current;
        current = current.rightChild;
      } else if (value === current.data) {
        console.log("Cannot insert: value already exists.");
        return;
      }
    }

    current = new Node(value);

    if (value < previous.data) {
      previous.leftChild = current;
    } else if (value > previous.data) {
      previous.rightChild = current;
    }
  }

  deleteItem(value) {
    // if (!this.hasValue(value)) {
    //   console.log("Invalid: value does not exist.");
    //   return;
    // }

    let current = this.root;
    let previous;

    while (current) {
      if (value < current.data) {
        // console.log("Lower than", current.data);
        // If value is lower then iterates to the left side
        previous = current;
        current = current.leftChild;
      } else if (value > current.data) {
        // console.log("Higher than", current.data);
        // If value is higher then iterates to the right side
        previous = current;
        current = current.rightChild;
      } else if (value === current.data) {
        // console.log("Equals", current.data);
        if (current.leftChild === null && current.rightChild === null) {
          if (previous.leftChild) {
            previous.leftChild = null;
          } else if (previous.rightChild) {
            previous.rightChild = null;
          }
          current = null;
        } else if (current.leftChild && current.rightChild) {
          // Temporary value to iterate through all left children of the current's right child to find the smallest value
          let temp = current.rightChild;
          let previousTemp;

          while (temp.leftChild) {
            previousTemp = temp;
            temp = temp.leftChild;
          }

          current.data = temp.data;
          if (temp.rightChild) {
            // If the smallest value has a right child, copy it over to the previous node so as to not lose the node
            previousTemp.leftChild = temp.rightChild;
          } else {
            previousTemp.leftChild = null;
          }
        } else if (current.leftChild || current.rightChild) {
          // Case where node has one child
          if (current.leftChild && current.rightChild === null) {
            // Disconnects the current node by setting the previous node's child to the current node's child
            if (previous.leftChild.data === value) {
              previous.leftChild = current.leftChild;
            } else if (previous.rightChild.data === value) {
              previous.rightChild = current.leftChild;
            }
            current = null;
          } else if (current.leftChild === null && current.rightChild) {
            console.log(previous);
            if (previous.leftChild && previous.leftChild.data === value) {
              previous.leftChild = current.rightChild;
            } else if (
              previous.rightChild &&
              previous.rightChild.data === value
            ) {
              previous.rightChild = current.rightChild;
            }
            current = null;
          }
        }
      }
    }
  }

  //   hasValue(value) {
  //     const tempArray = this.array;
  //     tempArray.push(value);

  //     return new Set(tempArray).size !== tempArray.length;
  //   }

  find(value) {
    let current = this.root;
    while (current) {
      if (current.data < value) {
        current = current.rightChild;
      } else if (current.data > value) {
        current = current.leftChild;
      } else if (current.data === value) {
        return current;
      }
    }
    return "Value not present";
  }

  levelOrder(callback) {
    // Throw error is provided callback argument is not a function
    if (typeof callback !== "function") {
      throw new TypeError("Invalid: expected a callback function as parameter");
    }

    if (this.root === null) {
      return;
    }

    // Create a queue with the root node
    let queue = [this.root];

    // Enqueue and dequeue loop
    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);
      if (current.leftChild !== null) {
        queue.push(current.leftChild);
      }
      if (current.rightChild !== null) {
        queue.push(current.rightChild);
      }
      queue.pop;
    }
  }

  preOrder(callback, node) {
    // Throw error is provided callback argument is not a function
    if (typeof callback !== "function") {
      throw new TypeError("Invalid: expected a callback function as parameter");
    }

    if (node === null) {
      return;
    }

    // Execute callback with the current node
    callback(node);
    // Traverse the left subtree
    this.preOrder(callback, node.leftChild);
    // Traverse the right subtree
    this.preOrder(callback, node.rightChild);
  }

  inOrder(callback, node) {
    // Throw error is provided callback argument is not a function
    if (typeof callback !== "function") {
      throw new TypeError("Invalid: expected a callback function as parameter");
    }

    if (node === null) {
      return;
    }

    // Traverse the left subtree
    this.inOrder(callback, node.leftChild);
    // Execute callback with the current node
    callback(node);
    // Traverse the right subtree
    this.inOrder(callback, node.rightChild);
  }

  postOrder(callback, node) {
    // Throw error is provided callback argument is not a function
    if (typeof callback !== "function") {
      throw new TypeError("Invalid: expected a callback function as parameter");
    }

    if (node === null) {
      return;
    }

    // Traverse the left subtree
    this.postOrder(callback, node.leftChild);
    // Traverse the right subtree
    this.postOrder(callback, node.rightChild);
    // Execute callback with the current node
    callback(node);
  }

  height(node) {
    if (node === null) {
      return -1;
    }

    let left = this.height(node.leftChild);
    let right = this.height(node.rightChild);

    if (left > right) {
      return left + 1;
    } else {
      return right + 1;
    }
  }

  depth(node) {
    let current = this.root;
    let sum = 0;

    while (current) {
      if (node.data < current.data) {
        current = current.leftChild;
        sum++;
      } else if (node.data > current.data) {
        current = current.rightChild;
        sum++;
      } else {
        break;
      }
    }

    if (node.data === current.data) {
      return sum;
    } else {
      return "Value not found.";
    }
  }

  isBalanced() {
    const leftHeight = this.height(this.root.leftChild);
    const rightHeight = this.height(this.root.rightChild);
    const diff = leftHeight - rightHeight;

    if (diff >= -1 && diff <= 1) {
      return true;
    }
    return false;
  }

  rebalance() {
    const tempArray = [];
    this.inOrder((node) => {
      tempArray.push(node.data);
    }, this.root);
    this.root = this.buildTree(tempArray);
  }
}
