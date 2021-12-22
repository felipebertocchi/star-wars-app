import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 385,
    minWidth: 320
  },
  media: {
    height: 260,
  },
});

export default function Category({image,title,desc,path}) {
  const classes = useStyles();
  const history = useHistory();
  
  const routeChange = () =>{
    history.push(path);
  }
  
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={routeChange}>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
