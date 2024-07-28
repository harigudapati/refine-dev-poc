export const Select: React.FC<{
  label: string
  htmlFor: string
  name: string
  options: {}[]
  value?: any
  id: string
  disabled?: boolean
  className?: string
  onChange?: any
}> = (props) => {
  const { options, htmlFor, label } = props
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <select {...props}>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  )
}
