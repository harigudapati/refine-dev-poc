import React from 'react'

export const TextArea: React.FC<{
  label: string
  htmlFor: string
  name: string
  id: string
  step?: number
  className?: string
  required?: boolean
  value?: any
  defaultValue?: any
  onChange?: any
}> = (props) => {
  const { label, htmlFor } = props
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <textarea {...props} />
    </>
  )
}
