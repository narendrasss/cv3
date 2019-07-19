import React from 'react'
import styled from 'styled-components'

import useForm from 'hooks/useForm'
import { IBudget } from 'state/ducks/budgets'

type FormBudget = Omit<IBudget, 'transaction' | 'spent'>

interface AddBudgetFormProps {
  isOpen: boolean
  onSubmit: (budget: FormBudget) => any
}

const transformInput = (input: any): FormBudget => ({
  ...input,
  budget: Number(input.budget)
})

const AddBudgetForm: React.FC<AddBudgetFormProps> = ({ isOpen, onSubmit }) => {
  const initialInputs = {
    name: '',
    budget: ''
  }

  const [inputs, handleChange, handleSubmit] = useForm(initialInputs, inputs =>
    onSubmit(transformInput(inputs))
  )

  if (!isOpen) return null
  return (
    <form data-cy="add-budget-form" onSubmit={handleSubmit}>
      <Label>
        Name
        <input
          data-cy="budget_name"
          name="name"
          type="text"
          value={inputs.name}
          onChange={handleChange}
          required
        />
      </Label>
      <Label>
        Budget
        <input
          data-cy="budget_budget"
          name="budget"
          type="number"
          value={inputs.budget}
          onChange={handleChange}
          required
        />
      </Label>
      <button type="submit" data-cy="add-budget-form_submit">
        Add budget
      </button>
    </form>
  )
}

export default AddBudgetForm

const Label = styled.label`
  display: flex;
  flex-direction: column;
`
