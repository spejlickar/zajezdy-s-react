package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile
import grails.core.GrailsApplication
import org.springframework.beans.factory.annotation.Autowired
import java.nio.file.Paths
import grails.converters.JSON
import java.nio.file.Files
//import org.springframework.web.multipart.MultipartFile

@Transactional
class FotografieService {
    def grailsApplication
    //@Autowired
    //GrailsApplication grailsApplication

    // vrátí soubor dle id fotografie jinak null
    def getFileByIdFotografie(String fileName) {
        /*def fotografie = Fotografie.get(id) // Najdi záznam fotografie podle ID

        if (!fotografie) {
            return [status: 404, message: "Fotografie nenalezena."]
        }*/

        // Ziskani souboru
        def file = new File(System.getProperty("user.dir") + "/grails-app/fotogalerie/" + fileName)
        if (file.exists()) {
            def contentType = Files.probeContentType(file.toPath()) ?: "application/octet-stream"
            return [status: 200, file: file, contentType: contentType]
        } else {
            return [status: 404, message: "Soubor nenalezen."]
        }
    }
    //vráti všechny fotografie dle id zajezdu
    def getFotografieByIdZajezd(Long id) {
        return Fotografie.findAllByZajezd(Zajezd.get(id))
    }
    //pokud existuje soubor uloží ho do složky uploadDir a případně smaže starý (když existuje záznam) jinka nedělá nic
    def save(MultipartFile file, String dataString, Long zajezdId) {
        def data = JSON.parse(dataString)
        Fotografie fotografie = data.id ? Fotografie.get(data.id) : new Fotografie()
        fotografie.zajezd = fotografie.zajezd ? fotografie.zajezd : Zajezd.get(zajezdId)
        fotografie.popis = data.popis
        fotografie.url = data.url
        fotografie.save(flush: true)

        if (file) {
            String rootPath = System.getProperty("user.dir") + "/grails-app";
            File targetFile = new File(rootPath + data.url)

            if (data.id && targetFile.exists()) {
                targetFile.delete()
            }

            targetFile = new File(rootPath + fotografie.url)
            file.transferTo(targetFile)
        }

        return fotografie
    }
}