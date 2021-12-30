import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function FilmPage() {
    const [loading, setLoading] = useState(false);
    const {user} = useContext(UserContext)
    const history = useHistory();

    const routeChange = (path) =>{
        history.push(path);
    }
    if (!user) {
        routeChange('/login');
    }
    
    const [films, setFilms] = useState([]);

    useEffect(() => {
        async function fetchFilms() {
            setLoading(true);
            axios.get('http://localhost:8080/v1/filmlist')
                .then(resp => {
                    setFilms(resp.data.result);
                    setLoading(false);
                });
            }
            fetchFilms();
            }, [])
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
            <h1 style={{color: 'white'}}> Películas </h1>
                <Grid container>
                    {(loading) ? (
                        <Backdrop open={true}>
                            <CircularProgress color="primary" />
                        </Backdrop>
                    ) : (<>
                        {films.map((film, i) => {
                            return (
                                <SimpleCard key={i} data={film} goesTo={'/film/'}/>
                            )
                        })}
                    </>)}
                </Grid>
            </div>
        </>
    )
}