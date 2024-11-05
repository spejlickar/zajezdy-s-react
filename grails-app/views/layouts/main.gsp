<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Zajezdy" /></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <asset:stylesheet src="bootstrap.min" />
    <asset:stylesheet src="styles.css" /> <!-- Custom stylesheet -->
    <g:layoutHead />
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" >
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
                    <li class="nav-item" >
                        <g:link class="nav-link" controller="home" action="index">Zobrazit zájezdy</g:link>
                    </li>
                    <li class="nav-item">
                        <g:link class="nav-link" controller="home" action="spravce">Správa zájezdů</g:link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container-fluid" >
        <g:layoutBody />
    </div>
</body>
</html>
