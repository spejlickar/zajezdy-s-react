package zajezdy.s.react


class HomeController {

    def index() {
        def zajezdy = Zajezd.list()
        [zajezdy: zajezdy]
    }

    def show() {
        def zajezd = Zajezd.get(params.id)
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