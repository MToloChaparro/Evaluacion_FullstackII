import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={product.imagen} className="card-img-top" alt={product.nombre} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title"><Link className="text-dark text-decoration-none" to={`/productos/${product.id}`}>{product.nombre}</Link></h5>
          <p className="text-muted small mb-2">{product.categoria}</p>
          <div className="mt-auto">
            <span className="text-decoration-line-through text-muted d-block" style={{ fontSize: '0.9rem' }}>
              ${product.precio_descuento}
            </span>
            <span className="fw-bolder fs-4 d-block mb-3" style={{ color: '#ff9900' }}>
              {product.precio_nuevo === 0 ? 'GRATIS' : `$${product.precio_nuevo}`}
            </span>
            <button
              className="btn btn-dark w-100"
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
