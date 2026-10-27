# Guía breve para la presentación individual

La presentación y defensa individual debe realizarlas cada estudiante. Esta guía organiza una demostración coherente con los indicadores de la evaluación; no reemplaza la exposición personal.

## Demostración sugerida

1. **Estructura React:** mostrar `src/App.jsx`, explicar rutas de React Router y la separación entre `pages`, `components`, `context` y `data`.
2. **Props y estado:** mostrar `ProductCard` recibiendo el producto por props; `Home` controla filtros con estado; `CartContext` comparte las operaciones del carrito.
3. **Bootstrap responsivo:** mostrar el catálogo a ancho de escritorio y reducir el ancho del navegador/dispositivo para observar el cambio de columnas `row-cols-*` y las grillas `col-md-*`/`col-lg-*` en detalle, perfil y panel.
4. **Recorrido funcional:** filtrar catálogo, abrir un producto, añadirlo al carrito, modificar cantidad, registrar una compra de demostración y consultar el pedido en perfil o panel.
5. **Pruebas Jasmine/Karma:** ejecutar `npm test`; señalar un caso del carrito, uno del perfil, la validación del límite de imagen y el mock Jasmine de `FileReader`. Explicar arrange/act/assert y el aislamiento de cada prueba mediante `localStorage.clear()`.
6. **Resultados y límites:** abrir `coverage/index.html`, indicar métricas reales del documento de cobertura y reconocer ramas no cubiertas. Aclarar que login, persistencia, administración y pago son demostraciones locales sin backend.

## Comandos

Ejecutar desde `tienda-videojuegos`:

```powershell
npm run dev
npm test
npm run lint
npm run build
```

No presentar credenciales ni datos de pago reales. El acceso de demostración no es autenticación segura y no se realiza un cobro.
