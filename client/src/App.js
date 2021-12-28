import NavBar from "./components/Navbar";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import CharPage from './pages/CharPage';
import PlanetPage from './pages/PlanetPage';
import FilmPage from './pages/FilmPage';
import NotFoundPage from './pages/NotFoundPage';
// import Layout from '../components/layouts/Layout';
import routes from './helpers/routes';
import axios from 'axios';
import CharDetailPage from './pages/CharDetailPage';
import PlanetDetailPage from './pages/PlanetDetailPage';
import FilmDetailPage from './pages/FilmDetailPage';
import Breadcrumbs from './components/Breadcrumbs';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
        <Router>
        <NavBar />
          {/* <Layout> */}
          <Breadcrumbs/>
          <div>
            <Switch>
              <Route exact path={routes.home} component={HomePage} />
              <Route exact path={routes.login} component={Login} />

              <Route exact path={routes.character}>
                <CharPage/>
              </Route>
              <Route exact path={routes.planet}>
                <PlanetPage/>
              </Route>
              <Route exact path={routes.film}>
                <FilmPage/>
              </Route>
              
              <Route exact path={routes.charDetail} render={(props) => <CharDetailPage {...props} />} />
              <Route exact path={routes.planetDetail} render={(props) => <PlanetDetailPage {...props} />} />
              <Route exact path={routes.filmDetail} render={(props) => <FilmDetailPage {...props} />} />
    
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </div>
          {/* </Layout> */}
        </Router>
    </div>
  );
}

export default App;
