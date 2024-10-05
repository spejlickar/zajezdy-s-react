package zajezdy.s.react

import grails.rest.RestfulController

class FotografieController extends RestfulController {
    static responseFormats = ['json', 'xml']

    FotografieController() {
        super(Fotografie)
    }
}