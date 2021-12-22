import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/LoginPage';
import CharPage from '../pages/CharPage';
import NotFoundPage from '../pages/NotFoundPage';
// import Layout from '../components/layouts/Layout';
import routes from '../helpers/routes';

export default function AppRouter() {
    return (
        <div>
            <Router>
                {/* <Layout> */}
                    <Switch>
                        <Route exact path={routes.home} component={HomePage} />
                        <Route exact path={routes.login} component={Login} />
                        <Route exact path={routes.character} component={CharPage}/>

                        <Route path="*" component={NotFoundPage} />
                    </Switch>
                {/* </Layout> */}
            </Router>
        </div>
    )
}
