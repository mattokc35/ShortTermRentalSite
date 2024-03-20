import {
  SET_CONTRACT_VALUES,
  ContractValueActionTypes,
} from "../actions/contractValuesActions";

//define type for the state
interface ContractValuesState {
  contractValues: object;
}
const initialState: ContractValuesState = {
  contractValues: {},
};

const contractValuesReducer = (
  state: ContractValuesState = initialState,
  action: ContractValueActionTypes
): ContractValuesState => {
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
