import { AppState } from '../interfaces'

export const getBudgets = ({ budgets }: AppState) => Object.values(budgets)

export const getPopulatedBudgets = (state: AppState) => {
  return getBudgets(state).map(budget => ({
    ...budget,
    transactions: budget.transactions.map(id => state.transactions.byId[id])
  }))
}
