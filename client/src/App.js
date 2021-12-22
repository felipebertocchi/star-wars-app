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

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch('https://www.swapi.tech/api/people')
      let data = await res.json();
      setPeople(data.results);
    }

    async function fetchPlanets() {
      let res = await fetch('https://www.swapi.tech/api/planets')
      let data = await res.json();
      setPlanets(data.results);
    }

    async function fetchFilms() {
      let res = await fetch('https://www.swapi.tech/api/films')
      let data = await res.json();
      setFilms(data.result);
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
            <CharPage data={people} />
          </Route>
          <Route exact path={routes.planet}>
            <PlanetPage data={planets} />
          </Route>
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
