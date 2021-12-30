import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';
import { useState, useEffect } from 'react'

export default function AddToFavorites(props) {
    const [isUserFavorite, setIsUserFavorite] = useState(false);

    useEffect(() => {
        async function fetchFavorites() {
        const resp = await axios.get('http://localhost:8080/v1/favorite/' + props.userFrom)
        let isUserFavorite = ( (resp.data.filter(x => x.uid === props.charId).length !== 0) ? (true) : (false)) 
        console.log("is user favorite?", isUserFavorite)
        setIsUserFavorite(isUserFavorite);
        }
        fetchFavorites();
    }, [props])

    const handleFavorite = (props) =>{

        const variable = {
            userFrom: props.userFrom,
            charId: props.charId,
        }

        axios.post('http://localhost:8080/v1/favorite', variable)
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

    const handleUnfavorite = (props) =>{

        const variable = {
            userFrom: props.userFrom,
            charId: props.charId,
        }

        axios.delete('http://localhost:8080/v1/favorite', { data:  variable })
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
        <div>
            { isUserFavorite ? (
                    <FavoriteIcon onClick={()=>{handleUnfavorite(props)}}/>
                ) : (
                    <FavoriteBorderIcon onClick={()=>{handleFavorite(props)}}/>
                )
            }
        </div>
    )
}
