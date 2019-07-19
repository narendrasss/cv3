import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

import { ID } from 'state/ducks/interfaces'
import { ITransaction } from 'state/ducks/transactions'
import useForm from 'hooks/useForm'

interface AddTransactionFormProps {
  accounts: ID[]
  budgets: string[]
  isOpen: boolean
  onSubmit: (transaction: Omit<ITransaction, 'id'>) => any
}

const transformInput = (input: any): Omit<ITransaction, 'id'> => ({
  ...input,
  date: new Date(input.date),
  amount: Number(input.amount)
})

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
  accounts,
  budgets,
  isOpen,
  onSubmit
}) => {
  const initialInputs = {
    type: 'expense' as 'expense' | 'income',
    vendor: '',
    amount: '',
    date: format(new Date(), 'YYYY-MM-DD'),
    account: accounts[0],
    budget: budgets[0],
    note: ''
  }

  const [inputs, handleChange, handleSubmit] = useForm(initialInputs, inputs =>
    onSubmit(transformInput(inputs))
  )

  if (!isOpen) return null
  return (
    <form data-cy="add-transaction-form" onSubmit={handleSubmit}>
      <label>
        <input
          data-cy="transaction_type_expense"
          type="radio"
          name="type"
          value="expense"
          checked={inputs.type === 'expense'}
          onChange={handleChange}
          required
        />
        Expense
      </label>
      <label>
        <input
          data-cy="transaction_type_income"
          type="radio"
          name="type"
          value="income"
          checked={inputs.type === 'income'}
          onChange={handleChange}
          required
        />
        Income
      </label>
      <Label>
        {inputs.type === 'expense' ? 'Vendor' : 'From'}
        <input
          data-cy="transaction_vendor"
          name="vendor"
          type="text"
          value={inputs.vendor}
          onChange={handleChange}
          required
        />
      </Label>
      <Label>
        Amount
        <input
          data-cy="transaction_amount"
          name="amount"
          type="number"
          value={inputs.amount}
          onChange={handleChange}
          required
        />
      </Label>
      <Label>
        Date
        <input
          data-cy="transaction_date"
          name="date"
          type="date"
          value={inputs.date}
          onChange={handleChange}
          required
        />
      </Label>
      <label htmlFor="account">Account</label>
      <select
        id="account"
        name="account"
        value={inputs.account}
        onChange={handleChange}
        data-cy="transaction_account"
      >
        {accounts.map(id => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <label htmlFor="budget">Category</label>
      <select
        id="budget"
        name="budget"
        value={inputs.budget}
        onChange={handleChange}
        data-cy="transaction_budget"
      >
        {budgets.map(id => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <Label>
        Note (optional)
        <input
          data-cy="transaction_note"
          name="note"
          type="text"
          value={inputs.note}
          onChange={handleChange}
        />
      </Label>
      <button type="submit" data-cy="add-transaction-form_submit">
        Add transaction
      </button>
    </form>
  )
}

export default AddTransactionForm

const Label = styled.label`
  display: flex;
  flex-direction: column;
`
