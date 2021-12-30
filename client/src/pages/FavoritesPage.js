import { Grid } from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';


export default function FavoritesPage() {
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
    async function fetchFavorites() {
    const resp = await axios.get('http://localhost:8080/v1/favorite')
    setFavorites(resp.data.results);
    }
    fetchFavorites();
  }, [])

  return (
    <>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <h1 style={{ color: 'white' }}> Favoritos de {user.name} </h1>
        <Grid container>
          {favorites.map((fav, i) => {
            return (
              <SimpleCard key={i} data={fav} goesTo={'/character/'} />
            )
          })}
        </Grid>
      </div>
    </>
  )
}