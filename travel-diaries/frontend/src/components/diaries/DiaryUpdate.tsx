import { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { useParams } from 'react-router-dom';

import { Box, Typography, FormLabel, TextField, Button } from '@mui/material';

import { Post } from '../../types/Post';

import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import { getPostDetails, updatePost } from '../../helpers/api';

function DiaryUpdate() {
  const id = useParams().id;

  const [post, setPost] = useState<undefined | Post>();

  useEffect(() => {
    getPostDetails(id!)
      .then((data) => {
        const currentPost = data.post as Post;

        setPost(currentPost);

        setInputs({
          ...currentPost,
        });
      })
      .catch((error) => {
        throw new Error(error as string);
      });
  }, []);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    location: '',
    image: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updatePost({ ...inputs })
      .then((response) => console.log(response))
      .catch((error) => {
        throw new Error(error as string);
      });
  };

  return (
    <Box display='flex' flexDirection='column' width='100%' height='100%'>
      <Box display='flex' margin='auto' padding={2}>
        <Typography fontWeight='bold' variant='h4' fontFamily='Dancing Script'>
          Add Your Travel Diary
        </Typography>

        <TravelExploreIcon
          sx={{ fontSize: '40px', paddingLeft: 1, color: 'lightcoral' }}
        />
      </Box>

      {post && (
        <form onSubmit={handleSubmit}>
          <Box
            padding={3}
            display='flex'
            width='70%'
            flexDirection='column'
            margin='auto'
          >
            <FormLabel sx={{ fontFamily: 'quicksand' }}>Title</FormLabel>
            <TextField
              value={inputs.title}
              onChange={handleInputChange}
              name='title'
              required
              variant='standard'
              margin='normal'
            />

            <FormLabel sx={{ fontFamily: 'quicksand' }}>Description</FormLabel>
            <TextField
              value={inputs.description}
              onChange={handleInputChange}
              name='description'
              required
              variant='standard'
              margin='normal'
            />

            <FormLabel sx={{ fontFamily: 'quicksand' }}>Image URL</FormLabel>
            <TextField
              value={inputs.image}
              onChange={handleInputChange}
              name='image'
              required
              variant='standard'
              margin='normal'
            />

            <FormLabel sx={{ fontFamily: 'quicksand' }}>Location</FormLabel>
            <TextField
              value={inputs.location}
              onChange={handleInputChange}
              name='location'
              required
              variant='standard'
              margin='normal'
            />

            <Button
              color='warning'
              variant='contained'
              type='submit'
              sx={{
                width: '50%',
                margin: 'auto',
                marginTop: 2,
                borderRadius: 7,
              }}
            >
              Post
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}

export default DiaryUpdate;
