import HttpClient from '../services/HttpClient'
import axios from 'axios'
import { uploadFile } from '../firebase';

const instance = axios.create();
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export const addProduct = async (product) => {

  if(product.file) {
    const urlPicture = await uploadFile(product.file);
    product.picture = urlPicture;
  }
  return new Promise((resolve, reject) => {
    HttpClient.post(`/api/product`, product).then(resp => {
      resolve(resp);
    }).catch(error => {
      resolve(error.response);
    })
  })
}

export const updateProduct = async(id, product) => {

  if(product.file) {
    const urlPicture = await uploadFile(product.file);
    product.picture = urlPicture;
  }
  
  return new Promise((resolve, reject) => {
    HttpClient.put(`/api/product/${id}`, product).then(resp => {
      resolve(resp);
    }).catch(error => {
      resolve(error.response);
    })
  })
}

export const getProducts = (queryParams) => {
  return new Promise((resolve, reject) => {
    instance.get(`/api/product?page=${queryParams.page}&limit=${queryParams.limit}&search=${queryParams.search}`).then(resp => {
      resolve(resp);
    })
  })
};

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    instance.get(`/api/product/${id}`).then(resp => {
      resolve(resp);
    }).catch(error => {
      resolve(error.response);
    })
  })
}