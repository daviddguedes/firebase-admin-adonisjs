'use strict'
const Firebase = use('Adonis/Services/Firebase')
const FirebaseAuth = Firebase.auth()
const FirebaseDataBase = Firebase.database()

class FirebaseAdminUsersController {

	* index(request, response) {
		
	}

	* create(request, response) {
		response.send('Formulário para criar Novo Usuário no Firebase')
	}

	* store(request, response) {
		let disabledBoolean = false;
		let agora = Math.round(new Date() / 1000);

		FirebaseAuth.createUser({
			displayName: request.input('dados.display_name'),
			disabled: disabledBoolean,
			email: request.input('dados.email'),
			password: request.input('dados.password')
		})
			.then(function (userRecord) {
				console.log("Usuário cadastrado uid:", userRecord.uidInternal)
				let id = userRecord.uid;
				FirebaseDataBase.ref('usuarios').child(id).set({
					display_name: request.input('dados.display_name'),
					primeiro_nome: request.input('dados.primeiro_nome'),
					segundo_nome: request.input('dados.segundo_nome'),
					disabled: disabledBoolean,
					email: request.input('dados.email'),
					data_cadastro: agora,
					tipo: request.input('dados.tipo'),
					provider: request.input('dados.provider')
				})

				response.send({ "sucesso": { "cod": "200", "mensagem": "Usuário criado com sucesso", "uid": userRecord.uidInternal } })
			})
			.catch(function (error) {
				console.log("error ===>", error)
				response.send({ "erro": { "cod": "500", "mensagem": error } });
			});
	}

	* show(request, response) {
		FirebaseAuth.getUser(request.param('id'))
			.then(function (userRecord) {
				var data = userRecord.toJSON();
				response.send(userRecord.toJSON());
			})
			.catch(function (error) {
				console.log("Error ao tentar verificar os dados do paciente: ", error)
				response.send("Erro ao verificar dados do app:", error);
			});
	}

	* edit(request, response) {
		response.send('Aqui ficará o formulário para alterar os dados de um usuário no Firebase')
	}

	* update(request, response) {
		var uid = request.param('id');
		var obj = {
			display_name: request.input('dados.display_name'),
			primeiro_nome: request.input('dados.primeiro_nome'),
			segundo_nome: request.input('dados.segundo_nome'),
			email: request.input('dados.email')
		}

		if (request.input('dados.email')) {
			obj.email = request.input('dados.email');
		}

		FirebaseAuth.updateUser(uid, {
			displayName: request.input('dados.display_name'),
			email: request.input('dados.email'),
			password: request.input('dados.password')
		})
			.then(function (userRecord) {
				FirebaseDataBase.ref('/usuarios/' + uid).update(obj);
				response.send({ "sucesso": { "cod": "200", "mensagem": "Dados atualizados com sucesso" } })
			})
			.catch(function (error) {
				response.send("Error updating user:", error);
			}); 
	}

	* destroy(request, response) {
		let uid = request.param('id');
		FirebaseAuth.deleteUser(uid)
			.then(function () {
				FirebaseDataBase.ref('/usuarios/' + uid).remove();
				response.send({ "sucesso": { "cod": "200", "mensagem": "Usuário deletado com sucesso!" } })
			})
			.catch(function (error) {
				response.send({ "erro": { "cod": "500", "mensagem": error } });
			});
	}

}

module.exports = FirebaseAdminUsersController
