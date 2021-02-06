const initialState = {
  profile: {},
  loading: true,
  error: '',
  updateProfileError: '',
  updateProfile: { success: { name: '', email: '', password: '' } }
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_PROFILE':
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case 'GET_PROFILE_FAIL':
      return {
        ...state,
        error: payload,
        loading: false
      };
    case 'UPDATE_PROFILE_FAIL':
      return {
        ...state,
        updateProfileError: payload
      };

    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        updateProfile: payload
      };
    default:
      return state;
  }
};

export default profile;
