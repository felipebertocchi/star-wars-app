import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';

export default function CharPage() {
    const {user} = useContext(UserContext)
    const history = useHistory();

    const routeChange = (path) =>{
        history.push(path);
    }
    if (!user) {
        routeChange('/login');
    }
    
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