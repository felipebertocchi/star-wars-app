import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core'
import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PlanetDetailPage(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  }
  if (!user) {
    routeChange('/login');
  }
  const id = props.match.params.planetId
  const [planet, setPlanet] = useState([]);
  useEffect(() => {
    async function fetchPlanet() {
      setLoading(true);
      const resp = await axios.get('/v1/planetlist/' + id)
      setPlanet(resp.data.result.properties);
      setLoading(false);
    }
    fetchPlanet();
  }, [id])

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: '40px auto',
      minWidth: 500,
      maxWidth: '70vw'
    },
    image: {
      margin: '40px 50px 70px',
      width: 256,
      height: 256,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));
  const classes = useStyles();
  const imgPlaceholder = 'https://www.pngrepo.com/png/27276/512/planet.png'
  return (
    <div className={classes.root}>
      {(loading) ? (
        <Backdrop open={true}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image} disabled>
                <img className={classes.img} alt="complex" src={imgPlaceholder} />
              </ButtonBase>
            </Grid>
            <Grid data-test-id="planet" item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography data-test-id="planet-name" gutterBottom variant="h6">
                    {planet.name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Gravity: {planet.gravity}
                  </Typography>
                  <Typography data-test-id="planet-population" variant="subtitle1" gutterBottom>
                    Population: {planet.population}
                  </Typography>
                  <Typography data-test-id="planet-residents" variant="subtitle1" gutterBottom>
                    Known Residents: n/a
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Climate: {planet.climate}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Terrain: {planet.terrain}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Surface water: {planet.surface_water}%
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Diameter: {planet.diameter} km
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Rotation period: {planet.rotation_period} days
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Orbital period: {planet.orbital_period} days
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography data-test-id="planet-id" variant="h6">
                  #{id}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  )
}