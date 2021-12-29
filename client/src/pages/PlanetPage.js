import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';


export default function PlanetPage() {
    const {user} = useContext(UserContext)
    const history = useHistory();

    const routeChange = (path) =>{
        history.push(path);
    }
    if (!user) {
        routeChange('/login');
    }

    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        async function fetchPlanets() {
            axios.get('http://localhost:8080/v1/planetlist')
                .then(resp => {
                    setPlanets(resp.data.results);
                });
            }
            fetchPlanets();
            }, [])
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
                <h1 style={{color: 'white'}}> Planetas </h1>
                <Grid container>
                    {planets.map((planet, i) => {
                        return (
                            <SimpleCard key={i} data={planet} goesTo={'/planet/'}/>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}