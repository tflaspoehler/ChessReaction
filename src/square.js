import React, { Component } from 'react';


export class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      key: this.props.key,
      id: this.props.key,
      row: this.props.row,
      column: this.props.column,
      shade: this.props.shade,
      move: this.props.move,
      red: 0, green: 0, blue: 0
    }
  }
    
  handleClick() {
    console.log(this.state.name, 'has been clicked')
    this.props.click(this.props.row, this.props.column)
  }

  render() {
    let x = 8-this.props.row;
    let y = this.props.column + 1
    return (
      <div 
        style={{position: 'absolute',
                top:  'calc(('+x.toString()+')*(3em)',
                left: 'calc(3em*'+y.toString()+')',
                }}    
        className={this.state.shade + this.props.move + ' square'} 
        id={this.props.key} 
        onClick={() => this.handleClick()}
      ></div>
    )
  }
}