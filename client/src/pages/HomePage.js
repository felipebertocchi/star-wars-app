import Category from "../components/Category";
import Grid from '@material-ui/core/Grid'
import routes from "../helpers/routes";
import { useHistory } from "react-router-dom";
import { useContext } from 'react'
import { UserContext } from '../components/UserContext';


export default function HomePage() {
    const {user} = useContext(UserContext)
    const history = useHistory();

    const routeChange = (path) =>{
        history.push(path);
    }
    if (!user) {
        routeChange('/login');
    }

    const imageUrl1 = 'https://www.diariovivo.com/wp-content/uploads/2019/11/starwars2.jpg'
    const imageUrl2 = 'https://i.ytimg.com/vi/3lJeq573tVY/maxresdefault.jpg'
    const imageUrl3 = 'https://images.unsplash.com/photo-1518331539918-7a2dbf839306?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80'
    
    return (
        <div style={{width:'90%', margin:'70px auto'}}>
            <Grid container justifyContent="space-evenly">
                <Category image={imageUrl1} title={'Personajes'} path={routes.character}/>
                <Category image={imageUrl2} title={'Planetas'} path={routes.planet}/>
                <Category image={imageUrl3} title={'Películas'} path={routes.film}/>
            </Grid>
        </div>
    )
}