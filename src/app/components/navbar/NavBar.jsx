import React, { Component } from "react";
import {Navbar} from 'react-bootstrap';
import './NavBar.css';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            algrorithms: '',
            speed: 'normal',
        };

        this.handleAlgrorithmsChange = this.handleAlgrorithmsChange.bind(this);
        this.handleSpeedChange = this.handleSpeedChange.bind(this);
        this.handleClickStartFinding = this.handleClickStartFinding.bind(this);
        this.handleClearBoard = this.handleClearBoard.bind(this);
    }

    handleAlgrorithmsChange(e) {
        this.setState({algrorithms: e.target.value});
    }

    handleSpeedChange(e) {
        this.setState({speed: e.target.value});
    }

    handleClearBoard() {
        this.props.onClickClearBoard();
    }

    handleClickStartFinding() {
        this.props.onClickFind(this.state.algrorithms, this.state.speed);
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Path-finding Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div>
                        <select id="algrorithms" value={this.state.algrorithms} onChange={this.handleAlgrorithmsChange}>
                            <option value="" hidden>Select a algrorithms</option>
                            <option value="dijkstra">Dijkstra's algrorithms</option>
                            <option value="asearch">A* Search</option>
                        </select>
                    </div>
                    <div>
                        <select id="speed" value={this.state.speed} onChange={this.handleSpeedChange}>
                            <option value="normal">Normal</option>
                            <option value="fast">Fast</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn btn-secondary ml-3" onClick={this.handleClearBoard}>Clear Board</button>
                        <button className="btn btn-primary ml-3" onClick={this.handleClickStartFinding}>Start Finding</button>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}