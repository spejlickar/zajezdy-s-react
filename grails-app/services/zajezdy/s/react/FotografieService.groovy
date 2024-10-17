package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile
import java.nio.file.Paths
//import org.springframework.web.multipart.MultipartFile

@Transactional
class FotografieService {
    def grailsApplication

    // vrátí soubor dle id fotografie jinak null
    def getFileByIdFotografie(Long id) {
        def fotografie = Fotografie.get(id) // Najdi záznam fotografie podle ID
        if (!fotografie || !fotografie.url) return null   // pokud nexistuje zaznam v databazi vrat null
        def file = new File("${grailsApplication.config.app.uploadDir}/${fotografie.url}")   //ziskani souboru
        if (!file.exists()) return null  // Pokud soubor na disku neexistuje vrat null
        return file
    }
    //vráti všechny fotografie dle id zajezdu
    def getFotografieByIdZajezd(Long id) {
        return Fotografie.findAllByZajezd(Zajezd.get(id))
    }
    //pokud existuje soubor uloží ho do složky uploadDir a případně smaže starý (když existuje záznam) jinka nedělá nic
    def saveFile(MultipartFile file,Long zajezdId, Long id = null){
        if (file) {
            // Vymazání starého souboru, pokud id existuje
            if (id) {
                String oldFileUrl = Fotografie.get(id)?.url
                if (oldFileUrl) {
                    File("${'C:/grails_app/zajezdy-s-react'}/${oldFileUrl}").delete() // Vymazaní starého souboru
                }
            }

            // Složka pro nahrání souborů
            String uploadDir = "${'C:/grails_app/zajezdy-s-react'}/uploads"

            // Vytvoření složky, pokud neexistuje
            new File(uploadDir).mkdirs()

            // Uložení nového souboru
            file.transferTo(new File("${uploadDir}/${file.originalFilename}"))
        }

    }
}