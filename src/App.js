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
         <a href="https://github.com/tflaspoehler/ChessReaction">(github)</a> A small project to learn React by creating a chess application. I would like to add simple features such as importing groups of games (PGNs) for some data analysis that would be done on the web server using python libraries. The idea would be to learn openings based on a group of games by simulating random moves from an opponent for the best outcome. This is partly inspired by using chessable to study openings for the first time, and wanting to do some analysis on my own.
        </p>
        <div className="Game">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
