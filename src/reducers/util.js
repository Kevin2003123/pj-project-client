const initialState = {
  showUploadAvatar: 'hidden',
  page: 1,
  search: '',
  showUploadImageWindow: 'hidden',
  showSpin: 'hidden'
};

const util = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_SHOW_UPLOAD_AVATAR':
      return {
        ...state,
        showUploadAvatar: payload
      };
    case 'SET_SHOW_UPLOAD_IMAGE':
      return {
        ...state,
        showUploadImageWindow: payload
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: payload
      };

    case 'RESET_PAGE':
      return {
        ...state,
        page: 1
      };

    case 'SET_SEARCH':
      return {
        ...state,
        search: payload
      };

    case 'SHOW_SPIN':
      return {
        ...state,
        showSpin: payload
      };

    default:
      return state;
  }
};

export default util;
