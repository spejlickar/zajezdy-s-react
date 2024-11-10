<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Seznam zájezdů</title>
</head>
<body class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h1 class="card-title text-center">Seznam zájezdů</h1>
            <ul class="list-group list-group-flush">
                <g:each in="${zajezdy}" var="zajezd">
                    <a href="${createLink(controller: 'home', action: 'show', id: zajezd.id)}" class="text-decoration-none list-group-item-action">
                        <li class="list-group-item d-flex align-items-start">
                            <div class="d-flex align-items-center justify-content-center mr-3" style="width: 80px; height: 80px;">
                                <g:if test="${!zajezd.fotky?.isEmpty()}">
                                    <img src="${zajezd.fotky[0].url}" alt="${zajezd.fotky[0].popis}" class="img-thumbnail mt-2 w-100 h-100" style="object-fit: contain;">
                                </g:if>
                            </div>
                            <div>
                                <h5>${zajezd.nazev}</h5>
                                <p class="mt-1">${zajezd.popis ? (zajezd.popis.length() > 50 ? zajezd.popis.substring(0, 50) + '...' : zajezd.popis) : 'bez popisu'}</p>
                            </div>
                        </li>
                    </a>
                </g:each>
            </ul>
        </div>
    </div>
</body>
</html>
