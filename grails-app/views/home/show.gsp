<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>${zajezd.nazev}</title>


</head>
<body>
    <div class="container-fluid" style="padding-top: 20px; max-width: 1200px; margin: 0 auto;">
        <h1 class="my-4">${zajezd.nazev}</h1>
        <div class="mb-4">
            Popis zájezdu: ${zajezd.popis}
        </div>
        <div class="container mt-5">
                <div id="simpleCarousel" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <g:each in="${zajezd.fotky}" var="foto" status="index">
                            <div class="carousel-item ${index == 0 ? 'active' : ''}">
                                <img src="${foto.url}" class="d-block w-100" alt="${foto.popis}">
                            </div>
                        </g:each>
                    </div>
                    <a class="carousel-control-prev" href="#simpleCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Předchozí</span>
                    </a>
                    <a class="carousel-control-next" href="#simpleCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Další</span>
                    </a>
                </div>
            </div>
        <p>
            <a href="${createLink(controller: 'home', action: 'index')}" class="btn btn-primary">Zpět na seznam</a>
        </p>
    </div>
</body>
</html>
