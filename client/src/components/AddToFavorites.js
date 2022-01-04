import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AddToFavorites(props) {
  const [loading, setLoading] = useState(false);
  const [isUserFavorite, setIsUserFavorite] = useState(false);

  async function fetchFavorites() {
    setLoading(true);
    const resp = await axios.get('/v1/favorite/' + props.userFrom)
    let isUserFavorite = ((resp.data.filter(x => x.uid === props.charId).length !== 0) ? (true) : (false))
    setIsUserFavorite(isUserFavorite);
    setLoading(false);
  }
  useEffect(() => {
    fetchFavorites();
  }, [])

  const handleFavorite = (props) => {

    const variable = {
      userFrom: props.userFrom,
      charId: props.charId,
    }

    axios.post('/v1/favorite', variable)
      .then(res => {
        // console.log(res)
        if (res.data.success) {
          setIsUserFavorite(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleUnfavorite = (props) => {

    const variable = {
      userFrom: props.userFrom,
      charId: props.charId,
    }

    axios.delete('/v1/favorite', { data: variable })
      .then(res => {
        // console.log(res)
        if (res.data.success) {
          setIsUserFavorite(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      {(loading) ? (
        <>
          <CircularProgress color="primary" size={20} />
        </>
      ) : (
        <>
          {isUserFavorite ? (
            <FavoriteIcon data-test-id="unfavorite-button" onClick={() => { handleUnfavorite(props) }} />
          ) : (
            <FavoriteBorderIcon data-test-id="favorite-button" onClick={() => { handleFavorite(props) }} />
          )
          }
        </>
      )}
    </>
  )
}
