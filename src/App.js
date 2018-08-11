import React, { Component } from 'react';
import './App.css';
import './board.css';
import { Game } from './game.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">ChessReactions</h1>
        </div>
        <p className="App-intro">
          A small project to learn react.js within the context of chess. I would like to add simple features to move pieces around and import multiple PGNs for some data analysis using python libraries with this all being free online. This is partly inspired by using chessable to study openings for the first time, and wanting to do some analysis on my own.
        </p>
        <div className="Game">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
