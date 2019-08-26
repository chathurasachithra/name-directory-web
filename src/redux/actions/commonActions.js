export const TOGGLE_MESSAGE_MODAL = 'TOGGLE_MESSAGE_MODAL';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const toggleLoading = (status) => dispatch => {
  return dispatch ({
    type: TOGGLE_LOADING,
    payload: status
  });
};