# Instalation

* git clone https://github.com/daviddguedes/firebase-admin-adonisjs.git
* npm install
* Rename .env.example file to .env and change settings
* Start your MySql database
* Change settings for you firebase app in config/services.js
* npm run serve:dev
* Be happy!

# Resources

* GET http://localhost:3333/firebase-admin-users/ -> FirebaseAdminUsersController.index
* GET http://localhost:3333/firebase-admin-users/uid-firebase-user-here -> FirebaseAdminUsersController.show
* POST http://localhost:3333/firebase-admin-users/ -> FirebaseAdminUsersController.store
* GET http://localhost:3333/firebase-admin-users/edit/uid-firebase-user-here -> FirebaseAdminUsersController.edit
* PUT http://localhost:3333/firebase-admin-users/uid-firebase-user-here -> FirebaseAdminUsersController.update
* DELETE http://localhost:3333/firebase-admin-users/uid-firebase-user-here -> FirebaseAdminUsersController.destroy


Thanks Adonis Js! :-)

