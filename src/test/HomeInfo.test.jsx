import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogArticlePage from '../pages/BlogArticlePage';
import Home from '../pages/Home';
import InfoPage from '../pages/InfoPage';
import { CartProvider } from '../context/CartContext';

describe('Catálogo e información de la tienda', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('filtra el catálogo por categoría', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Home />
        </CartProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Shooter' }));

    expect(screen.getByText('Overwatch')).toBeTruthy();
    expect(screen.queryByText('The Legend of Zelda')).toBeNull();
  });

  it('muestra los artículos de oferta en la vista correspondiente', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <Home view="offers" />
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Ofertas destacadas' })).toBeTruthy();
    expect(screen.getByText('Fortnite')).toBeTruthy();
    expect(screen.queryByText('The Legend of Zelda')).toBeNull();
  });

  it('guarda mensajes enviados desde el formulario de contacto', () => {
    render(
      <MemoryRouter>
        <InfoPage page="contacto" />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Luis Demo' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'luis@example.com' } });
    fireEvent.change(screen.getByLabelText('Mensaje'), { target: { value: 'Consulta de prueba' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar mensaje de demostración' }));

    const [message] = JSON.parse(localStorage.getItem('demo-messages'));
    expect(message.name).toBe('Luis Demo');
    expect(message.message).toBe('Consulta de prueba');
    expect(screen.getByRole('status').textContent).toContain('guardado');
  });

  it('renderiza artículos individuales del blog por su ruta', () => {
    render(
      <MemoryRouter initialEntries={['/blog/aventuras']}>
        <Routes>
          <Route path="/blog/:articleId" element={<BlogArticlePage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '¿Qué jugar después de una gran aventura?' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Explorar juegos' }).getAttribute('href')).toBe('/categorias');
  });

  it('muestra el banner y los retratos del equipo en Nosotros', () => {
    render(
      <MemoryRouter>
        <InfoPage page="nosotros" />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Ilustración de videojuegos para presentar la tienda' }).getAttribute('src')).toBe('/images/legacy/banner2.png');
    expect(screen.getByRole('img', { name: 'Avatar ilustrado de Luna' }).getAttribute('src')).toBe('/images/legacy/Luna.png');
  });

  it('usa imágenes locales en las tarjetas del blog', () => {
    render(
      <MemoryRouter>
        <InfoPage page="blog" />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: 'Banner ilustrado del blog gamer' }).getAttribute('src')).toBe('/images/legacy/banner.png');
    expect(screen.getByRole('img', { name: 'Personaje dinosaurio gamer' }).getAttribute('src')).toBe('/images/legacy/dino2.png');
  });
});
