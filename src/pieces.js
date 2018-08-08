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

import React, { Component } from 'react';
import { Animate } from 'react-move';


export class Piece extends Component {
	constructor(props) {
		super(props);
		this.state ={
			left: 0,
			duration: 300
		}
	}
	
    render () {
        let { left, duration } = this.state;
        let offset = 9-this.props.peace.row
        return (
            <div
                style={{top:  'calc(('+offset.toString()+')*(3em)',
                        left: 'calc(3em*'+this.props.peace.column.toString()+')'}}
                id={this.props.peace.name} class="game_piece" >
                <img
                    src={this.props.peace.image}
                />
            </div>
		);
	}
}

export class Populate extends Component {
    create_pieces = () => {
      let population = []
      let offset = 0
      for (let i = 0; i < pieces.length ; i++) {
        offset = 9-pieces[i].row
        population.push(
                    <Piece peace={pieces[i]} />
        )
      }
      return population
    }
    render (){
      return this.create_pieces()
    }
  }

var wK = {
    name: 'king',
    color: 'white',
    position: 'h1',
    row: 1,
    column: 5,
    image: white_king, 
    alive: true,
    attacked: false};

var wQ = {
    name: 'queen',
    color: 'white',
    position: 'd1',
    row: 1,
    column: 4,
    image: white_queen, 
    alive: true,
    attacked: false};

var wLB = {
    name: 'light-squared bishop',
    color: 'white',
    position: 'f1',
    row: 1,
    column: 6,
    image: white_bishop, 
    alive: true,
    attacked: false};

var wDB = {
    name: 'dark-squared bishop',
    color: 'white',
    position: 'c1',
    row: 1,
    column: 3,
    image: white_bishop, 
    alive: true,
    attacked: false};

var wLN = {
    name: 'light-squared knight',
    color: 'white',
    position: 'b1',
    row: 1,
    column: 2,
    image: white_knight, 
    alive: true,
    attacked: false};

var wDN = {
    name: 'dark-squared knight',
    color: 'white',
    position: 'g1',
    row: 1,
    column: 7,
    image: white_knight, 
    alive: true,
    attacked: false};

var wLR = {
    name: 'light-squared rook',
    color: 'white',
    position: 'h1',
    row: 1,
    column: 8,
    image: white_rook, 
    alive: true,
    attacked: false};

var wDR = {
    name: 'dark-squared rook',
    color: 'white',
    position: 'a1',
    row: 1,
    column: 1,
    image: white_rook, 
    alive: true,
    attacked: false};

var w1P = {
    name: '1st pawn',
    color: 'white',
    position: 'a2',
    row: 2,
    column: 1,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w2P = {
    name: '2nd pawn',
    color: 'white',
    position: 'b2',
    row: 2,
    column: 2,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w3P = {
    name: '3rd pawn',
    color: 'white',
    position: 'c2',
    row: 2,
    column: 3,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w4P = {
    name: '4th pawn',
    color: 'white',
    position: 'd2',
    row: 2,
    column: 4,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w5P = {
    name: '5th pawn',
    color: 'white',
    position: 'e2',
    row: 2,
    column: 5,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w6P = {
    name: '6th pawn',
    color: 'white',
    position: 'f2',
    row: 2,
    column: 6,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w7P = {
    name: '7th pawn',
    color: 'white',
    position: 'g2',
    row: 2,
    column: 7,
    image: white_pawn, 
    alive: true,
    attacked: false};

var w8P = {
    name: '8th pawn',
    color: 'white',
    position: 'h2',
    row: 2,
    column: 8,
    image: white_pawn, 
    alive: true,
    attacked: false};
	
var bK = {
    name: 'king',
    color: 'black',
    position: 'h1',
    row: 8,
    column: 5,
    image: black_king, 
    alive: true,
    attacked: false};

var bQ = {
    name: 'queen',
    color: 'black',
    position: 'd1',
    row: 8,
    column: 4,
    image: black_queen, 
    alive: true,
    attacked: false};

var bLB = {
    name: 'light-squared bishop',
    color: 'black',
    position: 'c8',
    row: 8,
    column: 3,
    image: black_bishop, 
    alive: true,
    attacked: false};

var bDB = {
    name: 'dark-squared bishop',
    color: 'black',
    position: 'f1',
    row: 8,
    column: 6,
    image: black_bishop, 
    alive: true,
    attacked: false};

var bLN = {
    name: 'light-squared knight',
    color: 'black',
    position: 'b1',
    row: 8,
    column: 2,
    image: black_knight, 
    alive: true,
    attacked: false};

var bDN = {
    name: 'dark-squared knight',
    color: 'black',
    position: 'g1',
    row: 8,
    column: 7,
    image: black_knight, 
    alive: true,
    attacked: false};

var bLR = {
    name: 'light-squared rook',
    color: 'black',
    position: 'h1',
    row: 8,
    column: 8,
    image: black_rook, 
    alive: true,
    attacked: false};

var bDR = {
    name: 'dark-squared rook',
    color: 'black',
    position: 'a1',
    row: 8,
    column: 1,
    image: black_rook, 
    alive: true,
    attacked: false};

var b1P = {
    name: '1st pawn',
    color: 'black',
    position: 'a2',
    row: 7,
    column: 1,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b2P = {
    name: '2nd pawn',
    color: 'black',
    position: 'b2',
    row: 7,
    column: 2,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b3P = {
    name: '3rd pawn',
    color: 'black',
    position: 'c2',
    row: 7,
    column: 3,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b4P = {
    name: '4th pawn',
    color: 'black',
    position: 'd2',
    row: 7,
    column: 4,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b5P = {
    name: '5th pawn',
    color: 'black',
    position: 'e2',
    row: 7,
    column: 5,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b6P = {
    name: '6th pawn',
    color: 'black',
    position: 'f2',
    row: 7,
    column: 6,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b7P = {
    name: '7th pawn',
    color: 'black',
    position: 'g2',
    row: 7,
    column: 7,
    image: black_pawn, 
    alive: true,
    attacked: false};

var b8P = {
    name: '8th pawn',
    color: 'black',
    position: 'h2',
    row: 7,
    column: 8,
    image: black_pawn, 
    alive: true,
    attacked: false};

    

export var pieces = [wK,wQ,wLB,wDB,wLN,wDN,wLR,wDR,w1P,w2P,w3P,w4P,w5P,w6P,w7P,w8P,
                     bK,bQ,bLB,bDB,bLN,bDN,bLR,bDR,b1P,b2P,b3P,b4P,b5P,b6P,b7P,b8P];
