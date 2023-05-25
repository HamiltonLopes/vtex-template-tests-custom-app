import React, { useState, useEffect } from 'react'

import { useRecipes } from '../hooks/useProductRecipes'

const ProductRecipe = () => {
  const { getRecipes } = useRecipes()
  const [recipes, setRecipes] = useState<Recipe[] | null>()

  useEffect(() => {
    setRecipes(getRecipes)
  }, [getRecipes])

  if (!recipes) {
    return <h1 className="tc underline">No products found.</h1>
  }

  return (
    <>
      {recipes.length === 0 ? (
        <h1 className="tc underline">No posts for this product.</h1>
      ) : (
        <>
          <h1 className="tc underline">Posts for this product:</h1>
          {recipes.map(
            ({ id, postTitle, postDate, postContent, skuRecipe }) => (
              <div
                key={id}
                className="w-100 w-two-thirds-m w-50-l center mv3 pa4 bg-light-blue ba br3"
              >
                <h1 className="mv0 tc underline">{postTitle}</h1>
                <p className="f6 black-70 tr">{postDate}</p>
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
