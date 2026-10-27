# Documento de cobertura de testing

## Alcance

Las pruebas validan comportamiento frontend y manipulación del DOM usando Jasmine, Karma, React Testing Library y Chrome Headless. Istanbul instrumenta los módulos JavaScript/JSX del frontend durante la ejecución de Karma. La cobertura se genera en `coverage/`; abrir `coverage/index.html` para el informe navegable.

Ejecutar desde `tienda-videojuegos`:

```powershell
npm test
npm run lint
npm run build
```

## Casos cubiertos

| Área | Comportamientos validados |
|---|---|
| Tarjeta y catálogo | Datos y precios, producto gratis, sin stock, botón de añadir, actualización del carrito, filtro por categoría y vista de ofertas. |
| Producto | Ruta dinámica y ficha para producto disponible. |
| Cuenta y perfil | Registro e inicio de sesión de demostración, no persistencia de contraseña, edición del perfil. |
| Carrito | Cambio de cantidad, actualización del total y eliminación de artículos. |
| Contacto y blog | Persistencia local del mensaje y renderizado de artículo individual. |
| Compra | Registro de pedido local y vaciado del carrito; no hay cobro real. |
| Administración | Creación de producto, carga y reemplazo de imagen, persistencia de cambios y uso de un mock Jasmine de `FileReader`. |

Los mocks/spies reemplazan `FileReader` en un caso de prueba para controlar el resultado de lectura de la imagen. El resto de los casos usa un navegador headless y `localStorage` de prueba para verificar interacciones reales del DOM.

## Resultado medido

Última ejecución registrada: **26 pruebas exitosas** en Chrome Headless, sin fallos.

| Métrica Istanbul | Resultado |
|---|---:|
| Sentencias | 82.82% (246/297); umbral mínimo: 80% |
| Ramas | 70.86% (107/151); umbral mínimo: 65% |
| Funciones | 81.11% (73/90); umbral mínimo: 75% |
| Líneas | 83.94% (230/274); umbral mínimo: 80% |

Métricas obtenidas al ejecutar `npm test` en Chrome Headless el 26-10-2026, después de integrar imágenes estáticas de la tienda original. Pueden variar cuando cambian los casos o módulos importados por las pruebas. El valor vigente impreso por Karma y `coverage/index.html` es el dato de referencia para entregar; no declarar cobertura total.

## Exclusiones y trabajo pendiente

- Las pruebas unitarias no sustituyen pruebas manuales de interfaz en distintos tamaños de pantalla.
- No se prueban backend, autorización, persistencia entre dispositivos ni pagos: esas funciones no están implementadas.
- Las rutas heredadas y todas las combinaciones posibles de validación no tienen un caso individual.
- La cobertura refleja módulos frontend cargados por las pruebas, no todos los archivos del repositorio. La cobertura de ramas es menor que la de sentencias; revisar los archivos y ramas sin cobertura en el reporte HTML y ampliar pruebas según los cambios futuros.

## Reproducibilidad

Karma usa `karma.conf.cjs`, Babel transforma JSX y aplica el plugin Istanbul en los módulos fuente, excluyendo `src/test`. `karma-coverage` produce reporte HTML, LCOV y resumen de texto, y falla si los totales globales no alcanzan los umbrales configurados. El mock de `FileReader` evita depender de decodificación real para comprobar la lógica de persistencia de imágenes.
