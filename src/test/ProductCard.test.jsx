import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { CartProvider } from '../context/CartContext';

const mockProduct = {
    id: 1,
    nombre: "Juego de Prueba",
    categoria: "Aventura",
    precio_descuento: 10000,
    precio_nuevo: 5999,
    stock: 10,
    imagen: "test.jpg"
};

describe('Pruebas en ProductCard', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const renderProduct = (product = mockProduct) => render(
        <MemoryRouter>
            <CartProvider>
                <ProductCard product={product} />
            </CartProvider>
        </MemoryRouter>
    );

    it('Debe renderizar el nombre, categoría y precios del producto', () => {
        renderProduct();
        expect(screen.getByText('Juego de Prueba')).toBeTruthy();
        expect(screen.getByText('Aventura')).toBeTruthy();
        expect(screen.getByText('$10000')).toBeTruthy();
        expect(screen.getByText('$5999')).toBeTruthy();
    });

    it('Debe mostrar "GRATIS" si el precio es 0', () => {
        const freeProduct = { ...mockProduct, precio_nuevo: 0 };
        renderProduct(freeProduct);
        expect(screen.getByText('GRATIS')).toBeTruthy();
    });

    it('Debe mostrar el botón "Agotado" y deshabilitarlo si el stock es 0', () => {
        const outOfStockProduct = { ...mockProduct, stock: 0 };
        renderProduct(outOfStockProduct);
        const button = screen.getByRole('button', { name: /Agotado/i });
        expect(button).toBeTruthy();
        expect(button.disabled).toBe(true);
    });

    it('Debe mostrar la etiqueta "Añadir al carrito" si hay stock', () => {
        renderProduct();
        expect(screen.getByRole('button', { name: /Añadir al carrito/i })).toBeTruthy();
    });

    it('Debe añadir el producto al carrito al hacer clic', () => {
        renderProduct();

        const button = screen.getByRole('button', { name: /Añadir al carrito/i });
        fireEvent.click(button);

        const savedCart = JSON.parse(localStorage.getItem('cart'));
        expect(savedCart).toBeDefined();
        expect(savedCart.length).toBe(1);
        expect(savedCart[0].nombre).toBe('Juego de Prueba');
    });
});
