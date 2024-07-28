import { useForm, useSelect } from '@refinedev/core'

import { Input } from '../../components/inputs/Input'
import { TextArea } from '../../components/inputs/TextArea'

import './edit.scss'

export const EditProduct = () => {
  const { onFinish, mutationResult, queryResult } = useForm({
    // action: "edit",
    // resource: "products",   // action, resource, id will be automatially picked from route by Refine
    // id: "123",
    redirect: 'show',
    // This will redirect to the show page after the mutation is successful.
    // Default value is `"list"`.
    // We can also provide `false` to disable the redirect.
  })

  const record = queryResult?.data?.data

  const { options } = useSelect({
    resource: 'categories',
    optionLabel: 'title', // Default value is "title" so we don't need to provide it.
    optionValue: 'id', // Default value is "id" so we don't need to provide it.
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Using FormData to get the form values and convert it to an object.
    const data = Object.fromEntries(new FormData(event.target).entries())
    // Calling onFinish to submit with the data we've collected from the form.
    onFinish({
      ...data,
      price: Number(data.price).toFixed(2),
      category: { id: Number(data.category) },
    })
  }

  return (
    <main className='edit-shipping'>
      <h1 className='shipping-title'>Edit Products</h1>
      <form className='shipping-form' onSubmit={onSubmit}>
        <Input
          label='Name'
          htmlFor='name'
          type='text'
          id='name'
          name='name'
          defaultValue={record?.name}
        />

        <TextArea
          label='Description'
          htmlFor='description'
          id='description'
          name='description'
          defaultValue={record?.description}
        />

        <Input
          label='Price'
          htmlFor='price'
          type='text'
          id='price'
          name='price'
          pattern='\d*.?\d*'
          defaultValue={record?.price}
        />

        <Input
          label='Material'
          htmlFor='material'
          type='text'
          id='material'
          name='material'
          defaultValue={record?.material}
        />

        <label htmlFor='category'>Category</label>
        <select id='category' name='category'>
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value}
              selected={record?.category.id == option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {mutationResult.isSuccess && <span>successfully submitted!</span>}
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
