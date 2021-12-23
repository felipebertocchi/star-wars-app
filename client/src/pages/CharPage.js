import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'

export default function CharPage( {data} ) {
    return (
        <>
            <h1 style={{color: 'white'}}> Personajes </h1>
            <Grid container>
                {data.map((people, i) => {
                    return (
                        <SimpleCard key={i} data={people} goesTo={'/character/'}/>
                    )
                })}
            </Grid>
        </>
    )
}