import React from 'react'

export const Input: React.FC<{
  label?: string
  htmlFor?: string
  type?: string
  name?: string
  id?: string
  step?: number
  className?: string
  required?: boolean
  disabled?: boolean
  value?: any
  defaultValue?: any
  onChange?: any
  pattern?: string
}> = (props) => {
  const { label, htmlFor } = props
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <input {...props} />
    </>
  )
}
