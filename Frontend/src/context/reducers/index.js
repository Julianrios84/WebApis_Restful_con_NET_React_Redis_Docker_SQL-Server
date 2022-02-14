import sessionReducer from "./session.reducer"
import shoppingCartReducer from "./shoppingcart.reducer"
import openSnackBarReducer from "./open.snackbar.reducer"

export const mainReducer = ({ session, shoppingcart, openSnackBar }, action) => {
  return {
    session: sessionReducer(session, action),
    shoppingcart: shoppingCartReducer(shoppingcart, action),
    openSnackBar: openSnackBarReducer(openSnackBar, action)
  }
}