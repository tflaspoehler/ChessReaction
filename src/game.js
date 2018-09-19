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
    let moves = []
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
      positions[data.pieces[i].row - 1][data.pieces[i].column - 1] = i

      pieces.push({
        key: i,
        name: data.pieces[i].name,
        nickname: data.pieces[i].nickname,
        color: data.pieces[i].color,
        position: data.pieces[i].position,
        image: images[data.pieces[i].image],
        row: parseInt(data.pieces[i].row),
        column: parseInt(data.pieces[i].column),
        id: i,
        history: null
      })
    }
    for (let i = 0; i < data.pieces.length; i++) {
            moves = get_moves(pieces, i, positions)
            pieces[i].moves = moves
            if (pieces[i].name.includes('king')) {
              if (pieces[i].color === 'black') {
                let black_king = i
              }
              else {
                let white_king = i
              }
            }
    }
    this.state = {
      name: 'chess',
      squares: squares,
      pieces: pieces,
      positions: positions,
      grave: [],
      moves: [],
      turn: 'white',
      size: '3em',
      drag: null,
      rect: null,
      last: null,
      offset: window.scrollY,
      check: false,

    }
    this.active_piece = this.active_piece.bind(this);
    this.select_square = this.select_square.bind(this);
    this.setSize = this.setSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.highlight_square = this.highlight_square.bind(this);
    this.drop_piece = this.drop_piece.bind(this);
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
    if (this.state.active > -1) {
      if (peace[i].color != this.state.turn) {
        let moves = peace[this.state.active].moves
        for (let j=0; j < moves.length; j++) {
          if (moves[j][0] === peace[i].row && moves[j][1] === peace[i].column) {
            console.log('attempting to kill', peace[i].color, peace[i].name, 'with', peace[this.state.active].color, peace[this.state.active].name)
            this.kill_piece(peace[i].row, peace[i].column)
            break;
          }
        }
      }
      else {
        this.select_piece(i)
      }
    }
    else {
      if (this.state.turn !== peace[i].color) {
        this.setState({active: -1,
                       moves: [],
                      drag: null})
      }
      else {
        this.select_piece(i)
      }
    }
  }

  select_piece(i) {
    let moves = this.state.pieces[i].moves
    this.setState({active: i,
                    moves: moves,
                  drag: null})    
  }

  move_piece(row, column) {
    console.log('moving ', this.state.pieces[this.state.active].color, this.state.pieces[this.state.active].name)
    var peace = this.state.pieces.slice();
    var positions = this.state.positions.slice();
    var last = []
    var check = false
    last.push([peace[this.state.active].row, peace[this.state.active].column])
    last.push([row, column])

    positions[peace[this.state.active].row-1][peace[this.state.active].column-1] = -1
    positions[row-1][column-1] = this.state.active

    if (peace[this.state.active].name.includes('king')) {
      if (peace[this.state.active].column - column > 1) {
        let rook = positions[row-1][column-3]
        console.log('rook', rook)
        peace[rook].history = [[row, column+1]]
        peace[rook].row = row
        peace[rook].column = column + 1
        positions[row-1][column] = rook
        positions[row-1][column-3] = -1
      }
      else if (peace[this.state.active].column - column < -1) {
        let rook = positions[row-1][column]
        console.log('rook', rook)
        peace[rook].history = [[row, column-1]]
        peace[rook].row = row
        peace[rook].column = column - 1
        positions[row-1][column] = rook
        positions[row-1][column] = -1
      }
    }

    peace[this.state.active].row = row
    peace[this.state.active].column = column
    if (!peace[this.state.active].history) {
      peace[this.state.active].history = [[row, column]]
    }
    else {
      peace[this.state.active].history.push([row, column])
    }
    if (peace[this.state.active].name.includes('pawn') && (peace[this.state.active].row === 8 || peace[this.state.active].row === 1)) {
      peace[this.state.active].name = 'queen'
      peace[this.state.active].image = images[peace[this.state.active].color+ '_queen']
    }

    for (let p = 0; p < 8; p++) {positions[p]=Array(8).fill(-1)}
    for (let p = 0; p < peace.length; p++) {positions[peace[p].row-1][peace[p].column-1] = p}

    for (let i = 0; i < peace.length ; i++) {
      peace[i].moves = get_moves(peace, i, this.state.positions, false)
    }

    check = this.test_check(JSON.parse(JSON.stringify(peace)), JSON.parse(JSON.stringify(positions)), turn)

    let turn = this.next_turn()

    peace = this.filter_discoveries(positions.slice(), peace.slice(), turn) 

    this.setState({pieces: peace, positions: positions, active: -1, moves: [], turn: turn, last: last, check: check})
  }


  kill_piece(row, column) {
    var positions = this.state.positions
    var peace = this.state.pieces.slice()
    var last = []
    var check =false
    if (this.state.grave.length > 0) {
      var gravy = this.state.grave.slice();
    }
    else {
      var gravy = [];
    }

    last.push([peace[this.state.active].row, peace[this.state.active].column])
    last.push([row, column])

    row += -1
    column += -1

    peace[this.state.active].row = row + 1
    peace[this.state.active].column = column + 1
    if (!peace[this.state.active].history) {
      peace[this.state.active].history = [[row, column]]
    }
    else {
      peace[this.state.active].history.push([row, column])
    }
    console.log('killing ', peace[this.state.positions[row][column]].color, peace[this.state.positions[row][column]].name)
    gravy.push(peace[this.state.positions[row][column]])
    peace.splice(this.state.positions[row][column], 1)

    if (peace[this.state.active].name.includes('pawn') && (peace[this.state.active].row === 8 || peace[this.state.active].row === 1)) {
      peace[this.state.active].name = 'queen'
      peace[this.state.active].image = images[peace[this.state.active].color+ '_queen']
    }
    for (let p = 0; p < 8; p++) {positions[p]=Array(8).fill(-1)}
    for (let p = 0; p < peace.length; p++) {positions[peace[p].row-1][peace[p].column-1] = p}

    for (let i = 0; i < peace.length ; i++) {
      peace[i].moves = get_moves(peace, i, this.state.positions, false)
    }

    check = this.test_check(JSON.parse(JSON.stringify(peace)), JSON.parse(JSON.stringify(positions)), turn)

    let turn = this.next_turn()

    peace = this.filter_discoveries(positions.slice(), peace.slice(), turn)

    this.setState({pieces: peace, positions: positions, grave: gravy, turn: turn, active: -1, moves: [], last: last, check: check})
  }


  next_turn () {
    let turn = "white"
    if (this.state.turn === "white") {
      turn = "black"
    }
    return turn
    }

  filter_discoveries(board, pieces, turn) { 
    let mate = true
    let check = false
    var check_board = JSON.parse(JSON.stringify(board))
    for (let i = 0; i < pieces.length; i++) {
      if (pieces[i].color === turn && pieces[i].moves.length > 0) {
        let m = 0 
        while (m < pieces[i].moves.length) {
          var pizzas = JSON.parse(JSON.stringify(pieces))
          pizzas[i].row = pieces[i].moves[m][0]
          pizzas[i].column = pieces[i].moves[m][1]
          let p = check_board[pizzas[i].row-1][pizzas[i].column-1]
          if (p !== -1) {
            pizzas.splice(p, 1)
          }
          for (let slice = 0; slice < 8; slice++) {check_board[slice]=Array(8).fill(-1)}
          for (let slice = 0; slice < pizzas.length; slice++) {check_board[pizzas[slice].row-1][pizzas[slice].column-1] = slice}
          if (this.test_check(pizzas, check_board, turn)) {
            pieces[i].moves.splice(m, 1)
          }
          else {
            mate = false
            m++
          }
        }
      }
    }
    console.log('mate is ', mate)
    return pieces
  }
  

  test_check(peace, board, turn) {
    let check = false
    for (let i = 0; i < peace.length ; i++) {
      if (peace[i].color !== turn) {
        let moves = get_moves(peace, i, board, false)
        if (moves.length > 0) {
          for (let m = 0; m < moves.length; m++) {
            let p = board[moves[m][0]-1][moves[m][1]-1]
            if (p !== -1 && peace[p].name.includes('king')) {
              check = true
            }
          }
        }
      }
    }
    return check
  }

  create_pieces = () => {
    let check = null
    let population = [];
    var check_board = this.state.positions.slice()
    const peace = this.state.pieces.slice()
    var pizzas = this.state.pieces.slice()
    if (this.state.check) {console.log('CHECK')}
    let offset = 0
    for (let i = 0; i < this.state.pieces.length ; i++) {
      offset = 9 - this.state.pieces[i].row
      population.push(
                  <Piece 
                    key={this.state.pieces[i].key}
                    id={i}
                    peace={this.state.pieces[i]}
                    onDown={() => this.active_piece(i)}
                    onMove={this.highlight_square}
                    onUp={this.drop_piece}
                    active={this.state.active}
                    turn={this.state.turn}
                    position='absolute'
                    top={'calc(('+offset.toString()+')*'+this.state.size+'px'}
                    left={'calc('+this.state.size+'px*'+this.state.pieces[i].column.toString()+')'}
                    size={this.state.size}
                      />)
    }
    return population
  }
  select_square(row, column) {
    row = row + 1
    column = column + 1
    if (this.state.active > -1 && this.state.active != this.state.positions[row-1][column-1]) {
      if (this.state.pieces[this.state.active].moves.length > 0) {
        for (let p = 0; p < this.state.pieces[this.state.active].moves.length; p++) {
          if (this.state.pieces[this.state.active].moves[p][0] === row && this.state.pieces[this.state.active].moves[p][1] === column) {
            if (this.state.positions[row-1][column-1] > -1) {
              this.kill_piece(row, column)
            }
            else {
              console.log('moving piece from select_square')
              this.move_piece(row, column)
            }
            break
          }
        }
      }
    }
  }

  drop_piece(e) {
    let pos = {x: e.clientX, y: e.clientY}
    console.log('actual click positions', e.clientX, e.clientY)
    console.log('board rect', this.state.rect.left, this.state.rect.top)
    if (this.state.active > -1) {
      if (this.state.rect.left+this.state.size   <= pos.x &&
          this.state.rect.right-this.state.size  >= pos.x &&
          this.state.rect.top+this.state.size    <= pos.y &&
          this.state.rect.bottom-this.state.size >= pos.y) {
            pos.x = Math.floor((pos.x - this.state.rect.left - this.state.size) / parseFloat(this.state.size))
            pos.y = Math.floor((pos.y - this.state.rect.top  - this.state.size) / parseFloat(this.state.size))
            pos.x = parseInt(pos.x)
            pos.y = parseInt(8 - pos.y - 1)
            if (this.state.positions[pos.y][pos.x] > -1) {
              if (this.state.pieces[this.state.positions[pos.y][pos.x]].color !== this.state.pieces[this.state.active].color) {
                this.active_piece(this.state.positions[pos.y][pos.x])
              }
            }
            else {
              console.log(this.state.pieces[this.state.active].moves, pos.x, pos.y)
              if (this.state.pieces[this.state.active].moves.length > 0) {
                for (let m = 0; m < this.state.pieces[this.state.active].moves.length; m++) {
                  if (this.state.pieces[this.state.active].moves[m][0] === pos.y+1 && this.state.pieces[this.state.active].moves[m][1] === pos.x+1) {
                    console.log('moving piece from drop_piece')
                    this.move_piece(pos.y+1, pos.x+1)
                    break
                  }
                }
              }
            }
      }    
    }
  }

  highlight_square(e) {
    let pos = {x: e.clientX, y: e.clientY}
    console.log(pos.y, this.state.rect.top, this.state.rect.bottom, this.state.offset)
    if (this.state.rect.left+this.state.size   <= pos.x &&
        this.state.rect.right-this.state.size  >= pos.x &&
        this.state.rect.top+this.state.size    <= pos.y &&
        this.state.rect.bottom-this.state.size >= pos.y) {
          pos.x = Math.floor((pos.x - this.state.rect.left - this.state.size) / parseFloat(this.state.size))
          pos.y = Math.floor((pos.y - this.state.rect.top  - this.state.size) / parseFloat(this.state.size))
          pos.x = parseInt(pos.x)
          pos.y = parseInt(8 - pos.y - 1)
      this.setState({
        drag: pos
      })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.setSize);
    window.addEventListener('scroll', this.handleScroll);
    this.setSize()
  }

  setSize(event) {
    let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let square = rect.width/10

    this.setState({
      size: square,
      rect: rect,
    })
  }

  handleScroll(event) {
    let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let square = rect.width/10
    let top = Math.max(event.srcElement.body.scrollTop, window.scrollY)
    console.log('    top', top)
    this.setState({
      size: square,
      rect: rect,
      offset: top
    })
  }

  draw_lines() {
    if (this.state.last) {
      var last = this.state.last
      let dy = last[0][0]-last[1][0]
      let dx = last[0][1]-last[1][1]
      let length = parseInt(this.state.size * Math.sqrt((Math.pow(dx,2)+(Math.pow(dy,2)))))
      let angle = 180*Math.atan2(dy, -dx)/Math.PI
      let x = ((this.state.size*(last[0][1]-0.5)))
      let y = ((this.state.size*(8.5-last[0][0])))
      return (
        <div style={{position: "absolute",
                    top:  this.state.size,
                    left: this.state.size,
                    zIndex: 4,
                    pointerEvents: 'none'}}>
            <svg width={parseInt(8*this.state.size)} height={parseInt(8*this.state.size)} xmlns="http://www.w3.org/2000/svg">
              <path d={"M"+x+" " +(y+10)+ " c-10,0 -10,-20 0,-20 h"+(length-40)+" v-10 l40 20 l-40 20 v-10 Z"}  
                       fill="red" 
                       fill-opacity="0.4" 
                       transform={"rotate("+angle+", "+x+", " +y+ ")"}/>
        />
            </svg>
        </div>
      )
    }
  }

  render() {
    console.log('---------------------------------------------------------------------')
    console.log('rendering new board with active piece', this.state.active)
    return (
      <div className="Game">
        <Board click={this.select_square} size={this.state.size+'px'} moves={this.state.moves} drag={this.state.drag} />
        <div>{this.draw_lines()}</div>
        <div>{this.create_pieces()}</div>
      </div>
    )
  }
}
