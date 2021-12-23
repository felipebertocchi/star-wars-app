import { useState, useEffect } from 'react'
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

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      axios.get('http://localhost:8080/v1/character')
        .then(resp => {
          setPeople(resp.data.results);
        });
    }

    async function fetchPlanets() {
      axios.get('http://localhost:8080/v1/planetlist')
        .then(resp => {
          setPlanets(resp.data.results);
        });
    }

    async function fetchFilms() {
      axios.get('http://localhost:8080/v1/filmlist')
        .then(resp => {
          setFilms(resp.data.result);
        });
    }

    fetchPeople();
    fetchPlanets();
    fetchFilms();
  }, [])
  return (
    <div className="App">
      <NavBar />
      <Router>
        {/* <Layout> */}
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <Route exact path={routes.login} component={Login} />

          <Route exact path={routes.character}>
            <CharPage data={people}/>
          </Route>
          <Route exact path={routes.charDetail} render={(props) => <CharDetailPage {...props} />} />
          <Route exact path={routes.planet}>
            <PlanetPage data={planets} />
          </Route>
          <Route exact path={routes.planetDetail} render={(props) => <PlanetDetailPage {...props} />} />
          <Route exact path={routes.film}>
            <FilmPage data={films} />
          </Route>

          <Route path="*" component={NotFoundPage} />
        </Switch>
        {/* </Layout> */}
      </Router>
    </div>
  );
}

export default App;
