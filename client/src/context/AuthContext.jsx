import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [productsLoading, setProductsLoading] = useState(false)
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [total_pages, setTotalPages] = useState(null);

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

  const getAllProducts = async (search_product="",page=0) => {
    setProductsLoading(true)
    setError(null)
  
    try {
      const response = await api.get(`/api/products?search=${search_product}&page=${page}`)
      const payload = response.data
      const normalizedProducts = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.products)
        ? payload.products
        : []
      
      setTotalPages(payload.total_pages);
      setProducts(normalizedProducts)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load products'
      setError(message)
      throw new Error(message)
    } finally {
      setProductsLoading(false)
    }
  }

  const makeOrder = async (orderData) => {
    setLoading(true)
    setError(null)
    try {
      const payload = {
        user: user._id,
        orderItems: orderData.orderItems,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
        itemsPrice: orderData.itemsPrice,
        shippingPrice: orderData.shippingPrice || 0,
        taxPrice: orderData.taxPrice || 0,
        totalPrice: orderData.totalPrice,
      }
      const response = await api.post('/api/orders', payload)
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to place order'
      setError(message)
      throw new Error(message)
    } finally {
      setLoading(false)
    }
  }

  const getOrders = async () => {
    setOrdersLoading(true)
    setError(null)
    try {
      if (!user?._id) {
        setOrders([])
        return
      }
      const response = await api.get("/api/orders/myorders")
      const orderList = Array.isArray(response.data) ? response.data : response.data?.orders || []
      setOrders(orderList)
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to load orders'
      setError(message)
      setOrders([])
    } finally {
      setOrdersLoading(false)
    }
  }

  const checkout = async (amount)=>{
    try {
      const response1 = await api.get("/api/v1/get-key");
      const key = await response1.data.key;
      
      
      const response2 = await api.post("/api/v1/payment-handller", {
        amount: amount
      })
      const order = await response2.data.order

      const options = {
        key: key, 
        amount: amount, 
        currency: 'INR',
        name: 'Test name',
        description: 'Test Transaction',
        order_id: order.id, 
        handler: async function (response) {

          const res = await api.post("/api/v1/paymentVerification",
            response
          );
          if(res.data.status){
            navigate(`/paymentSuccess?reference=${res.data.payment_id}`);

          }else{
            console.log("Payment Failed.")
          }

        },        
        prefill: {
          name: 'test Kumar',
          email: 'test.kumar@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
      return order;  
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      getAllProducts()
    }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout, productsLoading, products, getAllProducts, makeOrder, orders, ordersLoading, getOrders, checkout, total_pages }}>
      {children}
    </AuthContext.Provider>
  )
}
