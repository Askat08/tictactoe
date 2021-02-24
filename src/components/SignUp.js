import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';

const SignUp = () => {
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(false);
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
      console.log('Please enter valid email address.', inputText);
    } else {
      setInputText('');
      console.log('Welcome', inputText);
    }
  };

  const errorIcon = (
    <Tooltip title='You have entered an invalid email address. Please try again.'>
      <ErrorIcon color='error' />
    </Tooltip>
  );
  return (
    <div className='sign-up'>
      <h1>To start game enter your email</h1>
      <TextField
        placeholder='Enter email'
        color='primary'
        autoFocus
        type='email'
        value={inputText}
        ref={(input) => {}}
        onChange={onInputChange}
        error={error}
        label={error ? 'Error' : ''}
      />
      {error ? errorIcon : undefined}
      <Button onClick={onSignIn} variant='contained' color='primary'>
        Sign In
      </Button>
    </div>
  );
};

export default SignUp;
