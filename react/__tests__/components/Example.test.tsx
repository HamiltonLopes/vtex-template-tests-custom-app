import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useProduct } from 'vtex.product-context'

import ProductRecipe from '../../components/ProductRecipe'

const renderComponent = () => {
  return render(<ProductRecipe />)
}

const mockedUseProduct = mocked(useProduct)

const mockFetch = (mockDataProps: { recipes: Recipe[] | null }) =>
  jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockDataProps),
    } as Response)
  )

describe('first test', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('test one', async () => {
    mockedUseProduct.mockReturnValue({ product: { productId: 123 } } as any)
    global.fetch = mockFetch({
      recipes: [
        {
          id: 'string',
          skuRecipe: 2,
          postTitle: 'string',
          postContent: 'string',
          postDate: 'string',
        },
      ],
    })

    await act(async () => {
      renderComponent()
    })

    expect(screen.getByText('Posts for this product:')).toBeInTheDocument()
  })

  it('test two', async () => {
    mockedUseProduct.mockReturnValue({ product: null } as any)
    await act(async () => {
      renderComponent()
    })

    expect(screen.getByText('No products found.')).toBeInTheDocument()
  })

  it('test three', async () => {
    mockedUseProduct.mockReturnValue({ product: { productId: 123 } } as any)

    global.fetch = mockFetch({
      recipes: [],
    })

    await act(async () => {
      renderComponent()
    })

    expect(screen.getByText('No posts for this product.')).toBeInTheDocument()
  })
})
