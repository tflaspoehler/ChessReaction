import React, { Component } from 'react';
import './App.css';
import './board.css';
import { pieces } from './pieces.js';
import { Populate } from './pieces.js';
import { Board } from './board.js';
import { getPosition } from './position.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">ChessReactions</h1>
        </div>
        <p className="App-intro">
          A small project to learn react by creating a way to use machine learning on an imported collection of lines analysis import squares for different pieces.
        </p>
        <div className="Game">
        <Board />
        <Populate />
        </div>
      </div>
    );
  }
}

export default App;
