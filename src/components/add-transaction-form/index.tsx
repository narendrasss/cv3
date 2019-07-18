import React, { useState } from 'react'

import { ITransaction } from 'state/ducks/transactions'

interface AddAccountFormProps {
  isOpen: boolean
  onSubmit: (
    evt: React.FormEvent,
    transaction: Omit<ITransaction, 'id' | 'transactions'>
  ) => any
}

const AddTransactionForm: React.FC<AddAccountFormProps> = ({ isOpen }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense')
  const [vendor, setVendor] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date())
  const [account, setAccount] = useState('')
  const [budget, setBudget] = useState('')
  const [note, setNote] = useState('')

  if (!isOpen) return null
  return <form data-cy="add-transaction-form" />
}

export default AddTransactionForm
