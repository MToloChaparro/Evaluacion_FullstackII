import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.precio_nuevo * item.quantity, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const order = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-CL'),
      name: String(formData.get('name')).trim(),
      email: String(formData.get('email')).trim(),
      address: String(formData.get('address')).trim(),
      total,
      items: cart,
      status: 'Recibida (demo)',
    };
    const orders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
    localStorage.setItem('demo-orders', JSON.stringify([order, ...orders]));
    clearCart();
    navigate('/compra/ok');
  };

  if (cart.length === 0) {
    return <main className="container py-5"><div className="summary-box text-center"><h1>Tu carrito está vacío</h1><Link to="/" className="btn btn-primary mt-3">Volver a la tienda</Link></div></main>;
  }

  return (
    <main className="container py-5">
      <h1 className="mb-4">Finalizar compra</h1>
      <div className="row g-4">
        <section className="col-lg-7">
          <form className="summary-box" onSubmit={handleSubmit}>
            <h2 className="h4 mb-3">Datos de contacto</h2>
            <label htmlFor="checkout-name" className="form-label">Nombre</label>
            <input id="checkout-name" name="name" className="form-control mb-3" autoComplete="name" required />
            <label htmlFor="checkout-email" className="form-label">Correo electrónico</label>
            <input id="checkout-email" name="email" type="email" className="form-control mb-3" autoComplete="email" required />
            <label htmlFor="checkout-address" className="form-label">Dirección (demostración)</label>
            <input id="checkout-address" name="address" className="form-control mb-4" autoComplete="street-address" required />
            <button type="submit" className="btn btn-primary w-100">Confirmar compra de demostración</button>
            <p className="small text-muted mt-3 mb-0">No se procesa ningún pago real. El pedido se conserva en este navegador.</p>
          </form>
        </section>
        <aside className="col-lg-5">
          <div className="summary-box">
            <h2 className="h4">Resumen</h2>
            {cart.map((item) => <p key={item.id} className="d-flex justify-content-between"><span>{item.nombre} × {item.quantity}</span><strong>${item.precio_nuevo * item.quantity}</strong></p>)}
            <hr />
            <p className="d-flex justify-content-between fs-5"><strong>Total</strong><strong>${total}</strong></p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;
