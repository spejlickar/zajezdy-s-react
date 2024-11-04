<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>${zajezd.nazev}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <asset:stylesheet src="bootstrap.min" />

</head>
<body>
    <div class="container-fluid" style="padding-top: 20px; max-width: 1200px; margin: 0 auto;">
        <h1 class="my-4">${zajezd.nazev}</h1>
        <div class="mb-4">
            ${zajezd.popis}
        </div>

        <h2 class="my-4">Fotografie</h2>
        <div id="fotografieCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
            <div class="carousel-inner">
                <g:each in="${zajezd.fotky}" var="foto" status="idx">
                    <div class="carousel-item ${idx == 0 ? 'active' : ''}">
                        <img src="${foto.url}" class="d-block w-100" alt="${foto.popis}" style="max-height: 500px; object-fit: cover;">
                        <div class="carousel-caption d-none d-md-block">
                            <p>${foto.popis}</p>
                        </div>
                    </div>
                </g:each>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#fotografieCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#fotografieCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <p>
            <a href="${createLink(controller: 'home', action: 'index')}" class="btn btn-primary">Zpět na seznam</a>
        </p>
    </div>
</body>
</html>
