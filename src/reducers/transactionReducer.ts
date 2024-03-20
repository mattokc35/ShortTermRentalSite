import {
  SET_TRANSACTION_ID,
  TransactionActionTypes,
} from "../actions/transactionActions";

//define the type for the state
interface TransactionState {
  transactionId: string | null;
}

//define initial state
const initialState: TransactionState = {
  transactionId: null,
};

const transactionReducer = (
  state: TransactionState = initialState,
  action: TransactionActionTypes
): TransactionState => {
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
