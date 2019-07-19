import React, { useState } from 'react'
import styled from 'styled-components'

import { IAccount } from 'state/ducks/accounts'

interface AddAccountFormProps {
  isOpen: boolean
  onSubmit: (account: Omit<IAccount, 'id' | 'transactions'>) => any
}

const AddAccountForm: React.FC<AddAccountFormProps> = ({
  isOpen,
  onSubmit
}) => {
  const [type, setType] = useState<'credit' | 'debit'>('credit')
  const [balance, setBalance] = useState('')
  const [bank, setBank] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardType, setCardType] = useState<'visa' | 'mastercard' | 'amex'>(
    'visa'
  )
  const [limit, setLimit] = useState('')
  const [nickname, setNickname] = useState('')

  if (!isOpen) return null

  const handleSubmit: React.FormEventHandler = evt => {
    evt.preventDefault()
    onSubmit({
      type,
      bank,
      cardType,
      nickname,
      balance: Number(balance),
      cardNumber: Number(cardNumber),
      limit: Number(limit)
    })
  }

  return (
    <form onSubmit={handleSubmit} data-cy="add-account-form">
      <label>
        <input
          data-cy="account_type_credit"
          type="radio"
          name="type"
          value="credit"
          checked={type === 'credit'}
          onChange={() => setType('credit')}
          required
        />
        Credit
      </label>
      <label>
        <input
          data-cy="account_type_debit"
          type="radio"
          name="type"
          value="debit"
          checked={type === 'debit'}
          onChange={() => setType('debit')}
          required
        />
        Debit
      </label>
      {type === 'credit' && (
        <Label>
          Limit
          <input
            data-cy="account_limit"
            id="limit"
            type="number"
            value={limit}
            onChange={evt => setLimit(evt.target.value)}
            required
          />
        </Label>
      )}
      <Label>
        Account balance
        <input
          data-cy="account_balance"
          id="balance"
          type="number"
          value={balance}
          onChange={evt => setBalance(evt.target.value)}
          required
        />
      </Label>
      <Label>
        Bank
        <input
          data-cy="account_bank"
          id="bank"
          type="text"
          value={bank}
          onChange={evt => setBank(evt.target.value)}
          required
        />
      </Label>
      <Label>
        Card number
        <input
          data-cy="account_card-number"
          id="card-number"
          type="number"
          value={cardNumber}
          onChange={evt => setCardNumber(evt.target.value)}
          required
        />
      </Label>
      <label>
        <input
          data-cy="account_card-type_visa"
          type="radio"
          name="card-type"
          value="visa"
          checked={cardType === 'visa'}
          onChange={() => setCardType('visa')}
          required
        />
        Visa
      </label>
      <label>
        <input
          data-cy="account_card-type_mastercard"
          type="radio"
          name="card-type"
          value="mastercard"
          checked={cardType === 'mastercard'}
          onChange={() => setCardType('mastercard')}
          required
        />
        Mastercard
      </label>
      <label>
        <input
          data-cy="account_card-type_amex"
          type="radio"
          name="card-type"
          value="amex"
          checked={cardType === 'amex'}
          onChange={() => setCardType('amex')}
          required
        />
        Amex
      </label>
      <Label>
        Nickname (optional)
        <input
          data-cy="account_nickname"
          id="nickname"
          type="text"
          value={nickname}
          onChange={evt => setNickname(evt.target.value)}
        />
      </Label>
      <button id="submit" type="submit" data-cy="add-account-form_submit">
        Add account
      </button>
    </form>
  )
}

export default AddAccountForm

const Label = styled.label`
  display: flex;
  flex-direction: column;
`
