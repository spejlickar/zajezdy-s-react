<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>${zajezd.nazev}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <asset:stylesheet src="bootstrap.min" />
    <asset:javascript src="jquery-3.5.1.min" />
    <asset:javascript src="popper.min" />
    <asset:javascript src="bootstrap.min" />
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
