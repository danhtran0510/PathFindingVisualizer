export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const nextNodesStack = [];
    nextNodesStack.push(startNode);
    while (nextNodesStack.length) {
        const currentNode = nextNodesStack.pop();
        if (currentNode === finishNode) {
            return visitedNodesInOrder;
        }
        if (!currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) {
            currentNode.isVisited = true;
            visitedNodesInOrder.push(currentNode);
            const {column, row} = currentNode;
            let nextNode;
            if (row > 0) {
                nextNode = grid[row - 1][column];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
            if (row < grid.length - 1) {
                nextNode = grid[row + 1][column];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
            if (column > 0) {
                nextNode = grid[row][column - 1];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
            if (column < grid[0].length - 1) {
                nextNode = grid[row][column + 1];
                if (!nextNode.isVisited) {
                    nextNode.previousNode = currentNode;
                    nextNodesStack.push(nextNode);
                }
            }
        }
    }
    return visitedNodesInOrder;
}