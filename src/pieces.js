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

var column_names = ["a", "b", "c", "d", "e", "f", "g", "h"];

export class MoveSquare extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.key,
      row: this.props.row,
      column: this.props.column,
      shade: this.props.shade,
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
                top:  'calc(('+offset.toString()+')*(3em)',
                left: 'calc(3em*'+this.state.column.toString()+')',
                }}
        className={this.state.shade}
         id={this.props.key}
         onClick={() => this.handleClick()} ></div>
    )
  }
}
export class Piece extends Component {
	constructor(props) {
        super(props);
        let offset = 9-this.props.peace.row;
		this.state ={
            key: this.props.key,
            id: this.props.id,
            alive: true,
            left: 'calc(3em*'+this.props.peace.column.toString()+')',
            top: 'calc(('+offset.toString()+')*(3em)',
            row: this.props.peace.row,
            column: this.props.peace.column,
            image: this.props.peace.image,
            color: this.props.peace.color,
            turn: this.props.turn
        }
    }
    
    handleClick () {
        this.setState({active:true})
        this.props.onClick(this.state.key)
    }

    render () {
        let offset = 9-this.props.peace.row;
		this.state ={
            key: this.props.key,
            id: this.props.id,
            left: 'calc(3em*'+this.props.peace.column.toString()+')',
            top: 'calc(('+offset.toString()+')*(3em)',
            row: this.props.peace.row,
            column: this.props.peace.column,
            image: this.props.peace.image,
            color: this.props.peace.color,
            turn: this.props.turn
        }
        let back = '';
        if (this.props.active === this.state.id && this.props.turn === this.state.color) {
            back = 'rgba(155, 0, 0, 0.25)'
        }
        else {
            back = 'transparent'
        }
        return (
            <div draggable='true'
                style={{top:  'calc(('+offset.toString()+')*(3em)',
                        left: 'calc(3em*'+this.props.peace.column.toString()+')',
                        backgroundColor: back}}
                id={this.props.peace.name} class="game_piece" 
                onClick={() => this.handleClick()} 
            >
                <img
                    src={this.state.image}
                    alt={this.state.name}
                />
            </div>
        );
	}
}

