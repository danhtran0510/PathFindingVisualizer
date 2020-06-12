import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {

    render() {

        const {
            row,
            column,
            isStart,
            isFinish,
            isWall,
            onMouseDown,
            onMouseUp,
            onMouseEnter
        } = this.props;
        const extraClassName = isStart ? 'node-start' : isFinish ? 'node-finish' : isWall ? 'node-wall' : '';

        return (
            <div
                id= {`node-${row}-${column}`}
                className= {`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, column)}
                onMouseUp={() => onMouseUp()}
                onMouseEnter={() => onMouseEnter(row, column)}
            ></div>
        );
    }
}
