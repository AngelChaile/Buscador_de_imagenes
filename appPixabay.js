const cargarImagenes = async () => {
  let input = document.querySelector("#busqueda").value;
  if (input === "") {
    mostrarError("#msj-error", "DEBE INGRESAR UNA PALABRA A BUSCAR");
    return;
  }

  const key = "42121885-8fe50dda593403c3eb0400f02";
  const url = `https://pixabay.com/api/?key=${key}&q=${input}`;

  const respuesta = await fetch(url);
  const resultado = await respuesta.json();

  let imagenes = resultado.hits;
  console.log(imagenes);

  let imagenesHTML = ``;
  imagenes.map((imagen) => {
    const { largeImageURL, likes, previewURL, tags, views } = imagen;

    imagenesHTML += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card">
            <img src="${previewURL}" alt="${tags}" class="card-img-top">
            <div class="card-body">
                <p class="card-text text-success">${likes} <strong>Me gusta</strong> &#128077;</p>
                <p class="card-text text-info">${views} <strong>Vistas</strong> &#128064;</p>
            </div>
            
            <div class="card-footer text-center">
              <a
              href="${largeImageURL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-primary btn-block">
              Ver Imagen</a>
            </div>
        </div>
      </div>
      `;
  });
  divListadoImagenes = document.querySelector("#listadoImagenes");
  //SPINNER
  divListadoImagenes.innerHTML = `<div style="text-align:center">
                                    <img src="loading.gif" width=300 height=300>
                                </div>`;
  setTimeout(() => {
    divListadoImagenes.innerHTML = imagenesHTML;
  }, 1000);
};

const mostrarError = (elemento, mensaje) => {
  divError = document.querySelector(elemento);
  divError.innerHTML = `<p class="alert alert-primary">${mensaje}</p>`;
  setTimeout(() => {
    divError.innerHTML = ``;
  }, 2000);
};
