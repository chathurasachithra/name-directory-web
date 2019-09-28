import {
  GET_NAME_DATA, REMOVE_NAME, REMOVE_NAME_ERROR, GET_STATIC_DATA, ADD_NEW_NAME, ADD_NEW_NAME_ERROR,
  FETCH_NAME, FETCH_NAME_ERROR, CLEAR_NAME_RECORD, UPDATE_NAME, UPDATE_NAME_ERROR,
  GET_NAME_LIST_DATA, GET_NAME_LIST_DATA_ERROR,
} from '../actions/nameActions';

const initialState = {

};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NAME_DATA:
      return {
        ...state,
        nameList: action.payload,
        newNameResponse: null,
        newNameErrorResponse: null,
      }
    case REMOVE_NAME:
      return {
        ...state,
        nameRemoved: action.payload
      }
    case REMOVE_NAME_ERROR:
      return {
        ...state,
        nameRemoved: action.payload
      }
    case GET_STATIC_DATA:
      return {
        ...state,
        staticData: action.payload,
      }
    case ADD_NEW_NAME:
      return {
        ...state,
        newNameResponse: action.payload,
        newNameErrorResponse: null,
      };
    case ADD_NEW_NAME_ERROR:
      return {
        ...state,
        newNameErrorResponse: action.payload,
        newNameResponse: null,
      };
    case FETCH_NAME:
      return {
        ...state,
        name: action.payload,
        nameUpdateResponse: null,
      }
    case FETCH_NAME_ERROR:
      return {
        ...state,
        name: action.payload,
        nameUpdateResponse: null,
        nameUpdateErrorResponse: null,
      }
    case CLEAR_NAME_RECORD:
      return {
        ...state,
        name: null,
        nameUpdateResponse: null,
        nameUpdateErrorResponse: null,
      }
    case UPDATE_NAME:
      return {
        ...state,
        nameUpdateResponse: action.payload,
        nameUpdateErrorResponse: null,
      };
    case UPDATE_NAME_ERROR:
      return {
        ...state,
        nameUpdateErrorResponse: action.payload,
        nameUpdateResponse: null,
      };
    case GET_NAME_LIST_DATA:
      return {
        ...state,
        nameList: action.payload,
        nameListError: null,
      }
    case GET_NAME_LIST_DATA_ERROR:
      return {
        ...state,
        nameList: null,
        nameListError: action.payload,
      }
    default:
      return state;
  }
}
