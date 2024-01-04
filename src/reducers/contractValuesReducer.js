import { SET_CONTRACT_VALUES } from "../actions/contractValuesActions";

const initialState = {
  contractValues: null,
};

const contractValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTRACT_VALUES:
      return {
        ...state,
        contractValues: action.payload,
      };
    default:
      return state;
  }
};

export default contractValuesReducer;