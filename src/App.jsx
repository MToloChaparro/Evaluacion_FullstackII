import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import InfoPage from './pages/InfoPage'
import ProfilePage from './pages/ProfilePage'
import ProductPage from './pages/ProductPage'
import BlogArticlePage from './pages/BlogArticlePage'
import CheckoutPage from './pages/CheckoutPage'
import PurchaseResultPage from './pages/PurchaseResultPage'
import AdminPage from './pages/AdminPage'
import { CartProvider } from './context/CartContext'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home key="home" />} />
          <Route path="/categorias" element={<Home key="categories" view="categories" />} />
          <Route path="/ofertas" element={<Home key="offers" view="offers" />} />
          <Route path="/nosotros" element={<InfoPage page="nosotros" />} />
          <Route path="/blog" element={<InfoPage page="blog" />} />
          <Route path="/contacto" element={<InfoPage page="contacto" />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/iniciar-sesion.html" element={<LoginPage />} />
          <Route path="/crear-cuenta" element={<RegisterPage />} />
          <Route path="/crear-sesion.html" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/admin/perfil/*" element={<ProfilePage />} />
          <Route path="/productos/:productId" element={<ProductPage />} />
          <Route path="/productos/producto1.html" element={<ProductPage />} />
          <Route path="/blog/:articleId" element={<BlogArticlePage />} />
          <Route path="/blog-items.html" element={<InfoPage page="blog" />} />
          <Route path="/comprar" element={<CheckoutPage />} />
          <Route path="/comprar.html" element={<CheckoutPage />} />
          <Route path="/compra/:result" element={<PurchaseResultPage />} />
          <Route path="/comprar-ok.html" element={<PurchaseResultPage result="ok" />} />
          <Route path="/comprar-error.html" element={<PurchaseResultPage result="error" />} />
          <Route path="/carrito.html" element={<CartPage />} />
          <Route path="/categorias.html" element={<Home key="categories-legacy" view="categories" />} />
          <Route path="/ofertas.html" element={<Home key="offers-legacy" view="offers" />} />
          <Route path="/nosotros.html" element={<InfoPage page="nosotros" />} />
          <Route path="/blog.html" element={<InfoPage page="blog" />} />
          <Route path="/contacto.html" element={<InfoPage page="contacto" />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="*" element={<InfoPage page="no-encontrada" />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
