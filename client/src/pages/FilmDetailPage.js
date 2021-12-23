import { Grid, Paper, Typography, ButtonBase, Link } from '@material-ui/core'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


export default function FilmDetailPage(props) {
    const id = props.match.params.filmId
    const [film, setFilm] = useState([]);
    useEffect(() => {
        async function fetchFilm() {
            axios.get('http://localhost:8080/v1/filmlist/' + id)
                .then(resp => {
                    setFilm(resp.data.result.properties);
                });
        }

        fetchFilm();
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
    const imgPlaceholder = 'https://cdn-icons-png.flaticon.com/512/122/122197.png'
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
                                    {film.title}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Director: {film.director}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Characters:
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Producers: {film.producer}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Released: {film.release_date}
                                </Typography>
                                <Typography variant="caption" gutterBottom>
                                    {film.opening_crawl}
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