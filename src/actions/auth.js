import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
//lOAD User

const url = 'https://pj-images-server.herokuapp.com/';
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    query: `mutation{
      auth(token:"${localStorage.getItem('token')}"){
        id
        name
        email
        avatar
      }
    }`
  };

  const res = await axios.post(url, body, config);
  if (res.data.data) {
    dispatch({
      type: 'USER_LOADED',
      payload: res.data.data.auth
    });
  } else {
    dispatch({
      type: ' AUTH_ERROR'
    });
  }
};
//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    query: `mutation{
    login(email: "${email}", password:"${password}"){
      token
    }
  }`
  };

  const res = await axios.post(url, body, config);

  if (res.data.data !== null) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data.data.login
    });

    dispatch(loadUser());
  } else {
    const [err] = res.data.errors;

    dispatch({
      type: 'LOGIN_FAIL',
      payload: err.message
    });
  }
};

export const register = (
  name,
  email,
  password,
  verifyPassword,
  avatar = null
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    query: `mutation{
    createUser(data:{
      name: "${name}",
      email: "${email}",
      password: "${password}",
      verifyPassword:"${verifyPassword}"
    }){
      token
    }
  }`
  };

  const res = await axios.post(url, body, config);

  if (res.data.data) {
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data.data.createUser
    });
  } else {
    const [err] = res.data.errors;
    dispatch({
      type: 'REGISTER_FAIL',
      payload: err.message
    });
  }
};

//Logout/ Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
