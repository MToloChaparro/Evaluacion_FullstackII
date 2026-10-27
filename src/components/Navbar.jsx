import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  useLocation();
  const savedUser = localStorage.getItem('demo-user');
  const user = savedUser ? JSON.parse(savedUser) : null;
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
        <div className="container py-2">
          <Link className="navbar-brand d-flex align-items-center gap-2 fw-bold fs-4 text-dark" to="/">
            <span className="brand-mark">🎮</span>
            <span>Tienda Gamer</span>
          </Link>

          <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
            <div className="search-wrap">
              <i className="bi bi-search"></i>
              <input type="search" placeholder="Buscar videojuego" aria-label="Buscar videojuego" />
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 ms-auto">
            {user ? (
              <Link className="btn btn-outline-primary btn-sm" to="/perfil">{user.name || 'Mi perfil'}</Link>
            ) : (
              <>
                <Link className="btn btn-outline-primary btn-sm d-none d-md-inline-flex" to="/iniciar-sesion">
                  Iniciar sesión
                </Link>
                <Link className="btn btn-primary btn-sm" to="/crear-cuenta">
                  Crear cuenta
                </Link>
              </>
            )}
            <Link className="btn btn-success btn-sm d-flex align-items-center gap-2" to="/carrito">
              <i className="bi bi-cart3"></i>
              <span>Carrito</span>
              <span className="badge rounded-pill bg-light text-success ms-1">{totalItems}</span>
            </Link>
          </div>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg bg-dark text-white">
        <div className="container">
          <button
            className="navbar-toggler navbar-dark d-lg-none"
            type="button"
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((isOpen) => !isOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="main-navigation" className={`collapse navbar-collapse justify-content-center ${menuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav align-items-center gap-lg-3">
              <li className="nav-item"><Link className="nav-link text-white" to="/" onClick={closeMenu}>Home</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/categorias" onClick={closeMenu}>Categorías</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/ofertas" onClick={closeMenu}>Ofertas</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/blog" onClick={closeMenu}>Blog</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/contacto" onClick={closeMenu}>Contacto</Link></li>
              <li className="nav-item"><Link className="nav-link text-white" to="/admin" onClick={closeMenu}>Administración (demo)</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;