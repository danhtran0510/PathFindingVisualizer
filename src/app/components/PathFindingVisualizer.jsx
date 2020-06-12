import React, { Component } from "react";
import ReactDOM from 'react-dom'
import './PathFindingVisualizer.css';
import NavBar from "./navbar/NavBar";
import Node from "./node/Node";

export default class PathFindingVisualizer extends Component {

    NUMBER_OF_ROW = 30;
    NUMBER_OF_COLUMN = 60;
    START_NODE_ROW = 15;
    START_NODE_COLUMN = 10;
    FINISH_NODE_ROW = 15;
    FINISH_NODE_COLUMN = 50;

    constructor() {
        super();

        this.state = {
            grid: [],
            mousePressed: false
        };
    }

    componentDidMount() {
        const grid = this.initGrid(this.NUMBER_OF_ROW, this.NUMBER_OF_COLUMN);
        this.setState({grid});
    }

    onClickFind(algrorithm, speed) {
        console.log(algrorithm, speed);
    }

    onClickClearBoard() {
        // TODO: find out more about this error
        // const newGrid = this.initGrid(this.NUMBER_OF_ROW, this.NUMBER_OF_COLUMN);
        // this.setState({grid: newGrid});
    }

    handleOnMouseDown(row, col) {
        const newGrid = this.toggleWall(this.state.grid, row, col);
        this.setState({grid: newGrid, mousePressed: true});
    }

    handleOnMouseUp() {
        this.setState({mousePressed: false});
    }

    handleOnMouseEnter(row, col) {
        if (!this.state.mousePressed) {
            return;
        }
        const newGrid = this.toggleWall(this.state.grid, row, col);
        this.setState({grid: newGrid});
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
            isStart: row === this.START_NODE_ROW && column === this.START_NODE_COLUMN,
            isFinish: row === this.FINISH_NODE_ROW && column === this.FINISH_NODE_COLUMN,
            isWall: false
        }
    }

    toggleWall = (grid, row, column) => {
        const currentNode = grid[row][column];
        currentNode.isWall = !currentNode.isWall;
        return grid;
    }

    render() {

        const { grid } = this.state;

        return (
            <React.Fragment>
                <NavBar 
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
