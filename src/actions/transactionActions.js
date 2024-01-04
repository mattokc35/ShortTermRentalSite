//action types
export const SET_TRANSACTION_ID = "SET_TRANSACTION_ID";

//actions
export const setTransactionId = (transactionId) => ({
  type: SET_TRANSACTION_ID,
  payload: transactionId,
});
