import { Button, Container, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useState, useEffect } from 'react';
import useStyles from '../../../theme/useStyles';
import { getUsers } from '../../actions/user.action';
import { withRouter } from 'react-router-dom';

const Usuarios = (props) => {
    const classes = useStyles();

    const [paginationOrSearch, setPaginationOrSearch] = useState({
        page: 1,
        limit: 20,
        search: ''
    })
    const [users, setUsers] = useState({
        count: 0,
        page: 0,
        limit: 0,
        pageCount: 0,
        data: []
    })

    useEffect(() => {
       const getListUsers = async() => {
           const users = await getUsers(paginationOrSearch);
           setUsers(users.data)
       }

       getListUsers();

    }, [paginationOrSearch])


    if(!users.data) {
        return null;
    }

    const handleChange = (event, value) => {
        setPaginationOrSearch(prev => ({
            ...prev,
            page: value
        }))
    }

    const updateUserEvent = (id) => {
        props.history.push("/admin/usuario/" + id);
    }

    return (
        <Container className={classes.containermt}>
            <Typography variant="h4" className={classes.text_title}>
                USUARIOS
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>USUARIO</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>USERNAME</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            users.data.map((user) => {
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName+' '+user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={updateUserEvent(user.id)}
                                        >
                                            <Icon>edit</Icon>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })
                        }                       
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={users.pageCount} page={users.page} onChange={handleChange} />
        </Container>
    );
};

export default withRouter(Usuarios);