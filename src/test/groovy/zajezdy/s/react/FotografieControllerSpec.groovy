package zajezdy.s.react

import grails.testing.web.controllers.ControllerUnitTest
import spock.lang.Specification

class FotografieControllerSpec extends Specification implements ControllerUnitTest<FotografieController> {

     void "test index action"() {
        when:
        controller.index()

        then:
        status == 200

     }
}
