# Binary-search-tree

Binary search tree exercise.

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

A convoluted challenge I faced in this project was the deleteItem(value) function. In a binary search tree, deleting values aren't very straightforward but instead come with several cases one has to check - one such being whether a particular node you want to remove has children or not. Deleting a non-leaf node involves considering how its children will be rearranged.

The delete function becomes a mini-colossus after a while with all the different while-if statements to check for cases, however code-commenting and debugging on the other hand is quite straightforward and self-evident in the while-if statements.

At one point, I had written a hasValue(value) help function that checks for whether the array that is used to build the tree already contains a certain value. Afterwards through some consideration I then realized that the function has a time complexity of O(N) due to the way it iterates through the original array to check for existing values. This wasn't really a difficult fix, but just something to keep in mind for the future in consideration of performance. At the end I only had to alter some while-loops that were already present in other functions to check also for the values that are sent in as parameters, since those functions already iterate through the binary search tree which has a time complexity of O(log N) which is faster than doing it with an array.

Another challenge I faced in this assignment was the height(node) function that takes in a node and returns the largest number of edges from that node to a leaf node. Initially it sounded simple to implement, but I couldn't really make up a pseudocode for it and thus found some help from an old thread on StackOverflow with this very useful answer and implementation, with a video someone had included explaining the theory behind the function code.
[StackOverflow answer](https://stackoverflow.com/a/2597754/27288474)
[YouTube Video](https://youtu.be/AWIJwNf0ZQE)
The idea is to recursively iterate down every path until the final leaf node, then pick the side with the larger amount of edges and sum them as the recursive code comes back up.

## Notes

In the current implementation, the program logs the tree visualization from the prettyPrint() function right into the command line, but it's totally feasible to add some quick interface with HTML and CSS.
