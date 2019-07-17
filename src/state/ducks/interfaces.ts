import { TransactionState, TransactionAction } from './transactions'
import { BudgetState, BudgetAction } from './budgets'
import { AccountState, AccountAction } from './accounts'

export type ID = string | number

export interface AppState {
  accounts: AccountState
  budgets: BudgetState
  transactions: TransactionState
}

export type AppAction = TransactionAction | BudgetAction | AccountAction