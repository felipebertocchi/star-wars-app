import { Grid } from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import { Button } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function FavoritesPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext)
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  }
  if (!user) {
    routeChange('/login');
  }

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchFavorites() {
      const resp = await axios.get('/v1/favorite/' + user.id)
      console.log(resp)
      setFavorites(resp.data);
      setLoading(false);
    }
    fetchFavorites();
  }, [user])


  return (
    <>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <h1 style={{ color: 'white' }}> Favoritos de {user.name} </h1>
        <Grid container justifyContent='center'>
          {(loading) ? (
            <Backdrop open={true}>
              <CircularProgress color="primary" />
            </Backdrop>
          ) : (
            <>
              {(favorites.length === 0) ? (
                <div data-test-id="no-favorites" style={{ textAlign: 'center' }}>
                  <h4 style={{ color: 'white' }}>No se han asignado favoritos todavia...</h4>
                  <Button variant="contained" color="secondary" onClick={() => routeChange('/character')}>Explorar personajes</Button>
                </div>
              ) : (<div></div>)
              }
              {favorites.map((fav, i) => {
                return (
                  <SimpleCard key={i} data={fav} goesTo={'/character/'} />
                )
              })}
            </>
          )}
        </Grid>
      </div>
    </>
  )
}