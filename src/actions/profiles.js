import axios from 'axios';
const url = 'https://pj-images-server.herokuapp.com';
export const getProfile = (id, page) => async (dispatch) => {
  console.log(id, page);
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    query: `query{
            user(user_id:${id}, page:${page}){
                user{
                    id
                    name
                    avatar
                }
                images{
                    id
                    name
                    src
                    createdAt
                }
                lastImage
            }
        }`
  };
  console.log('buscando en server');
  const res = await axios.post(url, body, config);

  if (res.data.data) {
    dispatch({
      type: 'GET_PROFILE',
      payload: res.data.data.user
    });
  } else {
    if (res.data.errors.message) {
      const [err] = res.data.error.message;
      dispatch({
        type: 'GET_PROFILE_FAIL',
        payload: err
      });
    }
  }
};

export const updateProfile = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    query: `mutation{
            updateUser(data:{name:"${name}", email:"${email}", password:"${password}"}){
               id
               name
               email
               avatar
               success{
                 name
                 email
                 password
               }
            } 
        }`
  };

  console.log(body);

  const res = await axios.post(url, body, config);

  if (res.data.data) {
    dispatch({
      type: 'USER_LOADED',
      payload: res.data.data.updateUser
    });
    dispatch({
      type: 'UPDATE_PROFILE_SUCCESS',
      payload: res.data.data.updateUser
    });
  } else {
    if (res.data.errors.message) {
      const [err] = res.data.error.message;
      dispatch({
        type: 'UPDATE_PROFILE_FAIL',
        payload: err
      });
    }
  }
};
