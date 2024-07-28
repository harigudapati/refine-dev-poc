import { useForm, useSelect } from '@refinedev/core'
import './create.scss'
import { Input } from '../../components/inputs/Input'
import { Select } from '../../components/inputs/Select'
import { TextArea } from '../../components/inputs/TextArea'

export const CreateProduct = () => {
  const { onFinish, mutationResult } = useForm({
    // action: "create",
    // resource: "products",  // action, resource will be automatially picked from route by Refine

    redirect: 'show',
    // This will redirect to the show page after the mutation is successful.
    // Default value is `"list"`.
    // We can also provide `false` to disable the redirect.
  })

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
    <main className='new-shipping'>
      <h1 className='shipping-title'>Create Products</h1>
      <form onSubmit={onSubmit} className='shipping-form'>
        <Input label='Name' htmlFor='name' type='text' id='name' name='name' />
        <TextArea
          label='Description'
          htmlFor='description'
          id='description'
          name='description'
        />
        <Input
          label='Price'
          htmlFor='price'
          type='number'
          id='price'
          name='price'
          step={0.01}
        />
        <Input
          label='Material'
          htmlFor='material'
          type='text'
          id='material'
          name='material'
        />
        <Select
          label='category'
          htmlFor='category'
          id='category'
          name='category'
          options={options}
        />

        {mutationResult.isSuccess && <span>successfully submitted!</span>}
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}
