
import { SET_TRANSACTION_ID } from "../actions/transactionActions";

// reducer
const initialState = {
  transactionId: null,
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TRANSACTION_ID:
      return {
        ...state,
        transactionId: action.payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;