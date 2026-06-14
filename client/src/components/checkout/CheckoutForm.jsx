import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function CheckoutForm({ items, total, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cod'
  })
  const [formError, setFormError] = useState('')
  const {checkout} = useAuth();

  const handleChange = (e) => {
    const { name, value, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))    
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    if (!formData.address || !formData.city || !formData.postalCode || !formData.country) {
      setFormError('All fields are required')
      return
    }

    const orderData = {
      orderItems: items.map((it) => ({
        name: it.name,
        qty: it.quantity,
        image: it.images?.[0] || it.image,
        price: Number(it.price),
        product: it._id || it.id,
      })),
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
      itemsPrice: total,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: total,
    }

    onSubmit(orderData)
    if(formData.paymentMethod == "paynow"){     
      await checkout(total);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold">Shipping Details</h2>

      {formError && <div className="text-red-600 text-sm">{formError}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="123 Main St"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="New York"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="10001"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="United States"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Payment Method</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="cod">Cash on Delivery</option>
          <option value="paynow">Pay Now</option>
        </select>
      </div>
     
     {
      formData.paymentMethod == "paynow"
      ?
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      :
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
     }
     

      
    </form>
  )
}
