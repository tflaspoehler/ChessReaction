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
        id: i
      })
    }
    for (let i = 0; i < data.pieces.length; i++) {
            moves = get_moves(pieces, i, positions)
            pieces[i].moves = moves
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
      offset: 0

    }
    this.active_piece = this.active_piece.bind(this);
    this.select_square = this.select_square.bind(this);
    this.setSize = this.setSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.highlight_square = this.highlight_square.bind(this);
    this.attack_piece = this.attack_piece.bind(this);
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
      console.log(peace[i].color, this.state.turn)
      if (peace[i].color != this.state.turn) {
        let moves = get_moves(this.state.pieces, this.state.active, this.state.positions, false)
        for (let j=0; j < moves.length; j++) {
          if (moves[j][0] === peace[i].row && moves[j][1] === peace[i].column) {
            let positions = this.state.positions.slice();
            var last = []
            last.push([peace[this.state.active].row, peace[this.state.active].column])
            last.push([peace[i].row, peace[i].column])
            peace[this.state.active].row = peace[i].row
            peace[this.state.active].column = peace[i].column
            gravy.push(peace[i])
            peace.splice(i, 1)
            for (let p = 0; p < 8; p++) {positions[p]=Array(8).fill(-1)}
            for (let p = 0; p < peace.length; p++) {positions[peace[p].row-1][peace[p].column-1] = p}
            let turn = 'white'
            if (this.state.turn === 'white') {turn = 'black'}            
            this.setState({pieces: peace, positions: positions, active: -1, turn: turn, grave: gravy, moves: [], drag: null, last: last})
            break;
          }
        }
      }
      else {
        let moves = get_moves(this.state.pieces, i, this.state.positions, false)
        this.setState({active: i,
                       moves: moves,
                      drag: null})
      }
    }
    else {
      if (this.state.turn != peace[i].color) {
        this.setState({active: -1,
                       moves: [],
                      drag: null})
      }
      else {
        let moves = this.state.pieces[i].moves
        this.setState({active: i,
                       moves: moves,
                      drag: null})
      }
    }
  }

  move_piece(row, column) {
    console.log('moving ', this.state.pieces[this.state.active].color, this.state.pieces[this.state.active].name)
    const peace = this.state.pieces.slice();
    const positions = this.state.positions.slice();
    var last = []
    last.push([peace[this.state.active].row, peace[this.state.active].column])
    last.push([row, column])

    positions[peace[this.state.active].row-1][peace[this.state.active].column-1] = -1
    positions[row-1][column-1] = this.state.active
    peace[this.state.active].row = row
    peace[this.state.active].column = column
    if (peace[this.state.active].name.includes('pawn') && (peace[this.state.active].row === 8 || peace[this.state.active].row === 1)) {
      peace[this.state.active].name = 'queen'
      peace[this.state.active].image = images[peace[this.state.active].color+ '_queen']
    }

    let turn = this.next_turn() 

    this.setState({pieces: peace, positions: positions, active: -1, moves: [], turn: turn, last: last})
  }

  next_turn () {
    let turn = "white"
    if (this.state.turn === "white") {
      turn = "black"
    }
    return turn
    }

  kill_piece(row, column) {
    var positions = this.state.positions
    var peace = this.state.pieces.slice()
    var last = []
    if (this.state.grave.length > 0) {
      var gravy = this.state.grave.slice();
    }
    else {
      var gravy = [];
    }
    row += -1
    column += -1

    last.push([peace[this.state.active].row, peace[this.state.active].column])
    last.push([row, column])

    peace[this.state.active].row = row + 1
    peace[this.state.active].column = column + 1

    console.log('killing ', peace[this.state.positions[row][column]].color, peace[this.state.positions[row][column]].name)
    gravy.push(peace[this.state.positions[row][column]])
    peace.splice(this.state.positions[row][column], 1)

    for (let p = 0; p < 8; p++) {positions[p]=Array(8).fill(-1)}
    for (let p = 0; p < peace.length; p++) {positions[peace[p].row-1][peace[p].column-1] = p}

    let turn = this.next_turn()


    this.setState({pieces: peace, positions: positions, grave: gravy, turn: turn, active: -1, moves: [], last: last})
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
                    onDown={() => this.active_piece(i)}
                    onMove={this.highlight_square}
                    onUp={this.attack_piece}
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
    if (this.state.active > -1) {
      if (this.state.pieces[this.state.active].moves.length > 0) {
        for (let p = 0; p < this.state.pieces[this.state.active].moves.length; p++) {
          if (this.state.pieces[this.state.active].moves[p][0] === row && this.state.pieces[this.state.active].moves[p][1] === column) {
            if (this.state.positions[row-1][column-1] > -1) {
              this.kill_piece(row, column)
            }
            else {
              this.move_piece(row, column)
            }
          }
        }
      }
    }
  }

  attack_piece(e) {
    let pos = {x: e.clientX, y: e.clientY}
    console.log('actual click positions', e.clientX, e.clientY)
    console.log('board rect', this.state.rect.left, this.state.rect.top)
    if (this.state.active > -1) {
      if (this.state.rect.left+this.state.size   <= pos.x &&
          this.state.rect.right-this.state.size  >= pos.x &&
          this.state.rect.top+this.state.size    <= pos.y &&
          this.state.rect.bottom-this.state.size >= pos.y) {
            pos.x = Math.floor((pos.x - this.state.rect.left - this.state.size) / parseFloat(this.state.size))
            pos.y = Math.floor((pos.y - this.state.rect.top  - this.state.size + this.state.offset) / parseFloat(this.state.size))
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
    if (this.state.rect.left+this.state.size   <= pos.x &&
        this.state.rect.right-this.state.size  >= pos.x &&
        this.state.rect.top+this.state.size    <= pos.y &&
        this.state.rect.bottom-this.state.size >= pos.y) {
          pos.x = Math.floor((pos.x - this.state.rect.left - this.state.size) / parseFloat(this.state.size))
          pos.y = Math.floor((pos.y - this.state.rect.top  - this.state.size + this.state.offset) / parseFloat(this.state.size))
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

  setSize() {
    let rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
    let square = rect.width/10
    this.setState({
      size: square,
      rect: rect
    })
  }

  handleScroll(event) {
    let top = event.srcElement.body.scrollTop
    top = window.scrollY
    this.setState({
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
      console.log("dy,dx,theta",-dy,dx,angle)
      console.log("position")
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
