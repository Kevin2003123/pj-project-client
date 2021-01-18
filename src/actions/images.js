import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

const CLAUDINARY_URL = 'https://api.cloudinary.com/v1_1/dfgmjyagu/image/upload';
const CLAUDINARY_UPLOAD_PRESET = 'usobgzw4';
const url = 'http://localhost:4000/';

export const updateAvatar = (image) => async (dispatch) => {
  console.log(image);
  console.log('imprimiendo');

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
      type: 'UPDATE_AVATAR_SUCCESS',
      payload: res.data.url
    });
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
    const [err] = res.data.errors.message;
    dispatch({
      type: 'GET_IMAGES_FAIL',
      payload: err
    });
  }
};
