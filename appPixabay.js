var paginaActual = 1;
var totalPaginas = 0;

const cargarImagenes = async () => {
  let input = document.querySelector("#busqueda").value;
  let divPaginacion = document.querySelector("#paginacion");
  divPaginacion.style.display = "none";

  if (input === "") {
    mostrarError("#msj-error", "DEBE INGRESAR UNA PALABRA A BUSCAR");
    return;
  }

  const imagenesPorPagina = 16;
  const key = "42121885-8fe50dda593403c3eb0400f02";
  const url = `https://pixabay.com/api/?key=${key}&q=${input}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

  const respuesta = await fetch(url);
  const resultado = await respuesta.json();

  let imagenes = resultado.hits;

  // Cambio de atributo src por data-src para utilizar una librería de lazy loading como lazysizes para cargar las imágenes cuando el usuario las vea.
  const imagenesHTML = imagenes
    .map((imagen) => {
      const { largeImageURL, likes, previewURL, tags, views } = imagen;
      return `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <article class="card">
        <img data-src="${previewURL}" alt="${tags}" class="card-img-top lazyload">
        <div class="card-body">
        <p class="card-text text-success">${likes} <strong>Me gusta</strong> &#128077;</p>
        <p class="card-text text-info-emphasis">${views} <strong>Vistas</strong> &#128064;</p>
    </div>
    
    <footer class="card-footer text-center">
      <a
      href="${largeImageURL}"
      target="_blank"
      rel="noopener noreferrer"
      class="btn btn-outline-primary btn-block">
      Ver Imagen</a>
    </footer>
      </article>
    </div>
  `;
    })
    .join("");

  divListadoImagenes = document.querySelector("#listadoImagenes");
  //SPINNER
  divListadoImagenes.innerHTML = `<div style="text-align:center">
                                    <img src="loading.gif" width=300 height=300>
                                </div>`;

  totalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);

  let pagAnterior =
    paginaActual === 1
      ? ``
      : `
    <button
    type="button"
    class="btn bg-success-subtle bg-succes-subtle border-success"
    onclick="paginaAnterior()">
    Anterior </button>`;

  let pagSiguiente =
    paginaActual === totalPaginas
      ? ``
      : `
    <button
    type="button"
    class="btn bg-success-subtle bg-succes-subtle border-success"
    onclick="paginaSiguiente()">
    Siguiente </button>`;

  setTimeout(() => {
    divListadoImagenes.innerHTML = imagenesHTML;
    divPaginacion.innerHTML = `${pagAnterior} ${pagSiguiente}`;
    divPaginacion.style.display = "block";
  }, 1000);

  const jumbotron = document.querySelector(".jumbotron");
  jumbotron.scrollIntoView({ behavior: "smooth" });
};

const paginaAnterior = () => {
  paginaActual--;
  if (paginaActual === 0) {
    return;
  } else {
    cargarImagenes();
  }
};

const paginaSiguiente = () => {
  paginaActual++;
  if (paginaActual > totalPaginas) {
    return;
  } else {
    cargarImagenes();
  }
};

const mostrarError = (elemento, mensaje) => {
  divError = document.querySelector(elemento);
  divError.innerHTML = `<p class="alert alert-primary">${mensaje}</p>`;
  setTimeout(() => {
    divError.innerHTML = ``;
  }, 2000);
};
