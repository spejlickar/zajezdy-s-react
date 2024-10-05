<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>Seznam zájezdů</title>
</head>
<body>
<h1>Seznam zájezdů</h1>
<ul>
    <g:each in="${zajezdy}" var="zajezd">
        <li>
            <a href="${createLink(controller: 'home', action: 'show', id: zajezd.id)}">
                ${zajezd.nazev}
            </a>
        </li>
    </g:each>
</ul>
</body>
</html>