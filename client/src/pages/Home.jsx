import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
  const { products, getAllProducts, productsLoading } = useAuth()
  const [searchParams] = useSearchParams();
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");

  useEffect(() => {
    getAllProducts(limit, page)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productsLoading ? (
          <div className="col-span-full text-center text-gray-600">Loading products...</div>
        ) : products?.length > 0 ? (
          products.map((p) => <ProductCard key={p._id || p.id} product={p} />)
        ) : (
          <div className="col-span-full text-center text-gray-600">No products found.</div>
        )}
      </div>
    </div>
  )
}
