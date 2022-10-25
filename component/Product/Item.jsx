// import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useRouter} from "next/router";



const Item = ({ id, name, price }) => {
  // const imgPath = `../assets/img/${id}.jpg`;
  const seed = (Math.random() + 1).toString(36).substring(7);
  const imgPath = `https://picsum.photos/seed/${seed}/200/300`;
  const router = useRouter();

  // const navigate = useNavigate();
  // const handleNavigation = () => navigate(`/item/${id}`);

  return (
    <Card className='animate__animated animate__fadeIn' raised>
      <CardActionArea>
        <CardMedia
          component='img'
          height='260'
          image={imgPath}
          alt={id}
          onClick={() => {router.push(`/product/${id}`)}}
        />
        <CardContent>
          <Typography variant='body2' color='text.secondary' noWrap>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button size='small' color='error'
                onClick={() => {
                  router.push(`/product/${id}`)
                }}
        >
          Buy
        </Button>
        <Typography variant='subtitle2' color='text.secondary' align='right'>
          {`$${price}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Item;
