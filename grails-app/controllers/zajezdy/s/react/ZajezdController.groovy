package zajezdy.s.react

import grails.converters.JSON
import grails.rest.RestfulController

class ZajezdController extends RestfulController {

    static responseFormats = ['json', 'xml']

    def fileUploadService
    ZajezdService zajezdService


    ZajezdController() {
        super(Zajezd)
    }

    @Override
    def delete() { //uprava aby došlo k vymazu všech souborů fotek připadající zajezdu
        zajezdService.delete(params.id as Long)
        super.delete()
    }

    @Override
    def index() { // úprava výstupu zajezdu, tak aby tam byli i fotografie
        respond zajezdService.index()
    }
    @Override
    def show() { // úprava výstupu zajezdu, tak aby tam byli i fotografie
        respond zajezdService.show(params.id as Long)
    }

}