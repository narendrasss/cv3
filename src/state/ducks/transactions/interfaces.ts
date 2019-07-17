import * as types from './types'
import { ID } from '../interfaces'

export type TransactionState = {
  byId: Record<ID, ITransaction>
  allIds: ID[]
}

export interface ITransaction {
  id: ID
  type?: 'expense' | 'income'
  vendor: string
  amount: number
  date: Date
  account: ID
  budget: string
  note?: string
}

export type AddTransactionAction = {
  type: typeof types.ADD
  payload: ITransaction
}

export type EditTransactionAction = {
  type: typeof types.EDIT
  payload: Partial<ITransaction> & { id: ID }
}

export type DeleteTransactionAction = {
  type: typeof types.DELETE
  payload: ITransaction
}

export type TransactionAction = AddTransactionAction | EditTransactionAction | DeleteTransactionAction