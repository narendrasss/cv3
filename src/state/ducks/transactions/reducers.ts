import _ from 'lodash'
import * as types from './types'
import { types as accountTypes, DeleteAccountAction } from '../accounts'
import { types as budgetTypes, DeleteBudgetAction } from '../budgets'
import { TransactionState } from './interfaces'
import { AppAction } from '../interfaces'

/*
state shape:
{
  byId: {
    [id]: {
      id: string
      type: 'expense' | 'income'
      vendor: string
      amount: double
      date: Date
      account: string
      budget: string
      note?: string
    }
  },
  allIds: string[]
}
*/

const initialState = {
  byId: {},
  allIds: []
} as TransactionState

const resetTransactionCategory = (state: TransactionState, action: DeleteBudgetAction) => {
  const budgetName = action.payload
  return {
    ...state,
    byId: _.mapValues(state.byId, tr => {
      if (tr.budget === budgetName) {
        return { ...tr, budget: 'other' }
      }
      return tr
    })
  }
}

const removeAccountFromTransactions = (state: TransactionState, action: DeleteAccountAction) => {
  const accountId = action.payload
  return {
    ...state,
    byId: _.mapValues(state.byId, tr => {
      if (tr.account === accountId) {
        return { ...tr, account: -1 }
      }
      return tr
    })
  }
}

const reducer = (state = initialState, action: AppAction): TransactionState => {
  switch (action.type) {
    case types.ADD:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...action.payload
          }
        },
        allIds: [...state.allIds, action.payload.id]
      }
    case types.EDIT: {
      const { id } = action.payload
      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            ...action.payload
          }
        },
        allIds: state.allIds
      }
    }
    case types.DELETE: {
      const { id: toDelete } = action.payload
      const byId = { ...state.byId }
      delete byId[toDelete]
      return {
        ...state,
        byId,
        allIds: state.allIds
          .filter(id => id !== toDelete)
      }
    }
    case budgetTypes.DELETE:
      return resetTransactionCategory(state, action)
    case accountTypes.DELETE:
      return removeAccountFromTransactions(state, action)
    default:
      return state
  }
}

export default reducer
