package zajezdy.s.react

class UrlMappings {
    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }
        "/api/fotografie"(resources: 'fotografie')
        "/api/zajezd"(resources: 'zajezd')
        "/api/fotografie/zajezd/$id"(controller: 'fotografie', action: 'getFotografieByIdZajezd')
        "/api/fotografie/$id/soubor"(controller: 'fotografie', action: 'getSoubor')

        "/"(view:"/home/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
        "/zajezd/$id/fotky"(controller: 'zajezd', action: 'uploadFotky')
        "/zajezd"(resources: 'zajezd')
    }
}
