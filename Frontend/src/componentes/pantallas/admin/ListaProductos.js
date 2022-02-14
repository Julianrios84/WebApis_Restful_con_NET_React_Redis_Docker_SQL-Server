import { Button, Container, Grid, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import React, { useState, useEffect } from 'react';
import useStyles from '../../../theme/useStyles';
import { getProducts } from '../../actions/product.action';

const ListaProductos = (props) => {
    const classes = useStyles();
    const [paginationOrSearch, setPaginationOrSearch] = useState({
        page: 1,
        limit: 20,
        search: ''
    })

    const [products, setProducts] = useState({
        count: 0,
        page: 0,
        limit: 0,
        pageCount: 0,
        data: []
    })

    useEffect(() => {
        const getListProducts = async() => {
            const products = await getProducts(paginationOrSearch);
            setProducts(products.data)
        }
 
        getListProducts();
     }, [paginationOrSearch])

     const handleChange = (event, value) => {
        setPaginationOrSearch(prev => ({
            ...prev,
            page: value
        }))
    }

    const agregarProducto = () => {
        props.history.push("/admin/agregarProducto");
    }

    const editaProducto = (id) => {
        props.history.push("/admin/editarProducto/" + id)
    }

    return (
        <Container className={classes.containermt}>
            <Grid container>
                <Grid item lg={6} sm={6} xs={12}>
                    <Typography variant="h4" className={classes.text_title}>
                        PRODUCTOS
                    </Typography>
                </Grid>
                <Grid item lg={6} sm={6} xs={12}>
                    <Button
                    variant="contained"
                    color="inherit"
                    className={classes.buttonAgregar}
                    onClick={agregarProducto}>
                        <Icon>add</Icon>
                        AGREGAR PRODUCTO
                    </Button>
                </Grid>
            </Grid>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NOMBRE</TableCell>
                            <TableCell>PRECIO</TableCell>
                            <TableCell>MARCA</TableCell>
                            <TableCell>CATEGORIA</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { products.data.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.markName}</TableCell>
                            <TableCell>{product.categoryName}</TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={() => editaProducto(product.id)}>
                                    <Icon>edit</Icon>
                                </Button>
                                <Button
                                variant="contained"
                                color="secondary">
                                    <Icon>delete</Icon>
                                </Button>
                            </TableCell>
                        </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={products.pageCount} page={products.page} onChange={handleChange} />
        </Container>
    );
};

export default ListaProductos;