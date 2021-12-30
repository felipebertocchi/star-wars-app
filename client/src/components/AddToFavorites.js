import { useEffect } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';

export default function AddToFavorites(props) {
    const handleFavorite = (props) =>{

        const variable = {
            userFrom: props.userFrom,
            charId: props.charId,
        }

        axios.post('http://localhost:8080/v1/favorite', variable)
            .then(res => {
                console.log(res)
                if (res.data.success) {
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            // .then(function (response) {
            //     routeChange('/...');
            // })
    }

    const handleUnfavorite = (props) =>{

        const variable = {
            userFrom: props.userFrom,
            charId: props.charId,
        }

        axios.delete('http://localhost:8080/v1/favorite', { data:  variable })
            .then(res => {
                console.log(res)
                if (res.data.success) {
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            // .then(function (response) {
            //     routeChange('/...');
            // })
    }

    return (
        <div>
            <FavoriteBorderIcon onClick={()=>{handleFavorite(props)}}/>
            <FavoriteIcon onClick={()=>{handleUnfavorite(props)}}/>
            {/* {
                ? (
                    <FavoriteBorderIcon onClick={()=>{handleFavorite(props)}}/>
                ) : (
                    <FavoriteIcon onClick={()=>{handleUnfavorite(props)}}/>
                )
            } */}
        </div>
    )
}
