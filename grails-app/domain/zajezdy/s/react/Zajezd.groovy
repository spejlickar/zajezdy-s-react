package zajezdy.s.react

class Zajezd {

    String nazev
    String popis
    static hasMany = [fotky: Fotografie]

    static constraints = {
        nazev nullable: false, blank: false, maxSize: 255
        popis nullable: true, maxSize: 10000
    }

    static mapping = {
        popis type: 'text'
    }
}