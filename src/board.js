import React, { Component } from 'react';
import { Piece } from './pieces.js';
import { MoveSquare } from './pieces.js';
import data from './pieces.json';
import { get_moves } from './moves.js';

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

var column_names = ["a", "b", "c", "d", "e", "f", "g", "h"];
var images = {
    'white_king' : white_king,
    'white_queen' : white_queen,
    'white_bishop' : white_bishop,
    'white_knight' : white_knight,
    'white_rook' : white_rook,
    'white_pawn' : white_pawn,
    'black_king' : black_king,
    'black_queen' : black_queen,
    'black_bishop' : black_bishop,
    'black_knight' : black_knight,
    'black_rook' : black_rook,
    'black_pawn' : black_pawn
}

export class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      row: this.props.row,
      column: this.props.column,
      shade: this.props.shade,
      red: 0, green: 0, blue: 0
    }
  }

  render() {
    return (
      <div className={this.state.shade} id={this.state.column*8+this.state.row+1}></div>
    )
  }
}

export class Board extends Component {
  constructor(props) {
    super(props)
    for (let i = 0; i < data.pieces.length; i++) {
      data.pieces[i].image = images[data.pieces[i].image];
      data.pieces[i].row = parseInt(data.pieces[i].row);
      data.pieces[i].column = parseInt(data.pieces[i].column);
      data.pieces[i].alive = true;
    }
    this.state = {
      squares: Array(64).fill(null),
      pieces: data.pieces,
      grave: [],
      moves: [[-1, -1]],
      turn: 'white',
    }
    this.active_piece = this.active_piece.bind(this);
  }

  piece_in_square(i) {
  }

  active_piece(i) {
    var peace = this.state.pieces.slice();
    if (this.state.grave.length > 0) {
      var gravy = this.state.grave.slice();
    }
    else {
      var gravy = [];
    }
    if (this.state.active > 0 && peace[this.state.active].color === this.state.turn && peace[i].colo != this.state.turn) {
      let turn = 'white'
      if (this.state.turn === 'white') {turn = 'black'}
      let moves = get_moves(this.state.pieces, this.state.active)
      for (let j=0; j < moves.length; j++) {
        if (moves[j][0] === peace[i].row && moves[j][1] === peace[i].column) {
          peace[i].alive = false
          peace[this.state.active].row = peace[i].row
          peace[this.state.active].column = peace[i].column
          gravy.push(peace[i])
          peace.splice(i, 1)
        }
      }
      this.setState({pieces: peace, active: -1, turn: turn, grave: gravy})
    }
    else {
      if (this.state.turn != peace[i].color) {
        i = -1
      }
      this.setState({pieces: peace, active: i})
    }
  }


  move_piece(row, column) {
    const peace = this.state.pieces.slice();
    if (this.state.active >= 0) {
      console.log('moving piece ', peace[this.state.active].color, peace[this.state.active].name, "to", column_names[column-1], row, )
      peace[this.state.active].row = row
      peace[this.state.active].column = column
    }
    let turn = "white"
    if (this.state.turn === "white") {
      turn = "black"      
    }
    this.setState({pieces: peace, active: -1, turn: turn})
  }
  create_pieces = () => {
    let population = [];
    if (this.state.active >= 0) {
      let moves = get_moves(this.state.pieces, this.state.active)
      if (moves.length > 0) {
        for (let p = 0; p < moves.length; p++) {
          population.push(
            <MoveSquare
              key={100*((moves[p][0]*8)+moves[p][1])+1}
              shade={'move_square'}
              row={moves[p][0]}
              column={moves[p][1]}
              onClick={() => this.move_piece(moves[p][0], moves[p][1])}
            />
          )
        }
      }
    }
    for (let i = 0; i < this.state.pieces.length ; i++) {
      population.push(
                  <Piece 
                    key={i}
                    id={i}
                    peace={this.state.pieces[i]}
                    onClick={() => this.active_piece(i)}
                    active={this.state.active}
                    turn={this.state.turn}
                                      />)
    }
    return population
  }
 
  create_board = () => {
  let bored = []
  let row = []
  let shade ='dark'
  let label = ''
	row.push(<div className="label"></div>)
  for (let i = 0; i < 8; i++) {
    label = 'label_' + column_names[8-i]
    row.push(<div style={{verticalAlign: 'bottom'}} className="label" id={label}><small>{column_names[i]}</small></div>)
	}
	row.push(<div className="label"></div>)
	bored.push(<div className="row" id="top_labels">{row}</div>)
	
    for (let i = 0; i < 8; i++) {
    row = []
    label = 'left_label_'+(8-i)
	  row.push(<div style={{textAlign: "right", verticalAlign: "middle"}} className="label" id={label}><small>{8-i}&nbsp;</small></div>)
      for (let j = 0; j < 8; j++) {
        if ((i+j)%2 === 0) {
          shade = "light square"
        }
        else {
          shade = "dark square"
        }
        row.push(<Square
          key={(j*8)+i+1}
          shade={shade}
          row={i}
          column={j}
          onclick={() => this.piece_in_square(i, j)}
          />)
      }
    label = 'right_label_'+(8-i)
	  row.push(<div style={{textAlign: "left", verticalAlign: "middle"}} className="label" id={label}><small>&nbsp;{8-i}</small></div>)
    bored.push(<div className="row" id={i}>{row}</div>)
    }
	
  row = []
	row.push(<div className="label"></div>)
    for (let i = 0; i < 8; i++) {
    label = 'left_label_' + column_names[8-i]
		row.push(<div style={{verticalAlign: 'top'}} className="label" id={label}><small>{column_names[i]}</small></div>)
	}
	row.push(<div className="label"></div>)
	bored.push(<div className="row" id="bottom_labels">{row}</div>)
	
    return bored
  }
  render() {
    return (
      <div className="Game">
        <div className="board">{this.create_board()}</div>
        <div>{this.create_pieces()}</div>
      </div>
    )
  }
}