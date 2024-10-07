package zajezdy.s.react

import grails.gorm.transactions.Transactional

@Transactional
class ZajezdService {

    def getList() {
        def zajezdy = Zajezd.list(fetch: [fotky: 'join'])
        def zajezdyWithFotky = zajezdy.collect { zajezd ->
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
        return zajezdyWithFotky
    }
}