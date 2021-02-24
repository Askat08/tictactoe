import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import SignUp from './components/SignUp';
import './App.css';

const winComb = [
  //helper.js
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const directions = {
  //helpe.js
  0: [0, 0],
  1: [0, 1],
  2: [0, 2],
  3: [1, 0],
  4: [1, 1],
  5: [1, 2],
  6: [2, 0],
  7: [2, 1],
  8: [2, 2],
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      player: 'X',
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      isPending: false,
      winner: [],
      gameOver: false,
      nextMove: [],
      error: false,
      isAuth: true,
    };
  }

  arrayOfCombos = [];
  componentDidUpdate() {
    const { player, board } = this.state;

    const fetchOnAiTurn = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        this.setState({ isAuth: false });
      }
      try {
        const response = await fetch(
          'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/engine',
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({ board }),
          }
        );
        const data = await response.json();
        const isWin = this.ticTacToeWinner(data.board, 'O');
        if (isWin === 'O') {
          alert('AI win');
          this.onDrawOrWin(true, data.board);
        } else {
          this.onDrawOrWin(false, data.board);
        }
      } catch (error) {
        this.onDrawOrWin(false, this.state.board, true);
      }
    };

    if (player === 'O') {
      setTimeout(fetchOnAiTurn, 1000);
    }
  }
  ticTacToeWinner = (board, player) => {
    // help.js
    let matchedPerCombo = 0;
    let cells = 0;
    for (let i = 0; i < winComb.length; i++) {
      for (let j = 0; j < winComb[i].length; j++) {
        const currentKey = winComb[i][j];
        const row = directions[currentKey][0];
        const col = directions[currentKey][1];
        if (board[row][col] === player) {
          matchedPerCombo++;
        }
        if (board[row][col] !== '') {
          cells++;
        }
      }

      if (matchedPerCombo === 3) {
        this.arrayOfCombos.push(
          directions[winComb[i][0]],
          directions[winComb[i][1]],
          directions[winComb[i][2]]
        );
        return player;
      }
      matchedPerCombo = 0;
    }
    if (cells === 24) {
      return 'draw';
    }
    return false;
  };
  onCellClicked = (indexRow, indexCol) => {
    if (indexRow !== undefined && indexCol !== undefined) {
      let { player, board } = this.state;
      if (board[indexRow][indexCol] === '') {
        board[indexRow][indexCol] = player;
        const isWin = this.ticTacToeWinner(board, 'X');
        if (isWin === 'draw') {
          alert('Draw');
          this.onDrawOrWin(true);
        } else if (isWin === 'X') {
          alert('You win');
          this.onDrawOrWin(true);
        } else {
          this.setState({
            board,
            player: 'O',
            isPending: true,
            winner: this.arrayOfCombos,
          });
        }
      }
    }
  };

  onDrawOrWin = (gameOver = false, board = this.state.board, error = false) => {
    this.setState({
      board,
      error,
      gameOver,
      player: 'X',
      winner: this.arrayOfCombos,
      isPending: false,
      nextMove: [],
    });
  };
  resetBoardAndPlayer = () => {
    let { board } = this.state;
    this.arrayOfCombos = [];
    this.setState({
      board: board.map(() => ['', '', '']),
      player: 'X',
      winner: [],
      isPending: false,
      gameOver: false,
      nextMove: [],
    });
  };
  onNextMove = () => {
    //helper.js
    const board = { ...this.state.board };
    const cellsForX = [];
    const cellsForO = [];
    for (let i = 0; i < winComb.length; i++) {
      let cellCounter = 0;
      for (let j = 0; j < winComb[i].length; j++) {
        const curr = winComb[i][j];
        const row = directions[curr][0];
        const col = directions[curr][1];
        if (board[row][col] === 'O') cellCounter++;
      }
      if (cellCounter === 2) {
        cellsForO.push(winComb[i]);
      }

      if (cellCounter === 0) {
        cellsForX.push(winComb[i]);
      }
    }

    if (cellsForO.length) {
      this.setNextMoveCell(cellsForO, board);
    }
    if (cellsForX.length) {
      this.setNextMoveCell(cellsForX, board);
    }
  };

  setNextMoveCell = (arrOfCombos, board) => {
    for (let i = 0; i < arrOfCombos.length; i++) {
      for (let j = 0; j < arrOfCombos[i].length; j++) {
        const curr = arrOfCombos[i][j];
        const row = directions[curr][0];
        const col = directions[curr][1];
        if (board[row][col] === '') {
          this.setState({ nextMove: [row, col] });
          return;
        }
      }
    }
  };

  setWinnerClassName = (r, c) => {
    const { winner } = this.state;
    if (winner.length) {
      for (let i of winner) {
        if (i[0] === r && i[1] === c) {
          return 'winner';
        }
      }
    }
    return '';
  };

  suggestNextMoveUI = (rowCol) => {
    const { nextMove } = this.state;
    if (!nextMove.length) return false;
    const currMove = '' + nextMove[0] + nextMove[1];
    return rowCol === currMove;
  };

  render() {
    const { board, isPending, gameOver, error, isAuth } = this.state;
    return (
      <div className='App'>
        <Switch>
          <Route path='/' exact>
            <SignUp />
          </Route>

          <Route path='/game'>
            <TicTacToe
              isPending={isPending}
              setWinnerClassName={this.setWinnerClassName}
              onCellClicked={this.onCellClicked}
              suggestNextMoveUI={this.suggestNextMoveUI}
              resetBoardAndPlayer={this.resetBoardAndPlayer}
              gameOver={gameOver}
              error={error}
              board={board}
              onNextMove={this.onNextMove}
              isAuth={isAuth}
            />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
