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
        `https://techdemo2905--acctglobal.myvtex.com/_v/searchRecipes/:${productInfo?.product?.productId}`
      ).then((res) => res.json())

      setData(response)
    }

    fetchData()
  }, [productInfo?.product?.productId])

  return {
    getRecipes: data?.recipes ?? null,
  }
}
