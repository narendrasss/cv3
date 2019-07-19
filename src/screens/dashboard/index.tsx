import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  accountSelectors,
  budgetSelectors,
  transactionSelectors
} from 'state/ducks'
import { AppState } from 'state/ducks/interfaces'
import { IAccount, actions as accountActions } from 'state/ducks/accounts'
import { IBudget } from 'state/ducks/budgets'
import {
  ITransaction,
  actions as transactionActions
} from 'state/ducks/transactions'

import AddAccountForm from 'components/add-account-form'
import AddTransactionForm from 'components/add-transaction-form'
import { format } from 'date-fns'

interface DashboardStateProps {
  accounts: IAccount[]
  budgets: IBudget[]
  totalBalance: number
  transactions: ITransaction[]
}

interface DashboardActionProps {
  addAccount: typeof accountActions.addAccount
  addTransaction: typeof transactionActions.addTransaction
}

type DashboardProps = DashboardStateProps & DashboardActionProps

const Dashboard: React.FC<RouteComponentProps & DashboardProps> = ({
  accounts,
  budgets,
  totalBalance,
  transactions,
  addAccount,
  addTransaction
}) => {
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)

  return (
    <Main>
      <h1>Dashboard</h1>
      <section>
        <h1>Accounts</h1>
        <Flex>
          {accounts.map(account => (
            <div key={account.id}>
              <h1>{account.bank}</h1>
              <p>{account.balance}</p>
            </div>
          ))}
        </Flex>
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
        <Flex>
          {budgets.map(budget => (
            <div key={budget.name}>
              <h1>{budget.name}</h1>
              <p>{budget.spent}</p>
            </div>
          ))}
        </Flex>
      </section>
      <section>
        <h1>Transactions</h1>
        <Flex>
          {transactions.map(tr => (
            <Flex key={tr.id}>
              <p>{tr.amount}</p>
              <p>{tr.vendor}</p>
              <p>{format(tr.date, 'YYYY-MM-DD')}</p>
            </Flex>
          ))}
        </Flex>
      </section>
      <button
        type="button"
        onClick={() => setShowTransactionForm(prev => !prev)}
      >
        {showTransactionForm ? 'Close' : 'Add transaction'}
      </button>
      <AddTransactionForm
        accounts={accounts.map(account => account.id)}
        budgets={budgets.map(budget => budget.name)}
        isOpen={showTransactionForm}
        onSubmit={transaction => {
          addTransaction(transaction)
          setShowTransactionForm(false)
        }}
      />
    </Main>
  )
}

const mapStateToProps = (state: AppState): DashboardStateProps => ({
  accounts: accountSelectors.getAccounts(state),
  budgets: budgetSelectors.getBudgets(state),
  totalBalance: accountSelectors.getTotalBalance(state),
  transactions: transactionSelectors.getTransactions(state)
})

const mapDispatchToProps: DashboardActionProps = {
  addAccount: accountActions.addAccount,
  addTransaction: transactionActions.addTransaction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

const Main = styled.main`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10vh auto;
`

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
