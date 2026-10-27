import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import { CartProvider } from '../context/CartContext';

describe('Flujos de cuenta, perfil y carrito', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('registra una cuenta demo y navega al perfil sin guardar la contraseña', () => {
    render(
      <MemoryRouter initialEntries={['/crear-cuenta']}>
        <Routes>
          <Route path="/crear-cuenta" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: '  Ana Demo  ' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave-temporal' } });
    fireEvent.click(screen.getByRole('button', { name: 'Registrarme' }));

    expect(screen.getByRole('heading', { name: 'Mi perfil' })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('demo-user'))).toEqual({ name: 'Ana Demo', email: 'ana@example.com' });
    expect(localStorage.getItem('password')).toBeNull();
  });

  it('inicia sesión en modo demo usando el correo y no persiste la contraseña', () => {
    render(
      <MemoryRouter initialEntries={['/iniciar-sesion']}>
        <Routes>
          <Route path="/iniciar-sesion" element={<LoginPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'jugador@example.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'clave-temporal' } });
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(screen.getByRole('heading', { name: 'Mi perfil' })).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('demo-user'))).toEqual({ name: 'jugador', email: 'jugador@example.com' });
    expect(localStorage.getItem('password')).toBeNull();
  });

  it('actualiza el nombre del perfil en localStorage', () => {
    localStorage.setItem('demo-user', JSON.stringify({ name: 'Ana', email: 'ana@example.com' }));
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Actualizada' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    expect(JSON.parse(localStorage.getItem('demo-user')).name).toBe('Ana Actualizada');
    expect(screen.getByRole('status').textContent).toContain('guardaron');
  });

  it('muestra la invitación a iniciar sesión cuando no existe perfil', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Tu perfil' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Iniciar sesión' }).getAttribute('href')).toBe('/iniciar-sesion');
  });

  it('no permite continuar la compra con el carrito vacío', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <CheckoutPage />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Tu carrito está vacío' })).toBeTruthy();
  });

  it('permite cambiar cantidades, recalcula el total y elimina artículos', () => {
    localStorage.setItem('cart', JSON.stringify([{
      id: 8,
      nombre: 'Juego Carrito',
      categoria: 'Acción',
      precio_nuevo: 1200,
      quantity: 1,
      imagen: 'data:image/png;base64,',
    }]));

    render(
      <MemoryRouter>
        <CartProvider>
          <CartPage />
        </CartProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getAllByText('$2400').length).toBe(3);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    expect(screen.getByText('Tu carrito está vacío')).toBeTruthy();
  });

  it('usa un mock de FileReader y persiste la imagen en el producto', async () => {
    const dataUrl = 'data:image/png;base64,bW9ja2Vk';
    const readerMock = {
      result: '',
      onload: null,
      onerror: null,
      readAsDataURL: jasmine.createSpy('readAsDataURL').and.callFake(() => {
        readerMock.result = dataUrl;
        readerMock.onload();
      }),
    };
    spyOn(window, 'FileReader').and.returnValue(readerMock);

    render(
      <MemoryRouter initialEntries={['/admin/productos']}>
        <Routes>
          <Route path="/admin/productos" element={<AdminPage />} />
        </Routes>
      </MemoryRouter>
    );

    const file = new File(['mocked image'], 'mock.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Cambiar imagen de The Legend of Zelda'), { target: { files: [file] } });

    await waitFor(() => {
      const savedProducts = JSON.parse(localStorage.getItem('demo-products'));
      expect(savedProducts[0].imagen).toBe(dataUrl);
    });
    expect(readerMock.readAsDataURL).toHaveBeenCalled();
  });
});
