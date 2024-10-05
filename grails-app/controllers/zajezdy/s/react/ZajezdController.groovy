package zajezdy.s.react

import grails.rest.RestfulController

class ZajezdController extends RestfulController {

    static responseFormats = ['json', 'xml']

    def fileUploadService

    ZajezdController() {
        super(Zajezd)
    }



    def uploadFotky(Long id) {
        def zajezd = Zajezd.get(id)
        if (!zajezd) {
            render status: 404, text: 'Zájezd nenalezen'
            return
        }

        def files = request.getFiles('files')
        files.each { file ->
            def url = fileUploadService.uploadFile(file)
            def foto = new Fotografie(url: url, popis: file.originalFilename)
            zajezd.addToFotky(foto)
        }

        if (zajezd.save(flush: true)) {
            respond zajezd, [status: 200]
        } else {
            respond zajezd.errors, [status: 400]
        }
    }
}