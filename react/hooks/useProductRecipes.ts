import { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

export const useRecipes = (): {
  getRecipes: Recipe[] | null
} => {
  const productInfo = useProduct()
  const [data, setData] = useState<{ recipes: Recipe[] } | null>()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/_v/searchRecipes/:${productInfo?.product?.productId}`
      ).then((res) => {
        const resposta = res.json()

        return resposta
      })

      setData(response)
    }

    if (productInfo?.product?.productId) {
      fetchData()
    }
  }, [])

  return {
    getRecipes: data?.recipes ?? null,
  }
}
