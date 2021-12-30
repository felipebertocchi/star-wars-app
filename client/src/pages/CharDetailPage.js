import { Grid, Paper, Typography, ButtonBase, Link } from '@material-ui/core'
import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import AddToFavorites from '../components/AddToFavorites';


export default function CharDetailPage(props) {
    const {user} = useContext(UserContext)
    const history = useHistory();

    const routeChange = (path) =>{
        history.push(path);
    }
    if (!user) {
        routeChange('/login');
    }
    const charId = props.match.params.charId
    const [char, setChar] = useState([]);
    const [homeworld, setHW] = useState([]);
    useEffect(() => {
        async function fetchChar() {
            axios.get('http://localhost:8080/v1/character?id=' + charId)
                .then(resp => {
                    setChar(resp.data.result.properties);
                });
        }
        async function fetchHW() {
            axios.get('http://localhost:8080/v1/planet/' + charId)
                .then(resp => {
                    setHW(resp.data.result.properties);
                });
        }

        fetchChar();
        fetchHW();
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
            margin: 'auto 50px 70px',
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
    const preventDefault = (event) => event.preventDefault();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image} disabled>
                            <img className={classes.img} alt="complex" src="https://www.pinclipart.com/picdir/big/157-1578186_user-profile-default-image-png-clipart.png" />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h6">
                                    {char.name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Born: {char.birth_year}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Homeworld: <Link href="#" onClick={preventDefault}>{homeworld.name}</Link>
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Gender: {char.gender}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Hair color: {char.hair_color}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Eye color: {char.eye_color}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Skin color: {char.skin_color}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Height: {char.height} cm
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Mass: {char.mass} kg
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <AddToFavorites userFrom={user.id} charId={charId}/>
                            <Typography variant="h6">
                                #{charId}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}