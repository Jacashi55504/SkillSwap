const postList = document.getElementById('post-list');

async function cargarPublicaciones() {
  try {
    const res = await fetch('http://localhost:8000/api/posts');
    const posts = await res.json();

    if (res.ok && posts.length > 0) {
      posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('w3-quarter');
        card.innerHTML = `
          <div class="post-card">
            <h3>${post.title}</h3>
            <p><strong>Tipo:</strong> ${post.type}</p>
            <p><strong>Habilidades:</strong> ${post.skills.join(', ')}</p>
            <p><strong>Descripción:</strong> ${post.description || 'Sin descripción'}</p>
            <p><strong>Publicado por:</strong> ${post.user?.name || 'Anónimo'}</p>
          </div>
        `;
        postList.appendChild(card);
      });
    } else {
      postList.innerHTML = '<p>No hay publicaciones disponibles.</p>';
    }
  } catch (err) {
    postList.innerHTML = '<p>Error al cargar publicaciones.</p>';
    console.error(err);
  }
}

cargarPublicaciones();
