import Category from "../components/Category";
import Grid from '@material-ui/core/Grid'
import routes from "../helpers/routes";

export default function HomePage() {
    const imageUrl1 = 'https://images.unsplash.com/photo-1513704519535-f5c81aa78d0d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    const imageUrl2 = 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
    const imageUrl3 = 'https://images.unsplash.com/photo-1518331539918-7a2dbf839306?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    return (
        <div>
            <h1 style={{color: 'white'}}>Home Page</h1>
            <Grid container direction="row" justifyContent="space-evenly">
                <Category image={imageUrl1} title={'Personajes'} path={'/character'}/>
                <Category image={imageUrl2} title={'Planetas'} path={'/planet'}/>
                <Category image={imageUrl3} title={'Películas'} path={routes.film}/>
            </Grid>
        </div>
    )
}