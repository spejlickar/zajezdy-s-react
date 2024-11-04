<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>${zajezd.nazev}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <asset:stylesheet src="bootstrap.min" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" integrity="sha384-1CmrxMRARb6aLqgBO7yyAxTOQE2AKb9GfXnEa1Lmzz+vsZ0T9FFm2jwh9a/ebhnd" crossorigin="anonymous" />
</head>
<body>
    <div class="container-fluid" style="padding-top: 20px; max-width: 1200px; margin: 0 auto;">
        <h1 class="my-4">${zajezd.nazev}</h1>
        <div class="mb-4">
            ${zajezd.popis}
        </div>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <g:each in="${zajezd.fotky}" var="foto" status="idx">
                <div class="carousel-item ${idx == 0 ? 'active' : ''}">
                    <img class="d-block w-100" src="${foto.url}" alt="${foto.popis}">
                </div>
            </g:each>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

        <p>
            <a href="${createLink(controller: 'home', action: 'index')}" class="btn btn-primary">Zpět na seznam</a>
        </p>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js" integrity="sha384-rb6vKXE+2FEkPm/M4j9ttRJzG0ATxRKEkDdntmYlIKs4ni/PvnYwzXf6hQX8Zq5C" crossorigin="anonymous"></script>
</body>
</html>
