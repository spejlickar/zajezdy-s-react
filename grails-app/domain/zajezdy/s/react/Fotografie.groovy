package zajezdy.s.react

class Fotografie {

    String url
    String popis

    static belongsTo = [zajezd: Zajezd]

    static constraints = {
        url nullable: false, blank: false
        popis nullable: true, maxSize: 255
    }
}