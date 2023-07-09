import { Box } from '@mui/material';

import DiaryItem from './DiaryItem';

function Diaries() {
  return (
    <Box
      display='flex'
      flexDirection='column'
      padding={3}
      justifyContent='center'
      alignItems='center'
    >
      <DiaryItem />
    </Box>
  );
}

export default Diaries;
