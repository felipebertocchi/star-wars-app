import React from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@material-ui/core'
import VpnKeyIcon from '@material-ui/icons/VpnKey';

export default function Login() {
    const paperStyle={padding:"60px 40px", width:300, margin:"40px auto"}
    const avatarStyle={backgroundColor:'purple'}
    const formStyle={height:'60%', }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid height={1} align='center'>
                    <Avatar style={avatarStyle}><VpnKeyIcon/></Avatar>
                    <h2>Iniciar Sesión</h2>
                    <form style={formStyle} noValidate autoComplete="off">
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth required type='email'/>
                        <TextField id="outlined-basic" label="Contraseña" variant="outlined" fullWidth required type='password'/>
                        <Button type='submit' variant='contained' color='primary' fullWidth>Iniciar Sesión</Button>
                    </form>
                </Grid>
            </Paper>
        </Grid>
    );
}


// const Login = () => {
//     const paperStyle={padding:"60px 40px", width:300, margin:"40px auto"}
//     const avatarStyle={backgroundColor:'purple'}
//     const formStyle={height:'60%', }
//     return(
//         <Grid>
//             <Paper elevation={10} style={paperStyle}>
//                 <Grid height={1} align='center'>
//                     <Avatar style={avatarStyle}><VpnKeyIcon/></Avatar>
//                     <h2>Iniciar Sesión</h2>
//                     <form style={formStyle} noValidate autoComplete="off">
//                         <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth required type='email'/>
//                         <TextField id="outlined-basic" label="Contraseña" variant="outlined" fullWidth required type='password'/>
//                         <Button type='submit' variant='contained' color='primary' fullWidth>Iniciar Sesión</Button>
//                     </form>
//                 </Grid>
//             </Paper>
//         </Grid>
//     );
// }