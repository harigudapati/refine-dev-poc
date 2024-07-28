import { useTable, useMany, useNavigation } from '@refinedev/core'

import { Link } from 'react-router-dom'

import './list.scss'

export const ListProducts = () => {
  const {
    tableQueryResult: { data, isLoading },
    current,
    setCurrent,
    pageCount,
    sorters,
    setSorters,
  } = useTable({
    // resource: 'protected-products', // automatically picked from the route
    pagination: { current: 1, pageSize: 10 },
    sorters: { initial: [{ field: 'id', order: 'asc' }] },
    // syncWithLocation: true,
  })

  // You can also use methods like show or list to trigger navigation.
  // We're using url methods to provide more semantically correct html.
  const { showUrl, editUrl } = useNavigation()

  const { data: categories } = useMany({
    resource: 'categories',
    ids: data?.data?.map((product) => product.category?.id) ?? [],
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  const onPrevious = () => {
    if (current > 1) {
      setCurrent(current - 1)
    }
  }

  const onNext = () => {
    if (current < pageCount) {
      setCurrent(current + 1)
    }
  }

  const onPage = (page: number) => {
    setCurrent(page)
  }

  const getSorter = (field: string) => {
    const sorter = sorters?.find((sorter) => sorter.field === field)

    if (sorter) {
      return sorter.order
    }
  }

  const onSort = (field: string) => {
    const sorter = getSorter(field)
    setSorters(
      sorter === 'desc'
        ? []
        : [
            {
              field,
              order: sorter === 'asc' ? 'desc' : 'asc',
            },
          ]
    )
  }

  const indicator = { asc: '⬆️', desc: '⬇️' }

  return (
    <div className='shipping-list'>
      <h1>Products</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort('id')}>
              ID {indicator[getSorter('id')]}
            </th>
            <th onClick={() => onSort('name')}>
              Name {indicator[getSorter('name')]}
            </th>
            <th>Category</th>
            <th onClick={() => onSort('material')}>
              Material {indicator[getSorter('material')]}
            </th>
            <th onClick={() => onSort('price')}>
              Price {indicator[getSorter('price')]}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                {
                  categories?.data?.find(
                    (category) => category.id == product.category?.id
                  )?.title
                }
              </td>
              <td>{product.material}</td>
              <td>{product.price}</td>
              <td>
                <Link
                  className='show-shipping'
                  to={showUrl('protected-products', product.id)}
                >
                  Show
                </Link>
                <Link
                  className='edit-shipping'
                  to={editUrl('protected-products', product.id)}
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <button type='button' onClick={onPrevious}>
          {'<'}
        </button>
        <div>
          {current - 1 > 0 && (
            <span className='previous' onClick={() => onPage(current - 1)}>
              {current - 1}
            </span>
          )}
          <span className='current'>{current}</span>
          {current + 1 < pageCount && (
            <span className='next' onClick={() => onPage(current + 1)}>
              {current + 1}
            </span>
          )}
        </div>
        <button type='button' onClick={onNext}>
          {'>'}
        </button>
      </div>
    </div>
  )
}
