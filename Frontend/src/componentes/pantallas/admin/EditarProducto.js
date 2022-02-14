import {
  Avatar,
  Button,
  Container,
  FormControl,
  InputLabel,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem
} from "@material-ui/core";
import React, {useState, useEffect} from "react";
import useStyles from "../../../theme/useStyles";
import ImageUploader from "react-images-upload";
import { getProduct, updateProduct } from "../../actions/product.action";
import { v4 as uuidv4 } from 'uuid';


const EditarProducto = (props) => {
  const pictureDefault = "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";
  const classes = useStyles();

  const keyPicture = uuidv4();

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const id = props.match.params.id;
    const getProductAsync = async () => {
      const response = await getProduct(id);
      setProduct(response.data)
      setCategory(response.data.categoryId);
      setMark(response.data.markId);
    };

    getProductAsync();
  }, [product]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  }

  const handleMarkChange = (event) => {
    setMark(event.target.value);
  }

  const handlePrictureChange = (prictures) => {
    let picture = prictures[0];
    let url = "";
    try {
      url = URL.createObjectURL(picture);
    } catch (e) {
      console.log(e)
    }
    setProduct(previous => ({
      ...previous,
      file: picture,
      temp: url
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct(previous => ({
      ...previous,
      [name]: value
    }))
  }

  const saveProduct = async () => {
    product.categoryId = category;
    product.markId = mark;
    const id = props.match.params.id;
    const result = await updateProduct(id, product);
    console.log("🚀 ~ file: EditarProducto.js ~ line 82 ~ saveProduct ~ result", result)
    props.history.push('/admin/listaProductos')
  }



  return (
    <Container className={classes.containermt}>
      <Grid container justify="center">
        <Grid item sm={6} xs={12}>
          <Typography variant="h4" className={classes.text_title}>
            EDITAR PRODUCTO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <TextField
              label="Nombre Producto"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              InputLabelProps={{
                shrink: true,
              }}
              value={product.name}
              name="name"
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
              value={product.price}
              name="price"
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
              value={product.stock}
              name="stock"
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
              value={product.description}
              name="description"
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
                    product.temp ? product.temp :  pictureDefault
                    }
                />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={saveProduct}>
              ACTUALIZAR
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EditarProducto;
