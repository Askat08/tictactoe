import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';

const SignUp = () => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const signEmail = async (email) => {
    try {
      const response = await fetch(
        'https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/auth', // helper
        {
          headers: {
            //helper
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      sessionStorage.setItem('token', data.token);
    } catch (error) {
      setError(true);
    }
  };

  const onInputChange = (e) => {
    setError(false);
    setInputText(e.target.value);
  };
  const onSignIn = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    ); //helper

    if (!pattern.test(inputText)) {
      setInputText('');
      setError(true);
    } else {
      setInputText('');
      signEmail(inputText);
      setIsAuth(true);
    }
  };

  const errorIcon = (
    <Tooltip title='You have entered an invalid email address. Please try again.'>
      <ErrorIcon color='error' />
    </Tooltip>
  );
  return (
    <>
      {isAuth ? (
        <div>TicTacToe Board</div>
      ) : (
        <div className='sign-up'>
          <h1>To start game enter your email</h1>
          <TextField
            placeholder='Enter email'
            color='primary'
            autoFocus
            type='email'
            value={inputText}
            onChange={onInputChange}
            error={error}
            label={error ? 'Error' : ''}
          />
          {error ? errorIcon : undefined}
          <Button onClick={onSignIn} variant='contained' color='primary'>
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
};

export default SignUp;
