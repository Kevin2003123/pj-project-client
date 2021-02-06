import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const CLAUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfgmjyagu/image/upload';
const CLAUDINARY_UPLOAD_PRESET = 'usobgzw4';
const url = 'https://pj-images-server.herokuapp.com/';

export const updateAvatar = (image) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  var formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', CLAUDINARY_UPLOAD_PRESET);

  const body = formData;

  try {
    delete axios.defaults.headers.common['Authorization'];
    const res = await axios.post(CLAUDINARY_URL, body);
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'token'
      );
    }
    dispatch({
      type: 'UPDATE_AVATAR_CLOUD_SUCCESS',
      payload: res.data.url
    });

    const body2 = {
      query: `mutation{updateAvatar(avatar:"${res.data.url}")}`
    };

    const res2 = await axios.post(url, body2, config);

    if (res2.data.data) {
      dispatch({
        type: 'UPDATE_AVATAR_SUCCESS',
        payload: res2.data.data.updateAvatar
      });
    } else {
      dispatch({
        type: 'UPDATE_AVATAR_FAIL',
        payload: 'unable to load to server'
      });
    }
  } catch (error) {
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'token'
      );
    }
    dispatch({
      type: 'UPDATE_AVATAR_FAIL',
      payload: error.message
    });
  }
};

export const getImages = (page, search) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = {
    query: `query{
    images(page:${page}, search:"${search}"){
      images{
      id
      user_id
      src
      name
      avatar
      userName
      user_id
      },
      lastImage
    }
  }`
  };

  const res = await axios.post(url, body, config);
  if (res.data.data) {
    dispatch({
      type: 'GET_IMAGES',
      payload: res.data.data.images
    });
  } else {
    if (res.data.errors.message) {
      const [err] = res.data.errors.message;
      dispatch({
        type: 'GET_IMAGES_FAIL',
        payload: err
      });
    } else {
      dispatch({
        type: 'GET_IMAGES_FAIL',
        payload: 'Image not found'
      });
    }
  }
};

export const uploadImage = (image, name, description) => async (dispatch) => {
  console.log(image);
  console.log('imprimiendo');

  var formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', CLAUDINARY_UPLOAD_PRESET);

  const body = formData;

  const config2 = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    delete axios.defaults.headers.common['Authorization'];
    const res = await axios.post(CLAUDINARY_URL, body);
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'token'
      );
    }

    dispatch({
      type: 'UPLOAD_IMAGE_CLOUD_SUCCESS',
      payload: res.data.url
    });

    const body2 = {
      query: `mutation{
      createImage(data:{name:"${name}", src:"${res.data.url}", description:"${description}"}){
        id
        user_id
        src
        name
        description
        } 
    }`
    };
    const res2 = await axios.post(url, body2, config2);
    if (res2.data.data) {
      dispatch({
        type: 'UPLOAD_IMAGE_SUCCESS',
        payload: res2.data.data.createImage
      });
      dispatch({
        type: 'SET_SHOW_UPLOAD_IMAGE',
        payload: 'hidden'
      });
    } else {
      const [err] = res2.data.errors.message;
      dispatch({
        type: 'UPLOAD_IMAGE_FAIL',
        payload: err
      });
    }
  } catch (error) {
    if (localStorage.token) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem(
        'token'
      );
    }
    dispatch({
      type: 'UPLOAD_IMAGE_FAIL',
      payload: error
    });
  }
};
