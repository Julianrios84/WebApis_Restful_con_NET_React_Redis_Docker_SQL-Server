import HttpClient from '../services/HttpClient'
import axios from 'axios'
import { uploadFile } from '../firebase';

const instance = axios.create();
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

export const signUp = (user, dispatch) => {
  return new Promise((resolve, reject) => {
    instance.post(`/api/user/signup`, user).then(resp => {
      dispatch({
        type: 'SIGNIN',
        payload: resp.data,
        loggedIn: true
      })
      resolve(resp);
    }).catch(error => {
      resolve(error.response)
    })
  })
};


export const signIn = (user, dispatch) => {
  return new Promise((resolve, reject) => {
    instance.post(`/api/user/signin`, user).then(resp => {
      dispatch({
        type: 'SIGNIN',
        payload: resp.data,
        loggedIn: true
      })
      resolve(resp);
    }).catch(error => {
      resolve(error.response)
    })
  })
};

export const currentUser = (dispatch) => {
  return new Promise((resolve, reject) => {
    HttpClient.get(`/api/user`).then(resp => {
      dispatch({
        type: 'SIGNIN',
        payload: resp.data,
        loggedIn: true
      })
      resolve(resp);
    }).catch(error => {
      resolve(error.response)
    })
  })
};

export const updateUser = async(id, user, dispatch) => {
  if(user.file) {
    const url = await uploadFile(user.file);
    user.picture = url;
  }

  return new Promise((resolve, reject) => {
    HttpClient.put(`/api/user/${id}`, user)
    .then(response => {
      dispatch({
        type: "UPDATE_USER",
        payload: response.data,
        loggedIn: true
      })
      resolve(response)
    })
    .catch(error => {
      resolve(error.response)
    })
  })
}

export const getUsers = async(queryParams) => {
  return new Promise((resolve, reject) => {
    HttpClient.get(`/api/user/pagination?page=${queryParams.page}&limit=${queryParams.limit}&search=${queryParams.search}`).then(resp => {
      resolve(resp);
    }).catch(error => {
      resolve(error.response)
    })
  })
}

export const getUserById = async(id) => {
  return new Promise((resolve, reject) => {
    HttpClient.get(`/api/user/account/${id}`).then(resp => {
      resolve(resp);
    }).catch(error => {
      resolve(error.response)
    })
  })
}

export const addRole = async(id, role, dispatch) => {
  return new Promise((resolve, reject) => {
    HttpClient.put(`/api/user/role/${id}`).then(resp => {
      resolve(resp);
    }).catch(error => {
      resolve(error.response)
    })
  })
}