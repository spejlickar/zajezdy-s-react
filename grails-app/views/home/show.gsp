<!DOCTYPE html>
<html>
<head>
    <meta name="layout" content="main"/>
    <title>${zajezd.nazev}</title>
</head>
<body>
<h1>${zajezd.nazev}</h1>
<div>
    <g:raw>${zajezd.popis}</g:raw>
</div>

<h2>Fotografie</h2>
<ul>
    <g:each in="${zajezd.fotky}" var="foto">
        <li>
            <img src="${foto.url}" alt="${foto.popis}" width="200"/>
            <p>${foto.popis}</p>
        </li>
    </g:each>
</ul>

<p>
    <a href="${createLink(controller: 'home', action: 'index')}">Zpět na seznam</a>
</p>
</body>
</html>