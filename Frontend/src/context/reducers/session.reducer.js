export const initialState = {
  user: {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    picture: ''
  },
  loggedIn: false
}

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNIN':
      return { ...state, user: action.payload, loggedIn: action.loggedIn }
    case 'LOGOUT': 
      return { ...state, user: action.payload, loggedIn: action.loggedIn }
    case 'UPDATEUSER': 
      return { ...state, user: action.payload, loggedIn: action.loggedIn }
    default:
      return state
  }
}


export default sessionReducer