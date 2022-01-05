import React from 'react'
import { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import { UserContext } from '../components/UserContext';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';

export default function Login() {
    const paperStyle={padding:"45px 35px", width:300, margin:"40px auto"}
    const avatarStyle={backgroundColor:'purple'}
    const formStyle={marginTop: '20px'}
    const history = useHistory();
    const { user, setUser } = useContext(UserContext)

    const routeChange = (path) =>{
        history.push(path);
    }

    if (user) {
        routeChange('/');
    }

    const [formValue, setformValue] = useState({email: '', password: ''});
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('/v1/login', {
            email: formValue.email,
            password: formValue.password
        })
        .then(function (response) {
            setUser(response.data);
            localStorage.setItem("currentUser",JSON.stringify(response.data));
            routeChange('/');
        })
        .catch(function (error) {
            setErrorMessage(error.response.data);
        });
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return(
        <Grid data-test-id="login">
            <Paper elevation={10} style={paperStyle}>
                <Grid height={1} align='center'>
                    <Avatar style={avatarStyle}><VpnKeyIcon/></Avatar>
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField data-test-id="login-email" style={formStyle} onChange={handleChange} label="Email" variant="outlined" fullWidth required type='email' name='email' value={formValue.email}/>
                        <TextField data-test-id="login-password" style={formStyle} onChange={handleChange} label="Contraseña" variant="outlined" fullWidth required type='password' name='password' value={formValue.password}/>
                        <Button data-test-id="sign-in" style={formStyle} type='submit' variant='contained' color='primary' fullWidth>Iniciar Sesión</Button>
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );
}
