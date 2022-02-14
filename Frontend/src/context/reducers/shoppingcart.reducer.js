export const initialState = {
  id: '',
  items: []
}

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOPPING_CART':
      return { ...state, id: action.id, item: action.payload }
    default:
      return state;
  }
}

export default shoppingCartReducer;