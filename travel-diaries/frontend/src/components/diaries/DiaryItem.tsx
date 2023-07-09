import { Box } from '@mui/system';

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  CardActions,
} from '@mui/material';

import { Post } from '../../types/Post';

import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DiaryItemProps {
  post: Post;
}

function DiaryItem(props: DiaryItemProps) {
  const { title, description, location, date, image } = props.post;

  const formattedDate = new Date(`${date}`).toLocaleDateString();

  return (
    <Card
      sx={{
        width: '50%',
        height: 'auto',
        margin: 1,
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '5px 5px 10px #ccc',
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'red' }} aria-label='recipe'>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label='settings'>
            <EditLocationAltIcon />
          </IconButton>
        }
        title={location}
        header={location}
        subheader={formattedDate}
      />
      <CardMedia component='img' height='194' image={image} alt={title} />
      <CardContent>
        <Typography paddingBottom={1} variant='h5' color='text.secondary'>
          {title}
        </Typography>

        <hr />

        <Box display='flex' paddingTop={1}>
          <Typography
            width='170px'
            paddingTop={1}
            fontWeight='bold'
            variant='caption'
          >
            Guilherme
          </Typography>

          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ marginLeft: 'auto' }}>
        <IconButton>
          <EditIcon />
        </IconButton>

        <IconButton color='error'>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default DiaryItem;
