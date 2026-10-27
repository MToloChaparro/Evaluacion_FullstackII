import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('demo-user');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [message, setMessage] = useState('');
  const orders = JSON.parse(localStorage.getItem('demo-orders') || '[]');

  if (!profile) {
    return (
      <main className="container py-5">
        <div className="summary-box text-center">
          <h1>Tu perfil</h1>
          <p>Inicia sesión para ver y editar el perfil de demostración.</p>
          <Link className="btn btn-primary" to="/iniciar-sesion">Iniciar sesión</Link>
        </div>
      </main>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('demo-user', JSON.stringify(profile));
    setMessage('Los datos del perfil se guardaron en este navegador.');
  };

  const handleSignOut = () => {
    localStorage.removeItem('demo-user');
    navigate('/');
  };

  return (
    <main className="container py-5">
      <div className="row g-4">
        <section className="col-lg-7">
          <div className="summary-box">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Mi perfil</h1>
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={handleSignOut}>Cerrar sesión</button>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="profile-name">Nombre</label>
              <input id="profile-name" className="form-control mb-3" required value={profile.name || ''} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
              <label className="form-label" htmlFor="profile-email">Correo electrónico</label>
              <input id="profile-email" className="form-control mb-3" type="email" required value={profile.email || ''} onChange={(event) => setProfile({ ...profile, email: event.target.value })} />
              <button className="btn btn-primary" type="submit">Guardar perfil</button>
              {message && <p className="text-success mt-3 mb-0" role="status">{message}</p>}
            </form>
            <p className="small text-muted mt-4 mb-0">Perfil local de demostración. No se guarda ni se solicita tu contraseña real.</p>
          </div>
        </section>
        <section className="col-lg-5">
          <div className="summary-box">
            <h2 className="h4">Mis compras</h2>
            {orders.length === 0 ? <p className="text-muted mb-0">Aún no tienes compras registradas.</p> : (
              <ul className="list-group list-group-flush">
                {orders.map((order) => (
                  <li className="list-group-item px-0" key={order.id}>
                    <strong>Compra {order.id}</strong><br />
                    <span className="text-muted">{order.date} · ${order.total}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
