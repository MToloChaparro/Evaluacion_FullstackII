import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getDemoProducts } from '../data/demoStore';

const Home = ({ view = 'home' }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showOffersOnly, setShowOffersOnly] = useState(view === 'offers');
  const productos = useMemo(() => getDemoProducts(), []);
  const categoryList = ['Todas', ...new Set(productos.map((producto) => producto.categoria))];

  const handleScrollToCatalog = () => {
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOffers = () => {
    setSelectedCategory('Todas');
    setShowOffersOnly(true);
    handleScrollToCatalog();
  };

  const handleCatalog = () => {
    setSelectedCategory('Todas');
    setShowOffersOnly(false);
    handleScrollToCatalog();
  };

  const filteredByCategory = selectedCategory === 'Todas'
    ? productos
    : productos.filter((prod) => prod.categoria === selectedCategory);

  const productsToShow = filteredByCategory.filter((prod) => {
    if (!showOffersOnly) return true;
    return prod.precio_nuevo === 0 || prod.precio_nuevo < prod.precio_descuento * 0.75;
  });

  return (
    <main className="page-shell">
      <section className="hero-banner">
        <div className="container py-5">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <p className="eyebrow">Novedades</p>
              <h1>Descubre los mejores juegos del momento</h1>
              <p className="lead text-muted mt-3">
                Encuentra aventuras épicas, shooters competitivos y clásicos para todas las plataformas.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <button type="button" className="btn btn-primary btn-lg" onClick={handleOffers}>Ver ofertas</button>
                <button type="button" className="btn btn-outline-dark btn-lg" onClick={handleCatalog}>Ver catálogo</button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-card">
                <span className="promo-badge">Oferta del día</span>
                <div className="game-spotlight">
                  <div>
                    <small>Juego destacado</small>
                    <h3>Cyberpunk 2077</h3>
                  </div>
                  <h2>$59.999</h2>
                </div>
                <div className="hero-visual">
                  <div className="mini-console" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
          {categoryList.map((categoria) => (
            <button
              type="button"
              key={categoria}
              className={`category-pill ${selectedCategory === categoria ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(categoria);
                setShowOffersOnly(false);
                handleScrollToCatalog();
              }}
            >
              {categoria}
            </button>
          ))}
        </div>
      </section>

      <section id="catalogo" className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">
            {showOffersOnly ? 'Ofertas destacadas' : view === 'categories' ? 'Explora las categorías' : 'Nuestros videojuegos'}
          </h2>
          <span className="text-muted">{productsToShow.length} productos</span>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {productsToShow.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
