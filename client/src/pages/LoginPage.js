import React from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';

export default function Login() {
    const paperStyle={padding:"60px 40px", width:300, margin:"40px auto"}
    const avatarStyle={backgroundColor:'purple'}
    const formStyle={height:'60%', }
    const history = useHistory();

    const routeChange = (path) =>{
        history.push(path);
    }

    const [formValue, setformValue] = useState({email: '', password: ''});

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:8080/v1/login', {
            email: formValue.email,
            password: formValue.password
        })
        .then(function (response) {
            console.log(response);
            routeChange('/');
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid height={1} align='center'>
                    <Avatar style={avatarStyle}><VpnKeyIcon/></Avatar>
                    <h2>Iniciar Sesión</h2>
                    <form style={formStyle} onSubmit={handleSubmit} noValidate autoComplete="off">
                        <TextField onChange={handleChange} id="outlined-basic" label="Email" variant="outlined" fullWidth required type='email' name='email' value={formValue.email}/>
                        <TextField onChange={handleChange} id="outlined-basic" label="Contraseña" variant="outlined" fullWidth required type='password' name='password' value={formValue.password}/>
                        <Button type='submit' variant='contained' color='primary' fullWidth>Iniciar Sesión</Button>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );
}
