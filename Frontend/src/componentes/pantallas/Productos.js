import React, { useState, useEffect } from 'react';

import Pagination from '@material-ui/lab/Pagination';
import { Avatar, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from '@material-ui/core';
import useStyles from '../../theme/useStyles';
import { getProducts } from '../../actions/product.action';
import { useStateValue } from '../../context/store'

const Productos = (props) => {

    const [{shoppingcart}, dispatch] = useStateValue();
    const classes = useStyles();

    const [paginationOrSearch, setPaginationOrSearch] = useState({
        page: 1,
        limit: 2,
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

    const viewProduct = async (item) => {
        // await addItem(shoppingcart, item, dispatch);
        props.history.push("/detalleProducto/" + item.id);
    }

    if(!products.data) {
        return null;
    }

    const handleChange = (event, value) => {
        setPaginationOrSearch(prev => ({
            ...prev,
            page: value
        }))
    }

    return (
        <Container className={classes.containermt}>
            <Typography variant="h4" className={classes.text_title}>
                Productos
            </Typography>
            <Grid container spacing={4}>
                { products.data.map(item => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
                    <Card>
                        <CardMedia
                        className={classes.media}
                        image="https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000"
                        title="mi producto"
                        >
                            <Avatar variant="square" className={classes.price}>
                                ${item.price}
                            </Avatar>
                        </CardMedia>
                        <CardContent>
                            <Typography variant="h6" className={classes.text_card}>
                                {item.name}
                            </Typography>
                            <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => viewProduct(item)}>
                                MAS DETALLES
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
            </Grid>
            <Pagination count={products.pageCount} page={products.page} onChange={handleChange} />
        </Container>
    );
};

export default Productos;