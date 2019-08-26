import {
  TOGGLE_MESSAGE_MODAL,
  TOGGLE_LOADING
} from '../actions/commonActions';

const initialState = {
  loading:false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOADING:
    return {
      ...state,
      loading: action.payload
    }
    default:
      return state;
  }
}
