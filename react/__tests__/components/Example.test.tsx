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

  it('should render "No products found." if product is null', async () => {
    mockedUseProduct.mockReturnValue({ product: null } as any)
    await act(async () => {
      renderComponent()
    })

    expect(screen.getByText('No products found.')).toBeInTheDocument()
  })

  it('should render "No posts for this product." if recipes is empty', async () => {
    mockedUseProduct.mockReturnValue({ product: { productId: 123 } } as any)

    global.fetch = mockFetch({
      recipes: [],
    })

    await act(async () => {
      renderComponent()
    })

    expect(screen.getByText('No posts for this product.')).toBeInTheDocument()
  })

  it('should render the recipes if there are any', async () => {
    mockedUseProduct.mockReturnValue({ product: { productId: 123 } } as any)
    global.fetch = mockFetch({
      recipes: [
        {
          id: '1',
          postTitle: 'Recipe 1',
          postDate: '2022-01-01',
          postContent: 'Lorem ipsum dolor sit amet',
          skuRecipe: 123,
        },
        {
          id: '2',
          postTitle: 'Recipe 2',
          postDate: '2022-01-02',
          postContent: 'Consectetur adipiscing elit',
          skuRecipe: 456,
        },
      ],
    })

    await act(async () => {
      renderComponent()
    })

    expect(screen.getByText('Posts for this product:')).toBeInTheDocument()
    expect(screen.getByText('Recipe 1')).toBeInTheDocument()
    expect(screen.getByText('2022-01-01')).toBeInTheDocument()
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument()
    expect(screen.getByText('Sku da receita: 123')).toBeInTheDocument()
    expect(screen.getByText('Recipe 2')).toBeInTheDocument()
    expect(screen.getByText('2022-01-02')).toBeInTheDocument()
    expect(screen.getByText('Consectetur adipiscing elit')).toBeInTheDocument()
    expect(screen.getByText('Sku da receita: 456')).toBeInTheDocument()
  })
})
