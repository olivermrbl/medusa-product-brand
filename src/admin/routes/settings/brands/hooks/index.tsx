import { useEffect, useState } from "react"

const BACKEND_URL = "http://localhost:9000" || process.env.MEDUSA_BACKEND_URL

export const useBrands = (
  query?: Record<string, any>
): {
  data: { brands: any[] } | null
  loading: boolean
} => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const filterQuery = new URLSearchParams(query).toString()

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(
          BACKEND_URL + "/admin/brands" + (query ? `?${filterQuery}` : ""),
          { credentials: "include" }
        )
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error("Error fetching the data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  return { data, loading }
}
