package zajezdy.s.react


class HomeController {

    def index() {
        def zajezdy = Zajezd.list()
        [zajezdy: zajezdy]
    }

    def show(Long id) {
        def zajezd = Zajezd.get(id)
        if (!zajezd) {
            flash.message = "Zájezd nenalezen"
            redirect(action: "index")
            return
        }
        [zajezd: zajezd]
    }

    def spravce() {

    }
}