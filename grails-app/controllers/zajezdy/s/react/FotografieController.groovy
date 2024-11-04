package zajezdy.s.react

import grails.rest.RestfulController
import io.micronaut.http.annotation.Get


class FotografieController extends RestfulController {
    static responseFormats = ['json', 'xml']

    FotografieService fotografieService

    FotografieController() {
        super(Fotografie)
    }

    def getFotografieByIdZajezd(){ // odešle všechny fotografie dle id zájezdu
        respond fotografieService.getFotografieByIdZajezd(params.id as Long)
    }

    @Get
    def getFile(String fileName){ // odešle soubor fotografie dle nazvu fotografie
        def result = fotografieService.getFileByIdFotografie(fileName)
        if (result.status == 404) {
            render status: 404, text: result.message
            return
        }
        response.contentType = result.contentType
        response.setHeader("Content-Disposition", "inline; filename=\"${result.file.name}\"")
        response.flushBuffer() // Zajistěme, že hlavičky jsou odeslány
        response.outputStream << result.file.bytes // Odeslání souboru do výstupu
        response.outputStream.flush()
    }

    @Override
    def save() { //uloží novou fotku do fotografie dle id
        respond fotografieService.save(request.getFile('file'),request.getParameter("fotografie"))
    }

    @Override
    def update() { //uloží změny fotografie dle id
        respond fotografieService.save(request.getFile('file'),request.getParameter("fotografie"))
    }

    @Override
    def delete(){ //vymaže fotografii dle id
        fotografieService.delete(params.id as Long)
        super.delete()
    }

}