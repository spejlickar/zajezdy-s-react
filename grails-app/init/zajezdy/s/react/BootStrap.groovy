package zajezdy.s.react

class BootStrap {

    def init = { servletContext ->

        JSON.registerObjectMarshaller(Zajezd) { Zajezd zajezd ->
            return [
                    id     : zajezd.id,
                    nazev  : zajezd.nazev,
                    popis  : zajezd.popis,
                    fotky  : zajezd.fotky?.collect { Fotografie fotka ->
                        [
                                id    : fotka?.id,
                                url   : fotka?.url,
                                popis : fotka?.popis
                        ]
                    }
            ]
        }
    }
    def destroy = {
    }
}