package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile
import grails.converters.JSON
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

@Transactional
class FotografieService {
    def grailsApplication

    // vrátí soubor dle id fotografie jinak null
    def getFileByIdFotografie(String fileName) {
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

    //vymaže fotografii dle id pokud existuje
    def delete(Long id){
        Fotografie fotografie = Fotografie.get(id)
        String rootPath = System.getProperty("user.dir") + File.separator + "grails-app"
        Path targetPath = Paths.get(rootPath, fotografie.url)
        if (Files.exists(targetPath)) { // případné smazání
            try {
                Files.delete(targetPath)
            } catch (IOException e) {
                throw new RuntimeException("Chyba při mazání stávající fotky: " + e.getMessage(), e)
            }
        }
    }

    //pokud existuje soubor uloží ho do složky uploadDir a případně smaže starý (když existuje záznam) jinka nedělá nic
    def save(MultipartFile file, String dataString) {
        def data = JSON.parse(dataString)
        Fotografie fotografie = (data.id) ? Fotografie.get(data.id) : new Fotografie()  // zjistění instance Fotografie
        fotografie.zajezd = (fotografie.zajezd) ? fotografie.zajezd : Zajezd.get(data.zajezd.id as Long)  // zjistění reference na zájezd
        fotografie.popis = data.popis  // uložení nového popisu
        if (file) { // pokud přišel i soubor
            String rootPath = System.getProperty("user.dir") + File.separator + "grails-app"
            if (data.id) { // pokud jde o úpravu, tak případně dojde ke smazání stávající fotky
                Path targetPath = Paths.get(rootPath, fotografie.url)
                if (Files.exists(targetPath)) { // případné smazání
                    try {
                        Files.delete(targetPath)
                    } catch (IOException e) {
                        throw new RuntimeException("Chyba při mazání stávající fotky: " + e.getMessage(), e)
                    }
                }
            }
            // uloží novou fotku
            fotografie.url = data.url  // uloží případně nové url
            Path newTargetPath = Paths.get(rootPath, fotografie.url)
            try {
                Files.createDirectories(newTargetPath.getParent()) // zajistí, že cesta existuje
                file.transferTo(newTargetPath.toFile())
            } catch (IOException e) {
                throw new RuntimeException("Chyba při ukládání nové fotky: " + e.getMessage(), e)
            }
        }

        fotografie.save(flush: true)

        return fotografie
    }
}