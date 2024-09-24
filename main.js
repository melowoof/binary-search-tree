import { Tree } from "./binarySearchTree.js";

// const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const tree = new Tree(array);
// tree.prettyPrint(tree.root);

driverScript();

function driverScript() {
  const array = randomNumbersArray(40, 1, 99);
  const tree = new Tree(array);
  console.log("Is tree balanced:", tree.isBalanced());
  tree.prettyPrint(tree.root);

  tree.levelOrder((node) => {
    console.log("Level order", node.data);
  });
  tree.preOrder((node) => {
    console.log("Pre order", node.data);
  }, tree.root);
  tree.inOrder((node) => {
    console.log("In order", node.data);
  }, tree.root);
  tree.postOrder((node) => {
    console.log("Post order", node.data);
  }, tree.root);

  const arrayABoveHundred = randomNumbersArray(40, 101, 199);
  for (let i = 0; i < arrayABoveHundred.length; i++) {
    tree.insert(arrayABoveHundred[i]);
  }

  console.log("Is tree balanced:", tree.isBalanced());
  tree.prettyPrint(tree.root);

  tree.rebalance();
  console.log("Is tree balanced:", tree.isBalanced());
  tree.prettyPrint(tree.root);

  tree.levelOrder((node) => {
    console.log("Level order", node.data);
  });
  tree.preOrder((node) => {
    console.log("Pre order", node.data);
  }, tree.root);
  tree.inOrder((node) => {
    console.log("In order", node.data);
  }, tree.root);
  tree.postOrder((node) => {
    console.log("Post order", node.data);
  }, tree.root);
}

function randomNumbersArray(amount, min, max) {
  const array = [];
  for (let i = 0; i < amount; i++) {
    array.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return array;
}
