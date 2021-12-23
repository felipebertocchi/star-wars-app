import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'

export default function FilmPage( {data} ) {
    console.log(data)
    return (
        <>
            <h1 style={{color: 'white'}}> Películas </h1>
            <Grid container>
                {data.map((films, i) => {
                    return (
                        <SimpleCard key={i} data={films} goesTo={'/film/'}/>
                    )
                })}
            </Grid>
        </>
    )
}