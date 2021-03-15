export function dijkstra(grid, startNode, finishNode) {
    const unvisitedNodes = getAllNodes(grid);
    let visitedNodesInOrder = [];
    startNode.distance = 0;
    while (unvisitedNodes.length) {
        sortNodeByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode.isWall) {
            continue;
        }
        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) {
            return visitedNodesInOrder;
        }
        updateUnvisitedNeighborNodes(closestNode, grid);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodeByDistance(unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighborNodes(currentNode, grid) {
    const unvisitedNeighborNodes = getUnvisitedNeighborNodes(currentNode, grid);
    for (const neighborNode of unvisitedNeighborNodes) {
        neighborNode.distance = currentNode.distance + 1;
        neighborNode.previousNode = currentNode;
    }
}

function getUnvisitedNeighborNodes(currentNode, grid) {
    const neighbors = [];
    const {row, column} = currentNode;
    if (row > 0) {
        neighbors.push(grid[row - 1][column]);
    }
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][column]);
    }
    if (column > 0) {
        neighbors.push(grid[row][column - 1]);
    }
    if (column < grid[0].length - 1) {
        neighbors.push(grid[row][column + 1]);
    }
    return neighbors.filter(node => !node.isVisited);
}
