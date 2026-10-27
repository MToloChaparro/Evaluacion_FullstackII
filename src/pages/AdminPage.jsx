import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { productos } from '../data/productos';
import { users } from '../data/usuarios';

const getSaved = (key, fallback) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : fallback;
};

const readImage = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(new Error('No se pudo leer el archivo de imagen.'));
  reader.readAsDataURL(file);
});

const AdminPage = () => {
  const location = useLocation();
  const requestedSection = location.pathname.split('/')[2] || 'resumen';
  const section = {
    'index.html': 'resumen',
    '_index.html': 'resumen',
    producto: 'productos',
    categoria: 'categorias',
    usuario: 'usuarios',
    orden: 'ordenes',
    reporte: 'reportes',
  }[requestedSection] || requestedSection;
  const [items, setItems] = useState(() => getSaved('demo-products', productos));
  const [categories, setCategories] = useState(() => getSaved('demo-categories', [...new Set(productos.map((item) => item.categoria))]));
  const [categoryName, setCategoryName] = useState('');
  const [notice, setNotice] = useState('');
  const [formError, setFormError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const orders = getSaved('demo-orders', []);
  const nav = [
    ['resumen', 'Resumen'],
    ['productos', 'Productos'],
    ['categorias', 'Categorías'],
    ['usuarios', 'Usuarios'],
    ['ordenes', 'Órdenes'],
    ['reportes', 'Reportes'],
  ];

  const saveProducts = (nextItems) => {
    try {
      localStorage.setItem('demo-products', JSON.stringify(nextItems));
      setItems(nextItems);
      setFormError('');
      return true;
    } catch (error) {
      console.error('No se pudieron guardar los productos de demostración.', error);
      setFormError('No se pudo guardar el producto. El almacenamiento del navegador puede estar lleno; prueba con una imagen más pequeña.');
      return false;
    }
  };

  const handleImageChange = async (event) => {
    const file = event.currentTarget.files?.[0];
    setFormError('');
    if (!file) {
      setImagePreview('');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setImagePreview('');
      setFormError('Selecciona un archivo de imagen válido.');
      event.currentTarget.value = '';
      return;
    }
    if (file.size > 1024 * 1024) {
      setImagePreview('');
      setFormError('La imagen debe pesar 1 MB o menos para guardarse en este navegador.');
      event.currentTarget.value = '';
      return;
    }
    try {
      setImagePreview(await readImage(file));
    } catch (error) {
      console.error('Error al previsualizar la imagen del producto.', error);
      setFormError('No se pudo abrir la imagen seleccionada.');
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const imageFile = form.querySelector('input[name="image"]').files?.[0];
    let image = 'https://via.placeholder.com/400x300';
    if (imageFile && imageFile.size > 0) {
      if (!imageFile.type.startsWith('image/')) {
        setFormError('Selecciona un archivo de imagen válido.');
        return;
      }
      if (imageFile.size > 1024 * 1024) {
        setFormError('La imagen debe pesar 1 MB o menos para guardarse en este navegador.');
        return;
      }
      try {
        image = await readImage(imageFile);
      } catch (error) {
        console.error('Error al leer la imagen del producto.', error);
        setFormError('No se pudo leer la imagen seleccionada.');
        return;
      }
    }
    const nextItem = {
      id: Date.now(),
      nombre: String(formData.get('name')).trim(),
      categoria: String(formData.get('category')),
      descripcion: 'Producto agregado desde el panel de demostración.',
      precio_descuento: Number(formData.get('price')),
      precio_nuevo: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      imagen: image,
    };
    if (saveProducts([nextItem, ...items])) {
      form.reset();
      setImagePreview('');
      setNotice('Producto e imagen guardados en este navegador.');
    }
  };

  const handleUpdateProductImage = async (productId, file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setFormError('Selecciona un archivo de imagen válido.');
      return;
    }
    if (file.size > 1024 * 1024) {
      setFormError('La imagen debe pesar 1 MB o menos para guardarse en este navegador.');
      return;
    }

    try {
      const image = await readImage(file);
      const nextItems = items.map((item) => item.id === productId ? { ...item, imagen: image } : item);
      if (saveProducts(nextItems)) {
        setNotice('Imagen del producto actualizada y guardada en este navegador.');
      }
    } catch (error) {
      console.error('Error al actualizar la imagen del producto.', error);
      setFormError('No se pudo leer la imagen seleccionada.');
    }
  };

  const handleAddCategory = (event) => {
    event.preventDefault();
    const name = categoryName.trim();
    if (name && !categories.includes(name)) {
      const next = [...categories, name];
      setCategories(next);
      localStorage.setItem('demo-categories', JSON.stringify(next));
      setNotice(`Categoría "${name}" agregada.`);
    }
    setCategoryName('');
  };

  return (
    <main className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
        <div><p className="eyebrow">Área administrativa · demostración</p><h1 className="mb-0">Panel de administración</h1></div>
        <Link className="btn btn-outline-dark" to="/">Volver a la tienda</Link>
      </div>
      <div className="alert alert-warning">Panel local de demostración: no requiere permisos y los cambios solo se guardan en este navegador.</div>
      <nav className="d-flex flex-wrap gap-2 mb-4" aria-label="Secciones de administración">
        {nav.map(([path, label]) => <Link key={path} className={`btn ${section === path ? 'btn-dark' : 'btn-outline-dark'}`} to={`/admin${path === 'resumen' ? '' : `/${path}`}`}>{label}</Link>)}
      </nav>
      {notice && <p className="alert alert-success" role="status">{notice}</p>}

      {section === 'resumen' && (
        <div className="row g-3">
          {[
            ['Productos', items.length, '/admin/productos'],
            ['Categorías', categories.length, '/admin/categorias'],
            ['Usuarios de muestra', users.length, '/admin/usuarios'],
            ['Órdenes', orders.length, '/admin/ordenes'],
          ].map(([label, count, href]) => <div className="col-sm-6 col-lg-3" key={label}><Link to={href} className="summary-box d-block text-decoration-none text-dark h-100"><p className="text-muted mb-1">{label}</p><strong className="fs-2">{count}</strong></Link></div>)}
        </div>
      )}

      {section === 'productos' && (
        <section className="summary-box">
          <h2 className="h4">Agregar producto</h2>
          <form className="row g-2 mb-4" onSubmit={handleAddProduct}>
            <div className="col-md-4"><input className="form-control" name="name" placeholder="Nombre" required /></div>
            <div className="col-md-3"><select className="form-select" name="category" required>{categories.map((category) => <option key={category}>{category}</option>)}</select></div>
            <div className="col-md-2"><input className="form-control" name="price" type="number" min="0" placeholder="Precio" required /></div>
            <div className="col-md-2"><input className="form-control" name="stock" type="number" min="0" placeholder="Stock" required /></div>
            <div className="col-md-4"><label className="form-label" htmlFor="product-image">Imagen del producto (máximo 1 MB)</label><input id="product-image" className="form-control" name="image" type="file" accept="image/*" onChange={handleImageChange} /></div>
            <div className="col-md-2 d-flex align-items-end"><button className="btn btn-primary w-100" type="submit" aria-label="Agregar producto">Agregar</button></div>
            {imagePreview && <div className="col-12"><img src={imagePreview} alt="Vista previa del producto" style={{ maxWidth: '180px', maxHeight: '120px', objectFit: 'cover' }} /></div>}
          </form>
          {formError && <p className="alert alert-danger" role="alert">{formError}</p>}
          <div className="table-responsive"><table className="table align-middle"><thead><tr><th>Imagen</th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead><tbody>
            {items.map((item) => <tr key={item.id}><td><img src={item.imagen} alt={`Imagen de ${item.nombre}`} width="72" height="54" style={{ objectFit: 'cover' }} /></td><td>{item.nombre}</td><td>{item.categoria}</td><td>${item.precio_nuevo}</td><td>{item.stock}</td><td><div className="d-flex flex-column gap-2"><label className="btn btn-sm btn-outline-primary mb-0">Cambiar imagen<input className="visually-hidden" type="file" accept="image/*" aria-label={`Cambiar imagen de ${item.nombre}`} onChange={(event) => handleUpdateProductImage(item.id, event.currentTarget.files?.[0])} /></label><button className="btn btn-sm btn-outline-danger" type="button" onClick={() => saveProducts(items.filter((product) => product.id !== item.id))}>Eliminar</button></div></td></tr>)}
          </tbody></table></div>
        </section>
      )}

      {section === 'categorias' && (
        <section className="summary-box">
          <h2 className="h4">Categorías del catálogo</h2>
          <form className="d-flex gap-2 mb-3" onSubmit={handleAddCategory}><input className="form-control" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Nueva categoría" required /><button className="btn btn-primary">Agregar</button></form>
          <ul className="list-group">{categories.map((category) => <li className="list-group-item" key={category}>{category}</li>)}</ul>
        </section>
      )}

      {section === 'usuarios' && <section className="summary-box"><h2 className="h4">Usuarios de muestra</h2><div className="table-responsive"><table className="table"><thead><tr><th>Nombre</th><th>Correo</th><th>Tipo</th></tr></thead><tbody>{users.map((user) => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.tipo === 1 ? 'Administrador' : 'Cliente'}</td></tr>)}</tbody></table></div></section>}

      {section === 'ordenes' && <section className="summary-box"><h2 className="h4">Órdenes locales</h2>{orders.length ? <div className="table-responsive"><table className="table"><thead><tr><th>Número</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td>{order.id}</td><td>{order.name}</td><td>{order.date}</td><td>${order.total}</td><td>{order.status}</td></tr>)}</tbody></table></div> : <p className="text-muted mb-0">Aún no hay compras en este navegador.</p>}</section>}

      {section === 'reportes' && <section className="summary-box"><h2 className="h4">Reporte de inventario y ventas</h2><p>Productos registrados: <strong>{items.length}</strong></p><p>Unidades disponibles: <strong>{items.reduce((sum, item) => sum + Number(item.stock || 0), 0)}</strong></p><p>Órdenes de demostración: <strong>{orders.length}</strong></p><p className="mb-0">Ventas registradas: <strong>${orders.reduce((sum, order) => sum + Number(order.total || 0), 0)}</strong></p></section>}

      {!nav.some(([path]) => path === section) && <section className="summary-box"><h2>Sección no encontrada</h2><Link to="/admin">Volver al resumen</Link></section>}
    </main>
  );
};

export default AdminPage;
