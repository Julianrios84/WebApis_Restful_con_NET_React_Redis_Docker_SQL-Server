import { Avatar, Button, Card, Container, Grid, Icon, TextField, Typography } from '@material-ui/core';
import React, {useState} from 'react';
import useStyles from '../../theme/useStyles';
import { Link } from 'react-router-dom';
import { signIn } from '../../actions/user.action';
import { useStateValue } from '../../context/store';

const clearUser = {
    email: '',
    password: ''
}

const Login = (props) => {
    const classes = useStyles();

    const [{ session }, dispatch] = useStateValue();
    console.log("🚀 ~ file: Login.js ~ line 17 ~ Login ~ session", session)

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const signInEvent = () => {
        signIn(user, dispatch).then(resp => {
            if(resp.status === 200) {
                console.log("🚀 ~ file: Login.js ~ line 31 ~ signIn ~ resp", resp)
                window.localStorage.setItem("token", resp.data.token)
                props.history.push('/');
            }else {
                dispatch({ type: "OPEN_SNACKBAR", payload: { open: true, message: "Credentials incorrect!" }})
                console.log('Credentials incorrect!')
            }
        })
        setUser(clearUser);
    }

    return (
        <Container className={classes.containermt}>
            <Grid container justifyContent="center">
                <Grid item lg={5} md={6}>
                    <Card className={classes.card} align="center">
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>person</Icon>
                        </Avatar>
                        <Typography variant="h5" color="primary">Ingrese su Usuario</Typography>
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    name='email'
                                    value={user.email}
                                    onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    name='password'
                                    autoComplete='false'
                                    value={user.password}
                                    onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.gridmb}>
                                    <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={signInEvent}>
                                        Ingresar
                                    </Button>
                                </Grid>
                            </Grid>
                            <Link
                            to="/registrar"
                            variant="body1"
                            className={classes.link}
                            >
                            ¿No tienes cuenta?, Registrate
                            </Link>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;