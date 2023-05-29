import React from 'react'

import { useRecipes } from '../hooks/useProductRecipes'

const ProductRecipe = () => {
  const { recipes, skuId } = useRecipes()

  if (!skuId) {
    return <h1 className="tc underline">No products found.</h1>
  }

  if (!recipes) {
    return <></>
  }

  return (
    <>
      {recipes.length === 0 ? (
        <h1 className="tc underline">No posts for this product.</h1>
      ) : (
        <>
          <h1 className="tc underline">Posts for this product:</h1>
          {recipes.map(
            ({ id, postTitle, createdIn, postContent, skuRecipe }) => (
              <div
                key={id}
                className="w-100 w-two-thirds-m w-50-l center mv3 pa4 bg-light-blue ba br3"
              >
                <h1 className="mv0 tc underline">{postTitle}</h1>
                <p className="f6 black-70 tr">{createdIn.split('T')[0]}</p>
                <p className="tj">{postContent}</p>
                <p className="mb0">Sku da receita: {skuRecipe}</p>
              </div>
            )
          )}
        </>
      )}
    </>
  )
}

export default ProductRecipe
