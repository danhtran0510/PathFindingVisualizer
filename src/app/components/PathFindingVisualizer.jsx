import React, { Component } from "react";
import './PathFindingVisualizer.css';
import NavBar from "./navbar/NavBar";
import Node from "./node/Node";
import { dijkstra } from "../algorithms/dijkstra";
import { aStar } from "../algorithms/astar";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";

export default class PathFindingVisualizer extends Component {

    NUMBER_OF_ROW = 25;
    NUMBER_OF_COLUMN = 60;

    constructor() {
        super();
        this.state = {
            grid: [],
            mousePressed: false,
            currentElement: '',
            isRunning: false,
            START_NODE_ROW: 10,
            START_NODE_COLUMN: 10,
            FINISH_NODE_ROW: 10,
            FINISH_NODE_COLUMN: 45,
            isStartNode: false,
            isFinishNode: false,
            currentRow: 0,
            currentColumn: 0
        };

        this.handleOnMouseDown = this.handleOnMouseDown.bind(this);
        this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
        this.handleOnMouseUp = this.handleOnMouseUp.bind(this);
    }

    componentDidMount() {
        const grid = this.initGrid(this.NUMBER_OF_ROW, this.NUMBER_OF_COLUMN);
        this.setState({grid});
    }

    toggleRunning = () => {
        this.setState({isRunning: !this.state.isRunning});
    }

    onClickFind = (algorithm, speed) => {
        if (!algorithm) {
            alert('Please choose an algorithm');
        } else {
            this.visualize(algorithm);
        }
    }

    onClickClearBoard = () => {
        const newGrid = this.initGrid(this.NUMBER_OF_ROW, this.NUMBER_OF_COLUMN);
        for (let row = 0; row < newGrid.length; row++) {
            for (let column = 0; column < newGrid[row].length; column++) {
                let nodeId = document.getElementById(`node-${row}-${column}`);
                nodeId.classList.remove('node-visited');
                nodeId.classList.remove('node-shortest-path');
            }
        }
        this.setState({grid: newGrid});
    }

    handleOnMouseDown(row, col) {
        if (!this.state.isRunning) {
            if (this.isGridPristine()) {
                let node = document.getElementById(`node-${row}-${col}`);
                if (node.className === 'node node-start') {
                    this.setState({
                        mousePressed: true,
                        isStartNode: true,
                        currentColumn: col,
                        currentRow: row
                    });
                } else if (node.className === 'node node-finish') {
                    this.setState({
                        mousePressed: true,
                        isFinishNode: true,
                        currentColumn: col,
                        currentRow: row
                    });
                } else {
                    const newGrid = this.toggleWall(this.state.grid, row, col);
                    this.setState({grid: newGrid, mousePressed: true});
                }
            } else {
                this.onClickClearBoard();
            }
        }
    }

    handleOnMouseUp() {
        if (!this.state.isRunning) {
            this.setState({mousePressed: false});
            if (this.state.isStartNode) {
                this.setState({
                    isStartNode: !this.state.isStartNode
                });
            } else if (this.state.isFinishNode) {
                this.setState({
                    isFinishNode: !this.state.isFinishNode
                });
            }
        }
    }

    handleOnMouseEnter(row, col) {
        if (!this.state.mousePressed) {
            return;
        }
        if (!this.state.isRunning) {
            let node = document.getElementById(`node-${row}-${col}`);
            if (this.state.isStartNode) {
                if (node.className !== 'node node-wall') {
                    // remove previous start node
                    const previousStartNode = this.state.grid[this.state.currentRow][this.state.currentColumn];
                    previousStartNode.isStart = false;
                    document.getElementById(`node-${this.state.currentRow}-${this.state.currentColumn}`).className = 'node';
                    // add current start node
                    this.setState({currentColumn: col, currentRow: row});
                    const currentStartNode = this.state.grid[row][col];
                    currentStartNode.isStart = true;
                    document.getElementById(`node-${row}-${col}`).className = 'node node-start';
                }
                this.setState({START_NODE_ROW: row, START_NODE_COLUMN: col});
            } else if (this.state.isFinishNode) {
                if (node.className !== 'node node-wall') {
                    // remove previous finish node
                    const previousFinishNode = this.state.grid[this.state.currentRow][this.state.currentColumn];
                    previousFinishNode.isFinish = false;
                    document.getElementById(`node-${this.state.currentRow}-${this.state.currentColumn}`).className = 'node';
                    // add current finish node
                    this.setState({currentColumn: col, currentRow: row});
                    const currentFinishNode = this.state.grid[row][col];
                    currentFinishNode.isFinish = true;
                    document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
                }
                this.setState({FINISH_NODE_ROW: row, FINISH_NODE_COLUMN: col});
            } else {
                const newGrid = this.toggleWall(this.state.grid, row, col);
                this.setState({grid: newGrid});
            }
        }
    }

