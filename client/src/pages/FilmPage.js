import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useState, useEffect } from 'react'
import axios from 'axios';


export default function FilmPage() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        async function fetchFilms() {
            axios.get('http://localhost:8080/v1/filmlist')
                .then(resp => {
                    setFilms(resp.data.result);
                });
            }
            fetchFilms();
            }, [])
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
            <h1 style={{color: 'white'}}> Películas </h1>
                <Grid container>
                    {films.map((film, i) => {
                        return (
                            <SimpleCard key={i} data={film} goesTo={'/film/'}/>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}