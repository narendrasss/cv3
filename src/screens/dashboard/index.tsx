import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { connect } from 'react-redux'

import {
  accountSelectors,
  budgetSelectors,
  transactionSelectors
} from 'state/ducks'
import { AppState } from 'state/ducks/interfaces'
import { IAccount, actions as accountActions } from 'state/ducks/accounts'
import { IBudget } from 'state/ducks/budgets'
import { ITransaction } from 'state/ducks/transactions'

import AddAccountForm from 'components/add-account-form'

interface DashboardStateProps {
  accounts: IAccount[]
  budget: IBudget[]
  totalBalance: number
  transactions: ITransaction[]
}

interface DashboardActionProps {
  addAccount: typeof accountActions.addAccount
}

type DashboardProps = DashboardStateProps & DashboardActionProps

const Dashboard: React.FC<RouteComponentProps & DashboardProps> = ({
  accounts,
  budget,
  totalBalance,
  transactions,
  addAccount
}) => {
  const [showAccountForm, setShowAccountForm] = useState(false)

  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <h1>Accounts</h1>
        {accounts.map(account => (
          <div key={account.id}>
            <h1>{account.bank}</h1>
            <p>{account.balance}</p>
          </div>
        ))}
        <button type="button" onClick={() => setShowAccountForm(prev => !prev)}>
          {showAccountForm ? 'Close' : 'Add account'}
        </button>
        <AddAccountForm
          isOpen={showAccountForm}
          onSubmit={(_, acct) => addAccount(acct)}
        />
        <section>
          <h1>Total Balance</h1>
          <p>{totalBalance}</p>
        </section>
      </section>
      <section>
        <h1>Budget</h1>
        {budget.map(bdg => (
          <div key={bdg.name}>
            <h1>{bdg.name}</h1>
            <p>{bdg.spent}</p>
          </div>
        ))}
      </section>
      <section>
        <h1>Transactions</h1>
        {transactions.map(tr => (
          <div key={tr.id}>
            <p>{tr.amount}</p>
            <p>{tr.vendor}</p>
            <p>{tr.date}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

const mapStateToProps = (state: AppState): DashboardStateProps => ({
  accounts: accountSelectors.getAccounts(state),
  budget: budgetSelectors.getBudgets(state),
  totalBalance: accountSelectors.getTotalBalance(state),
  transactions: transactionSelectors.getTransactions(state)
})

const mapDispatchToProps: DashboardActionProps = {
  addAccount: accountActions.addAccount
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
