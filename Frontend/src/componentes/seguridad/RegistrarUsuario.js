import { Avatar, Button, Card, Container, Grid, Icon, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from '../../theme/useStyles';
import { Link } from 'react-router-dom';
import { signUp } from '../../actions/user.action';
import { useStateValue } from '../../context/store';

const clearUser = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    username: ''
}

const RegistrarUsuario = (props) => {

    const [{ session }, dispatch] = useStateValue();

    const [ user, setUser ] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        username: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const signUpEvent = () => {
        signUp(user, dispatch).then(resp => {
            console.log("🚀 ~ file: RegistrarUsuario.js ~ line 34 ~ signUp ~ resp", resp)
            window.localStorage.setItem("token", resp.data.token)
            props.history.push('/');
        })
        setUser(clearUser);
    }

    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justifyContent="center">
                <Grid item lg={6} md={8}>
                    <Card className={classes.card} align="center">
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>person_add</Icon>
                        </Avatar>
                        <Typography variant="h5" color="primary">Registro de Usuario</Typography>
                    
                        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2}>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Nombre"
                                    variant="outlined"
                                    fullWidth
                                    name="firstname"
                                    value={user.firstname}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Apellidos"
                                    variant="outlined"
                                    fullWidth
                                    name="lastname"
                                    value={user.lastname}
                                    onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Username"
                                    variant="outlined"
                                    fullWidth
                                    name="username"
                                    value={user.username}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={signUpEvent}
                                    type="submit"
                                    >
                                        Registrar
                                    </Button>
                                </Grid>
                            </Grid>
                            <Link
                            to="/login"
                            variant="body1"
                            className={classes.link}
                            >
                            ¿Ya tienes una cuenta?, Logueate
                            </Link>
                        </form>
                    </Card>
                    
                </Grid>
            </Grid>
        </Container>
    );
};

export default RegistrarUsuario;