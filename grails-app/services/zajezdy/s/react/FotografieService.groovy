package zajezdy.s.react

import grails.gorm.transactions.Transactional
//import org.springframework.web.multipart.MultipartFile

@Transactional
class FotografieService {

    // vrátí soubor dle id fotografie jinak null
    def getSoubor(Long id) {
        def fotografie = Fotografie.get(id) // Najdi záznam fotografie podle ID

        if (!fotografie || !fotografie.url) {
            // Pokud fotografie nebo cesta k souboru neexistuje
            return null
        }

        // Předpokládejme, že url obsahuje relativní cestu k souboru ve složce "uploads"
        def file = new File("/uploads/${fotografie.url}")

        if (!file.exists()) {
            // Pokud soubor na disku neexistuje
            return null
        }
        return file
    }

    def getFotografieByIdZajezd(Long id) {
        return Fotografie.findAllByZajezdId(Id)
    }
}