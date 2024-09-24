# Binary-search-tree

Binary search tree exercise.
![alt text](<Code_main.js — odin-binary-search-tree_0924_gbIkE1MR.gif>)

## Links

[Assignment Link](https://www.theodinproject.com/lessons/javascript-binary-search-trees#introduction)

## Features

- Initialize nodes and see the tree's visualization
- Insert nodes
- Rebalance tree
- Print values in level-order, pre-order, in-order, and post-order
<!-- - Designed to mimic the appearance of a shrub -->

## Summary

The project is primarily focused on the JavaScript logic of creating a binary search tree.

## Challenges

A convoluted challenge encountered in this project was the deleteItem(value) function. In a binary search tree, deleting values isn't very straightforward and comes with several cases that need to be checked—one such case being whether a particular node to be removed has children. Deleting a non-leaf node involves considering how its children will be rearranged.

The delete function becomes a mini-colossus over time with all the different while-if statements to check for cases; however, code-commenting and debugging are quite straightforward and self-evident in the while-if statements.

At one point, a hasValue(value) helper function was written to check whether the array used to build the tree already contains a certain value. After some consideration, it was realized that the function has a time complexity of O(N) due to the way it iterates through the original array to check for existing values. This wasn't a difficult fix, but it is something to keep in mind for future performance considerations. Ultimately, only some while-loops that were already present in other functions needed to be altered to also check for the values sent in as parameters, since those functions already iterate through the binary search tree, which has a time complexity of O(log N), faster than doing it with an array.

Another challenge in this assignment was the height(node) function that takes in a node and returns the largest number of edges from that node to a leaf node. Initially, it sounded simple to implement, but creating pseudocode for it proved difficult. Assistance was found in an old thread on StackOverflow, which included a very useful answer and implementation, along with a video explaining the theory behind the function code.

[StackOverflow answer](https://stackoverflow.com/a/2597754/27288474)
[YouTube Video](https://youtu.be/AWIJwNf0ZQE)

The idea is to recursively iterate down every path until the final leaf node, then pick the side with the larger amount of edges and sum them as the recursive code comes back up.

## Notes

In the current implementation, the program logs the tree visualization from the prettyPrint() function right into the command line, but it's totally feasible to add some quick interface with HTML and CSS.
