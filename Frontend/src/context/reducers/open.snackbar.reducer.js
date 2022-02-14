const initialState = {
  open: false,
  message: ""
}

const openSnackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_SNACKBAR":
      return { ... state, open: action.payload.open, message: action.payload.message }
    default:
      return state;
  }
} 

export default openSnackBarReducer;