    visualize = (algorithm) => {
        if (!this.state.isRunning) {
            this.toggleRunning();
            const {grid} = this.state;
            const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COLUMN];
            const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COLUMN];
            let visitedNodesInOrder;
            if (algorithm === 'dijkstra') {
                visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
            } else if (algorithm === 'aStar') {
                visitedNodesInOrder = aStar(grid, startNode, finishNode);
            } else if (algorithm === 'bfs') {
                visitedNodesInOrder = bfs(grid, startNode, finishNode);
            } else if (algorithm === 'dfs') {
                visitedNodesInOrder = dfs(grid, startNode, finishNode);
            }
            const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
            this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
        }
    }

    animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    this.animateShortestPath(nodesInShortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-visited');
            }, 10 * i);
        }
    }

    animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.column}`).classList.add('node-shortest-path');
                if (i === nodesInShortestPathOrder.length - 1) {
                    this.toggleRunning();
                }
            }, 50 * i);
        }
    }

    initGrid = (row, column) => {
        const grid = [];
        for (let i = 0; i < row; i++) {
            let currentRow = [];
            for (let j = 0; j < column; j++) {
                currentRow.push(this.createNode(i, j));
            }
            grid.push(currentRow);
        }
        return grid;
    }
    
    createNode = (row, column) => {
        return {
            row,
            column,
            isStart: row === this.state.START_NODE_ROW && column === this.state.START_NODE_COLUMN,
            isFinish: row === this.state.FINISH_NODE_ROW && column === this.state.FINISH_NODE_COLUMN,
            isWall: false,
            distance: Infinity,
            distanceToFinishNode: Math.abs(this.state.FINISH_NODE_ROW - row) + Math.abs(this.state.FINISH_NODE_COLUMN - column),
            isVisited: false,
            previousNode: null
        }
    }

    toggleWall = (grid, row, column) => {
        const newGrid = grid.slice();
        const currentNode = newGrid[row][column];
        const newNode = {
            ...currentNode,
            isWall: !currentNode.isWall
        }
        newGrid[row][column] = newNode;
        return newGrid;
    }

    isGridPristine() {
        for (const row of this.state.grid) {
            for (const node  of row) {
                const currentNode = document.getElementById(`node-${node.row}-${node.column}`);
                if (currentNode.className === 'node node-visited' || currentNode.className === 'node node-shortest-path') {
                    return false;
                }
            }
        }
        return true;
    }

    render() {
        const { grid } = this.state;
        return (
            <React.Fragment>
                <NavBar
                    disableButton={this.state.isRunning}
                    onClickFind={this.onClickFind}
                    onClickClearBoard={this.onClickClearBoard}
                ></NavBar>
                <div className="grid">
                    { grid.map((row, rowID) => {
                        return (
                            <div className="grid-row" key = {rowID}>
                                { row.map((node, nodeID) => {
                                    const { row, column, isStart, isFinish, isWall } = node;
                                    return (
                                        <Node
                                            key = {nodeID}
                                            row = {row}
                                            column = {column}
                                            isStart = {isStart}
                                            isFinish = {isFinish}
                                            isWall = {isWall}
                                            onMouseDown = {(row, col) => this.handleOnMouseDown(row, col)}
                                            onMouseUp = {() => this.handleOnMouseUp()}
                                            onMouseEnter = {(row, col) => this.handleOnMouseEnter(row, col)}
                                        ></Node>
                                    )
                                })}
                            </div>
                        )
                    }) }
                </div>
            </React.Fragment>
        )
    }
}

function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while(currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
