const initialState = {
  avatar_cloud: '',
  avatar: '',
  uploadAvatar: false,
  error: '',
  loadingAvatar: true,
  images: { images: [], lastImage: null },
  imageUpload: {},
  imageUp: '',
  loadingImages: true
};

const image = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_AVATAR_CLOUD_SUCCESS':
      return {
        ...state,
        avatar_cloud: payload,
        uploadAvatar: true,
        loadingAvatar: false,
        error: ''
      };
    case 'UPDATE_AVATAR_SUCCESS':
      return {
        ...state,
        avatar: payload
      };
    case 'UPLOAD_IMAGE_CLOUD_SUCCESS':
      return {
        ...state,
        imageUp: payload
      };

    case 'UPLOAD_IMAGE_SUCCESS':
      return {
        ...state,
        imageUpload: payload
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
        images: payload,
        loadingImages: false
      };

    case 'GET_IMAGES_FAIL':
      return {
        ...state,
        error: payload,
        loadingImages: false
      };
    default:
      return state;
  }
};

export default image;
