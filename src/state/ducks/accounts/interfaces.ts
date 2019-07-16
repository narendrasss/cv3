export type ID = string | number

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

export type AccountState = Record<ID, IAccount>

export type AddAccountAction = {
  type: 'accounts/ADD'
  payload: IAccount
}

export type EditAccountAction = {
  type: 'accounts/EDIT'
  payload: Partial<IAccount> & { id: ID }
}

export type DeleteAccountAction = {
  type: 'accounts/DELETE'
  payload: ID
}
