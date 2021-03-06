import React from 'react';
import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { AppBar, Grid, Toolbar, IconButton, Button, Drawer, Divider, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PublicIcon from '@material-ui/icons/Public';
import MovieIcon from '@material-ui/icons/Movie';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserContext } from './UserContext';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';

const drawerWidth = 350;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  }
}));

export default function NavBar() {
  const classes = useStyles();
  const { user } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const routeChange = (path) => {
    history.push(path);
    setOpen(false);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar} style={{ background: '#2E3B55', zIndex: '10' }}>
        <Toolbar>
          <Grid container justifyContent='space-between'>
          { user ? (
            <IconButton color="inherit" aria-label="menu">
              <MenuIcon data-test-id="appbar-menu" onClick={handleDrawerOpen} fontSize='large' />
            </IconButton>
          ) : (<></>)}
            <div style={{ margin: '10px auto' }}>
              <Link data-test-id="appbar-logo" component='button' onClick={()=>{routeChange('/')}}>
                <img src='http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG11.png' alt='star-wars-logo' height='70' align='center' />
              </Link>
            </div>
            { user ? <SearchBar /> : (<></>)}
            { user ? (
              <Button color="inherit">
                <UserMenu>
                  {user.name}
                  <AccountCircleIcon fontSize='large' style={{ marginLeft: '8px' }} />
                </UserMenu>
              </Button>
            ) : (
              <Button color="inherit">
                Login
              </Button>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={handleDrawerClose} className={classes.drawer}>
        <div style={{ width: '250px', marginTop: '30px', overflow: 'auto' }}>
          <Divider />
          <List>
            <ListItem data-test-id="appbar-menu-favorites" button onClick={()=>{routeChange('/favorite')}}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary='Favorites' />
            </ListItem>
            <ListItem data-test-id="appbar-menu-characters" button onClick={()=>{routeChange('/character')}}>
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              <ListItemText primary='Characters' />
            </ListItem>
            <ListItem data-test-id="appbar-menu-planets" button onClick={()=>{routeChange('/planet')}}>
              <ListItemIcon>
                <PublicIcon />
              </ListItemIcon>
              <ListItemText primary='Planets' />
            </ListItem>
            <ListItem data-test-id="appbar-menu-films" button onClick={()=>{routeChange('/film')}}>
              <ListItemIcon>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText primary='Films' />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
