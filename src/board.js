import React, { Component } from 'react';
export class Board extends Component {
  create_board = () => {
	let rows = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let bored = []
	
  let row = []
	row.push(<div className="label"></div>)
    for (let i = 0; i < 8; i++) {
    row.push(<div style={{verticalAlign: 'bottom'}} className="label" id="left_label${8-i}"><small>{rows[i]}</small></div>)
	}
	row.push(<div className="label"></div>)
	bored.push(<div className="row" id="top_labels">{row}</div>)
	
    for (let i = 0; i < 8; i++) {
    row = []
	  row.push(<div style={{textAlign: "right", verticalAlign: "middle"}} className="label" id="left_label${i}"><small>{8-i}&nbsp;</small></div>)
      for (let j = 0; j < 8; j++) {
        if ((i+j)%2 === 0) {
          row.push(<div className="light square" id={j*8+i+1}></div>)
        }
        else {
          row.push(<div className="dark square" id={j*8+i+1}></div>)
        }
      }
	  row.push(<div style={{textAlign: "left", verticalAlign: "middle"}} className="label" id="right_label${i}"><small>&nbsp;{8-i}</small></div>)
    bored.push(<div className="row" id={i}>{row}</div>)
    }
	
  row = []
	row.push(<div className="label"></div>)
    for (let i = 0; i < 8; i++) {
		row.push(<div style={{verticalAlign: 'top'}} className="label" id="left_label${8-i}"><small>{rows[i]}</small></div>)
	}
	row.push(<div className="label"></div>)
	bored.push(<div className="row" id="bottom_labels">{row}</div>)
	
    return bored
  }
  render() {
    return (
      <div className="board">{this.create_board()}</div>
    )
  }
}