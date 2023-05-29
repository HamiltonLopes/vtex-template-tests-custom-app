import { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

export const useRecipes = (): {
  recipes: Recipe[] | null
  skuId: string | null
} => {
  const productInfo = useProduct()
  const [recipes, setRecipes] = useState<Recipe[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/_v/searchRecipes/${productInfo?.selectedItem?.itemId}`
      ).then((res) => res.json())

      setRecipes(response)
    }

    if (productInfo?.product?.productId) {
      fetchData()
    }
  }, [])

  return {
    recipes,
    skuId: productInfo?.product?.productId ?? null,
  }
}
