import { useAuth } from '../hooks/useAuth'
import { useEffect, useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
  const { products, getAllProducts, productsLoading, total_pages } = useAuth()
  const [searchParams] = useSearchParams();  
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    console.log(currentPage);
    
    getAllProducts("", currentPage)
  }, [currentPage])

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
      <div className="mt-8 flex flex-col items-center gap-3">
        <nav className="inline-flex items-center rounded-md bg-white shadow-sm">
          <button className="rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage==1}
          onClick={()=>setCurrentPage(currentPage-1)}>
            Previous
          </button>
          <div className="hidden sm:flex items-center divide-x divide-gray-200">
            {
                [...Array(total_pages)].map((_, index) => (
                  <button key={index} onClick={()=>setCurrentPage(index+1)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    {index + 1}
                  </button>
          
                ))
            }            
          </div>
          <button className="rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          disabled={currentPage==total_pages}
          onClick={()=>setCurrentPage(currentPage+1)}>
            Next
          </button>
        </nav>
        <p className="text-sm text-gray-500">Showing page 1 of {total_pages}</p>
      </div>
    </div>
  )
}
