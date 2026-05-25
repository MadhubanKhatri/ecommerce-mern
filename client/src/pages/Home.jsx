import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'

export default function Home() {
  const { products, getAllProducts, productsLoading } = useAuth()

  useEffect(() => {
    getAllProducts()
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
