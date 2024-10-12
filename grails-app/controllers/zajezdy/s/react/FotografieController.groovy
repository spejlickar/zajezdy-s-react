package zajezdy.s.react

import grails.rest.RestfulController


class FotografieController extends RestfulController {
    static responseFormats = ['json', 'xml']

    FotografieService fotografieService

    FotografieController() {
        super(Fotografie)
    }

    // odešle všechny fotografie dle id zájezdu
    def getFotografieByIdZajezd(Long id){
        respond fotografieService.getFotografieByIdZajezd(Long id)
    }

    // odešle soubor fotografie dle id fotografie
    def getSoubor(Long id){
        def file = fotografieService.getSoubor(id)
        if (file) {
            // Nastavení hlaviček pro odpověď
            response.contentType = File.probeContentType(Paths.get(file.absolute))
            response.setHeader("Content-Disposition", "inline; filename=\"${file.name}\"")
            response.outputStream << file.bytes // Odeslání souboru do výstupu
            response.outputStream.flush()
        } else {
            render status: 404, text: "Soubor nenalezen."
        }

    }

    //uloží novou fotku dle id fotografie
    @Override
    def save() {
        def soubor = request.getFiles('soubor')
        String cestaKSouboru = "uploads/${file.originalFilename}"
        file.transferTo(new File(cestaKSouboru)) // Uložení souboru
        super
    }

}