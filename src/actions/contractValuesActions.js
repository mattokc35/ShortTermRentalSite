// action type
export const SET_CONTRACT_VALUES = "SET_CONTRACT_VALUES";

// action creator
export const setContractValues = (values) => ({
  type: SET_CONTRACT_VALUES,
  payload: values,
});