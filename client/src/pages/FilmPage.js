import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'

export default function FilmPage( {data} ) {
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
            <h1 style={{color: 'white'}}> Películas </h1>
                <Grid container>
                    {data.map((films, i) => {
                        return (
                            <SimpleCard key={i} data={films} goesTo={'/film/'}/>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}