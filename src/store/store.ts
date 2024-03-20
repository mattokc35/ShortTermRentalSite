import { createStore, combineReducers, Store } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
// @ts-ignore
import transactionReducer from "../reducers/transactionReducer";
// @ts-ignore
import contractValuesReducer from "../reducers/contractValuesReducer";

// Define the RootState type for your reducers
interface RootState {
  transactionId: any; // Define the type according to your reducer
  contractValues: any; // Define the type according to your reducer
}

// Define the root reducer and its types
const rootReducer = combineReducers<RootState>({
  transactionId: transactionReducer,
  contractValues: contractValuesReducer,
});

// Define the type of the store
const store: Store = createStore(rootReducer, composeWithDevTools());

export default store;
