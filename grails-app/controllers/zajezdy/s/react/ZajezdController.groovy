package zajezdy.s.react

import grails.rest.RestfulController

class ZajezdController extends RestfulController {

    static responseFormats = ['json', 'xml']

    ZajezdController() {
        super(Zajezd)
    }
}