import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((total, item) => total + item.precio_nuevo * item.quantity, 0);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Carrito</h1>
        <Link to="/" className="btn btn-outline-dark">
          Seguir comprando
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="summary-box text-center">
          <h3>Tu carrito está vacío</h3>
          <p className="mt-2 mb-0">Agrega algunos videojuegos para comenzar.</p>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imagen} alt={item.nombre} />
                  <div className="flex-grow-1">
                    <h3>{item.nombre}</h3>
                    <p className="mb-2 text-muted">{item.categoria}</p>
                    <div className="d-flex align-items-center gap-3">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-dark"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">${item.precio_nuevo * item.quantity}</div>
                    <button
                      type="button"
                      className="btn btn-link text-danger p-0 mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="col-lg-4">
            <div className="summary-box">
              <h3 className="mb-3">Resumen</h3>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>${subtotal}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Envío</span>
                <strong>Gratis</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold">
                <span>Total</span>
                <span>${subtotal}</span>
              </div>
              <Link to="/comprar" className="btn btn-primary w-100 mt-3">Continuar compra</Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default CartPage;
