import React from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
  const { board } = props;
  const classes = useStyles();
  return (
    <>
      <div className='board'>
        {board.map((row, indexRow) => {
          return row.map((cell, indexCol) => {
            return (
              <div key={Date.now() + indexRow + indexCol} className={`square`}>
                <h3 className='symbol'>{cell}</h3>{' '}
              </div>
            );
          });
        })}
      </div>

      <div className={classes.btn}>
        <Button variant='contained'>reset</Button>{' '}
        <Button variant='contained'>next move</Button>
      </div>
    </>
  );
};

export default TicTacToe;
