import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'
import { useAuth } from '../../hooks/useAuth'
import { useState, useEffect } from 'react'

export default function Header() {
  const items = useCartStore((s) => s.items)
  const totalQty = items.reduce((sum, it) => sum + it.quantity, 0)
  const { user, logout, getAllProducts } = useAuth()
  const [search_query, setSearchQuery] = useState("");

  // Deboucing 
  useEffect(() => {

      const timer = setTimeout(() => {
        if(search_query.trim()) {
            getAllProducts(search_query);
        }
      }, 1000);

      return () => clearTimeout(timer);

    }, [search_query]);
  


  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gray-800">ShopLogo</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          {user && <Link to="/orders" className="text-gray-700 hover:text-gray-900">My Orders</Link>}
          <div className="relative">
            <input
              type="text"
              name="search_products"
              value={search_query}
              onChange={(e)=>setSearchQuery(e.target.value)}
              placeholder="Search products"
              className="w-100 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
          </div>
          <Link to="/cart" className="relative inline-flex items-center px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
            Cart
            <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-sm font-medium bg-amber-400 text-white rounded-full">{totalQty}</span>
          </Link>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Hi, {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-1 text-sm bg-teal-500 text-white rounded-md hover:bg-teal-600">Login</Link>
              <Link to="/signup" className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
