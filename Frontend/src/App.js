import { Snackbar, ThemeProvider } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import MenuAppBar from './componentes/navegacion/MenuAppBar';
import Login from './componentes/seguridad/Login';
import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import theme from './theme/theme';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Productos from './componentes/pantallas/Productos';
import DetalleProducto from './componentes/pantallas/DetalleProducto';
import CarritoCompras from './componentes/pantallas/CarritoCompras';
import ProcesoCompra from './componentes/pantallas/ProcesoCompra';
import OrdenCompra from './componentes/pantallas/OrdenCompra';
import Perfil from './componentes/seguridad/Perfil';
import Usuarios from './componentes/pantallas/admin/Usuarios';
import EditarUsuario from './componentes/pantallas/admin/EditarUsuario';
import ListaProductos from './componentes/pantallas/admin/ListaProductos';
import AgregarProducto from './componentes/pantallas/admin/AgregarProducto';
import EditarProducto from './componentes/pantallas/admin/EditarProducto';
import ListaPedidos from './componentes/pantallas/admin/ListaPedidos';
import { currentUser } from './actions/user.action';
import { getShoppingCart } from './actions/shoppingcart.action';
import { useStateValue } from './context/store'
import { v4 as uuidv4 } from 'uuid'; 

function App() {

  const [{ session, openSnackBar }, dispatch] = useStateValue();
  const [loggedIn, setLoggedIn] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async() => {

    let shoppingCartId = window.localStorage.getItem('shoppingCartId');
    if(!shoppingCartId) {
      shoppingCartId = uuidv4()
      window.localStorage.setItem('shoppingCartId', shoppingCartId)
    }

    if(!loggedIn) {
      await currentUser(dispatch);
      await getShoppingCart(dispatch, shoppingCartId);
      setLoggedIn(true)
    }
  }, [loggedIn])

  return (
    <ThemeProvider theme={theme}>
      <Snackbar 
        anchorOrigin={{vertical: "bottom", horizontal: "center"}} 
        open={openSnackBar ? openSnackBar.open : false}
        autoHideDuration={3000}
        ContentProps={{"aria-describedby": "message-id"}}
        message={
          <span id="message-id">
            {openSnackBar ? openSnackBar.message : ""}
          </span>
        }
        onClose={() => dispatch({ type: "OPEN_SNACKBAR", payload: { open: false, message: "" }})}
        ></Snackbar>
      <Router>
      <MenuAppBar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrar" component={RegistrarUsuario} />
          <Route exact path="/" component={Productos} />
          <Route exact path="/detalleProducto/:id" component={DetalleProducto} />
          <Route exact path="/carrito" component={CarritoCompras} />
          <Route exact path="/procesoCompra" component={ProcesoCompra} />
          <Route exact path="/ordenCompra/:id" component={OrdenCompra} />
          <Route exact path="/perfil" component={Perfil} />
          <Route exact path="/admin/usuarios" component={Usuarios} />
          <Route exact path="/admin/usuario/:id" component={EditarUsuario} />
          <Route exact path="/admin/listaProductos" component={ListaProductos} />
          <Route exact path="/admin/agregarProducto" component={AgregarProducto} />
          <Route exact path="/admin/editarProducto/:id" component={EditarProducto} />
          <Route exact path="/admin/listaPedidos" component={ListaPedidos} />
        </Switch>
      </Router>
    </ThemeProvider>
      
    
  );
}

export default App;
