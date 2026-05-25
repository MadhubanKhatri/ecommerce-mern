import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [productsLoading, setProductsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  // Initialize user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/api/users/login', { email, password })
      const { _id, name, email: userEmail, role, token } = response.data
      const authUser = { _id, name, email: userEmail, role }

      setUser(authUser)
      localStorage.setItem('user', JSON.stringify(authUser))
      localStorage.setItem('token', token)
        console.log("AUTH USER: ", authUser);
      return authUser
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/api/users/register', { name, email, password })
      const { _id, name: userName, email: userEmail, role, token } = response.data
      const authUser = { _id, name: userName, email: userEmail, role }

      setUser(authUser)
      localStorage.setItem('user', JSON.stringify(authUser))
      localStorage.setItem('token', token)

      return authUser
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Signup failed'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setError(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const getAllProducts = async () => {
    setProductsLoading(true)
    setError(null)
    try {
      const response = await api.get('/api/products')
      const payload = response.data
      const normalizedProducts = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.products)
        ? payload.products
        : []
      setProducts(normalizedProducts)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load products'
      setError(message)
      throw new Error(message)
    } finally {
      setProductsLoading(false)
    }
  }

  useEffect(() => {
      getAllProducts()
    }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, productsLoading, products, getAllProducts }}>
      {children}
    </AuthContext.Provider>
  )
}
