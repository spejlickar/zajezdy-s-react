package zajezdy.s.react

class UrlMappings {
    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/home/index")
        "500"(view:'/error')
        "404"(view:'/notFound')
        "/zajezd/$id/fotky"(controller: 'zajezd', action: 'uploadFotky')

    }
}
