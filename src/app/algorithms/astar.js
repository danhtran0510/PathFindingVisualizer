export function aStar(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length) {
      sortByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (!closestNode.isWall) {
        if (closestNode.distance === Infinity) {
            return visitedNodesInOrder;
        }
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) {
            return visitedNodesInOrder;
        } 
        updateUnvisitedNeighbors(closestNode, grid);
      }
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

function sortByDistance(unvisitedNodes) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(currentNode, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = currentNode.distance + 1 + neighbor.distanceToFinishNode;
        neighbor.previousNode = currentNode;
    }
}

function getUnvisitedNeighbors(currentNode, grid) {
    const neighbors = [];
    const {column, row} = currentNode;
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