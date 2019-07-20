import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { format } from 'date-fns'

import {
  accountSelectors,
  budgetSelectors,
  transactionSelectors
} from 'state/ducks'
import { AppState } from 'state/ducks/interfaces'
import { IAccount, actions as accountActions } from 'state/ducks/accounts'
import { IBudget, actions as budgetActions } from 'state/ducks/budgets'
import {
  ITransaction,
  actions as transactionActions
} from 'state/ducks/transactions'

import AddAccountForm from 'components/add-account-form'
import AddTransactionForm from 'components/add-transaction-form'
import AddBudgetForm from 'components/add-budget-form'
import Transaction from 'components/transaction'

interface DashboardStateProps {
  accounts: IAccount[]
  budgets: IBudget[]
  totalBalance: number
  transactions: ITransaction[]
}

interface DashboardActionProps {
  addAccount: typeof accountActions.addAccount
  addTransaction: typeof transactionActions.addTransaction
  addBudget: typeof budgetActions.addBudget
}

type DashboardProps = DashboardStateProps & DashboardActionProps

const Dashboard: React.FC<RouteComponentProps & DashboardProps> = ({
  accounts,
  budgets,
  totalBalance,
  transactions,
  addAccount,
  addTransaction,
  addBudget
}) => {
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [showTransactionForm, setShowTransactionForm] = useState(false)
  const [showBudgetForm, setShowBudgetForm] = useState(false)

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
          onSubmit={account => {
            addAccount(account)
            setShowAccountForm(false)
          }}
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
              <p>Budget: {budget.budget}</p>
              <p>Spent: {budget.spent}</p>
            </div>
          ))}
        </Flex>
      </section>
      <button type="button" onClick={() => setShowBudgetForm(prev => !prev)}>
        {showBudgetForm ? 'Close' : 'Add budget'}
      </button>
      <AddBudgetForm
        isOpen={showBudgetForm}
        onSubmit={budget => {
          addBudget(budget)
          setShowBudgetForm(false)
        }}
      />
      <section>
        <h1>Transactions</h1>
        {transactions.map(tr => (
          <Transaction key={tr.id} {...tr} />
        ))}
      </section>
      <button
        type="button"
        onClick={() => setShowTransactionForm(prev => !prev)}
      >
        {showTransactionForm ? 'Close' : 'Add transaction'}
      </button>
      <AddTransactionForm
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
  addTransaction: transactionActions.addTransaction,
  addBudget: budgetActions.addBudget
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
