import { useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import ListItem from '@material-ui/core/ListItem';
import { useHistory } from "react-router-dom";

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  searchBar: {
    margin: 'auto 20px',
    position: 'relative'
  },
  dataResult: {
    backgroundColor: 'white',
    borderRadius: '0 0 5px 5px',
    position: 'absolute',
    width: '100%'
  },
  dataItem: {
    display: 'block',
    color: 'black',
    padding: '10px'
  }
}));

export default function SearchBar() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function fetchPeople() {
      const resp = await axios.get('http://localhost:8080/v1/character')
      setData(resp.data.results);
    }
    fetchPeople();
  }, [])


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((char) => {
      return char.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }

  const history = useHistory();

  const routeChange = (charId) =>{
    history.push('/character/' + charId);
    setFilteredData([]);
  }

  const classes = useStyles();

  return (
    <div className={classes.searchBar}>
      <div className={classes.search}>
        <div className="searchInputs">
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleFilter}
          />
        </div>
      </div>
          {(filteredData.length > 0) ? (
            <div className={classes.dataResult}>
              {filteredData.slice(0, 5).map((char, key) => {
                return (
                <ListItem button className={classes.dataItem} >
                  {char.name}
                </ListItem>
                );
              })}
            </div>
          ) : (
            <div className="dataResult">
            </div>
          )
          }
    </div>
  )
}
