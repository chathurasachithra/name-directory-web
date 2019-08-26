import {
  FETCH_USER_PROFILE, LOGIN, LOGOUT, LOGIN_ERROR
} from '../actions/userActions';

const initialState = {
  
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_PROFILE:
    return {
      ...state,
      profile:action.payload,
      profileUpdated: false,
      avatar: null
    }
    case LOGIN:
      return {
        ...state,
        loginData: action.payload,
        loginErrorData: null
      }
    case LOGOUT:
      return {
        ...state,
        loginData: action.payload,
        loginErrorData: null
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loginErrorData: action.payload
      }
    default:
      return state;
  }
}
