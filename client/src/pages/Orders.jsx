import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Orders() {
  const { orders, ordersLoading, getOrders, user } = useAuth()
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    if (user?._id) {
      getOrders()
    }
  }, [user?._id])

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please log in to view your orders.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Orders</h1>

      {ordersLoading ? (
        <div className="text-center py-12 text-gray-600">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No orders yet. Start shopping!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono text-sm font-semibold">{order._id}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-teal-600">Rs.{Number(order.totalPrice || 0).toFixed(2)}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status?.toUpperCase() || 'PENDING'}
                  </span>

                  
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Items ({order.orderItems?.length || 0})</p>
                <div className="space-y-2">
                  {order.orderItems?.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="text-sm text-gray-600 flex justify-between">
                      <span>{item.name} x {item.qty}</span>
                      <span>Rs.{Number(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  {order.orderItems?.length > 2 && (
                    <p className="text-sm text-gray-500 italic">+{order.orderItems.length - 2} more items</p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                <p className="font-semibold text-gray-700">Shipping Address</p>
                <p className="text-gray-600">
                  {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                </p>
              </div>

              {/* Order Summary */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-sm border-t pt-4">
                <div>
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-semibold">Rs.{Number(order.itemsPrice || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-semibold">Rs.{Number(order.shippingPrice || 0).toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Tax</p>
                  <p className="font-semibold">Rs.{Number(order.taxPrice || 0).toFixed(2)}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="text-sm mb-4 p-3 bg-gray-50 rounded">
                <p className="text-gray-600">Payment Method: <span className="font-semibold">{order.paymentMethod?.replace(/([A-Z])/g, ' Rs.1').trim() || 'N/A'}</span></p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                className="w-full py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition text-sm font-semibold"
              >
                {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
              </button>

              {/* Expanded Details */}
              {selectedOrder?._id === order._id && (
                <div className="mt-4 pt-4 border-t">
                  <p className="font-semibold text-gray-700 mb-3">Full Order Details</p>
                  <div className="space-y-3 text-sm">
                    {order.orderItems?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                        <img
                          src={item.image || 'https://via.placeholder.com/60'}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-gray-600">Quantity: {item.qty}</p>
                          <p className="text-gray-600">Price: Rs.{Number(item.price).toFixed(2)} each</p>
                          <p className="font-semibold text-teal-600">Total: Rs.{Number(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    {order.status === 'pending' && (
                      <>
                        <button className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm font-semibold">
                          Cancel Order
                        </button>
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-semibold">
                          Contact Support
                        </button>
                      </>
                    )}
                    {order.status === 'delivered' && (
                      <>
                        <button className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm font-semibold">
                          Leave Review
                        </button>
                        <button className="flex-1 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition text-sm font-semibold">
                          Reorder
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
