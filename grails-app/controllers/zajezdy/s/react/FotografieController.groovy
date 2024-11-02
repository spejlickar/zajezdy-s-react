package zajezdy.s.react

import grails.rest.RestfulController
import io.micronaut.http.annotation.Get


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
    @Get
    def getFile(String fileName){
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

    //uloží novou fotku do fotografie dle id
    @Override
    def save() {
        respond fotografieService.save(request.getFile('file'),request.getParameter("fotografie"))
    }

    //uloží změny fotografie dle id
    @Override
    def update() {
        respond fotografieService.save(request.getFile('file'),request.getParameter("fotografie"))
    }

    @Override
    def delete(){
        fotografieService.delete(params.id as Long)
        super.delete()
    }

}