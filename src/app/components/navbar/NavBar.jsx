import React, { Component } from "react";
import { Navbar, Nav, DropdownButton, Dropdown } from 'react-bootstrap';
import './NavBar.css';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            algorithms: '',
            speed: 'normal',
        };
    }

    handleAlgorithmsChange = (e) => {
        this.setState({algorithms: e});
    }

    handleSpeedChange = (e) => {
        this.setState({speed: e});
    }

    handleClearBoard = () => {
        this.props.onClickClearBoard();
    }

    handleClickStartFinding = () => {
        this.props.onClickFind(this.state.algorithms, this.state.speed);
    }

    render() {
        let algorithmInfo;
        let buttonFind;
        if (this.state.algorithms === 'dijkstra') {
            algorithmInfo = <span className="info">Dijkstra's Algorithm is weighted and guarantees the shortest path!</span>
            buttonFind = <button className="btn btn-primary ml-3" onClick={this.handleClickStartFinding} disabled={this.props.disableButton}>Visualize Dijkstra</button>
        } else if (this.state.algorithms === 'aStar') {
            algorithmInfo = <span className="info">A* Search is weighted and guarantees the shortest path!</span>
            buttonFind = <button className="btn btn-primary ml-3" onClick={this.handleClickStartFinding} disabled={this.props.disableButton}>Visualize A*</button>
        } else if (this.state.algorithms === 'bfs') {
            algorithmInfo = <span className="info">Breath-first Search is unweighted and guarantees the shortest path!</span>
            buttonFind = <button className="btn btn-primary ml-3" onClick={this.handleClickStartFinding} disabled={this.props.disableButton}>Visualize BFS</button>
        } else if (this.state.algorithms === 'dfs') {
            algorithmInfo = <span className="info">Depth-first Search is unweighted and does not guarantee the shortest path!</span>
            buttonFind = <button className="btn btn-primary ml-3" onClick={this.handleClickStartFinding} disabled={this.props.disableButton}>Visualize DFS</button>
        } else {
            algorithmInfo = <span className="info">Pick an algorithm and visualize it!</span>
            buttonFind = <button className="btn btn-primary ml-3" onClick={this.handleClickStartFinding} disabled={this.props.disableButton}>Visualize</button>
        }

        return (
            <React.Fragment>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Navbar.Brand>PathFinding Visualizer</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <DropdownButton variant="secondary" title="Select a algorithms" id="dropdown-menu" onSelect={this.handleAlgorithmsChange}>
                                <Dropdown.Item eventKey="dijkstra">Dijkstra's algorithms</Dropdown.Item>
                                <Dropdown.Item eventKey="aStar">A* Search algorithms</Dropdown.Item>
                                <Dropdown.Item eventKey="bfs">Bread First Search algorithms</Dropdown.Item>
                                <Dropdown.Item eventKey="dfs">Depth First Search algorithms</Dropdown.Item>
                            </DropdownButton>
                            {/* <DropdownButton className="ml-3" variant="secondary" title="Select speed" id="dropdown-menu" onSelect={this.handleSpeedChange}>
                                <Dropdown.Item eventKey="normal">Normal</Dropdown.Item>
                                <Dropdown.Item eventKey="fast">Fast</Dropdown.Item>
                            </DropdownButton> */}
                            <div>
                                <button className="btn btn-secondary ml-3" onClick={this.handleClearBoard} disabled={this.props.disableButton}>Clear Board</button>
                                {buttonFind}
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="container">
                    <div className="info-box">
                        <div className="item">
                            <img className="img-icon" src={require('../../assets/images/start-point.svg')} alt=""/>
                            <span className="start-node">Start Node</span>
                        </div>
                        <div className="item">
                            <img className="img-icon" src={require('../../assets/images/finish-flag.svg')} alt=""/>
                            <span className="finish-node">Finish Node</span>
                        </div>
                        <div className="item">
                            <span className="unvisited-node">Unvisited Node</span>
                        </div>
                        <div className="item">
                            <span className="visited-node">Visited Node</span>
                        </div>
                        <div className="item">
                            <span className="shortest-path-node">Shortest path Node</span>
                        </div>
                        <div className="item">
                            <img className="img-icon" src={require('../../assets/images/wall.svg')} alt=""/>
                            <span className="wall">Wall</span>
                        </div>
                    </div>
                    <div className="algorithm-info">
                        {algorithmInfo}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}