import { useCartStore } from '../store/cartStore'

export default function CartPage() {
  const items = useCartStore((s) => s.items)
  const add = useCartStore((s) => s.addItem)
  const decrease = useCartStore((s) => s.decreaseItem)
  const remove = useCartStore((s) => s.removeItem)
  const clear = useCartStore((s) => s.clear)

  const total = items.reduce((sum, it) => sum + Number(it.price || 0) * (it.quantity || 0), 0)

  const handleBuy = () => {
    if (items.length === 0) return
    // placeholder buy action
    alert(`Purchase successful — total $${total.toFixed(2)}`)
    clear()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
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

          <div className="flex items-center justify-between">
            <div>
              <button onClick={() => clear()} className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200">Clear Cart</button>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
              <button onClick={handleBuy} disabled={items.length === 0} className="mt-3 px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
