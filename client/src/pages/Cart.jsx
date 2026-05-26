import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useAuth } from '../hooks/useAuth'
import CheckoutForm from '../components/checkout/CheckoutForm'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const add = useCartStore((s) => s.addItem)
  const decrease = useCartStore((s) => s.decreaseItem)
  const remove = useCartStore((s) => s.removeItem)
  const clear = useCartStore((s) => s.clear)

  const { makeOrder, loading, error } = useAuth()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderError, setOrderError] = useState('')

  const total = items.reduce((sum, it) => sum + Number(it.price || 0) * (it.quantity || 0), 0)

  const handleCheckout = async (orderData) => {
    setOrderError('')
    try {
      const result = await makeOrder(orderData)
      setOrderPlaced(true)
      clear()
      setTimeout(() => {
        alert(`Order placed successfully! Order ID: ${result._id}`)
        setOrderPlaced(false)
      }, 500)
    } catch (err) {
      setOrderError(err.message || 'Failed to place order')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>

      {orderError && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{orderError}</div>}

      {items.length === 0 ? (
        <div className="text-gray-600 bg-gray-50 p-8 rounded-lg text-center">Your cart is empty.</div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((it) => {
              const id = it._id || it.id
              return (
                <div key={id} className="flex items-center justify-between bg-white p-4 rounded shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={it.images?.[0] || it.image || 'https://via.placeholder.com/80'} alt={it.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <div className="font-semibold">{it.name}</div>
                      <div className="text-sm text-gray-600">Unit: ${Number(it.price).toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button onClick={() => decrease(id)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">−</button>
                      <div className="px-4 py-1">{it.quantity}</div>
                      <button onClick={() => add(it)} className="px-3 py-1 bg-gray-100 hover:bg-gray-200">+</button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${(Number(it.price) * (it.quantity || 0)).toFixed(2)}</div>
                      <button onClick={() => remove(id)} className="text-sm text-red-600 mt-2">Remove</button>
                    </div>
                  </div>
                </div>
              )
            })}
            <button onClick={() => clear()} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Clear Cart</button>
          </div>

          {/* Checkout */}
          <div className="space-y-4">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <CheckoutForm items={items} total={total} onSubmit={handleCheckout} loading={loading} />
          </div>
        </div>
      )}
    </div>
  )
}
