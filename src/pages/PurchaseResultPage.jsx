import { Link, useParams } from 'react-router-dom';

const PurchaseResultPage = ({ result: fallbackResult }) => {
  const { result: routeResult } = useParams();
  const result = routeResult || fallbackResult;
  const success = result === 'ok' || result === undefined;

  return (
    <main className="container py-5">
      <section className="summary-box text-center">
        <h1>{success ? '¡Pedido registrado!' : 'No se pudo completar el pedido'}</h1>
        <p className="text-muted mt-3">
          {success
            ? 'Tu compra de demostración quedó guardada localmente. No se realizó ningún cobro.'
            : 'No se realizó ningún cobro. Puedes volver al carrito e intentarlo nuevamente.'}
        </p>
        <Link className="btn btn-primary mt-2" to={success ? '/perfil' : '/carrito'}>{success ? 'Ver mi perfil' : 'Volver al carrito'}</Link>
      </section>
    </main>
  );
};

export default PurchaseResultPage;
