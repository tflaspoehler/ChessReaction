import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Square } from './square.js'


var column_names = ["a", "b", "c", "d", "e", "f", "g", "h"];

export class Board extends Component {
  constructor(props) {
    super(props)
    let squares = []
    let row = []
    let shade = 'dark'
    let s = 0
    for (let i = 0; i < 8; i++) {
      row = []
      for (let j = 0; j < 8; j++) {
        row.push({
          row: i,
          column: j,
          id: s,
          shade: shade,
          highlight: false,
          move: false
                })
      if (shade === 'light') {shade = 'dark'}
      else {shade = 'light'}
      s++
      }
      squares.push(row)
    if (shade === 'light') {shade = 'dark'}
    else {shade = 'light'}
    }
    this.state = {
      name: 'chess board',
      squares: squares,
      moves: this.props.moves,
      size: this.props.size,
      drag: this.props.drag
    }
    this.piece_in_square = this.piece_in_square.bind(this);
    
  }

  piece_in_square(row, column) {
    let spares = []
    this.state.squares.map(row=>{spares.push(row)})
    this.props.click(row, column)
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
          row.push(<div className="label"></div>)
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
  
  row = []
  let squares = [].concat.apply([], this.state.squares.slice())
  if (this.props.drag !== null) {
    squares[(this.props.drag.y*8)+this.props.drag.x].highlight = true
  }
  
  if (this.props.moves.length > 0) {
    for (let m = 0; m < this.props.moves.length; m++) {
      squares[((this.props.moves[m][0]-1)*8-1)+this.props.moves[m][1]].move = true
    }
  }

  bored.push(squares.map(square => {
    let move = square.move
    if (this.props.moves.length > 0) {
      for (let m = 0; m < this.props.moves.length; m++) {
        if (square.row === this.props.moves[m][0]-1 && square.column === this.props.moves[m][1]-1) {
          move = true
        }
      }
    }
    return <Square
            name = {column_names[square.column]+(square.row+1)}
            key = {square.key}
            shade = {square.shade}
            move = {square.move}
            highlight = {square.highlight}
            row = {square.row}
            column = {square.column}
            click = {this.piece_in_square}
            size = {this.props.size}
          />
  } ))

  if (this.props.drag !== null) {
    squares[(this.props.drag.y*8)+this.props.drag.x].highlight = false
  }
  
  if (this.props.moves.length > 0) {
    for (let m = 0; m < this.props.moves.length; m++) {
      squares[((this.props.moves[m][0]-1)*8-1)+this.props.moves[m][1]].move = false
    }
  }  
  
  return bored}

  render() {
    return (
        <div className="board">
            {this.create_board()}
        </div>
    )
  }
}