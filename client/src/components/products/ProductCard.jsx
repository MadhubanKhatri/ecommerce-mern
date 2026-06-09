import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

export default function ProductCard({ product }) {
  const add = useCartStore((s) => s.addItem)
  const productId = product._id || product.id

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <Link to={`/product/${productId}`} className="block">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${productId}`} className="block hover:text-teal-600">
          <h3 className="font-semibold text-lg">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-xl font-bold">Rs. {product.price}</div>
            <div className="text-sm text-yellow-500">{product.rating} ★ ({product.numReviews} reviews)</div>
          </div>
          <button onClick={() => add(product)} className="px-3 py-1 bg-teal-500 text-white rounded-md hover:bg-teal-600">
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
