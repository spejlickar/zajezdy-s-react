<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>${zajezd.nazev}</title>
</head>
<body>
    <div class="container" style="padding-top: 20px; max-width: 1200px; margin: 0 auto;">
        <h1 class="display-4 text-center my-4">${zajezd.nazev}</h1>
        <div class="card shadow-sm mb-4">
            <div class="card-body">
                <h5 class="card-title">Popis zájezdu</h5>
                <p class="card-text">${zajezd.popis}</p>
            </div>
        </div>
        <div class="container mt-5">
            <div id="simpleCarousel" class="carousel slide shadow" data-ride="carousel">
                <div class="carousel-inner">
                    <g:each in="${zajezd.fotky}" var="foto" status="index">
                        <div class="carousel-item ${index == 0 ? 'active' : ''}">
                            <img src="${foto.url}" class="d-block w-100" alt="${foto.popis}">
                            <div class="carousel-caption d-block">
                                <p>${foto.popis}</p>
                            </div>
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

    </div>
</body>
</html>
