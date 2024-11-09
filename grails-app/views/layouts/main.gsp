<!DOCTYPE html>
<html>
<head>
    <title><g:layoutTitle default="Zajezdy" /></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- styles -->
    <asset:stylesheet src="bootstrap.min.css" />
    <asset:stylesheet src="styles.css" /> <!-- uzivatelske styly -->

    <g:layoutHead />
</head>
<body>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row">
                <li class="nav-item">
                    <g:link class="nav-link" controller="home" action="index">Zájezdy</g:link>
                </li>
                <li class="nav-item">
                    <g:link class="nav-link" controller="home" action="spravce">Správa zájedů</g:link>
                </li>
            </ul>
        </div>
    </nav>

    <!-- hlavní tělo stránky -->
    <div class="container-fluid">
        <g:layoutBody />
    </div>

    <!-- patička stránky -->
    <footer class="bg-dark text-center text-sm-start mt-4" style="font-size: 0.85rem;">
        <div class="container p-2">
            <div class="row">
                <div class="col-lg-6 col-md-12 mb-2">
                    <h6 class="text-uppercase text-light">O nás</h6>
                    <p class="text-light">
                        Jsme cestovní kancelář zaměřená na nezapomenutelné zájezdy. Naším cílem je poskytovat kvalitní a spolehlivé služby, které zaručí skvělé zážitky pro všechny naše zákazníky.
                    </p>
                </div>
                <div class="col-lg-3 col-md-6 mb-2">
                    <h6 class="text-uppercase text-light">Kontakty</h6>
                    <ul class="list-unstyled mb-0">
                        <li>
                            <a href="#!" class="text-light">Email: info@zajezdy.cz</a>
                        </li>
                        <li>
                            <a href="#!" class="text-light">Telefon: +420 123 456 789</a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6 mb-2">
                    <h6 class="text-uppercase text-light">Sociální sítě</h6>
                    <ul class="list-unstyled mb-0">
                        <li>
                            <a href="#!" class="text-light">Facebook</a>
                        </li>
                        <li>
                            <a href="#!" class="text-light">Instagram</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.5);">
            © 2024 Zajezdy.cz
        </div>
    </footer>

    <!-- javascripts -->
    <asset:javascript src="jquery-3.5.1.min.js" type="text/javascript" />
    <asset:javascript src="popper.min.js" type="text/javascript" />
    <asset:javascript src="bootstrap.bundle.min.js" type="text/javascript" />
</body>
</html>
