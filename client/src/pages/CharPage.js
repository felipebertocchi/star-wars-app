import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function CharPage( {data} ) {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchPeople() {
            axios.get('http://localhost:8080/v1/character')
                .then(resp => {
                    setPeople(resp.data.results);
                });
            }
            fetchPeople();
            }, [])
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
                <h1 style={{color: 'white'}}> Personajes </h1>
                    <Grid container>
                        <Grid container>
                            {people.map((char, i) => {
                                return (
                                    <SimpleCard key={i} data={char} goesTo={'/character/'}/>
                                )
                            })}
                        </Grid>
                    </Grid>
            </div>
        </>
    )
}