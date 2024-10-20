package zajezdy.s.react

import grails.rest.RestfulController


class FotografieController extends RestfulController {
    static responseFormats = ['json', 'xml']

    FotografieService fotografieService

    FotografieController() {
        super(Fotografie)
    }

    // odešle všechny fotografie dle id zájezdu
    def getFotografieByIdZajezd(){
        respond fotografieService.getFotografieByIdZajezd(params.id as Long)
    }

    // odešle soubor fotografie dle id fotografie
    def getFile(Long id){
        def file = fotografieService.getFileByIdFotografie(id)
        if (file) {
            response.contentType = File.probeContentType(Paths.get(file.absolute))
            response.setHeader("Content-Disposition", "inline; filename=\"${file.name}\"")
            response.outputStream << file.bytes // Odeslání souboru do výstupu
            response.outputStream.flush()
        } else {
            render status: 404, text: "Soubor nenalezen."
        }

    }

    //uloží novou fotku do fotografie dle id
    @Override
    def save() {
        def x = fotografieService.save(request.getFile('file'),request.getParameter("fotografie"), request.getParameter("zajezdId") as Long)
        respond x
    }

    //uloží změny fotografie dle id
    @Override
    def update() {
        def x =fotografieService.save(request.getFile('file'),request.getParameter("fotografie"),request.getParameter("zajezdId") as Long,params.id as Long)
        respond x
    }

}