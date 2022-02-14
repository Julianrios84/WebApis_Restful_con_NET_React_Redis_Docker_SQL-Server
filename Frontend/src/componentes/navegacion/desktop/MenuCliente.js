import { Avatar, Button, Icon, ListItem, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import useStyles from '../../../theme/useStyles';
import { useStateValue } from '../../../context/store';

const MenuCliente = (props) => {

    const pictureDefault = "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";

    const [{ session }, dispatch] = useStateValue();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const closeSession = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        dispatch({ type: "LOGOUT", payload: null, loggedIn: false })
        // dispatch({ type: "OPEN_SNACKBAR", payload: { open: true, message: "Credentials incorrect!" }})
        props.history.psuh("/login");
    }

    const classes = useStyles();
    return (
        <>
            <Button color="inherit" className={classes.buttonIcon}>
                <Link className={classes.linkAppBarDesktop} to="/carrito">
                    <Icon className={classes.mr}>shopping_cart</Icon>
                    MIS PEDIDOS
                </Link>
            </Button>
            <div>
                <Button color="inherit" className={classes.buttonIcon}
                onClick={handleClick}>
                    <div className={classes.linkAppBarDesktop}>
                        <Avatar 
                        alt="mi imagen"
                        className={classes.avatarPerfilAppBar}
                        src={session ? (session.user.picture ? session.user.picture : pictureDefault) : pictureDefault}
                        />
                        { session ? (session.loggedIn ? session.user.userName : 'Sign In') : 'Sign In'}
                        <Icon>keyboard_arrow_down</Icon>
                    </div>
                </Button>
                <Menu
                elevation={2}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                    <MenuItem className={classes.listItem} onClick={handleClose}>
                        <Link className={classes.linkAppBarMobile} to="/perfil">
                            <ListItemIcon className={classes.listItemIcon}>
                                <Icon>person</Icon>
                            </ListItemIcon>
                            <ListItemText>Mi Perfil</ListItemText>
                        </Link>
                    </MenuItem>
                    <MenuItem className={classes.listItem} onClick={handleClose}>
                        <Link className={classes.linkAppBarMobile} to="/">
                            <ListItemIcon className={classes.listItemIcon}>
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItem button onClick={closeSession}>
                                <ListItemText>Cerrar Sesion</ListItemText>
                            </ListItem>

                        </Link>
                    </MenuItem>
                </Menu>
            </div>
        </>
    );
};

export default withRouter(MenuCliente);