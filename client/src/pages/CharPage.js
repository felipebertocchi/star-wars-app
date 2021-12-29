import { Grid } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import SimpleCard from '../components/Card'
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../components/UserContext';
import axios from 'axios';

export default function CharPage() {
  const { user } = useContext(UserContext)
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
  }
  if (!user) {
    routeChange('/login');
  }

  const [people, setPeople] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [peoplePerPage] = useState(12)

  useEffect(() => {
    async function fetchPeople() {
    const resp = await axios.get('http://localhost:8080/v1/character')
    setPeople(resp.data.results);
    }
    fetchPeople();
  }, [])

  const indexOfLastChar = currentPage * peoplePerPage;
  const indexOfFirstChar = indexOfLastChar - peoplePerPage;
  const currentPeople = people.slice(indexOfFirstChar, indexOfLastChar);
  const numPages = Math.ceil(people.length / peoplePerPage);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div style={{ width: '80%', margin: '0 auto' }}>
        <h1 style={{ color: 'white' }}> Personajes </h1>
        <Grid container>
          <Grid container>
            {currentPeople.map((char, i) => {
              return (
                <SimpleCard key={i} data={char} goesTo={'/character/'} />
              )
            })}
          </Grid>
        </Grid>
        <div style={{backgroundColor: 'white', margin: '20px auto', width: 'fit-content', borderRadius: '100px'}}>
          <Pagination count={numPages} page={currentPage} onChange={handleChange} shape="round" color="primary" siblingCount={numPages}/>
        </div>
      </div>
    </>
  )
}