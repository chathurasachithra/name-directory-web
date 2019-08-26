import { handleRequest } from '../services/APIService';

export const GET_NAME_DATA = 'GET_NAME_DATA';
export const REMOVE_NAME = 'REMOVE_NAME';
export const REMOVE_NAME_ERROR = 'REMOVE_NAME_ERROR';
export const GET_STATIC_DATA = 'GET_STATIC_DATA';
export const ADD_NEW_NAME = 'ADD_NEW_NAME';
export const ADD_NEW_NAME_ERROR = 'ADD_NEW_NAME_ERROR';
export const FETCH_NAME = 'FETCH_NAME';
export const FETCH_NAME_ERROR = 'FETCH_NAME_ERROR';
export const CLEAR_NAME_RECORD = 'CLEAR_NAME_RECORD';
export const UPDATE_NAME = 'UPDATE_NAME';
export const UPDATE_NAME_ERROR = 'UPDATE_NAME_ERROR';

export const getNames = (data) => dispatch => {
  handleRequest('post', `directory-name/get`, true, data).then( (results) => {
    return dispatch ({
      type: GET_NAME_DATA,
      payload: results.data
    });
  })
};

export const clearNameRecord = () => dispatch => {
  return dispatch ({
    type: CLEAR_NAME_RECORD,
    payload: null
  });
};

export const removeName = (id) => dispatch => {

  handleRequest('delete', `directory-name/${id}`, true).then( (results) => {
    return dispatch ({
      type: REMOVE_NAME,
      payload: results.data
    });
  }).catch ((error) => {
    return dispatch ({
      type: REMOVE_NAME_ERROR,
      payload: JSON.parse(error.response),
    });
  });
};

export const getStaticData = () => dispatch => {
  handleRequest('get', `static`, true).then( (results) => {
    return dispatch ({
      type: GET_STATIC_DATA,
      payload: results.data
    });
  })
};

export const getName = (id) => dispatch => {
  handleRequest('get', `/directory-name/${id}`, true )
    .then( (results) => {
      return dispatch ({
        type: FETCH_NAME,
        payload: results.data
      });
    })
    .catch( (error) => {
      return dispatch ({
        type: FETCH_NAME_ERROR,
        payload: JSON.parse(error.response)
      });
    })
};

export const createName = (data) => dispatch => {

  handleRequest('post', '/directory-name', true, data).then((results) => {
    return dispatch ({
      type: ADD_NEW_NAME,
      payload: results,
    });
  }).catch((error) => {
    return dispatch ({
      type: ADD_NEW_NAME_ERROR,
      payload: JSON.parse(error.response),
    });
  });
};

export const updateName = (data, id) => dispatch => {

  handleRequest('put', `/directory-name/${id}`, true, data).then((results) => {
    return dispatch ({
      type: UPDATE_NAME,
      payload: results,
    });
  }).catch((error) => {
    return dispatch ({
      type: UPDATE_NAME_ERROR,
      payload: JSON.parse(error.response),
    });
  });
};

