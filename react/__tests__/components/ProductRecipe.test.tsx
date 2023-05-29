import React from 'react'
import { render } from '@testing-library/react'

import ProductRecipe from '../../components/ProductRecipe'

let mockUseRecipes: any

jest.mock('../../hooks/useProductRecipes', () => ({
  useRecipes: jest.fn(() => mockUseRecipes),
}))

test('renders "No products found." if skuId is falsy', () => {
  mockUseRecipes = { recipes: [], skuId: null }

  const { getByText } = render(<ProductRecipe />)

  expect(getByText('No products found.')).toBeInTheDocument()
})

test('renders nothing if recipes is falsy', () => {
  mockUseRecipes = { recipes: null, skuId: '123' }

  const { container } = render(<ProductRecipe />)

  expect(container.firstChild).toBeNull()
})

test('renders "No posts for this product." if recipes is an empty array', () => {
  mockUseRecipes = { recipes: [], skuId: '123' }

  const { getByText } = render(<ProductRecipe />)

  expect(getByText('No posts for this product.')).toBeInTheDocument()
})

test('renders the posts for the product if recipes is not empty', () => {
  mockUseRecipes = {
    recipes: [
      {
        id: '1',
        postTitle: 'Post 1',
        postDate: '2022-01-01',
        postContent: 'Content 1',
        skuRecipe: 456,
      },
      {
        id: '2',
        postTitle: 'Post 2',
        postDate: '2022-01-02',
        postContent: 'Content 2',
        skuRecipe: 123,
      },
    ],
    skuId: '123',
  }

  const { getByText } = render(<ProductRecipe />)

  expect(getByText('Posts for this product:')).toBeInTheDocument()
  expect(getByText('Post 1')).toBeInTheDocument()
  expect(getByText('2022-01-01')).toBeInTheDocument()
  expect(getByText('Content 1')).toBeInTheDocument()
  expect(getByText(/Sku da receita: 456/)).toBeInTheDocument()
  expect(getByText('Post 2')).toBeInTheDocument()
  expect(getByText('2022-01-02')).toBeInTheDocument()
  expect(getByText('Content 2')).toBeInTheDocument()
  expect(getByText(/Sku da receita: 123/)).toBeInTheDocument()
})
