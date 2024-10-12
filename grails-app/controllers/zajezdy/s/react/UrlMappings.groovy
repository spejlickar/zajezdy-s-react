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
        "/api/fotografie/$id/file"(controller: 'fotografie', action: 'getFile')

        "/"(view:"/home/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
        "/zajezd"(resources: 'zajezd')
    }
}
