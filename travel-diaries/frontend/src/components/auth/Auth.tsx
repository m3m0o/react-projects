import { useState, FormEvent, ChangeEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux/es/exports';

import { Box, Typography, FormLabel, TextField, Button } from '@mui/material';

import { authActions } from '../../store';

import { sendAuthRequest } from '../../helpers/api';

function Auth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);

  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendAuthRequest(isSignup, inputs)
      .then((data) => {
        localStorage.setItem('userId', data.user._id as string);
        dispatch(authActions.login());

        navigate('/diaries');
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box
      width='40%'
      borderRadius={10}
      boxShadow='5px 5px 10px #ccc'
      margin='auto'
      marginTop={10}
    >
      <form onSubmit={handleSubmit}>
        <Box
          display='flex'
          flexDirection='column'
          width='60%'
          padding={5}
          margin='auto'
        >
          <Typography variant='h4' textAlign='center' padding={2}>
            {isSignup ? 'Signup' : 'Login'}
          </Typography>

          {isSignup && (
            <>
              <FormLabel>Name</FormLabel>
              <TextField
                onChange={handleInputChange}
                value={inputs.name}
                name='name'
                required
                margin='normal'
              />
            </>
          )}

          <FormLabel>E-mail</FormLabel>
          <TextField
            onChange={handleInputChange}
            value={inputs.email}
            name='email'
            type='email'
            required
            margin='normal'
          />

          <FormLabel>Password</FormLabel>
          <TextField
            onChange={handleInputChange}
            value={inputs.password}
            name='password'
            type='password'
            required
            margin='normal'
          />

          <Button
            sx={{ marginTop: 2, borderRadius: 10 }}
            type='submit'
            variant='contained'
          >
            {isSignup ? 'Signup' : 'Login'}
          </Button>

          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ marginTop: 2, borderRadius: 10 }}
            variant='outlined'
          >
            {isSignup ? 'Login' : 'Signup'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Auth;
