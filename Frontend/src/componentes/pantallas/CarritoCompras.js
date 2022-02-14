import { Button, CardMedia, Container, Divider, Grid, Icon, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from '../../theme/useStyles';
import { ProductoArray } from '../data/dataPrueba';
import { useStateValue } from '../../context/store'

const CarritoCompras = (props) => {

    const [{shoppingcart}, dispatch] = useStateValue();

    const shoppingcartitems = shoppingcart ? shoppingcart.items : []
    let sum = 0;
    shoppingcartitems.forEach(product => {
        sum = sum + product.price;
    })

    const purchase = () => {
        props.history.push("/procesoCompra");
    }
    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Typography variant="h4" className={classes.text_title}>
                CARRITO DE COMPRAS
            </Typography>
            <Grid container spacing={2}>
                <Grid item lg={9} md={8} sm={12} xs={12}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                { shoppingcartitems.map(item => (
                                    <TableRow key={item.key}>
                                        <TableCell>
                                            <CardMedia 
                                            className={classes.imgProductoCC}
                                            image={item.picture ? item.picture : "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000"}
                                            title={item.product}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography className={classes.text_detalle}>
                                                {item.product}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography className={classes.text_detalle}>
                                                ${item.price}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography className={classes.text_detalle}>
                                                ${item.quantity}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <Icon>delete</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12}>
                    <Paper variant="outlined" square className={classes.papperPadding}>
                        <Typography variant="h6" className={classes.text_title}>
                            SUBTOTAL ({shoppingcartitems.length}) PRODUCTOS
                        </Typography>
                        <Typography className={classes.text_title}>
                            $143.46
                        </Typography>
                        <Divider className={classes.gridmb}/>
                        <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={purchase}>
                            REALIZAR COMPRA
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CarritoCompras;