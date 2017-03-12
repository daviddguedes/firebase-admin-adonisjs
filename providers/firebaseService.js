class FirebaseService {
    constructor(Config) {

        const FirebaseAdmin = require('firebase-admin')
        const FirebaseConfig = Config.get('services.firebase')

        FirebaseAdmin.initializeApp({
            credential: FirebaseAdmin.credential.cert({
                projectId: FirebaseConfig.credentials.project_id,
                clientEmail: FirebaseConfig.credentials.client_email,
                privateKey: FirebaseConfig.credentials.private_key
            }),

            databaseURL: FirebaseConfig.credentials.database_url
        })

        return FirebaseAdmin
    }
}

module.exports = FirebaseService