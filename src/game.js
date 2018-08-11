import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Piece } from './pieces.js';
import { MoveSquare } from './pieces.js';
import data from './pieces.json';
import { get_moves } from './moves.js';
import { Square } from './square.js'
import { Board } from './board.js'

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


export class Game extends Component {
  constructor(props) {
    super(props)
    let positions = []
    let squares = []
    let pieces = []
    let shade = 'dark'
    let s = 0
    for (let r = 0; r < 8; r++) {
      positions.push(Array(8).fill(-1))
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++){
        squares.push({
          row: i,
          column: j,
          id: s,
          shade: shade,
          move: ' '
        })
      if (shade === 'light') {shade = 'dark'}
      else {shade = 'light'}
      s++
      }
    }
    for (let i = 0; i < data.pieces.length; i++) {
      pieces.push({
        key: i,
        name: data.pieces[i].name,
        nickname: data.pieces[i].nickname,
        color: data.pieces[i].color,
        position: data.pieces[i].position,
        image: images[data.pieces[i].image],
        row: parseInt(data.pieces[i].row),
        column: parseInt(data.pieces[i].column),
        id: i
      })
    }
    this.state = {
      name: 'chess',
      squares: squares,
      pieces: pieces,
      positions: positions,
      grave: [],
      moves: [[-1, -1]],
      turn: 'white',
      size: '3em'
    }
    this.active_piece = this.active_piece.bind(this);
    this.select_empty_square = this.select_empty_square.bind(this);
    this.setSize = this.setSize.bind(this);
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
    if (this.state.active > 0) {
      if (peace[i].color != this.state.turn) {
        let moves = get_moves(peace, this.state.active, this.state.positions)
        for (let j=0; j < moves.length; j++) {
          if (moves[j][0] === peace[i].row && moves[j][1] === peace[i].column) {
            let positions = this.state.positions.slice();
            peace[this.state.active].row = peace[i].row
            peace[this.state.active].column = peace[i].column
            gravy.push(peace[i])
            peace.splice(i, 1)
            for (let p = 0; p < 8; p++) {positions[p]=Array(8).fill(-1)}
            for (let p = 0; p < peace.length; p++) {positions[peace[p].row-1][peace[p].column-1] = p}
            let turn = 'white'
            if (this.state.turn === 'white') {turn = 'black'}            
            this.setState({pieces: peace, positions: positions, active: -1, turn: turn, grave: gravy})
            break;
          }
        }
      }
      else {
        this.setState({active: i})
      }
    }
    else {
      if (this.state.turn != peace[i].color) {
        i = -1
      }
      this.setState({active: i})
    }
  }

  move_piece(row, column) {
    const peace = this.state.pieces.slice();
    const positions = this.state.positions.slice();

    console.log('attempting to move piece', peace[this.state.active].name)
    positions[peace[this.state.active].row-1][peace[this.state.active].column-1] = -1
    positions[row-1][column-1] = this.state.active
    peace[this.state.active].row = row
    peace[this.state.active].column = column
    let turn = "white"
    if (this.state.turn === "white") {
      turn = "black"      
    }
    this.setState({pieces: peace, positions: positions, active: -1, turn: turn})
  }

  create_pieces = () => {

    let population = [];
    const peace = this.state.pieces.slice()
    for (let i = 0; i < peace.length ; i++) {
      peace[i].moves = get_moves(peace, i, this.state.positions, false)
    }

    let offset = 0
    for (let i = 0; i < this.state.pieces.length ; i++) {
      offset = 9 - this.state.pieces[i].row
      population.push(
                  <Piece 
                    key={this.state.pieces[i].key}
                    id={i}
                    peace={this.state.pieces[i]}
                    onClick={() => this.active_piece(i)}
                    active={this.state.active}
                    turn={this.state.turn}
                    position='absolute'
                    top={'calc(('+offset.toString()+')*'+this.state.size+''}
                    left={'calc('+this.state.size+'*'+this.state.pieces[i].column.toString()+')'}
                    size={this.state.size}
                      />)
    }
    return population
  }
  select_empty_square(row, column) {
    row = row + 1
    column = column + 1
    if (this.state.active > -1) {
      console.log(this.state.pieces[this.state.active].row)
      if (this.state.pieces[this.state.active].moves.length > 1) {
        for (let p = 0; p < this.state.pieces[this.state.active].moves.length; p++) {
          if (this.state.pieces[this.state.active].moves[p][0] === row && this.state.pieces[this.state.active].moves[p][1] === column) {
            this.move_piece(row, column)
          }
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.setSize);
  }

  setSize() {
    console.log('resetting size')
    let square = ReactDOM.findDOMNode(this).getBoundingClientRect().width/10+'px'
    this.setState({
      size: square
    })
  }
  render() {
    return (
      <div className="Game">
        <Board click={this.select_empty_square} size={this.state.size}/>
        <div>{this.create_pieces()}</div>
      </div>
    )
  }
}