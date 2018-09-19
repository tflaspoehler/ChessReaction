import React, { Component } from 'react';

import dot   from './images/dot.svg';


export class Square extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      key: this.props.key,
      id: this.props.key,
      row: this.props.row,
      column: this.props.column,
      size: this.props.size,
      shade: this.props.shade,
      move: this.props.move,
      red: 0, green: 0, blue: 0
    }
  }
    
  handleClick(e) {
    console.log('clicked a square')
    this.props.click(this.props.row, this.props.column)
  }

  highlight(highlight, circle) {

    let bg = 0.0
    if (highlight && circle) {
      bg = 0.25
    }
    return (<div style={{backgroundColor: 'rgba(0, 0, 0, '+bg+')', position: 'relative', width: '100%', height: '100%'}}>{this.circle(circle)}</div>)
  }
  circle(circle) {
    if (circle) {
      return (<div className={this.props.shade} style={{position: 'relative', top: '40%', margin: 'auto', border: '1px solid #000', borderRadius: '50%', width: '20%', height: '20%', backgroundColor: 'rgba(155, 0, 0, 1)', zIndex: '4'}}></div>)
    }
    else {
      return ''
    }
  }

  render() {
    let x = 8-this.props.row;
    let y = this.props.column + 1
    let innerhtml = this.highlight(this.props.highlight, this.props.move)
    return (
        <div 
          style={{position: 'absolute',
                  top:  'calc(('+x.toString()+')*('+this.props.size+')',
                  left: 'calc('+this.props.size+'*'+y.toString()+')',
                  }}    
          className={this.props.shade + ' square'} 
          id={this.props.key} 
          onClick={() => this.handleClick()}
        >{innerhtml}</div>
    )
  }
}