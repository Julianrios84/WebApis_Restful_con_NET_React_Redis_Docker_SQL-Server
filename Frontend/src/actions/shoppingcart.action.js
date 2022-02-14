import HttpClient from '../services/HttpClient'
import axios from 'axios'

const instance = axios.create();
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export const getShoppingCart = (dispatch, id) => {
  return new Promise((resolve, reject) => {
    instance.get(`/api/shoppingcart?id=${id}`).then(response => {
      dispatch({
        type: 'SHOPPING_CART',
        id: response.data.id,
        payload: response.data.items
      })
      resolve(response)
    }).catch(error => {
      resolve(error.response)
    })
  })
}

export const setShoppingCart = (dispatch, shoppingCart) => {
  return new Promise((resolve, reject) => {
    instance.post(`/api/shoppingcart`, shoppingCart).then(response => {
      dispatch({
        type: 'SHOPPING_CART',
        id: response.data.id,
        payload: response.data.item
      })
      resolve(response)
    }).catch(error => {
      resolve(error.response)
    })
  })
}

export const addItem = (shoppingCart, item, dispatch) => {
  if(!shoppingCart.items) { shoppingCart.items = [] }

  const index = shoppingCart.items.findIndex(i => i.id === item.id);

  if(index === -1) {
    shoppingCart.items.push(item);
  }else {
    shoppingCart.items[index].quantity += item.quantity;
  }
  
  setShoppingCart(dispatch, shoppingCart);
}