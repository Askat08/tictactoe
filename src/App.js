import React, { Component } from 'react';
import SignUp from './components/SignUp';
import TicTacToe from './components/TicTacToe';

import './App.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      player: 'X',
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
    };
  }
  render() {
    const { board, player } = this.state;
    return (
      <div className='App'>
        <SignUp />
        <TicTacToe board={board} />
      </div>
    );
  }
}
