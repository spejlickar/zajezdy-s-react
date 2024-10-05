package zajezdy.s.react

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class FotografieSpec extends Specification implements DomainUnitTest<Fotografie> {

     void "test domain constraints"() {
        when:
        Fotografie domain = new Fotografie()
        //TODO: Set domain props here

        then:
        domain.validate()
     }
}
