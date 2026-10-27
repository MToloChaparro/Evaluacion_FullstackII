import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const user = {
      name: String(formData.get('name')).trim(),
      email: String(formData.get('email')).trim(),
    };
    localStorage.setItem('demo-user', JSON.stringify(user));
    setError('');
    navigate('/perfil');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="summary-box">
            <h1 className="mb-4">Crear cuenta</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-name">Nombre</label>
                <input id="register-name" name="name" type="text" className="form-control" placeholder="Tu nombre" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-email">Correo electrónico</label>
                <input id="register-email" name="email" type="email" className="form-control" placeholder="tu@correo.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-password">Contraseña</label>
                <input id="register-password" name="password" type="password" className="form-control" placeholder="********" required />
              </div>
              {error && <p className="text-danger" role="alert">{error}</p>}
              <button type="submit" className="btn btn-primary w-100">Registrarme</button>
            </form>
            <p className="small text-muted mt-3">Cuenta de demostración: los datos se guardan en este navegador; no se almacena la contraseña.</p>
            <p className="mt-3 mb-0 text-center">
              ¿Ya tienes cuenta? <Link to="/iniciar-sesion">Iniciar sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
