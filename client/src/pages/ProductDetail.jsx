import { useParams, Link } from 'react-router-dom'
// import { products } from '../data/products'
import { useCartStore } from '../store/cartStore'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'


export default function ProductDetail() {
  const { id } = useParams()
  const { products, getAllProducts, productsLoading } = useAuth()
  const add = useCartStore((s) => s.addItem)

  useEffect(() => {
    if (!products || products.length === 0) {
      getAllProducts()
    }
  }, [])

  const product = products?.find((item) => item._id === id || item.id === id)

  if (productsLoading) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-semibold">Loading...</h2>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-12 text-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <p className="mt-3 text-gray-600">Check the product list and try again.</p>
        <Link to="/" className="mt-6 inline-block px-5 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">Back to Home</Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Main Product Section */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img 
              src={product.image || 'https://via.placeholder.com/500'} 
              alt={product.name} 
              className="w-full h-96 object-cover" 
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 space-y-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-600 mt-2">Brand: <span className="font-semibold">{product.brand}</span></p>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-3 py-3 border-y border-gray-200">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-yellow-500">{product.rating}</span>
              <span className="text-yellow-500">★</span>
            </div>
            <span className="text-gray-600">({product.numReviews} reviews)</span>
          </div>

          {/* Price and Stock */}
          <div className="space-y-2">
            <div className="text-4xl font-bold text-teal-600">${product.price}</div>
            <div className={`text-lg font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.countInStock > 0 
                ? `${product.countInStock} in stock` 
                : 'Out of Stock'}
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-7">{product.description}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              onClick={() => add(product)} 
              disabled={product.countInStock === 0}
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              Add to Cart
            </button>
            <Link 
              to="/cart" 
              className="w-full sm:w-auto px-8 py-3 text-center bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Product Info Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Product Information</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Brand</p>
            <p className="text-lg font-semibold">{product.brand}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Price</p>
            <p className="text-lg font-semibold text-teal-600">${product.price}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Stock</p>
            <p className="text-lg font-semibold">{product.countInStock}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">Rating</p>
            <p className="text-lg font-semibold flex items-center justify-center gap-1">
              {product.rating} <span className="text-yellow-500">★</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
