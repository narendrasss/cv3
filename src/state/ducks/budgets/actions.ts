import * as types from './types'
import { IBudget, AddBudgetAction } from './interfaces'

let idx = 0
const colors = ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429']

export const addBudget = (
  budget: Pick<IBudget, 'name' | 'budget'>
): AddBudgetAction => {
  const color = colors[idx]
  idx++
  return {
    type: types.ADD,
    payload: { ...budget, spent: 0, transactions: [], color }
  }
}

export const deleteBudget = (name: string) => ({
  type: types.DELETE,
  payload: name
})

export const editBudget = (partial: Partial<IBudget> & { name: string }) => ({
  type: types.EDIT,
  payload: { ...partial }
})
