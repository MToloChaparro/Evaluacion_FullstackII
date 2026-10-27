import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/AdminPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProductPage from '../pages/ProductPage';
import { CartProvider } from '../context/CartContext';

describe('Páginas integradas de la tienda', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('muestra la ficha de producto con una ruta dinámica', () => {
    render(
      <MemoryRouter initialEntries={['/productos/1']}>
        <CartProvider>
          <Routes>
            <Route path="/productos/:productId" element={<ProductPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'The Legend of Zelda' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Añadir al carrito' })).toBeTruthy();
  });

  it('agrega productos desde el panel y los persiste en el navegador', () => {
    render(
      <MemoryRouter initialEntries={['/admin/productos']}>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juego Admin' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '2500' } });
    fireEvent.change(screen.getByPlaceholderText('Stock'), { target: { value: '4' } });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }));

    const savedProducts = JSON.parse(localStorage.getItem('demo-products'));
    expect(savedProducts[0].nombre).toBe('Juego Admin');
    expect(screen.getByText('Producto e imagen guardados en este navegador.')).toBeTruthy();
  });

  it('guarda y muestra la imagen seleccionada al agregar un producto', async () => {
    render(
      <MemoryRouter initialEntries={['/admin/productos']}>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Juego con portada' } });
    fireEvent.change(screen.getByPlaceholderText('Precio'), { target: { value: '2500' } });
    fireEvent.change(screen.getByPlaceholderText('Stock'), { target: { value: '4' } });
    const image = new File(['image data'], 'portada.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Imagen del producto (máximo 1 MB)'), { target: { files: [image] } });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar producto' }));

    await waitFor(() => {
      const savedProducts = JSON.parse(localStorage.getItem('demo-products'));
      expect(savedProducts[0].imagen.startsWith('data:image/png;base64,')).toBe(true);
    });
    const productRow = screen.getByText('Juego con portada').closest('tr');
    expect(productRow.querySelector('img').src).toContain('data:image/png;base64,');
  });

  it('permite reemplazar la imagen de un producto que ya existe', async () => {
    render(
      <MemoryRouter initialEntries={['/admin/productos']}>
        <AdminPage />
      </MemoryRouter>
    );

    const imageBytes = Uint8Array.from(atob('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='), (char) => char.charCodeAt(0));
    const image = new File([imageBytes], 'portada.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Cambiar imagen de The Legend of Zelda'), { target: { files: [image] } });

    await waitFor(() => {
      const savedProducts = JSON.parse(localStorage.getItem('demo-products'));
      expect(savedProducts[0].imagen.startsWith('data:image/png;base64,')).toBe(true);
    });

    const productRow = screen.getByText('The Legend of Zelda').closest('tr');
    expect(productRow.querySelector('img').src).toContain('data:image/png;base64,');
    expect(screen.getByText('Imagen del producto actualizada y guardada en este navegador.')).toBeTruthy();
  });

  it('muestra un error cuando el archivo de imagen supera el límite permitido', () => {
    render(
      <MemoryRouter initialEntries={['/admin/productos']}>
        <AdminPage />
      </MemoryRouter>
    );

    const oversizedImage = new File([new Uint8Array(1024 * 1024 + 1)], 'grande.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Imagen del producto (máximo 1 MB)'), { target: { files: [oversizedImage] } });

    expect(screen.getByRole('alert').textContent).toContain('1 MB o menos');
  });

  it('permite agregar categorías en el panel', () => {
    render(
      <MemoryRouter initialEntries={['/admin/categorias']}>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nueva categoría'), { target: { value: 'Ritmo' } });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));

    expect(JSON.parse(localStorage.getItem('demo-categories'))).toContain('Ritmo');
    expect(screen.getByText('Ritmo')).toBeTruthy();
  });

  it('informa cuando el producto solicitado no existe', () => {
    render(
      <MemoryRouter initialEntries={['/productos/no-existe']}>
        <CartProvider>
          <Routes>
            <Route path="/productos/:productId" element={<ProductPage />} />
          </Routes>
        </CartProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();
  });

  it('registra una compra de demostración y vacía el carrito', () => {
    localStorage.setItem('cart', JSON.stringify([{
      id: 5,
      nombre: 'Juego de Prueba',
      categoria: 'Acción',
      precio_nuevo: 1200,
      quantity: 2,
    }]));

    render(
      <MemoryRouter>
        <CartProvider>
          <CheckoutPage />
        </CartProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana Demo' } });
    fireEvent.change(screen.getByLabelText('Correo electrónico'), { target: { value: 'ana@example.com' } });
    fireEvent.change(screen.getByLabelText('Dirección (demostración)'), { target: { value: 'Calle 123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar compra de demostración' }));

    const [order] = JSON.parse(localStorage.getItem('demo-orders'));
    expect(order.total).toBe(2400);
    expect(order.address).toBe('Calle 123');
    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([]);
  });
});
