import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getDemoProducts } from '../data/demoStore';

const ProductPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const resolvedProductId = productId === 'producto1.html' ? '1' : productId;
  const product = getDemoProducts().find((item) => String(item.id) === resolvedProductId);

  if (!product) {
    return <main className="container py-5"><h1>Producto no encontrado</h1><Link to="/">Volver al catálogo</Link></main>;
  }

  return (
    <main className="container py-5">
      <Link to="/" className="text-decoration-none">← Volver a la tienda</Link>
      <div className="row g-5 mt-2 align-items-center">
        <div className="col-md-6"><img className="w-100 rounded-4 shadow-sm" src={product.imagen} alt={product.nombre} /></div>
        <div className="col-md-6">
          <p className="eyebrow">{product.categoria}</p>
          <h1 className="mt-2">{product.nombre}</h1>
          <p className="lead text-muted">{product.descripcion}</p>
          <p><del className="text-muted">${product.precio_descuento}</del></p>
          <p className="fs-2 fw-bold text-warning">{product.precio_nuevo === 0 ? 'GRATIS' : `$${product.precio_nuevo}`}</p>
          <p>{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}</p>
          <button type="button" className="btn btn-dark btn-lg" disabled={product.stock === 0} onClick={() => addToCart(product)}>Añadir al carrito</button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
