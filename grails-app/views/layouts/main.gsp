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
    <nav class="navbar navbar-light bg-light" style="box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding-bottom: 15px;">
        <div class="container-fluid">


    <div class="navbar-collapse d-lg-flex">
            <ul class="navbar-nav flex-wrap" style="font-size: 1.1em; list-style-type: none; padding-left: 0; margin: 0; gap: 10px;">
                <li class="nav-item" style="margin: 5px;">
                    <g:link class="nav-link" controller="home" action="index">Zobrazit zájezdy</g:link>
                </li>
                <li class="nav-item">
                    <g:link class="nav-link" controller="home" action="spravce">Správa zájezdů</g:link>
                </li>
            </ul>
        </div>
            </div>
    </nav>

    <div class="container-fluid" style="padding-top: 20px; max-width: 1200px; margin: 0 auto;">
        <g:layoutBody />
    </div>
</body>
</html>
