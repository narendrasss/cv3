import React, { useState } from 'react'

const useForm = <T = {}>(initialInputs: T, callback: (inputs: T) => any) => {
  const [inputs, setInputs] = useState(initialInputs)

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    if (callback) {
      callback(inputs)
    }
  }

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    evt.persist()
    setInputs(inputs => ({ ...inputs, [evt.target.name]: evt.target.value }))
  }

  return [inputs, handleInputChange, handleSubmit] as const
}

export default useForm
