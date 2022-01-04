import { Grid, Paper, Typography, ButtonBase, Link } from '@material-ui/core'
import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { UserContext } from '../components/UserContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function FilmDetailPage(props) {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  }
  if (!user) {
    routeChange('/login');
  }
  const filmId = props.match.params.filmId
  const [film, setFilm] = useState([]);
  const [filmCharacters, setFilmCharacters] = useState([]);
  useEffect(() => {
    async function fetchFilm() {
      setLoading(true);
      axios.get('/v1/filmlist/' + filmId)
        .then(resp => {
          setFilm(resp.data.result.properties);
        });
    }
    async function fetchFilmCharacters() {
      axios.get('/v1//filmcharacters/' + filmId)
        .then(resp => {
          console.log(resp.data)
          setFilmCharacters(resp.data);
          setLoading(false);
        });
    }
    fetchFilm();
    fetchFilmCharacters();
  }, [filmId])

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
    font: {
      fontSize: 16,
    }
  }));
  const classes = useStyles();
  const imgPlaceholder = 'https://cdn-icons-png.flaticon.com/512/122/122197.png'
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
            <Grid data-test-id="film" item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography data-test-id="film-title" gutterBottom variant="h6">
                    {film.title}
                  </Typography>
                  <Typography data-test-id="film-director" variant="subtitle1" gutterBottom>
                    <strong>Director:</strong> {film.director}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Producers</strong>: {film.producer}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Released</strong>: {film.release_date}
                  </Typography>
                  <Typography variant="caption" gutterBottom>
                    {film.opening_crawl}
                  </Typography>
                  <Typography data-test-id="film-characters" variant="subtitle1" gutterBottom>
                    <div style={{ display: 'flex' }}>
                      <strong>Characters:</strong>
                      <ul>
                        {filmCharacters.map((filmChar, i) => {
                          return (
                            <li>
                              <Link data-test-id="film-characters-link" key={i} className={classes.font} component="button" onClick={() => routeChange('/character/' + filmChar.charId)}>
                                {filmChar.charName}
                              </Link>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography data-test-id="film-id" variant="h6">
                  #{filmId}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
    </div>
  )
}