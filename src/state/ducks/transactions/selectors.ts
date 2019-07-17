import { isToday } from 'date-fns'
import { AppState, ID } from '../interfaces'

export const getTransactions = ({ transactions: { byId, allIds } }: AppState) =>
  allIds.map(id => ({ ...byId[id] }))

export const getTransactionById = (state: AppState, id: ID) => getTransactions(state).find(tr => tr.id === id)

export const getTodayTransactions = (state: AppState) =>
  getTransactions(state).filter(tr => isToday(tr.date))
