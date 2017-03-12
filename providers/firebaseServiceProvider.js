const ServiceProvider = require('adonis-fold').ServiceProvider
const FirebaseService = require('./firebaseService')

class FirebaseProvider extends ServiceProvider {
    * register() {
        this.app.bind('Adonis/Services/Firebase', (app) => {
            const Config = app.use('Adonis/Src/Config')
            return new FirebaseService(Config)
        })
    }
}

module.exports = FirebaseProvider