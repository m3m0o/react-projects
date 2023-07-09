import { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { Post } from '../../types/Post';

import DiaryItem from './DiaryItem';

import { getAllPosts } from '../../helpers/api';

function Diaries() {
  const [posts, setPosts] = useState<[] | Post[]>([]);

  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box
      display='flex'
      flexDirection='column'
      padding={3}
      justifyContent='center'
      alignItems='center'
    >
      {posts &&
        posts.map((post, index) => <DiaryItem key={index} post={post} />)}
    </Box>
  );
}

export default Diaries;
