package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile

@Transactional
class ZajezdService {
    FotografieService fotografieService

    def delete(Long id) {
        Zajezd zajezd = Zajezd.get(id)
        if (zajezd) {
            zajezd.fotky.each { fotka ->
                fotografieService.delete(fotka.id)
            }
        }
    }

    def index() {
        return Zajezd.list().collect { zajezd ->
            [
                    id: zajezd.id,
                    nazev: zajezd.nazev,
                    popis: zajezd.popis,
                    fotky: zajezd.fotky.collect { fotka ->
                        [
                                id: fotka.id,
                                url: fotka.url,
                                popis: fotka.popis
                        ]
                    }
            ]
        }
    }

    def show(Long id) {
        def zajezd = Zajezd.get(id)
        return [id: zajezd.id,
            nazev: zajezd.nazev,
            popis: zajezd.popis,
            fotky: zajezd.fotky.collect { fotka ->
                [
                        id: fotka.id,
                        url: fotka.url,
                        popis: fotka.popis
                ]
            }]
    }

    def save(params) {
        Zajezd zajezdInstance = new Zajezd()
        bindData(zajezdInstance, request.JSON)
        zajezdInstance.nazev = params.nazev
        zajezdInstance.popis = params.popis

        // Uložení fotografií
        List<MultipartFile> fotky = request.getFiles("fotky")
        fotky.eachWithIndex { MultipartFile file, int index ->
            if (!file.empty) {
                def fotografieInstance = new Fotografie()
                def uploadsDir = new File(servletContext.getRealPath('/uploads'))
                if (!uploadsDir.exists()) {
                    uploadsDir.mkdirs()
                }
                def filePath = new File(uploadsDir, file.originalFilename)
                file.transferTo(filePath)
                fotografieInstance.url = '/uploads/' + file.originalFilename
                fotografieInstance.popis = params["fotka_${index}_popis"] // Assuming Fotografie has a field 'data' to store binary content
                zajezdInstance.addToFotky(fotografieInstance)
            }
        }

        if (zajezdInstance.save(flush: true)) {
            return zajezdInstance
        } else {
            return null
        }
    }

    def update(Long id, params) {
        Zajezd zajezdInstance = Zajezd.get(id)
        if (!zajezdInstance) {
            render status: NOT_FOUND
            return
        }

        bindData(zajezdInstance, request.JSON)
        zajezdInstance.nazev = params.nazev
        zajezdInstance.popis = params.popis

        // Aktualizace fotografií
        List<MultipartFile> fotky = request.getFiles("fotky")
        fotky.eachWithIndex { MultipartFile file, int index ->
            if (!file.empty) {
                def fotografieInstance = new Fotografie()
                def uploadsDir = new File(servletContext.getRealPath('/uploads'))
                if (!uploadsDir.exists()) {
                    uploadsDir.mkdirs()
                }
                def filePath = new File(uploadsDir, file.originalFilename)
                file.transferTo(filePath)
                fotografieInstance.url = '/uploads/' + file.originalFilename
                fotografieInstance.popis = params["fotka_${index}_popis"]
                zajezdInstance.addToFotky(fotografieInstance)
            }
        }

        if (zajezdInstance.save(flush: true)) {
            return zajezdInstance
        } else {
            return null
        }
    }
}