import {Grid} from '@material-ui/core'
import SimpleCard from '../components/Card'

export default function CharPage( {data} ) {
    return (
        <>
            <div style={{width:'80%', margin:'0 auto'}}>
                <h1 style={{color: 'white'}}> Personajes </h1>
                    <Grid container>
                        <Grid container>
                            {data.map((people, i) => {
                                return (
                                    <SimpleCard key={i} data={people} goesTo={'/character/'}/>
                                )
                            })}
                        </Grid>
                    </Grid>
            </div>
        </>
    )
}