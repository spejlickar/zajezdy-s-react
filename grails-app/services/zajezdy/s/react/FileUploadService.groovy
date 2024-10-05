package zajezdy.s.react

import org.springframework.web.multipart.MultipartFile
import grails.gorm.transactions.Transactional

@Transactional
class FileUploadService {

    def grailsApplication

    String uploadFile(MultipartFile file) {
        if (file && !file.empty) {
            String uploadDir = grailsApplication.config.grails.app.uploadDir
            String fileName = file.originalFilename
            File destination = new File("${uploadDir}/${fileName}")
            file.transferTo(destination)
            return "/uploads/${fileName}"
        }
        return null
    }
}