import { AppState, ID } from '../interfaces'

const sum = (key: string) => (acc: number, obj: any) => acc + Number(obj[key])

export const getAccounts = ({ accounts }: AppState) => Object.values(accounts)

export const getPopulatedAccounts = (state: AppState) =>
  getAccounts(state).map(account => ({
    ...account,
    transactions: account.transactions.map(id => state.transactions.byId[id])
  }))

export const getAccountById = (state: AppState, id: ID) =>
  getPopulatedAccounts(state).find(account => account.id === id)

export const getDebitAccounts = (state: AppState) =>
  getAccounts(state).filter(account => account.accountType === 'debit')

export const getCreditAccounts = (state: AppState) =>
  getAccounts(state).filter(account => account.accountType === 'credit')

export const getTotalBalance = (state: AppState) => {
  const debitSum = getDebitAccounts(state).reduce(sum('balance'), 0)
  const creditSum = getCreditAccounts(state).reduce(sum('balance'), 0)
  return debitSum - creditSum
}
