package zajezdy.s.react

class UrlMappings {
    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/fotogalerie/$fileName"(controller: 'fotografie', action: 'getFile', method:'GET')
        "/api/fotografie"(resources: 'fotografie')
        "/api/zajezd"(resources: 'zajezd')

        "/"(view: "/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
        "/zajezd"(resources: 'zajezd')
    }
}
