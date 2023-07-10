import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Box, Typography, Button } from '@mui/material';

import { getUserDetails } from '../../helpers/api';

import { User } from '../../types/User';

import { authActions } from '../../store';

import DiaryItem from '../diaries/DiaryItem';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState<undefined | User>();

  useEffect(() => {
    getUserDetails()
      .then((data) => setUser(data.user as User))
      .catch((error) => {
        throw new Error(error as string);
      });
  }, []);

  const handleClick = () => {
    dispatch(authActions.logout());

    localStorage.removeItem('userId');

    navigate('/');
  };

  return (
    <Box display='flex' flexDirection='column'>
      {user && (
        <>
          <Typography
            textAlign='center'
            variant='h3'
            fontFamily='quicksand'
            padding={2}
          >
            User Profile
          </Typography>

          <Typography fontFamily='quicksand' padding={1} textAlign='left'>
            Name: {user?.name}
          </Typography>

          <Typography fontFamily='quicksand' padding={1} textAlign='left'>
            E-mail: {user?.email}
          </Typography>

          <Button
            onClick={handleClick}
            sx={{ marginRight: 'auto', width: '15%' }}
            color='warning'
            variant='contained'
          >
            Logout
          </Button>

          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            {user?.posts.map((post, index) => (
              <DiaryItem post={post} key={index} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Profile;
