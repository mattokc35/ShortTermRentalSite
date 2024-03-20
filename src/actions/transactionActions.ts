//action types
export const SET_TRANSACTION_ID: string = "SET_TRANSACTION_ID";

//define action interfaces
interface SetTransactionIdAction {
  type: typeof SET_TRANSACTION_ID;
  payload: string;
}

export type TransactionActionTypes = SetTransactionIdAction;

//actions
export const setTransactionId = (transactionId: string) => ({
  type: SET_TRANSACTION_ID,
  payload: transactionId,
});
