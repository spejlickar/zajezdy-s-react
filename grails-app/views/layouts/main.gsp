<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Zajezdy" /></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <asset:stylesheet src="bootstrap.min" />
    <g:layoutHead />
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="${createLink(controller: 'zajezd', action: 'index')}">Zajezdy</a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <g:link class="nav-link" controller="zajezd" action="index">Zobrazit zájezdy</g:link>
                </li>
                <li class="nav-item">
                    <g:link class="nav-link" controller="zajezd" action="create">Vytvořit zájezd</g:link>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <g:layoutBody />
    </div>
</body>
</html>
