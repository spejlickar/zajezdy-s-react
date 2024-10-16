package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile
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
            if (id) File("${grailsApplication.config.app.uploadDir}/${Fotografie.get(params.id as Long).url}").delete()  //vymazaní souboru
            file.transferTo(new File("${}/${file.originalFilename}")) // Uložení souboru
        }

    }
}