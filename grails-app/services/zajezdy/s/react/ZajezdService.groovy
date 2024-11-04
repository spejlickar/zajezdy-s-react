package zajezdy.s.react

import grails.gorm.transactions.Transactional
import org.springframework.web.multipart.MultipartFile

@Transactional
class ZajezdService {

    FotografieService fotografieService

    def delete(Long id) { //pouze vymaže soubory fotografie dle id
        Zajezd zajezd = Zajezd.get(id)
        if (zajezd) {
            zajezd.fotky.each { fotka ->
                fotografieService.delete(fotka.id)
            }
        }
    }

    def index() { // úprava výstupu zajezdu, tak aby tam byli i fotografie
        return Zajezd.list().collect { zajezd ->
            [id: zajezd.id,
             nazev: zajezd.nazev,
             popis: zajezd.popis,
             fotky: zajezd.fotky.collect { fotka -> [id: fotka.id, url: fotka.url, popis: fotka.popis]}
            ]
        }
    }

    def show(Long id) { // úprava výstupu zajezdu, tak aby tam byli i fotografie
        def zajezd = Zajezd.get(id)
        return [id: zajezd.id,
            nazev: zajezd.nazev,
            popis: zajezd.popis,
            fotky: zajezd.fotky.collect { fotka -> [id: fotka.id, url: fotka.url, popis: fotka.popis]
            }]
    }
}