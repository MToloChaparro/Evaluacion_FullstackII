# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Tienda Gamer

Start the application from this directory with `npm install` (first run) and `npm run dev`. The React app includes the product catalog, product details, blog articles, demo contact form, customer profile, cart and demo checkout. The administration area is available at `/admin` and includes products, categories, users, orders, and reports. Legacy `.html` paths for the main shop pages are also routed to their React equivalents.

The images from the original `Tienda/assets/img` folder are copied into `public/images/legacy` and used by the React "Nosotros" and blog pages for banners, team portraits, and illustrations. Profile details, contact messages, catalog changes, product images (up to 1 MB per image), and demo orders are stored in the browser's `localStorage`. Login and checkout are simulations only: there is no server, secure authentication, or real payment processing. Do not enter real passwords or sensitive payment details. If browser storage runs out of space, the administration form reports that the product could not be saved.

Run checks with `npm run lint`, `npm run build`, and `npm test`.

The evaluation documents are in `docs/ERS.md` and `docs/COBERTURA-TESTING.md`. `npm test` runs the Jasmine/Karma suite and writes the HTML coverage report to `coverage/index.html`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
