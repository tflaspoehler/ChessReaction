import white_king   from './images/white_king.svg';
import white_queen  from './images/white_queen.svg';
import white_bishop from './images/white_bishop.svg';
import white_knight from './images/white_knight.svg';
import white_rook   from './images/white_rook.svg';
import white_pawn   from './images/white_pawn.svg';
import black_king   from './images/black_king.svg';
import black_queen  from './images/black_queen.svg';
import black_bishop from './images/black_bishop.svg';
import black_knight from './images/black_knight.svg';
import black_rook   from './images/black_rook.svg';
import black_pawn   from './images/black_pawn.svg';
import pieces from './pieces.json';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var column_names = ["a", "b", "c", "d", "e", "f", "g", "h"];

export class MoveSquare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.key,
      row: this.props.row,
      column: this.props.column,
      shade: this.props.shade,
      size: this.props.size,
      red: 0, green: 0, blue: 0
    }
  }
    
  handleClick () {
    this.props.onClick(this.props.row, this.props.column)
  }

  render() {
    let offset = 9-this.props.row;
    return (
      <div 
        style={{position: 'absolute',
                top:  'calc(('+offset.toString()+')*('+this.props.size+')',
                left: 'calc('+this.props.size+'*'+this.props.column.toString()+')',
                }}
        className={this.props.shade}
         id={this.props.key}
         onClick={() => this.handleClick()} ></div>
    )
  }
}
export class Piece extends Component {
	constructor(props) {
        super(props);
        let offset = 9-this.props.peace.row;
		this.state = {
            key: this.props.key,
            id: this.props.id,
            left: 'calc(3em*'+this.props.peace.column.toString()+')',
            top: 'calc(('+offset.toString()+')*(3em)',
            row: this.props.peace.row,
            column: this.props.peace.column,
            image: this.props.peace.image,
            color: this.props.peace.color,
            name: this.props.peace.name,
            turn: this.props.turn,
            moves: [],
            position: null,
            dragging: false,
            offset: null,
            size: this.props.size
        }
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
    }

    componentDidUpdate (props, state) {
        if (this.state.dragging && !state.dragging) {
          document.addEventListener('mousemove', this.mouseMove)
          document.addEventListener('mouseup', this.mouseUp)
        } 
        else if (!this.state.dragging && state.dragging) {
          document.removeEventListener('mousemove', this.mouseMove)
          document.removeEventListener('mouseup', this.mouseUp)
        }
      }

    mouseDown (e) {
        var rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        this.setState({
            dragging: true,
            left: rect.x,
            top: rect.y,
            offset: {x: e.clientX - rect.x, y: e.clientY - rect.y},
        })
        e.preventDefault()
    }

    mouseUp (e) {
        let offset = 9-this.state.row
        let top = 'calc(('+offset.toString()+')*3em'
        this.setState({
            top: 'calc(('+offset.toString()+')*'+this.state.size,
            left: 'calc('+this.state.size+'*'+this.state.column.toString()+')',
            dragging: false
        })
        this.props.onClick(this.state.key)
    }

    mouseMove (e) {
        let pos = {x: e.clientX - this.state.offset.x, y: e.clientY - this.state.offset.y}
        this.setState({
            left: pos.x,
            top: pos.y
        })
    }
    
    handleClick () {
        this.setState({active:true})
        this.props.onClick(this.state.key)
    }

    render () {
        let back = '';
        if (this.props.active === this.props.id && this.props.turn === this.state.color && !this.state.dragging) {
            back = 'rgba(0, 155, 0, 0.25)'
        }
        else {
            back = 'transparent'
        }
        if (this.state.dragging) {
            return (
                <div
                    style={{position: 'fixed',
                            top: this.state.top + 'px',
                            left: this.state.left + 'px',
                            width: this.props.size,
                            height: this.props.size,
                            backgroundColor: back,
                            zIndex: '2'
                            }}
                    id={this.props.peace.name} class="game_piece" 
                    onClick={() => this.handleClick()}
                    onMouseDown={this.mouseDown}
                >
                    <img
                        style={{cursor: 'grabbing'}}
                        src={this.state.image}
                        alt={this.state.name}
                    />
                </div>
            );
        }
        else {
            return (
                <div
                    style={{position: 'absolute',
                            top: this.props.top,
                            left: this.props.left,
                            width: this.props.size,
                            height: this.props.size,
                            backgroundColor: back,
                            zIndex: '1'
                            }}
                    id={this.props.peace.name} class="game_piece" 
                    onClick={() => this.handleClick()}
                    onMouseDown={this.mouseDown}
                >
                    <img
                        style={{cursor: 'grab'}}
                        src={this.state.image}
                        alt={this.state.name}
                    />
                </div>
            );            
        }
	}
}

