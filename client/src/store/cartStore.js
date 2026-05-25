import {create} from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) => set((state) => {
    const id = product._id || product.id
    const exists = state.items.find((i) => i._id === id || i.id === id)
    if (exists) {
      return { items: state.items.map((i) => (i._id === id || i.id === id) ? { ...i, quantity: (i.quantity || 1) + 1 } : i) }
    }
    return { items: [...state.items, { ...product, quantity: 1 }] }
  }),
  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => (i._id || i.id) !== id) })),
  decreaseItem: (id) => set((state) => {
    const items = state.items.map((i) => {
      if ((i._id || i.id) === id) {
        return { ...i, quantity: Math.max((i.quantity || 1) - 1, 0) }
      }
      return i
    }).filter(i => (i.quantity || 0) > 0)
    return { items }
  }),
  clear: () => set({ items: [] }),
}))
