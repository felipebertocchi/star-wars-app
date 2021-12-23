import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    margin: '10px'
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({data, goesTo}) {
  const classes = useStyles();
  const history = useHistory();
  const routeChange = () =>{
    history.push(goesTo + data.uid);
  }
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={routeChange}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {data.name || data.properties.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {data.description}
          </Typography>
          <Typography variant="body2" component="p">
            {data.homeworld}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Ver más</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
