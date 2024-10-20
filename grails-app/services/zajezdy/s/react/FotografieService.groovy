package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile
import grails.core.GrailsApplication
import org.springframework.beans.factory.annotation.Autowired
import java.nio.file.Paths
import grails.converters.JSON
//import org.springframework.web.multipart.MultipartFile

@Transactional
class FotografieService {
    def grailsApplication
    //@Autowired
    //GrailsApplication grailsApplication

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
    def save(MultipartFile file,dataString, Long zajezdId, Long id = null){
        if (file) {
            Fotografie fotografie
            def data = JSON.parse(dataString)
            //C:\grails_app\zajezdy-s-react\grails-app\fotografie
            String rootPath = System.getProperty("user.dir")+"/grails-app";
            //def fotografieDir = grailsApplication.config.grails.app.uploadDir;

            // Vymazání starého souboru, pokud id existuje
            if (id) {
                String oldFileUrl = Fotografie.get(id)?.url
                if (oldFileUrl) {
                    File( rootPath + oldFileUrl ).delete() // Vymazání starého souboru
                }
                fotografie = Fotografie.get(id)
                fotografie.url = data.url
                fotografie.popis = data.popis
            } else {
                // Použití prázdného konstruktoru a explicitní nastavení atributů
                fotografie = new Fotografie()
                fotografie.url = data.url
                fotografie.popis = data.popis
                fotografie.zajezd = Zajezd.get(zajezdId) // Nastavení reference na zájezd
            }

            fotografie.save(flush: true)

            File directory = new File(rootPath)
            if (!directory.exists()) {
                directory.mkdirs() // Vytvoří adresář, pokud neexistuje
            }

            // Uložení nového souboru
            file.transferTo(new File( rootPath + fotografie.url ))
            return fotografie
        } else {
            return null
        }

    }
}