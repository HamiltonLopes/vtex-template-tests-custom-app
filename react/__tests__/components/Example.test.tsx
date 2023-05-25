import React from 'react'
import { render, act, screen, waitFor } from '@testing-library/react'
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'
import { mocked } from 'jest-mock'
import { useProduct } from 'vtex.product-context'

import ProductRecipe from '../../components/ProductRecipe'

const renderComponent = () => {
  return render(<ProductRecipe />)
}

enableFetchMocks()
const mockedUseProduct = mocked(useProduct)

// const mockFetch = (mockDataProps: { recipes: Recipe[] | null }) =>
//   jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(mockDataProps),
//     } as Response)
//   )

describe('first test', () => {
  beforeEach(() => {
    fetchMock.mockIf(
      /.*\/_v\/searchRecipes\/:[0-9]*/,
      JSON.stringify({ recipes: null })
    )

    fetchMock.mockIf(
      /.*\/_v\/searchRecipes\/:undefined/,
      JSON.stringify({
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
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('test one', async () => {
    // global.fetch = mockFetch({
    //   recipes: null,
    // })

    mockedUseProduct.mockReturnValue({ product: { productId: 123 } } as any)

    await act(async () => {
      renderComponent()
    })

    await waitFor(() => {
      expect(screen.getByText('No products found.')).toBeInTheDocument()
    })
  })

  // it('test two', async () => {
  //   // global.fetch = mockFetch({
  //   //   recipes: [
  //   //     {
  //   //       id: 'string',
  //   //       skuRecipe: 2,
  //   //       postTitle: 'string',
  //   //       postContent: 'string',
  //   //       postDate: 'string',
  //   //     },
  //   //   ],
  //   // })

  //   mockedUseProduct.mockReturnValue({ product: null } as any)

  //   await act(async () => {
  //     renderComponent()
  //   })

  //   await waitFor(() => {
  //     expect(screen.getByText('Posts for this product:')).toBeInTheDocument()
  //   })
  // })
})
