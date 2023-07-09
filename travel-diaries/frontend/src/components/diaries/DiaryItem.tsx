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

import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function DiaryItem() {
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
        title='Shrimp and Chorizo Paella'
        subheader='September 14, 2016'
      />
      <CardMedia
        component='img'
        height='194'
        image='https://lh3.googleusercontent.com/pw/AIL4fc_ib3XnblTVrgVgG0mu3XO1gr-RxPkwWxNU41wpM-ri6XFENc13fBrQPSaPUFGQx4Ypu6tbG12eyymCCX8yZro4npgcTu9c8-gxyzhqD_DK4Vhse_kOU66GyS_6sLdtNJzdvymoigLWB94gVi0Mrg4QqQ=w1500-h692-s-no?authuser=2'
        alt='Paella dish'
      />
      <CardContent>
        <Typography paddingBottom={1} variant='h5' color='text.secondary'>
          Simple things
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
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
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
