import {
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getProduct } from "../../actions/product.action";
import useStyles from "../../theme/useStyles";
import { addItem } from '../../actions/shoppingcart.action';
import { useStateValue } from '../../context/store'

const DetalleProducto = (props) => {

  const [{shoppingcart}, dispatch] = useStateValue();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    stock: 0,
    markId: 0,
    markName: "",
    categoryId: 0,
    categoryName: "",
    price: 0.0,
    pricture: "",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = props.match.params.id;
    const getProductAsync = async () => {
      const response = await getProduct(id);
      setProduct(response.data)
    };

    getProductAsync();
  }, [product]);

  const addCart = async() => {
    const item = {
      id: product.id,
      product: product.name,
      price: product.price,
      quantity: quantity,
      mark: product.markName,
      category: product.categoryName
    };
    
    await addItem(shoppingcart, item, dispatch);
    props.history.push("/carrito");
  };

  const classes = useStyles();
  return (
    <Container className={classes.containermt}>
      <Typography variant="h4" className={classes.text_title}>
        { product.name }
      </Typography>
      <Grid container spacing={4}>
        <Grid item lg={8} md={8} xs={12}>
          <Paper className={classes.PaperImg} variant="outlined" square>
            <CardMedia
              className={classes.mediaDetalle}
              image={product.pricture ? product.pricture : "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000"}
              title={product.description}
            />
          </Paper>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Precio</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">{product.price}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2">Cantidad</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="quantity-product"
                      label=""
                      type="number"
                      value={quantity}
                      onChange={event => setQuantity(event.target.value)}
                      defaultValue={1}
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={addCart}
                    >
                      Agregar a Carrito
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={8} md={8} xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography className={classes.text_detalle}>
                Precio: {product.price}
              </Typography>
              <Typography className={classes.text_detalle}>
                Unidades Disponibles: {product.stock}
              </Typography>
              <Typography className={classes.text_detalle}>
                Marca: {product.markName}
              </Typography>
              <Typography className={classes.text_detalle}>
                Temporada: {product.categoryName}
              </Typography>
            </Grid>
            <Grid item md={6}>
              <Typography className={classes.text_detalle}>
                Descripcion:
              </Typography>
              <Typography className={classes.text_detalle}>
                {product.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetalleProducto;
