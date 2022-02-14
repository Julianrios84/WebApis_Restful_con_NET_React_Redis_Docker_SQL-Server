import { Button, Checkbox, Container, FormControl, FormControlLabel, Grid, TextField, Typography } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import useStyles from '../../../theme/useStyles';
import { getUserById, addRole } from '../../../actions/user.action'
import { withRouter } from 'react-router-dom'
import { useStateValue } from '../../../context/store'

const EditarUsuario = (props) => {

    const [{session}, dispatch] = useStateValue();

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
    })

    const [admin, setAdmin] = useState(false);

    const handleChange = (e) => {
        setAdmin(e.target.checked);
    }

    useEffect(() => {
        const id = props.match.params.id;
        const getUserByIdAsync = async() => {
            const response = await getUserById(id);
            setAdmin(response.data.admin);
            setUser(response.data);
        }

        getUserByIdAsync();
    }, [props.match.params.id])

    const saveUserRole = async (e) => {
        e.preventDefault();
        const id = props.match.params.id;
        const role = {
            name: "ADMIN",
            status: admin
        }

        const response = await addRole(id, role, dispatch);
        if(response.status === 200) {
            props.history.push('/admin/usuarios')
        }else {
            dispatch({
                type: "OPEN_SNACKBAR",
                payload: {
                    open: true,
                    message: 'Unable to add role to this user'
                }
            })
        }
    }


    const classes = useStyles();

    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item lg={6} sm={12}>
                    <Typography variant="h4" className={classes.text_title}>
                        Editar Usuario
                    </Typography>
                    <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
                        <TextField 
                        label="Nombre"
                        variant="filled"
                        value={user.firstname+' '+user.lastname}
                        fullWidth
                        disabled
                        className={classes.gridmb}
                        />
                        <TextField 
                        label="Correo Electronico"
                        variant="filled"
                        value={user.email}
                        fullWidth
                        disabled
                        />
                        <FormControl className={classes.checkbox}>
                            <FormControlLabel 
                            control={<Checkbox color="primary"/>}
                            label="Es Administrador"
                            checked={admin}
                            onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                         variant="contained"
                         color="primary"
                         onClick={saveUserRole}>
                            Actualizar
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default withRouter(EditarUsuario);