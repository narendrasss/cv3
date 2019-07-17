import React, { useState } from 'react'
import styled from 'styled-components'

import { IAccount } from 'state/ducks/accounts'

interface AddAccountFormProps {
  isOpen: boolean
  onSubmit: (
    evt: React.FormEvent,
    account: Omit<IAccount, 'id' | 'transactions'>
  ) => any
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

  const handleSubmit: React.FormEventHandler = evt =>
    onSubmit(evt, {
      type,
      bank,
      cardType,
      nickname,
      balance: Number(balance),
      cardNumber: Number(cardNumber),
      limit: Number(limit)
    })

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
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
          type="number"
          value={balance}
          onChange={evt => setBalance(evt.target.value)}
          required
        />
      </Label>
      <Label>
        Bank
        <input
          type="text"
          value={bank}
          onChange={evt => setBank(evt.target.value)}
          required
        />
      </Label>
      <Label>
        Card number
        <input
          type="number"
          value={cardNumber}
          onChange={evt => setCardNumber(evt.target.value)}
          required
        />
      </Label>
      <label>
        <input
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
          type="text"
          value={nickname}
          onChange={evt => setNickname(evt.target.value)}
        />
      </Label>
      <button type="submit">Add Account</button>
    </form>
  )
}

export default AddAccountForm

const Label = styled.label`
  display: flex;
  flex-direction: column;
`
