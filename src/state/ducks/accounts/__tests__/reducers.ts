import { omit, isEmpty } from 'lodash'
import reducer from '../reducers'
import {
  types as transactionTypes,
  AddTransactionAction,
  DeleteTransactionAction
} from '../../transactions'
import * as types from '../types'
import {
  AccountState,
  AddAccountAction,
  DeleteAccountAction,
  EditAccountAction
} from '../interfaces'
import { AppAction } from '../../interfaces'

describe('accounts reducer', () => {
  const testState: AccountState = {
    0: {
      id: 0,
      bank: 'bmo',
      accountType: 'debit',
      cardType: 'mastercard',
      balance: 1197.47,
      cardNumber: 6556,
      transactions: [0, 1, 2, 3],
      color: 'blue'
    },
    1: {
      id: 1,
      bank: 'scotia',
      accountType: 'credit',
      cardType: 'visa',
      balance: 184.98,
      cardNumber: 5010,
      transactions: [4],
      color: 'teal'
    }
  }

  it('returns empty object given no state', () => {
    const state = reducer(undefined, {} as AppAction)
    expect(isEmpty(state)).toBeTruthy()
  })

  it('adds new account', () => {
    const action: AddAccountAction = {
      type: types.ADD,
      payload: {
        id: 2,
        bank: 'amex',
        accountType: 'credit',
        cardType: 'amex',
        balance: 184.98,
        cardNumber: 5701,
        transactions: [],
        color: 'turq'
      }
    }
    const state = reducer(testState, action)
    expect(state).toHaveProperty('2')
    expect(state[2]).toEqual(action.payload)
  })

  it('deletes an account', () => {
    const action: DeleteAccountAction = {
      type: types.DELETE,
      payload: 1
    }
    const state = reducer(testState, action)
    expect(state).not.toHaveProperty('1')
  })

  it('updates account values', () => {
    const action: EditAccountAction = {
      type: types.EDIT,
      payload: {
        id: 1,
        accountType: 'debit'
      }
    }
    const state = reducer(testState, action)
    expect(state).not.toBe(testState)
    expect(state[1].accountType).toEqual(action.payload.accountType)
    expect(omit(state[1], 'accountType')).toEqual(
      omit(testState[1], 'accountType')
    )
  })

  describe('add transaction', () => {
    const action: AddTransactionAction = {
      type: transactionTypes.ADD,
      payload: {
        id: 4,
        budget: 'food',
        account: 0,
        vendor: 'mcd',
        amount: 12.99,
        date: new Date('2019-05-25')
      }
    }

    it('updates transaction array of correct account', () => {
      const { id, account } = action.payload
      const state = reducer(testState, action)
      expect(state[account].transactions).toContain(id)
    })

    it('decreases account balance for debit accounts', () => {
      const { account, amount } = action.payload
      const expected = testState[account].balance - amount
      const state = reducer(testState, action)
      expect(state[account].balance).toBeCloseTo(expected)
    })

    it('increases account balance for credit accounts', () => {
      const creditAction: AddTransactionAction = {
        type: transactionTypes.ADD,
        payload: {
          id: 4,
          budget: 'food',
          account: 1,
          vendor: 'mcd',
          amount: 12.99,
          date: new Date('2019-05-25')
        }
      }
      const { account, amount } = creditAction.payload
      const expected = testState[account].balance + amount
      const state = reducer(testState, creditAction)
      expect(state[account].balance).toBeCloseTo(expected)
    })
  })

  describe('delete transaction', () => {
    const action: DeleteTransactionAction = {
      type: transactionTypes.DELETE,
      payload: {
        id: 2,
        account: 0,
        budget: 'food',
        vendor: 'chipotle',
        amount: 11.03,
        date: new Date('2019-05-06')
      }
    }

    it('updates transaction array of correct budget', () => {
      const { id, account } = action.payload
      const state = reducer(testState, action)
      expect(state[account].transactions).not.toContain(id)
    })

    it('increases balance for debit accounts', () => {
      const { account, amount } = action.payload
      const expected = testState[account].balance + amount
      const state = reducer(testState, action)
      expect(state[account].balance).toBeCloseTo(expected)
    })

    it('decreases balance for credit accounts', () => {
      const creditAction: DeleteTransactionAction = {
        type: transactionTypes.DELETE,
        payload: {
          id: 4,
          budget: 'food',
          account: 1,
          vendor: 'mcd',
          amount: 12.99,
          date: new Date('2019-05-25')
        }
      }
      const { account, amount } = creditAction.payload
      const expected = testState[account].balance - amount
      const state = reducer(testState, creditAction)
      expect(state).not.toBe(testState)
      expect(state[account].balance).toBeCloseTo(expected)
    })
  })
})
