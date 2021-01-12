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
  delete axios.defaults.headers.common['Authorization'];
  const res = await axios.post(CLAUDINARY_URL, body);
  if (localStorage.token) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
  }

  console.log(res.data.url);
};
