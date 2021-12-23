import { Grid, Paper, Typography, ButtonBase, Link } from '@material-ui/core'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


export default function PlanetDetailPage(props) {
    const id = props.match.params.planetId
    const [planet, setPlanet] = useState([]);
    useEffect(() => {
        async function fetchPlanet() {
            axios.get('http://localhost:8080/v1/planetlist/' + id)
                .then(resp => {
                    setPlanet(resp.data.result.properties);
                });
        }

        fetchPlanet();
    }, [])

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
    const preventDefault = (event) => event.preventDefault();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image} disabled>
                            <img className={classes.img} alt="complex" src={imgPlaceholder} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    {planet.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Gravity: {planet.gravity}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Population: {planet.population}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Known Residents:
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
                            <Typography variant="h6">
                                #{id}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}