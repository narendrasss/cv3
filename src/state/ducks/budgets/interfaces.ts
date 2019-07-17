import * as types from './types'
import { ID } from '../interfaces'

export type BudgetState = Record<string, IBudget>

export interface IBudget {
  name: string
  budget: number
  spent: number
  transactions: ID[]
  color?: string
}

export type AddBudgetAction = {
  type: typeof types.ADD
  payload: IBudget
}

export type EditBudgetAction = {
  type: typeof types.EDIT
  payload: Partial<IBudget> & { name: string }
}

export type DeleteBudgetAction = {
  type: typeof types.DELETE
  payload: string
}

export type BudgetAction = AddBudgetAction | EditBudgetAction | DeleteBudgetAction