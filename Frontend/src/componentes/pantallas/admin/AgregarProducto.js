import {
  Avatar,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../../../theme/useStyles";
import ImageUploader from "react-images-upload";
import { addProduct } from "../../../actions/product.action";
import { v4 as uuidv4 } from "uuid";

const AgregarProducto = (props) => {
  const pictureDefault = "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";
  const [category, setCategory] = useState("");
  const [mark, setMark] = useState("");
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    stock: 0,
    markId: 0,
    categoryId: 0,
    price: 0.0,
    pricture: "",
    file: "",
    temp: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleMarkChange = (event) => {
    setMark(event.target.value);
  };

  const handlePrictureChange = (prictures) => {
    let picture = prictures[0];
    let url = "";
    try {
      url = URL.createObjectURL(picture);
    } catch (e) {
      console.log(e)
    }
    setProduct((previous) => ({
      ...previous,
      file: picture,
      temp: url
    }));
  };

  const saveProduct = async () => {
    product.categoryId = category;
    product.markId = mark;
    const result = await addProduct(product);
    console.log(
      "🚀 ~ file: AgregarProducto.js ~ line 61 ~ saveProduct ~ result",
      result
    );
    props.history.push('/admin/listaProductos')
  };

  const keyPicture = uuidv4();

  const classes = useStyles();
  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            AGREGAR PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              label="Nombre Producto"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{ shrink: true }}
              name="name"
              value={product.name}
              onChange={handleChange}
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
            <TextField
              label="Descripcion"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              name="description"
              value={product.description}
              onChange={handleChange}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="mark-select-label">Marca</InputLabel>
              <Select
                labelId="mark-select-label"
                id="mark-select"
                value={mark}
                onChange={handleMarkChange}
              >
                <MenuItem value={1}>Nike</MenuItem>
                <MenuItem value={2}>Adidas</MenuItem>
                <MenuItem value={3}>Maldiva</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="category-select-label">Categoria</InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={category}
                onChange={handleCategoryChange}
              >
                <MenuItem value={1}>Verano</MenuItem>
                <MenuItem value={2}>Invierno</MenuItem>
                <MenuItem value={3}>Primavera</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <ImageUploader
                  singleImage={true}
                  key={keyPicture}
                  withIcon={true}
                  buttonText="Buscar Imagen"
                  imgExtension={[".jpg", ".jpeg", ".png", ".gif"]}
                  maxFileSize={5242880}
                  onChange={handlePrictureChange}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <Avatar
                  variant="square"
                  className={classes.avatarProducto}
                  src={
                    product.temp
                      ? product.temp
                      : (product.pricture ? product.pricture : pictureDefault)
                  }
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={saveProduct}>
              AGREGAR
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AgregarProducto;
