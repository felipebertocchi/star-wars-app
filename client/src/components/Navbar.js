import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

export default function NavBar() {
    return (
        <div>
            <AppBar position="static" style={{ background: '#2E3B55' }}>
                <Toolbar>
                    <Grid container direction="row" justifyContent="space-between">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <div>
                            <img src='http://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG11.png' height='70' align='center'/>
                        </div>
                        {/* <Button color="inherit">
                            <FavoriteIcon/>
                            Favorites
                        </Button> */}
                        <Button color="inherit">
                            Login
                        </Button>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
