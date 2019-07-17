import uuid from 'uuid/v4'
import { Dispatch } from 'redux'

import * as types from './types'
import { ITransaction } from './interfaces'
import { AppState, ID } from '../interfaces'
import { getTransactionById } from './selectors'

export const addTransaction = (transaction: ITransaction) => ({
  type: types.ADD,
  payload: { id: uuid(), ...transaction }
})

export const editTransaction = (
  partial: Partial<ITransaction> & { id: ID }
) => ({
  type: types.EDIT,
  payload: { ...partial }
})

export const deleteTransaction = (id: ID) => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    const store = getState()
    const payload = getTransactionById(store, id)

    dispatch({
      type: types.DELETE,
      payload
    })
  }
}
