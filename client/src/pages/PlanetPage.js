import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'

export default function PlanetPage( {data} ) {
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
                <h1 style={{color: 'white'}}> Planetas </h1>
                <Grid container>
                    {data.map((planets, i) => {
                        return (
                            <SimpleCard key={i} data={planets} goesTo={'/planet/'}/>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}