export const showUploadAvatar = (show) => (dispatch) => {
  dispatch({
    type: 'SET_SHOW_UPLOAD_AVATAR',
    payload: show
  });
};

export const resetPage = () => (dispatch) => {
  dispatch({
    type: 'RESET_PAGE'
  });
};

export const setPage = (page) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE',
    payload: page
  });
};

export const setSearch = (search) => (dispatch) => {
  dispatch({
    type: 'SET_SEARCH',
    payload: search
  });
};
