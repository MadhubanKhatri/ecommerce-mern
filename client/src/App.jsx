import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFound from "./pages/NotFound";
import { lazy, Suspense  } from 'react'

const Home = lazy(()=>import("./pages/Home"));
const ProductDetail = lazy(()=>import("./pages/ProductDetail"));
const CartPage = lazy(()=>import("./pages/Cart"));
const Orders = lazy(()=>import("./pages/Orders"));
const PaymentSuccess = lazy(()=>import("./pages/PaymentSuccess"));

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={
          <Suspense  fallback={<h2>Loading...</h2>}>
            <ProductDetail /> 
          </Suspense>
          }
        />
        
        <Route path="/cart" element={
          <Suspense  fallback={<h2>Loading...</h2>}>
            <CartPage />
          </Suspense>
          } />
        <Route path="/orders" element={
          <Suspense  fallback={<h2>Loading...</h2>}>
            <Orders />
          </Suspense>
          } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/paymentSuccess" element={
          <Suspense  fallback={<h2>Loading...</h2>}>
            <PaymentSuccess />
          </Suspense>
          } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
