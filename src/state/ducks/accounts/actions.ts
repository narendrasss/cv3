import * as types from './types'
import uuid from 'uuid/v4'
import { ID } from '../interfaces'
import {
  IAccount,
  AddAccountAction,
  EditAccountAction,
  DeleteAccountAction
} from './interfaces'

export const addAccount = (
  account: Omit<IAccount, 'id' | 'transactions'>
): AddAccountAction => ({
  type: types.ADD,
  payload: { id: uuid(), ...account, transactions: [], color: '#333333' }
})

export const editAccount = (
  partial: Partial<IAccount> & { id: ID }
): EditAccountAction => ({
  type: types.EDIT,
  payload: { ...partial }
})

export const deleteAccount = (id: ID): DeleteAccountAction => ({
  type: types.DELETE,
  payload: id
})
