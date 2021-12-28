import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'
import { useState, useEffect } from 'react'
import axios from 'axios';


export default function PlanetPage() {
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