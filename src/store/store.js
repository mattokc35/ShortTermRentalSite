import { createStore, combineReducers } from "redux";
import transactionReducer from "../reducers/transactionReducer";
import contractValuesReducer from "../reducers/contractValuesReducer";

const rootReducer = combineReducers({
  transactionId: transactionReducer, // Update the key name to match reducer
  contractValues: contractValuesReducer,
});

const store = createStore(rootReducer);

export default store;
