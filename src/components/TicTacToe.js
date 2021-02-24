import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: 'auto',
    padding: '30px 0',
    width: '25%',
    display: 'flex',
    justifyContent: 'space-between',
    '& > *': {
      width: '160px',
      height: '50px',
    },
  },
}));

const TicTacToe = (props) => {
  const classes = useStyles();
  const {
    setWinnerClassName,
    onCellClicked,
    suggestNextMoveUI,
    resetBoardAndPlayer,
    isPending,
    gameOver,
    error,
    board,
    onNextMove,
    isAuth,
  } = props;
  return (
    <>
      {isAuth ? (
        error ? (
          <h1>Something went wrong...</h1>
        ) : (
          <>
            <div className='board'>
              {board.map((row, indexRow) => {
                return row.map((cell, indexCol) => {
                  const rowCol = '' + indexRow + indexCol;
                  return (
                    <div
                      key={Date.now() + indexRow + indexCol}
                      className={`square ${setWinnerClassName(
                        indexRow,
                        indexCol
                      )} ${isPending || gameOver ? 'pending' : ''} ${
                        suggestNextMoveUI(rowCol) ? 'move' : ''
                      }`}
                      onClick={() => onCellClicked(indexRow, indexCol)}>
                      <h3 className='symbol'>{cell}</h3>{' '}
                    </div>
                  );
                });
              })}
            </div>
            {isPending ? (
              <h1>
                <CircularProgress color='secondary' />
              </h1>
            ) : gameOver ? (
              <h1>Game Over!</h1>
            ) : (
              <h1>Your turn!</h1>
            )}
            <div className={classes.btn}>
              <Button
                variant='contained'
                onClick={resetBoardAndPlayer}
                disabled={error}>
                reset
              </Button>{' '}
              <Button variant='contained' onClick={onNextMove} disabled={error}>
                next move
              </Button>
            </div>
          </>
        )
      ) : (
        <Redirect to={{ pathname: '/' }} />
      )}
    </>
  );
};

export default TicTacToe;
