import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-sm text-gray-600">© {new Date().getFullYear()} My E-commerce</div>
      </footer>
    </div>
  )
}
