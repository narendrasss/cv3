import * as types from './types'
import { ID } from '../interfaces'


export type AccountState = Record<ID, IAccount>

export interface IAccount {
  id: ID
  accountType: 'credit' | 'debit'
  balance: number
  bank: string
  cardNumber: number
  cardType: 'visa' | 'mastercard' | 'amex'
  color?: string
  nickname?: string
  transactions: ID[]
}

export type AddAccountAction = {
  type: typeof types.ADD
  payload: IAccount
}

export type EditAccountAction = {
  type: typeof types.EDIT
  payload: Partial<IAccount> & { id: ID }
}

export type DeleteAccountAction = {
  type: typeof types.DELETE
  payload: ID
}

export type AccountAction = AddAccountAction | EditAccountAction | DeleteAccountAction
