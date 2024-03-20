export const SET_CONTRACT_VALUES: string = "SET_CONTRACT_VALUES";

interface SetContractValuesAction {
  type: typeof SET_CONTRACT_VALUES;
  payload: object;
}

export type ContractValueActionTypes = SetContractValuesAction;

export const setContractValues = (values: any): SetContractValuesAction => ({
  type: SET_CONTRACT_VALUES,
  payload: values,
});
