# Especificación de Requisitos del Software (ERS)

## 1. Propósito y alcance

Este documento describe la versión frontend de demostración de Tienda Gamer implementada para la Evaluación Parcial N.º 2 de DSY1104. La aplicación React integra navegación, catálogo, carrito, formularios, perfil, compra simulada y un panel administrativo local.

Esta entrega no implementa servicios de backend, autenticación segura ni procesamiento de pagos. La información de demostración se almacena en `localStorage` del navegador y no se comparte entre dispositivos o usuarios.

## 2. Usuarios

- **Visitante:** explora el catálogo, las categorías, ofertas, blog y contacto.
- **Cliente de demostración:** crea un perfil local, mantiene un carrito, envía consultas y registra pedidos simulados.
- **Administrador de demostración:** administra productos y categorías locales y consulta usuarios de muestra, pedidos y reportes.

El panel no implementa autorización. No debe usarse con información personal, credenciales o pagos reales.

## 3. Requisitos funcionales

| ID | Requisito |
|---|---|
| RF-01 | La aplicación debe mostrar un catálogo de productos y permitir filtrar por categoría y ofertas. |
| RF-02 | La aplicación debe mostrar el detalle de un producto, precio, disponibilidad e imagen. |
| RF-03 | El visitante debe poder agregar productos al carrito, modificar cantidades y eliminar productos. |
| RF-04 | El visitante debe poder recorrer las páginas de información, blog y artículos individuales. |
| RF-05 | El visitante debe poder enviar una consulta de contacto de demostración. |
| RF-06 | El visitante debe poder crear un perfil local y simular el inicio y cierre de sesión. La contraseña no se conserva ni se valida contra un servidor. |
| RF-07 | El cliente debe poder consultar y actualizar nombre y correo en su perfil local. |
| RF-08 | El cliente debe poder completar un formulario de compra simulado; el pedido queda guardado localmente y el carrito se vacía. No se realiza un cobro. |
| RF-09 | El administrador de demostración debe poder crear y eliminar productos y asignar o cambiar su imagen. |
| RF-10 | La imagen de producto debe ser un archivo de imagen de hasta 1 MB y debe mostrarse en la administración, catálogo y ficha. |
| RF-11 | El administrador de demostración debe poder agregar categorías y consultar usuarios de muestra, pedidos y reportes locales. |
| RF-12 | La aplicación debe ofrecer rutas de navegación para las páginas principales y algunas direcciones `.html` heredadas. |

## 4. Requisitos no funcionales

| ID | Requisito |
|---|---|
| RNF-01 | La interfaz debe estar construida con React y componentes reutilizables. |
| RNF-02 | La interfaz debe usar Bootstrap y sus clases de grilla para adaptarse a distintos anchos de pantalla. |
| RNF-03 | La lógica de componentes y flujos frontend debe validarse con pruebas unitarias de Jasmine ejecutadas por Karma. |
| RNF-04 | Los formularios deben usar etiquetas accesibles y validaciones básicas del navegador. |
| RNF-05 | La aplicación debe informar que el inicio de sesión, la compra y la administración son simulaciones locales. |
| RNF-06 | No se deben almacenar contraseñas ni datos de pago en el navegador. |

## 5. Restricciones y exclusiones

- `localStorage` está limitado al navegador/origen actual y puede ser borrado por el usuario o por el navegador.
- La cuenta de demostración no autentica ni autoriza a una persona.
- Los pedidos no se envían a una tienda real y no generan transacciones.
- Los usuarios iniciales son datos de muestra; no existe administración de usuarios contra una API.
- La carga de imágenes está limitada por el tamaño admitido y la cuota disponible de `localStorage`.
- La publicación en GitHub, la compresión del proyecto, la presentación oral y la información del equipo deben prepararse fuera de esta implementación.

## 6. Tecnologías y ejecución

- React y React Router para UI y navegación.
- Bootstrap y Bootstrap Icons para estilos.
- Jasmine, Karma y React Testing Library para pruebas del DOM y del comportamiento.
- Istanbul mediante `babel-plugin-istanbul` y `karma-coverage` para cobertura.
- Comandos: `npm run dev`, `npm test`, `npm run lint`, `npm run build`.

## 7. Trazabilidad de validación

Los requisitos RF-01 a RF-11 se verifican parcialmente mediante pruebas unitarias de catálogo, tarjeta de producto, carrito, cuenta, perfil, contacto, detalle, checkout y administración. La matriz y los resultados de la última ejecución están en [COBERTURA-TESTING.md](./COBERTURA-TESTING.md).
