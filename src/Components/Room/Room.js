import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import React from 'react';
import { red } from '@mui/material/colors';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import WcIcon from '@mui/icons-material/Wc';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router';


// const ExpandMore = styled((props) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
//   })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   }));

const Room = ({room}) => {
    console.log(room)

    const history = useHistory();
    const handleBook = (bedType) => {
        history.push(`/book/${bedType}`);
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {room.avatar}
            </Avatar>
        }
        title={room.title}
      />
      <CardMedia
        component="img"
        height="194"
        image={room.imgUrl}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <LocalHotelIcon />: {room.bed} 
        </IconButton>
        <IconButton aria-label="share">
            <WcIcon />: {room.capacity} 
        </IconButton>
        <IconButton aria-label="share">
            <AttachMoneyIcon />: {room.price}
        </IconButton>
        
      <Button onClick={() => handleBook(room.bedType)} variant="contained" color="success">Book</Button>
      </CardActions>
    </Card>
    );
};

export default Room;