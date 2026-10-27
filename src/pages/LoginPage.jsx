import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email')).trim();
    const savedProfile = JSON.parse(localStorage.getItem('demo-user') || 'null');
    const name = savedProfile?.email === email ? savedProfile.name : email.split('@')[0];
    localStorage.setItem('demo-user', JSON.stringify({ name, email }));
    setError('');
    navigate('/perfil');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="summary-box">
            <h1 className="mb-4">Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="login-email">Correo electrónico</label>
                <input id="login-email" name="email" type="email" className="form-control" placeholder="tu@correo.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="login-password">Contraseña</label>
                <input id="login-password" name="password" type="password" className="form-control" placeholder="********" required />
              </div>
              {error && <p className="text-danger" role="alert">{error}</p>}
              <button type="submit" className="btn btn-primary w-100">Entrar</button>
            </form>
            <p className="small text-muted mt-3">Acceso de demostración: no se valida ni almacena la contraseña.</p>
            <p className="mt-3 mb-0 text-center">
              ¿No tienes cuenta? <Link to="/crear-cuenta">Crear cuenta</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
