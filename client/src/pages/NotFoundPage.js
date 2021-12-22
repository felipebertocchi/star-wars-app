import { Button } from '@material-ui/core'
import routes from '../helpers/routes'

export default function NotFoundPage() {
    return (
        <div align='center'>
            <h1 style={{color: 'white'}}>404 Not Found</h1>
            <Button variant="contained" color="secondary" href={routes.home}>
                Volver a la página de inicio
            </Button>
        </div>
    )
}