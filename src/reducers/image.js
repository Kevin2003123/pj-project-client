const initialState = {
  avatar: '',
  uploadAvatar: false,
  error: '',
  loadingAvatar: true,
  images: { images: [], lastImage: null }
};

const image = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_AVATAR_SUCCESS':
      return {
        ...state,
        avatar: payload,
        uploadAvatar: true,
        loadingAvatar: false,
        error: ''
      };

    case 'UPDATE_AVATAR_FAIL':
      return {
        ...state,
        error: payload,
        uploadAvatar: false,
        loadingAvatar: false
      };

    case 'GET_IMAGES':
      return {
        ...state,
        images: payload
      };

    case 'GET_IMAGES_FAIL':
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
};

export default image;
