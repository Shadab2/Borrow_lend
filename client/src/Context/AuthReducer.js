const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "UPDATE": {
      return {
        user: action.payload,
        isFetching: false,
        error: null,
      };
    }
    case "LOG_OUT": {
      return {
        user: null,
        isFetching: false,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
