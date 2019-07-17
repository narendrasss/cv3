import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { connect } from 'react-redux'

import {
  accountSelectors,
  budgetSelectors,
  transactionSelectors
} from '../../state/ducks'
import { AppState } from '../../state/ducks/interfaces'
import { IAccount } from '../../state/ducks/accounts'
import { IBudget } from '../../state/ducks/budgets'
import { ITransaction } from '../../state/ducks/transactions'

interface DashboardProps {
  accounts: IAccount[]
  budget: IBudget[]
  totalBalance: number
  transactions: ITransaction[]
}

const Dashboard: React.FC<RouteComponentProps & DashboardProps> = ({
  accounts,
  budget,
  totalBalance,
  transactions
}) => {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <h1>Accounts</h1>
        {accounts.map(account => (
          <div>
            <h1>{account.bank}</h1>
            <p>{account.balance}</p>
          </div>
        ))}
        <section>
          <h1>Total Balance</h1>
          <p>{totalBalance}</p>
        </section>
      </section>
      <section>
        <h1>Budget</h1>
        {budget.map(bdg => (
          <div>
            <h1>{bdg.name}</h1>
            <p>{bdg.spent}</p>
          </div>
        ))}
      </section>
      <section>
        <h1>Transactions</h1>
        {transactions.map(tr => (
          <div>
            <p>{tr.amount}</p>
            <p>{tr.vendor}</p>
            <p>{tr.date}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

export default connect((state: AppState) => ({
  accounts: accountSelectors.getAccounts(state),
  budget: budgetSelectors.getBudgets(state),
  totalBalance: accountSelectors.getTotalBalance(state),
  transactions: transactionSelectors.getTransactions(state)
}))(Dashboard)
