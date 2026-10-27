import { Link, useParams } from 'react-router-dom';

const articles = {
  'aventuras': {
    title: '¿Qué jugar después de una gran aventura?',
    category: 'Recomendaciones',
    image: 'dino2.png',
    imageAlt: 'Personaje dinosaurio gamer',
    body: 'Explora las categorías de aventura y RPG para encontrar mundos nuevos que recorrer. Compara los títulos del catálogo y guarda tus favoritos en el carrito.'
  },
  'multijugador': {
    title: 'Jugar en equipo',
    category: 'Comunidad',
    image: 'face-dino3.png',
    imageAlt: 'Personaje de videojuego con audífonos',
    body: 'Los juegos multijugador ofrecen opciones para compartir cada partida. Revisa las fichas de producto para conocer el género y elegir tu próxima sesión.'
  },
  'descubrir-juegos': {
    title: 'Encuentra tu próximo juego',
    category: 'Guía',
    image: 'programador1.png',
    imageAlt: 'Personaje gamer colorido',
    body: 'Usa los filtros por categoría y revisa las ofertas para descubrir títulos que se ajusten a tus gustos.'
  }
};

const BlogArticlePage = () => {
  const { articleId } = useParams();
  const article = articles[articleId];

  if (!article) return <main className="container py-5"><h1>Artículo no encontrado</h1><Link to="/blog">Volver al blog</Link></main>;

  return (
    <main className="container py-5">
      <Link to="/blog" className="text-decoration-none">← Volver al blog</Link>
      <article className="summary-box mt-4">
        <p className="eyebrow">{article.category}</p>
        <h1 className="mt-2">{article.title}</h1>
        <img
          className="blog-article-image my-4"
          src={`/images/legacy/${article.image}`}
          alt={article.imageAlt}
        />
        <p className="lead text-muted mt-4">{article.body}</p>
        <Link to="/categorias" className="btn btn-primary mt-3">Explorar juegos</Link>
      </article>
    </main>
  );
};

export default BlogArticlePage;
