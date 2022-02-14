import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../../theme/useStyles";
import ImageUploader from "react-images-upload";
import { useStateValue } from "../../context/store";
import { v4 as uuidv4 } from "uuid";
import { updateUser } from "../../actions/user.action";
import { withRouter } from "react-router-dom";

const Perfil = (props) => {
  const classes = useStyles();

  const KeyPicture = uuidv4();
  const pictureDefault =
    "https://tottope.vteximg.com.br/arquivos/ids/167188-1000-1000/PILIGRAM-H-1810-V07_A.png?v=636723781789170000";

  const [{ session }, dispatch] = useStateValue();

  const [user, setUser] = useState({
    id: "",
    firstname: "",
    lastname: "",
    picture: "",
    password: "",
    file: "",
    temp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  const handlePrictureChange = (prictures) => {
    let picture = prictures[0];
    let url = "";
    try {
      url = URL.createObjectURL(picture);
    } catch (e) {
      console.log(e);
    }
    setUser((previous) => ({
      ...previous,
      file: picture,
      temp: url,
    }));
  };

  const saveProduct = (e) => {
    e.preventDefault();
    updateUser(session.user.id, user, dispatch).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("token", response.data.token);
        props.history.push("/");
      } else {
        dispatch({
          type: "OPEN_SNACKBAR",
          payload: { open: true, message: "Error update user" },
        });
      }
    });
  };

  const verDetalles = () => {
    const id = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed";
    props.history.push("/ordenCompra/" + id);
  };

  return (
    <Container className={classes.containermt}>
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            PERFIL DE USUARIO
          </Typography>
          <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
            <ImageUploader
              key={KeyPicture}
              onChange={handlePrictureChange}
              withIcon={false}
              buttonStyles={{
                borderRadius: "50%",
                padding: 10,
                margin: 0,
                position: "absolute",
                bottom: 15,
                left: 15,
              }}
              className={classes.imageUploader}
              buttonText={<Icon>add_a_photo</Icon>}
              label={
                <Avatar
                  alt="mi perfil"
                  className={classes.avatarPerfil}
                  src={user.temp ? user.temp : (user.picture ? user.picture : pictureDefault)}
                />
              }
              imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
              maxFileSize={5242880}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value={user.firstname}
              name="firstname"
              onChange={handleChange}
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value={user.lastname}
              name="lastname"
              onChange={handleChange}
            />
            <TextField
              label="Correo Electronico"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
              value={user.email}
              name="email"
              onChange={handleChange}
            />
            <Divider className={classes.divider} />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <TextField
              label="Confirmar Password"
              variant="outlined"
              fullWidth
              className={classes.gridmb}
            />
            <Button variant="contained" color="primary" onClick={saveProduct}>
              ACTUALIZAR
            </Button>
          </form>
        </Grid>
        <Grid item md={9} xs={12}>
          <Typography variant="h5" className={classes.text_title}>
            MIS PEDIDOS
          </Typography>
          <TableContainer className={classes.form}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>FECHA</TableCell>
                  <TableCell>TOTAL</TableCell>
                  <TableCell>PAGADO</TableCell>
                  <TableCell>ENTREGADO</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>bc6ea036-0522-493f-b4b6-97eb87c8f7b4</TableCell>
                  <TableCell>2020-12-15</TableCell>
                  <TableCell>60.00</TableCell>
                  <TableCell>2020-12-12</TableCell>
                  <TableCell>
                    {/* <Icon className={classes.iconNotDelivered}>
                                            clear
                                        </Icon> */}
                    <Icon className={classes.iconDelivered}>check</Icon>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" onClick={verDetalles}>
                      DETALLES
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withRouter(Perfil);
