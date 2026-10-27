import { productos } from './productos.js';

export const getDemoProducts = () => {
  const savedProducts = localStorage.getItem('demo-products');
  return savedProducts ? JSON.parse(savedProducts) : productos;
};
