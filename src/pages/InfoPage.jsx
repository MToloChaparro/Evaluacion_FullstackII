import { useState } from 'react';
import { Link } from 'react-router-dom';

const pageContent = {
  nosotros: {
    title: 'Sobre nosotros',
    description: 'Tienda Gamer reúne videojuegos de distintos géneros para que encuentres tu próxima aventura.',
    banner: {
      src: '/images/legacy/banner2.png',
      alt: 'Ilustración de videojuegos para presentar la tienda'
    },
    cards: [
      {
        title: 'Variedad para jugar',
        description: 'Explora juegos de aventura, rol, acción, deportes, simulación y más.'
      },
      {
        title: 'Un catálogo fácil de recorrer',
        description: 'Filtra por categoría, revisa las ofertas y agrega tus juegos favoritos al carrito.'
      }
    ],
    team: [
      { name: 'Joseph', role: 'Programador', image: 'face-programador2.png' },
      { name: 'Luna', role: 'Scrum Master', image: 'Luna.png' },
      { name: 'Pedro', role: 'Programador', image: 'pedro.png' }
    ]
  },
  blog: {
    title: 'Blog gamer',
    description: 'Ideas y recomendaciones para descubrir nuevos juegos y aprovechar el catálogo.',
    banner: {
      src: '/images/legacy/banner.png',
      alt: 'Banner ilustrado del blog gamer'
    },
    cards: [
      {
        title: '¿Qué jugar después de una gran aventura?',
        description: 'Explora las categorías de aventura y RPG para encontrar mundos nuevos que recorrer.'
      },
      {
        title: 'Jugar en equipo',
        description: 'Los juegos multijugador y de deportes ofrecen opciones para compartir cada partida.'
      },
      {
        title: 'Encuentra tu próximo juego',
        description: 'Usa los filtros por categoría y revisa las ofertas para descubrir títulos que se ajusten a tus gustos.'
      }
    ],
    articles: [
      { id: 'aventuras', title: '¿Qué jugar después de una gran aventura?', image: 'dino2.png', alt: 'Personaje dinosaurio gamer' },
      { id: 'multijugador', title: 'Jugar en equipo', image: 'face-dino3.png', alt: 'Personaje de videojuego con audífonos' },
      { id: 'descubrir-juegos', title: 'Encuentra tu próximo juego', image: 'programador1.png', alt: 'Personaje gamer colorido' }
    ],
    team: [
      { name: 'Joseph', role: 'Programador', image: 'face-programador2.png' },
      { name: 'Luna', role: 'Scrum Master', image: 'Luna.png' },
      { name: 'Pedro', role: 'Programador', image: 'pedro.png' }
    ]
  },
  contacto: {
    title: 'Contacto',
    description: 'Envíanos una consulta de demostración. El mensaje se guardará únicamente en este navegador.',
    cards: []
  },
  'no-encontrada': {
    title: 'Página no encontrada',
    description: 'La página solicitada no existe. Puedes volver a explorar la tienda.',
    cards: []
  }
};

const InfoPage = ({ page }) => {
  const content = pageContent[page];
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = {
      name: String(formData.get('name')).trim(),
      email: String(formData.get('email')).trim(),
      message: String(formData.get('message')).trim(),
      date: new Date().toISOString(),
    };
    const messages = JSON.parse(localStorage.getItem('demo-messages') || '[]');
    localStorage.setItem('demo-messages', JSON.stringify([message, ...messages]));
    event.currentTarget.reset();
    setContactSent(true);
  };

  return (
    <main className="container py-5">
      <header className="mb-4">
        <p className="eyebrow">Tienda Gamer</p>
        <h1 className="section-title mt-2">{content.title}</h1>
        <p className="lead text-muted mt-3 mb-0">{content.description}</p>
      </header>

      {content.banner && (
        <img
          className="info-banner mb-4"
          src={content.banner.src}
          alt={content.banner.alt}
        />
      )}

      {content.cards.length > 0 && (
        <div className="row g-4">
          {content.cards.map((card) => (
            <div className="col-md-6" key={card.title}>
              <article className="summary-box h-100">
                <h2 className="h4">{card.title}</h2>
                <p className="text-muted mb-0">{card.description}</p>
              </article>
            </div>
          ))}
        </div>
      )}
      {content.articles && (
        <div className="row g-4 mt-2">
          {content.articles.map((article) => (
            <div className="col-md-4" key={article.id}>
              <article className="summary-box h-100">
                <img
                  className="blog-card-image mb-3"
                  src={`/images/legacy/${article.image}`}
                  alt={article.alt}
                  loading="lazy"
                />
                <h2 className="h5">{article.title}</h2>
                <Link to={`/blog/${article.id}`}>Leer artículo</Link>
              </article>
            </div>
          ))}
        </div>
      )}
      {content.team && (
        <section className="mt-5">
          <h2 className="section-title mb-4">Nuestro equipo</h2>
          <div className="row g-4">
            {content.team.map((member) => (
              <div className="col-12 col-sm-6 col-lg-4" key={member.name}>
                <article className="summary-box text-center h-100">
                  <img
                    className="team-avatar mx-auto mb-3"
                    src={`/images/legacy/${member.image}`}
                    alt={`Avatar ilustrado de ${member.name}`}
                    loading="lazy"
                  />
                  <h3 className="h5 mb-1">{member.name}</h3>
                  <p className="text-muted mb-0">{member.role}</p>
                </article>
              </div>
            ))}
          </div>
        </section>
      )}
      {page === 'no-encontrada' && <Link className="btn btn-primary mt-3" to="/">Ir a la tienda</Link>}
      {page === 'contacto' && (
        <form className="summary-box mt-4" onSubmit={handleContactSubmit}>
          <div className="mb-3"><label className="form-label" htmlFor="contact-name">Nombre</label><input id="contact-name" name="name" className="form-control" required /></div>
          <div className="mb-3"><label className="form-label" htmlFor="contact-email">Correo electrónico</label><input id="contact-email" name="email" type="email" className="form-control" required /></div>
          <div className="mb-3"><label className="form-label" htmlFor="contact-message">Mensaje</label><textarea id="contact-message" name="message" className="form-control" rows="4" required /></div>
          <button className="btn btn-primary" type="submit">Guardar mensaje de demostración</button>
          {contactSent && <p className="text-success mt-3 mb-0" role="status">Mensaje guardado en este navegador.</p>}
        </form>
      )}
    </main>
  );
};

export default InfoPage;
